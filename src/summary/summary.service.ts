import { Injectable } from '@nestjs/common';
import { OpenAIClient } from './providers/openai.client';

@Injectable()
export class SummaryService {
  constructor(private readonly openAIClient: OpenAIClient) {}

  /**
   * Generate a summary for a text. If OpenAI is available, use it.
   * Otherwise, fallback to a simple extractive summarizer.
   */
  async generate(text: string): Promise<string> {
    if (!text || text.trim().length === 0) return '';

    // prefer external API if configured
    if (process.env.OPENAI_API_KEY && process.env.MOCK_OPENAI !== 'true') {
      try {
        return await this.openAIClient.generateSummary(text);
      } catch (err) {
        console.warn('OpenAI error, falling back to local summarizer', err);
      }
    }

    // fallback: simple extractive summarizer
    return this.simpleExtractiveSummary(text);
  }

  simpleExtractiveSummary(text: string, maxSentences = 3): string {
    // Naive: split sentences, score by word frequency, pick top ones
    const sentences = text.replace(/\n/g, ' ').match(/[^\.!\?]+[\.!\?]+/g) || [
      text,
    ];

    const words = text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/)
      .filter(Boolean);
    const freq: Record<string, number> = {};
    for (const w of words) freq[w] = (freq[w] || 0) + 1;

    const sentenceScores = sentences.map((s) => {
      const sWords = s
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .split(/\s+/)
        .filter(Boolean);
      let score = 0;
      for (const w of sWords) score += freq[w] || 0;
      // normalize by length slightly (shorter sentences get small boost)
      score = score / Math.sqrt(sWords.length || 1);
      return { sentence: s.trim(), score };
    });

    sentenceScores.sort((a, b) => b.score - a.score);
    const chosen = sentenceScores
      .slice(0, maxSentences)
      .sort((a, b) => text.indexOf(a.sentence) - text.indexOf(b.sentence));
    return chosen.map((c) => c.sentence).join(' ');
  }
}
