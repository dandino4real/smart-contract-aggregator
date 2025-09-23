import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InteractionDocument = Interaction & Document;

@Schema({ timestamps: true })
export class Interaction {
  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true })
  article_id: string;

  @Prop({ required: true })
  interaction_type: string; // 'view' | 'like' etc.
}

export const InteractionSchema = SchemaFactory.createForClass(Interaction);
