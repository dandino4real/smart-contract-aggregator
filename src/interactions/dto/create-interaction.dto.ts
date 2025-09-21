import { IsString } from 'class-validator';

export class CreateInteractionDto {
  @IsString()
  user_id: string;

  @IsString()
  article_id: string;

  @IsString()
  interaction_type: string;
}
