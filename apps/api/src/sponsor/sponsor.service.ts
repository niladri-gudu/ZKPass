import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import {
  createWalletClient,
  createPublicClient,
  encodePacked,
  http,
} from 'viem';

import { privateKeyToAccount } from 'viem/accounts';
import { sepolia } from 'viem/chains';

import { ZKPASS_ABI } from '@repo/contracts';

import { generateMerkleTree } from 'src/utils/merkle';
import keccak256 from 'keccak256';

@Injectable()
export class SponsorService {
  constructor(private prisma: PrismaService) {}

  account = privateKeyToAccount(
    process.env.RELAYER_PRIVATE_KEY as `0x${string}`,
  );

  relayer = createWalletClient({
    account: this.account,
    chain: sepolia,
    transport: http(process.env.RPC_URL),
  });

  publicClient = createPublicClient({
    chain: sepolia,
    transport: http(process.env.RPC_URL),
  });

  async sponsorClaim(campaignId: string, wallet: string) {
    wallet = wallet.toLowerCase();

    const campaign = await this.prisma.campaign.findUnique({
      where: { id: campaignId },
      include: { allowlist: true },
    });

    if (!campaign) {
      throw new BadRequestException('Campaign not found');
    }

    const existing = await this.prisma.claim.findUnique({
      where: {
        campaignId_wallet: {
          campaignId,
          wallet,
        },
      },
    });

    if (existing) {
      return {
        sponsored: false,
        message: 'Already claimed',
      };
    }

    const alreadyClaimed = await this.publicClient.readContract({
      address: campaign.contractAddress as `0x${string}`,
      abi: ZKPASS_ABI,
      functionName: 'claimed',
      args: [wallet],
    });

    if (alreadyClaimed) {
      return {
        sponsored: false,
        message: 'Already claimed',
      };
    }

    const addresses = campaign.allowlist.map((a) => a.wallet);

    const { tree } = generateMerkleTree(addresses);

    const leaf = keccak256(
      encodePacked(['address'], [wallet as `0x${string}`]),
    );

    const proof = tree.getHexProof(leaf);

    try {
      const txHash = await this.relayer.writeContract({
        address: campaign.contractAddress as `0x${string}`,
        abi: ZKPASS_ABI,
        functionName: 'claimFor',
        args: [wallet, proof],
      });

      return {
        sponsored: true,
        txHash,
      };
    } catch (error: any) {
      if (error.shortMessage?.includes('Already claimed')) {
        return {
          sponsored: false,
          message: 'Already claimed',
        };
      }

      if (error.shortMessage?.includes('Invalid proof')) {
        return {
          sponsored: false,
          message: 'Wallet not eligible for this campaign',
        };
      }

      throw error;
    }
  }
}
