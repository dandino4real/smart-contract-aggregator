import { Controller, Post, Body } from '@nestjs/common';
import { CreateInteractionDto } from './dto/create-interaction.dto';
import { InteractionsService } from './interactions.service';

@Controller('interactions')
export class InteractionsController {
  constructor(private readonly interactionsService: InteractionsService) {}

  @Post()
  async create(@Body() dto: CreateInteractionDto) {
    const saved = await this.interactionsService.create(dto);
    return { success: true, interaction: saved };
  }
}
