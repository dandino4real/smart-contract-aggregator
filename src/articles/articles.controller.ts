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
  async create(@Body() dto: CreateArticleDto) {
    const created = await this.articlesService.create(dto);
    return { success: true, article: created };
  }

  @Get()
  async list(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
  ) {
    return this.articlesService.findAll(limit, offset);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.articlesService.findOne(id);
  }
}
