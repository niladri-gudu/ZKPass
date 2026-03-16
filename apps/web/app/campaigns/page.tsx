/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCampaigns } from "../../hooks/useCampaigns";
import LoadingCard from "../../components/LoadingCard";
import CampaignCard from "../../components/CampaignCard";

export default function CampaignsPage() {
  const { data: campaigns, isLoading, error } = useCampaigns();

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-10 grid gap-6">
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-center text-red-500">
        Failed to load campaigns
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-8">Campaign</h1>

      <div className="grid gap-6">
        {campaigns?.map((campaign: any) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </div>
  );
}
