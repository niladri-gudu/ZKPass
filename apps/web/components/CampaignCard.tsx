/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";

export default function CampaignCard({ campaign }: any) {
  return (
    <Link
      href={`/campaigns/${campaign.id}`}
      className="border rounded-xl p-6 hover:shadow-md transition"
    >
      <h2 className="text-lg font-semibold">{campaign.name}</h2>
      <p className="text-sm text-gray-500 mt-2">
        Contract: {campaign.contractAddress.slice(0, 10)}...
      </p>

      <p className="text-sm text-gray-500">Chain: {campaign.chainId}</p>
    </Link>
  );
}
