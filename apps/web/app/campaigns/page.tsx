"use client";
import { useCampaigns } from "../../hooks/useCampaigns";
import LoadingCard from "../../components/LoadingCard";
import CampaignCard from "../../components/CampaignCard";

export default function CampaignsPage() {
  const { data: campaigns, isLoading, error } = useCampaigns();

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="h-8 w-48 bg-[#1a1a1a] rounded mb-10 animate-pulse" />
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-48 bg-[#121212] border border-[#1f1f1f] rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <div className="text-red-500/50 mb-4">⚠️</div>
        <h2 className="text-white font-bold text-lg">Failed to load campaigns</h2>
        <p className="text-zinc-500 text-sm mt-1">Please check your RPC connection or backend.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <header className="mb-12">
        <h1 className="text-3xl font-black tracking-tighter text-white">Registry</h1>
        <p className="text-zinc-500 text-sm mt-1">Discover and join active ZK-gated campaigns.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        {campaigns?.map((campaign: any) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
      
      {campaigns?.length === 0 && (
        <div className="py-20 text-center border border-dashed border-[#1f1f1f] rounded-3xl">
          <p className="text-zinc-600 text-sm">No campaigns found.</p>
        </div>
      )}
    </div>
  );
}