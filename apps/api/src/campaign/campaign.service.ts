/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';

import { generateMerkleTree } from 'src/utils/merkle';

import { FACTORY_ADDRESS, ZKPASS_FACTORY_ABI } from '@repo/contracts';

import { BlockchainService } from 'src/blockchain/blockchain.service';

import { decodeEventLog } from 'viem';
import { sepolia } from 'viem/chains';

import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';

@Injectable()
export class CampaignService {
  constructor(
    private prisma: PrismaService,
    private blockchain: BlockchainService,
  ) {}

  async createCampaign(dto: CreateCampaignDto) {
    const { name, addresses } = dto;

    const walletClient = this.blockchain.walletClient;

    const normalized = [
      ...new Set(addresses.map((addr) => addr.trim().toLowerCase())),
    ];

    const { root } = generateMerkleTree(normalized);

    const hash = await walletClient.writeContract({
      address: FACTORY_ADDRESS,
      abi: ZKPASS_FACTORY_ABI,
      functionName: 'createCampaign',
      args: [root],
    });

    const receipt =
      await this.blockchain.publicClient.waitForTransactionReceipt({
        hash,
      });
    let contractAddress: `0x${string}` | null = null;

    for (const log of receipt.logs) {
      try {
        const decoded = decodeEventLog({
          abi: ZKPASS_FACTORY_ABI,
          data: log.data,
          topics: log.topics,
        });

        if (decoded.eventName === 'CampaignCreated') {
          const args = decoded.args as unknown as { campaign: `0x${string}` };

          contractAddress = args.campaign;
        }
      } catch {
        // Ignore logs that don't match the event signature
      }
    }

    if (!contractAddress) {
      throw new Error('Campaign address not found in logs');
    }

    const campaign = await this.prisma.campaign.create({
      data: {
        name,
        contractAddress,
        merkleRoot: root,
        chainId: sepolia.id,
      },
    });

    await this.prisma.allowList.createMany({
      data: normalized.map((wallet) => ({
        wallet,
        campaignId: campaign.id,
      })),
      skipDuplicates: true,
    });

    return campaign;
  }

  async findAll() {
    return this.prisma.campaign.findMany();
  }

  async getProof(campaignId: string, wallet: string) {
    const normalizedWallet = wallet.trim().toLowerCase();

    const campaign = await this.prisma.campaign.findUnique({
      where: { id: campaignId },
      include: { allowlist: true },
    });

    if (!campaign) {
      throw new Error('Campaign not found');
    }

    const addresses = campaign.allowlist.map((entry) => entry.wallet);

    const leaves = addresses.map((addr) => keccak256(addr));

    const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });

    const leaf = keccak256(normalizedWallet);

    const proof = tree.getHexProof(leaf);

    return {
      proof,
      root: campaign.merkleRoot,
    };
  }
}
