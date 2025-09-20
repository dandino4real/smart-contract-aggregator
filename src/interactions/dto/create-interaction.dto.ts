import { IsString } from 'class-validator';

export class CreateInteractionDto {
  @IsString()
  userId: string;

  @IsString()
  articleId: string;

  @IsString()
  interactionType: string;
}
