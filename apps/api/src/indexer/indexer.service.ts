/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { createPublicClient, http } from 'viem';
import { sepolia } from 'viem/chains';

import { ZKPASS_ABI } from '@repo/contracts';

@Injectable()
export class IndexerService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  client = createPublicClient({
    chain: sepolia,
    transport: http(process.env.RPC_URL),
  });

  async onModuleInit() {
    console.log('Starting blockchain event indexer...');

    const campaigns = await this.prisma.campaign.findMany();

    for (const campaign of campaigns) {
      this.watchCampaign(campaign);
    }
  }
  watchCampaign(campaign: any) {
    this.client.watchContractEvent({
      address: campaign.address as `0x${string}`,
      abi: ZKPASS_ABI,
      eventName: 'Claimed',

      onLogs: async (logs) => {
        for (const log of logs) {
          const user = (log as any).args?.user?.toLowerCase();

          if (!user || !log.transactionHash) return;

          console.log('Claim detected:', user);

          await this.storeClaim(campaign.id, user, log.transactionHash);
        }
      },
    });
  }

  async storeClaim(campaignId: string, wallet: string, txHash: string) {
    try {
      await this.prisma.claim.create({
        data: {
          campaignId,
          wallet,
          txHash,
        },
      });

      console.log('Claim stored:', wallet);
    } catch {
      console.log('Claim already stored');
    }
  }
}
