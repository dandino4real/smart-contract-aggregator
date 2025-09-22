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
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
