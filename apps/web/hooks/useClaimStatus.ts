"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchClaimStatus } from "../lib/api";

export function useClaimStatus(
  campaignId: string,
  wallet?: string
) {
  return useQuery({
    queryKey: ["claimStatus", campaignId, wallet],
    queryFn: () => fetchClaimStatus(campaignId, wallet!),
    enabled: !!wallet,
  });
}