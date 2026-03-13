"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCampaigns } from "../lib/api";

export function useCampaigns() {
  return useQuery({
    queryKey: ["campaigns"],
    queryFn: fetchCampaigns,
  });
}