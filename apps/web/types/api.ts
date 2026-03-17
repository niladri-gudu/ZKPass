// types/api.ts

export interface CampaignData {
  id: string;
  name: string;
  description: string;
  contractAddress: string;
  chainId: number;
}

export interface ProofResponse {
  eligible: boolean;
  proof: string[];
  campaign?: CampaignData; 
  message?: string;
}