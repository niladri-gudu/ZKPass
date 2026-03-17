"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchCampaign } from "../lib/api";

export function useCampaign(id: string) {
  return useQuery({
    queryKey: ["campaign", id],
    queryFn: () => fetchCampaign(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}