import { Module } from '@nestjs/common';
import { CampaignController } from './campaign.controller';
import { CampaignService } from './campaign.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BlockchainModule } from 'src/blockchain/blockchain.module';

@Module({
  imports: [PrismaModule, BlockchainModule],
  controllers: [CampaignController],
  providers: [CampaignService],
})
export class CampaignModule {}
