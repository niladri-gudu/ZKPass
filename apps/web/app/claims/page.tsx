"use client";

import { useAccount } from "wagmi";
import { useClaims } from "../hooks/useClaims";

export default function ClaimsPage() {
  const { address } = useAccount();
  const { data, isLoading } = useClaims(address);

  if (!address) return <p>Connect wallet</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="text-2xl font-bold mb-6">Your Claims</h1>

      {data?.map((claim: any) => (
        <div key={claim.id} className="border p-4 rounded mb-4">
          <p className="font-semibold">{claim.campaign.name}</p>
          <p className="text-sm text-gray-500">
            {claim.txHash}
          </p>
        </div>
      ))}
    </div>
  );
}