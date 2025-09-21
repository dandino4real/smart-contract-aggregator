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

  async create(createArticleDto: CreateArticleDto) {
    const { summary, content } = createArticleDto;
    let generatedSummary = summary;
    if (!generatedSummary || generatedSummary.trim() === '') {
      generatedSummary = await this.summaryService.generate(content);
    }
    const createdArticle = new this.articleModel({
      ...createArticleDto,
      summary: generatedSummary,
    });
    return createdArticle.save();
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
}
