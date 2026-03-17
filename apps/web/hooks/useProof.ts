"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProof } from "../lib/api";
import { ProofResponse } from "../types/api";

export function useProof(campaignId: string, wallet?: string) {
  return useQuery<ProofResponse>({
    queryKey: ["proof", campaignId, wallet],
    queryFn: () => fetchProof(campaignId, wallet!),
    enabled: !!wallet && !!campaignId,
  });
}