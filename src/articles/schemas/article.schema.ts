import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArticleDocument = Article & Document;

@Schema({ timestamps: true })
export class Article {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop()
  author?: string;

  @Prop({ default: '' })
  summary?: string;

  @Prop({ type: [String], default: [] })
  tags?: string[];

  // popularity can be computed but storing a simple counter is ok
  @Prop({ default: 0 })
  interactionsCount?: number;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
