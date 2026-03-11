import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClients } from './viem.client';

@Injectable()
export class BlockchainService {
  walletClient;
  publicClient;

  constructor(private configService: ConfigService) {
    const privateKey = this.configService.get<string>('PRIVATE_KEY');
    const rpcUrl = this.configService.get<string>('RPC_URL');

    if (!privateKey || !rpcUrl) {
      throw new Error('Missing blockchain env variables');
    }

    const clients = createClients(privateKey, rpcUrl);

    this.walletClient = clients.walletClient;
    this.publicClient = clients.publicClient;
  }
}
