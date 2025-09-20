import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Article, ArticleDocument } from './schemas/article.schema';
import { CreateArticleDto } from './dto/create-article.dto';
import { SummaryService } from 'src/summary/summary.service';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
    private readonly summaryService: SummaryService,
  ) {}

  async create(createDto: CreateArticleDto) {
    const { summary, content } = createDto;
    let generatedSummary = summary;
    if (!generatedSummary || generatedSummary.trim() === '') {
      generatedSummary = await this.summaryService.generate(content);
    }
    const created = new this.articleModel({
      ...createDto,
      summary: generatedSummary,
    });
    return created.save();
  }

  async findAll(limit = 10, offset = 0) {
    const docs = await this.articleModel
      .find()
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .exec();
    const total = await this.articleModel.countDocuments().exec();
    return { data: docs, total, limit, offset };
  }

  async findOne(id: string) {
    return this.articleModel.findById(id).exec();
  }

  // helper for recommendation/popularity updates
  async incrementInteractions(articleId: string) {
    return this.articleModel
      .findByIdAndUpdate(
        articleId,
        { $inc: { interactionsCount: 1 } },
        { new: true },
      )
      .exec();
  }

  async findByIds(ids: string[]) {
    return this.articleModel.find({ _id: { $in: ids } }).exec();
  }
}
