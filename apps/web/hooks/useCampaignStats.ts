"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCampaignStats } from "../lib/api";

export function useCampaignStats(id: string) {
  return useQuery({
    queryKey: ["campaignStats", id],
    queryFn: () => fetchCampaignStats(id),
    enabled: !!id,
  });
}
