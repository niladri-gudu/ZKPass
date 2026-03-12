/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString } from 'class-validator';

export class CreateClaimDto {
  @IsString()
  campaignId: string;

  @IsString()
  wallet: string;

  @IsString()
  txHash: string;
}
