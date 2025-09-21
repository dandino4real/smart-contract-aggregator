import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Interaction, InteractionDocument } from './schemas/interaction.schema';
import { Model } from 'mongoose';
import { CreateInteractionDto } from './dto/create-interaction.dto';
import { ArticlesService } from '../articles/articles.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class InteractionsService {
  constructor(
    @InjectModel(Interaction.name)
    private interactionModel: Model<InteractionDocument>,
    private readonly articlesService: ArticlesService,
    private readonly usersService: UsersService,
  ) {}

  async create(createInteractionDto: CreateInteractionDto) {
    const { user_id, article_id } = createInteractionDto;

    // ✅ 1. Check if user exists
    const user = await this.usersService.findById(user_id);
    if (!user) {
      throw new NotFoundException(`User with id ${user_id} not found`);
    }

    // ✅ 2. Check if article exists
    const article = await this.articlesService.findOne(article_id);
    if (!article) {
      throw new NotFoundException(`Article with id ${article_id} not found`);
    }

    // ✅ 3. Save interaction
    const doc = new this.interactionModel(createInteractionDto);
    return await doc.save();
  }
}
