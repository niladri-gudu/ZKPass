/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsArray, ArrayNotEmpty, IsNotEmpty } from 'class-validator';

export class CreateCampaignDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  addresses: string[];
}
