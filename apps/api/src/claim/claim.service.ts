/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClaimDto } from './dto/create-claim.dto';

@Injectable()
export class ClaimService {
  constructor(private prisma: PrismaService) {}

  async createClaim(dto: CreateClaimDto) {
    const wallet = dto.wallet.toLowerCase();

    const campaign = await this.prisma.campaign.findUnique({
      where: { id: dto.campaignId },
    });

    if (!campaign) {
      throw new BadRequestException('Campaign not found');
    }

    const existing = await this.prisma.claim.findUnique({
      where: {
        campaignId_wallet: {
          campaignId: dto.campaignId,
          wallet,
        },
      },
    });

    if (existing) {
      throw new BadRequestException('Already claimed');
    }

    const claim = await this.prisma.claim.create({
      data: {
        campaignId: dto.campaignId,
        wallet,
        txHash: dto.txHash,
      },
    });

    return claim;
  }

  async getClaimStatus(campaignId: string, wallet: string) {
    wallet = wallet.toLowerCase();

    const claim = await this.prisma.claim.findUnique({
      where: {
        campaignId_wallet: {
          campaignId,
          wallet,
        },
      },
    });

    if (claim) {
      return { claimed: true };
    }

    const campaign = await this.prisma.campaign.findUnique({
      where: { id: campaignId },
    });

    if (!campaign) {
      throw new BadRequestException('Campaign not found');
    }

    const claimed = await this.client.readContract({
      address: campaign.contractAddress as `0x${string}`,
      abi: ZKPASS_ABI,
      functionName: 'claimed',
      args: [wallet],
    });

    return { claimed };
  }

  async getClaims(wallet: string) {
    return await this.prisma.claim.findMany({
      where: { wallet: wallet.toLowerCase() },
      include: { campaign: true },
    });
  }
}
