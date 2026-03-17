"use client";

import { useParams } from "next/navigation";
import { useAccount } from "wagmi";
import { waitForTransactionReceipt } from "wagmi/actions";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";

import { useProof } from "../../../hooks/useProof";
import { useClaimStatus } from "../../../hooks/useClaimStatus";
import { useCampaign } from "../../../hooks/useCampaign";

import { sponsorClaim } from "../../../lib/api";
import { api } from "../../../lib/axios";
import { config } from "../../../lib/config";

import { toast } from "sonner";
import Link from "next/link";
import { Shield, Zap, ArrowRight, ExternalLink } from "lucide-react";

export default function CampaignPage() {
  const params = useParams();
  const campaignId = params.id as string;

  const { address, isConnected } = useAccount();

  const { data: campaign, isLoading: campaignLoading } =
    useCampaign(campaignId);

  const { data: proofData, isLoading: proofLoading } = useProof(
    campaignId,
    address
  );

  const { data: claimStatus, refetch } = useClaimStatus(
    campaignId,
    address
  );

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  const handleClaim = async () => {
    if (!address) return;

    setLoading(true);
    const toastId = toast.loading("Processing sponsored claim...");

    try {
      const res = await sponsorClaim(campaignId, address);

      if (!res.sponsored) {
        toast.error(res.message, { id: toastId });
        setLoading(false);
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

      toast.success("Gas fees covered by Paymaster", {
        id: toastId,
      });
    } catch (err) {
      console.error(err);
      toast.error("Claim failed", { id: toastId });
    }

    setLoading(false);
  };

  const isPageLoading =
    campaignLoading || (isConnected && proofLoading);

  return (
    <div className="max-w-xl mx-auto px-6 py-20">
      <div className="bg-[#121212] border border-[#1f1f1f] rounded-2xl overflow-hidden shadow-2xl">

        <div className="p-8 border-b border-[#1f1f1f] bg-[#141414]">
          <div className="flex justify-between items-center mb-6">
            <div className="px-2.5 py-1 rounded-md bg-[#1a1a1a] border border-[#262626] text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              ID: {campaignId?.slice(0, 8)}
            </div>

            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter">
                Live
              </span>
            </div>
          </div>

          {isPageLoading ? (
            <div className="animate-pulse space-y-3">
              <div className="h-8 bg-[#1a1a1a] rounded w-3/4" />
              <div className="h-4 bg-[#1a1a1a] rounded w-full" />
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold tracking-tighter text-white">
                {campaign?.name}
              </h1>

              <p className="text-zinc-500 text-sm mt-2 leading-relaxed">
                {campaign?.description}
              </p>
            </>
          )}
        </div>

        <div className="p-8 space-y-6">

          <div className="flex items-start gap-4 p-4 bg-[#161616] border border-[#262626] rounded-xl">
            <Zap size={20} className="text-indigo-400 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-zinc-200">
                Gasless Sponsorship
              </p>
              <p className="text-xs text-zinc-500">
                Fees are handled by the protocol paymaster.
              </p>
            </div>
          </div>

          <div className="space-y-4">

            {!isConnected ? (
              <div className="flex justify-center p-8 border border-dashed border-[#262626] rounded-xl">
                <ConnectButton />
              </div>
            ) : isPageLoading ? (
              <div className="flex items-center justify-center gap-3 py-6 text-zinc-500">
                <div className="w-4 h-4 border-2 border-zinc-700 border-t-zinc-300 rounded-full animate-spin" />
                <span className="text-xs font-mono tracking-widest uppercase">
                  Verifying...
                </span>
              </div>
            ) : (
              <>
                {!proofData?.eligible && (
                  <div className="p-4 bg-red-500/5 border border-red-500/20 text-red-400 rounded-xl text-center text-xs font-medium">
                    Wallet not whitelisted
                  </div>
                )}

                {claimStatus?.claimed && !success && (
                  <div className="p-4 bg-[#1a1a1a] border border-[#262626] text-zinc-400 rounded-xl text-center text-xs font-medium">
                    Access Pass Already Claimed
                  </div>
                )}

                {proofData?.eligible &&
                  !claimStatus?.claimed &&
                  !success && (
                    <button
                      onClick={handleClaim}
                      disabled={loading}
                      className="w-full py-4 bg-white cursor-pointer text-black rounded-xl font-bold hover:bg-zinc-200 transition flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Shield size={18} />
                      {loading
                        ? "Waiting for confirmation..."
                        : "Claim Access Pass"}
                      {!loading && <ArrowRight size={18} />}
                    </button>
                  )}
              </>
            )}

            {success && txHash && (
              <div className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-xl text-center">
                <h3 className="font-bold text-emerald-400 text-sm">
                  Claim Confirmed!
                </h3>

                <Link
                  href={`https://sepolia.etherscan.io/tx/${txHash}`}
                  target="_blank"
                  className="inline-flex items-center gap-2 mt-3 text-[11px] font-mono uppercase tracking-wider text-emerald-600 hover:text-emerald-400 transition-colors"
                >
                  View Transaction <ExternalLink size={12} />
                </Link>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}