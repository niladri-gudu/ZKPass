"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CampaignCard({ campaign }: any) {
  return (
    <Link href={`/campaigns/${campaign.id}`} className="group">
      <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl transition-all duration-300 group-hover:bg-zinc-800/50 group-hover:border-zinc-700 group-hover:translate-y-[-2px]">
        <div className="flex justify-between items-start mb-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded-md border border-indigo-500/20">
            zk-Sync Ready
          </span>
          <ArrowRight size={18} className="text-zinc-600 group-hover:text-white transition-colors" />
        </div>
        
        <h1 className="text-xl font-bold text-white tracking-tight">{campaign.name}</h1>
        <p className="text-zinc-400 text-sm mt-2 line-clamp-2">
          {campaign.description}
        </p>
        
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
            <p className="text-[10px] font-mono text-zinc-500">
              {campaign.contractAddress.slice(0, 10)}...
            </p>
          </div>
          <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-tighter">Sepolia Testnet</span>
        </div>
      </div>
    </Link>
  );
}