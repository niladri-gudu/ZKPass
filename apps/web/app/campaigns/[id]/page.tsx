"use client";

import { useParams } from "next/navigation";
import {
  useWriteContract,
  useAccount,
  useWaitForTransactionReceipt,
} from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { useProof } from "../../../hooks/useProof";
import { useClaimStatus } from "../../../hooks/useClaimStatus";

import { ZKPASS_ABI } from "@repo/contracts";

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

  const { writeContract, data: txHash, isPending } = useWriteContract();

  const { isSuccess: txConfirmed } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const handleClaim = () => {
    if (!proofData || claimStatus?.claimed) return;

    writeContract({
      address: proofData.contractAddress,
      abi: ZKPASS_ABI,
      functionName: "claim",
      args: [proofData.proof],
    });
  };

  if (txConfirmed) {
    refetchClaimStatus();
  }

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
          disabled={isPending}
          className="mt-4 px-6 py-3 bg-black text-white rounded-lg"
        >
          {isPending ? "Claiming..." : "Claim Access Pass"}
        </button>
      )}

      {txConfirmed && (
        <p className="text-green-600 mt-4">🎉 Claim successful!</p>
      )}
    </div>
  );
}
