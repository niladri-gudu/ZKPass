/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAccount } from "wagmi";
import { useClaims } from "../../hooks/useClaims";
import { ExternalLink, Hash, Clock, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function ClaimsPage() {
  const { address } = useAccount();
  const { data, isLoading } = useClaims(address);

  if (!address) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-12 h-12 bg-[#121212] border border-[#1f1f1f] rounded-xl flex items-center justify-center mb-4">
          <Hash className="text-zinc-600" size={20} />
        </div>
        <h2 className="text-white font-bold">Wallet not connected</h2>
        <p className="text-zinc-500 text-sm mt-1">Connect to view your transaction history.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-[#121212] border border-[#1f1f1f] rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <header className="mb-10">
        <h1 className="text-3xl font-black tracking-tighter text-white">Your Claims</h1>
        <p className="text-zinc-500 text-sm mt-1">Transaction history for your ZK-Proof redemptions.</p>
      </header>

      <div className="grid gap-4">
        {data?.length > 0 ? (
          data.map((claim: any) => (
            <div 
              key={claim.id} 
              className="bg-[#121212] border border-[#1f1f1f] p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#1a1a1a] border border-[#262626] rounded-xl flex items-center justify-center shrink-0">
                  <ShieldCheck size={18} className="text-emerald-500" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-100 group-hover:text-white transition-colors">
                    {claim.campaign.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Clock size={12} className="text-zinc-600" />
                    <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                      Confirmed on Sepolia
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="px-3 py-1.5 bg-[#09090b] border border-[#1f1f1f] rounded-lg">
                  <p className="text-[11px] font-mono text-zinc-400">
                    {claim.txHash.slice(0, 6)}...{claim.txHash.slice(-6)}
                  </p>
                </div>
                <Link
                  href={`https://sepolia.etherscan.io/tx/${claim.txHash}`}
                  target="_blank"
                  className="p-2 bg-[#1a1a1a] hover:bg-zinc-800 border border-[#262626] rounded-lg text-zinc-400 hover:text-white transition-all"
                >
                  <ExternalLink size={16} />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center border border-dashed border-[#1f1f1f] rounded-3xl">
            <p className="text-zinc-600 text-sm">No claims found for this address.</p>
          </div>
        )}
      </div>
    </div>
  );
}