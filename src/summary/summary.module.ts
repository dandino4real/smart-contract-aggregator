import { Module } from '@nestjs/common';
import { SummaryService } from './summary.service';
import { OpenAIClient } from './providers/openai.client';

@Module({
  providers: [SummaryService, OpenAIClient],
  exports: [SummaryService],
})
export class SummaryModule {}
