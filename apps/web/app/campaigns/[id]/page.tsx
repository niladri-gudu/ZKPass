"use client";

import { useParams } from "next/navigation";
import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { useProof } from "../../../hooks/useProof";
import { useClaimStatus } from "../../../hooks/useClaimStatus";

import { sponsorClaim } from "../../../lib/api";

import { ZKPASS_ABI } from "@repo/contracts";

import { useState } from "react";

export default function CampaignPage() {
  const params = useParams();
  const campaignId = params.id as string;

  const { address, isConnected } = useAccount();

  const { data: proofData, isLoading: proofLoading } = useProof(
    campaignId,
    address,
  );

  const { data: claimStatus, refetch: refetchClaimStatus } = useClaimStatus(
    campaignId,
    address,
  );

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleClaim = async () => {
    if (!address) return;

    setLoading(true);

    try {
      const res = await sponsorClaim(campaignId, address);

      if (res.sponsored) {
        setSuccess(true);
        refetchClaimStatus();
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.error(error);
      alert("Claim failed");
    }

    setLoading(false)
  };

  return (
    <div className="max-w-xl mx-auto p-10">
      <div className="flex justify-between mb-8">
        <h1 className="text-2xl font-bold">Campaign</h1>

        <ConnectButton />
      </div>

      {!isConnected && (
        <p className="text-gray-500">Connect your wallet to claim.</p>
      )}

      {isConnected && proofLoading && <p>Checking eligibility...</p>}

      {isConnected && claimStatus?.claimed && (
        <p className="text-green-600 font-semibold">
          You already claimed this pass.
        </p>
      )}

      {isConnected && !claimStatus?.claimed && proofData && (
        <button
          onClick={handleClaim}
          disabled={loading}
          className="mt-4 px-6 py-3 bg-black text-white rounded-lg"
        >
          {loading ? "Claiming..." : "Claim Access Pass (Gasless)"}
        </button> 
      )}

      {success && (
        <p className="text-green-600 mt-4">🎉 Claim successful!</p>
      )}
    </div>
  );
}
