import { Controller, Post, Body } from '@nestjs/common';
import { CreateInteractionDto } from './dto/create-interaction.dto';
import { InteractionsService } from './interactions.service';

@Controller('interactions')
export class InteractionsController {
  constructor(private readonly interactionsService: InteractionsService) {}

  @Post()
  async create(@Body() createInteractionDto: CreateInteractionDto) {
    const savedInteractions =
      await this.interactionsService.create(createInteractionDto);
    return {
      success: true,
      message: 'Interaction created successfully',
      data: savedInteractions,
    };
  }
}
