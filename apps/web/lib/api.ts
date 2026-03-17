import { ProofResponse } from "../types/api";
import { api } from "./axios";

export async function fetchCampaigns() {
  try {
    const res = await api.get("/campaign");
    return res.data;
  } catch (error) {
    console.error("Failed to fetch campaigns:", error);
    throw error;
  }
}

export async function fetchCampaign(id: string) {
  try {
    const res = await api.get(`/campaign/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch campaign details:", error);
    throw error;
  }
}

export async function fetchProof(
  campaignId: string,
  wallet: string,
): Promise<ProofResponse> {
  try {
    const res = await api.get(`/campaign/${campaignId}/proof/${wallet}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch proof:", error);
    throw error;
  }
}

export async function fetchClaimStatus(campaignId: string, wallet: string) {
  try {
    const res = await api.get(`/campaign/${campaignId}/claim/${wallet}`);

    return res.data;
  } catch (error) {
    console.error("Failed to fetch claim status:", error);
    throw error;
  }
}

export async function sponsorClaim(campaignId: string, wallet: string) {
  try {
    const res = await api.post("/sponsor", {
      campaignId,
      wallet,
    });

    return res.data;
  } catch (error) {
    console.error("Failed to sponsor claim: ", error);
    throw error;
  }
}

export async function fetchClaims(wallet: string) {
  try {
    const res = await api.get(`/claim/${wallet}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch claims:", error);
    throw error;
  }
}
