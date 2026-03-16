"use client";

import { useParams } from "next/navigation";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";

import { useProof } from "../../../hooks/useProof";
import { useClaimStatus } from "../../../hooks/useClaimStatus";
import { sponsorClaim } from "../../../lib/api";

export default function CampaignPage() {
  const params = useParams();
  const campaignId = params.id as string;

  const { address, isConnected } = useAccount();

  const { data: proofData, isLoading: proofLoading } = useProof(
    campaignId,
    address,
  );

  const { data: claimStatus, refetch } = useClaimStatus(campaignId, address);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleClaim = async () => {
    if (!address) return;

    setLoading(true);

    try {
      const res = await sponsorClaim(campaignId, address);

      if (res.sponsored) {
        setSuccess(true);
        refetch();
      } else {
        alert(res.message);
      }
    } catch (error) {
      alert("Claim failed");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-10">
      <div className="border rounded-xl p-8">
        <div className="flex justify-between mb-8">
          <h1 className="text-2xl font-bold">Campaign</h1>
          <ConnectButton />
        </div>

        {!isConnected && (
          <p className="text-gray-500">Connect your wallet to claim.</p>
        )}

        {isConnected && proofLoading && <p>Checking eligibility...</p>}

        {isConnected && !proofLoading && !proofData && (
          <p className="text-red-500">You are not eligible for this campaign</p>
        )}

        {claimStatus?.claimed && (
          <p className="text-green-600 font-semibold">
            You already claimed this pass.
          </p>
        )}

        {proofData && !claimStatus?.claimed && !success && (
          <button
            onClick={handleClaim}
            disabled={loading}
            className="mt-4 px-6 py-3 bg-black text-white rounded-lg"
          >
            {loading ? "Claiming..." : "Claim Access Pass"}
          </button>
        )}

        {success && <p className="text-green-600 mt-4">🎉 Claim successful</p>}
      </div>
    </div>
  );
}
