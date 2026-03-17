"use client";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "../../lib/axios";

export default function AdminPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [wallets, setWallets] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!name || !description || !wallets) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      await api.post("/campaign", {
        name,
        description,
        addresses: wallets.split("\n").map((w) => w.trim()).filter(Boolean),
      });
      toast.success("Campaign deployed to registry 🚀");
      setName("");
      setDescription("");
      setWallets("");
    } catch (err) {
      toast.error("Backend error. Check console.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-8 mt-10">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-black tracking-tight mb-2">Create ZK-Campaign</h1>
        <p className="text-slate-500">Configure your gated Merkle whitelist</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Campaign Name</label>
          <input
            placeholder="e.g. Early Adopters Pass"
            className="w-full mt-2 p-4 bg-white text-black border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Description</label>
          <textarea
            placeholder="What is this campaign for?"
            className="w-full mt-2 p-4 bg-white text-black border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all h-24 resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Whitelist Wallets</label>
          <textarea
            placeholder="0x...\n0x..."
            className="w-full mt-2 p-4 bg-white text-black border border-slate-200 rounded-xl font-mono text-xs focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all h-48"
            value={wallets}
            onChange={(e) => setWallets(e.target.value)}
          />
          <p className="text-[10px] text-slate-400 mt-2 ml-1">The server will automatically generate the Merkle Root from these addresses.</p>
        </div>

        <button
          onClick={handleCreate}
          disabled={loading}
          className="w-full py-4 bg-black cursor-pointer text-white rounded-2xl font-bold hover:bg-zinc-800 transition-all active:scale-[0.99] shadow-lg disabled:opacity-50"
        >
          {loading ? "Processing..." : "Deploy Campaign"}
        </button>
      </div>
    </div>
  );
}