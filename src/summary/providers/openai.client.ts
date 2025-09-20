import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

// A minimal OpenAI client wrapper. If MOCK_OPENAI=true it will return a fake response.
// In real usage replace this with official OpenAI client or better error handling.

@Injectable()
export class OpenAIClient {
  async generateSummary(text: string) {
    if (process.env.MOCK_OPENAI === 'true') {
      // return a deterministic short "mock" summary
      return (text.slice(0, 200) + (text.length > 200 ? '...' : '')).trim();
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error('No OPENAI_API_KEY configured');

    // Example using OpenAI chat completions (replace with official SDK in production)
    const prompt = `Summarize the following article in 2-3 concise sentences:\n\n${text}`;

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // or gpt-4o, whichever you have access to
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 150,
        temperature: 0.2,
      }),
    });

    if (!res.ok) {
      const txt = await res.text();
      throw new Error(`OpenAI error: ${res.status} ${txt}`);
    }
    const json = await res.json();
    const content = json.choices?.[0]?.message?.content;
    return content ? content.trim() : '';
  }
}
