import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Interaction, InteractionDocument } from './schemas/interaction.schema';
import { Model } from 'mongoose';
import { CreateInteractionDto } from './dto/create-interaction.dto';
import { ArticlesService } from '../articles/articles.service';

@Injectable()
export class InteractionsService {
  constructor(
    @InjectModel(Interaction.name)
    private interactionModel: Model<InteractionDocument>,
    private readonly articlesService: ArticlesService,
  ) {}

  async create(dto: CreateInteractionDto) {
    const doc = new this.interactionModel(dto);
    const saved = await doc.save();

    // Update article interactionsCount for popularity
    await this.articlesService.incrementInteractions(dto.articleId);

    return saved;
  }

  async countByArticle(articleId: string) {
    return this.interactionModel.countDocuments({ articleId }).exec();
  }

  async mostInteracted(limit = 10) {
    // simple: aggregate by articleId
    return this.interactionModel.aggregate([
      { $group: { _id: '$articleId', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: limit },
    ]);
  }
}
