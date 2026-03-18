import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  @Get(':id/proof/:wallet')
  getProof(@Param('id') campaignId: string, @Param('wallet') wallet: string) {
    return this.campaignService.getProof(campaignId, wallet);
  }

  @Get(':id')
  getCampaign(@Param('id') id: string) {
    return this.campaignService.getCampaignById(id);
  }

  @Get(':id/stats')
  claim(@Param('id') id: string) {
    return this.campaignService.getStats(id);
  }
}
