import { Body, Controller, Get, Post } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';

@Controller('campaign')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Post()
  create(@Body() dto: CreateCampaignDto) {
    return this.campaignService.createCampaign(dto);
  }

  @Get()
  findAll() {
    return this.campaignService.findAll();
  }
}
