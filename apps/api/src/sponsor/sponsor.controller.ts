import { Body, Controller, Post } from '@nestjs/common';
import { SponsorService } from './sponsor.service';

@Controller('sponsor')
export class SponsorController {
  constructor(private sponsorService: SponsorService) {}

  @Post()
  async sponsor(@Body() body: any) {
    const { campaignId, wallet } = body;

    return this.sponsorService.sponsorClaim(campaignId, wallet);
  }
}
