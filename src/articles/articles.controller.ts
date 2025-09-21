import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  async create(@Body() createArticleDto: CreateArticleDto) {
    const created = await this.articlesService.create(createArticleDto);
    return {
      success: true,
      message: 'Article created successfully',
      data: created,
    };
  }

  @Get()
  async list(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
  ) {
    const articles = await this.articlesService.findAll(limit, offset);
    return {
      success: true,
      message: 'Articles fetched successfully',
      ...articles,
    };
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const article = await this.articlesService.findOne(id);
    return {
      success: true,
      message: 'Article fetched successfully',
      data: article,
    };
  }
}
