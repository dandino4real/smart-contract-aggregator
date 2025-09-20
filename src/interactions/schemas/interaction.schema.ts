import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InteractionDocument = Interaction & Document;

@Schema({ timestamps: true })
export class Interaction {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  articleId: string;

  @Prop({ required: true })
  interactionType: string; // 'view' | 'like' etc.
}

export const InteractionSchema = SchemaFactory.createForClass(Interaction);
