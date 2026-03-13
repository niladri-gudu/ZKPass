"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProof } from "../lib/api";

export function useProof(
  campaignId: string,
  wallet?: string
) {
  return useQuery({
    queryKey: ["proof", campaignId, wallet],
    queryFn: () => fetchProof(campaignId, wallet!),
    enabled: !!wallet,
  });
}