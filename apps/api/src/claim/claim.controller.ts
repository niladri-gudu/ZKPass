/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ClaimService } from './claim.service';
import { CreateClaimDto } from './dto/create-claim.dto';

@Controller()
export class ClaimController {
  constructor(private claimService: ClaimService) {}

  @Post('claim')
  async createClaim(@Body() dto: CreateClaimDto) {
    return this.claimService.createClaim(dto);
  }

  @Get('campaign/:id/claim/:wallet')
  async getClaimStatus(
    @Param('id') campaignId: string,
    @Param('wallet') wallet: string,
  ) {
    return this.claimService.getClaimStatus(campaignId, wallet);
  }

  @Get('claim/:wallet')
  async getUserClaims(@Param('wallet') wallet: string) {
    return this.claimService.getClaims(wallet);
  }
}
