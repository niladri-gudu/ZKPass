"use client";

import Link from "next/link";
import { useCampaigns } from "../../hooks/useCampaigns";

export default function CampaignsPage() {
  const { data: campaigns, isLoading, error } = useCampaigns();

  if (isLoading) {
    return <div className="p-10 text-center">Loading campaigns...</div>;
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
          <Link
            key={campaign.id}
            href={`/campaigns/${campaign.id}`}
            className="border rounded-xl p-6 hover:bg-gray-50 transition"
          >
            <h2 className="text-xl font-semibold">{campaign.name}</h2>

            <p className="text-sm text-gray-500 mt-2">
              Contract: {campaign.contractAddress}
            </p>

            <p className="text-sm text-gray-500">Chain: {campaign.chainId}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
