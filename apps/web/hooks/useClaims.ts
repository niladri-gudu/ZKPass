"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchClaims } from "../lib/api";

export function useClaims(wallet?: string) {
  return useQuery({
    queryKey: ["claims", wallet],
    queryFn: () => fetchClaims(wallet!),
    enabled: !!wallet,
    staleTime: 60 * 1000, 
  });
}