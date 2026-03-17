"use client";

import { useParams } from "next/navigation";
import { useAccount } from "wagmi";
import { waitForTransactionReceipt } from "wagmi/actions";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";

import { useProof } from "../../../hooks/useProof";
import { useClaimStatus } from "../../../hooks/useClaimStatus";
import { sponsorClaim } from "../../../lib/api";
import { toast } from "sonner";
import { api } from "../../../lib/axios";
import { config } from "../../../lib/config"

export default function CampaignPage() {
  const params = useParams();
  const campaignId = params.id as string;

  const [txHash, setTxHash] = useState<string | null>(null);

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

      if (!res.sponsored) {
        toast.error(res.message);
        return;
      }

      setTxHash(res.txHash);

      await waitForTransactionReceipt(config, {
        hash: res.txHash,
      });

      await api.post("/claim", {
        campaignId,
        wallet: address,
        txHash: res.txHash,
      });

      setSuccess(true);
      refetch();
      toast.success("Claim successful");
    } catch {
      toast.error("Claim failed");
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

        {success && txHash && (
          <div className="mt-6 p-6 border rounded-xl bg-green-50">
            <h3 className="text-lg font-semibold text-green-700">
              🎉 Claim Successful
            </h3>

            <p className="text-sm text-gray-600 mt-2">
              Your access pass has been claimed.
            </p>

            <a
              href={`https://sepolia.etherscan.io/tx/${txHash}`}
              target="_blank"
              className="text-blue-600 underline text-sm mt-2 block"
            >
              View Transaction
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
