"use client";

import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Shield, Zap, Database, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-tight">
          Gasless Access Passes <br />
          <span className="text-emerald-400">Powered by Merkle Proofs</span>
        </h1>

        <p className="text-zinc-400 mt-6 max-w-2xl mx-auto text-lg">
          Create and claim on-chain access passes with zero gas fees. Built
          using Merkle trees, smart contracts, and a backend relayer for gasless
          transactions.{" "}
        </p>

        <div className="flex items-center justify-center gap-4 mt-10">
          <Link
            href="/campaigns"
            className="px-6 py-3 bg-white text-black rounded-xl font-semibold flex items-center gap-2 hover:bg-zinc-200 transition"
          >
            Explore Campaigns <ArrowRight size={18} />
          </Link>

          <ConnectButton showBalance={false} />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-6">
        <div className="bg-[#111111] border border-[#1f1f1f] p-6 rounded-2xl">
          <Shield className="text-emerald-400 mb-4" />
          <h3 className="font-bold text-lg">Merkle Verification</h3>
          <p className="text-zinc-400 text-sm mt-2">
            Secure allowlist verification using Merkle trees. No centralized
            validation needed.
          </p>
        </div>

        <div className="bg-[#111111] border border-[#1f1f1f] p-6 rounded-2xl">
          <Zap className="text-indigo-400 mb-4" />
          <h3 className="font-bold text-lg">Gasless Claims</h3>
          <p className="text-zinc-400 text-sm mt-2">
            Transactions are sponsored by a backend relayer, so users can claim
            without holding ETH.
          </p>
        </div>

        <div className="bg-[#111111] border border-[#1f1f1f] p-6 rounded-2xl">
          <Database className="text-yellow-400 mb-4" />
          <h3 className="font-bold text-lg">On-chain + DB Sync</h3>
          <p className="text-zinc-400 text-sm mt-2">
            Hybrid architecture combining blockchain verification with
            database-backed tracking.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-10">How It Works</h2>

        <div className="grid gap-6 text-left">
          <div className="bg-[#111111] border border-[#1f1f1f] p-5 rounded-xl">
            <p className="font-semibold">1. Create Campaign</p>
            <p className="text-sm text-zinc-400">
              Admin uploads wallet list → Merkle root generated → smart contract
              deployed.
            </p>
          </div>

          <div className="bg-[#111111] border border-[#1f1f1f] p-5 rounded-xl">
            <p className="font-semibold">2. Verify Eligibility</p>
            <p className="text-sm text-zinc-400">
              Users prove inclusion using Merkle proofs.
            </p>
          </div>

          <div className="bg-[#111111] border border-[#1f1f1f] p-5 rounded-xl">
            <p className="font-semibold">3. Claim Gaslessly</p>
            <p className="text-sm text-zinc-400">
              Backend relayer submits the transaction → users pay zero gas.{" "}
            </p>
          </div>
        </div>
      </section>

      <section className="text-center pb-24">
        <h2 className="text-2xl font-bold mb-6">Ready to explore campaigns?</h2>

        <Link
          href="/campaigns"
          className="px-6 py-3 bg-emerald-500 text-black rounded-xl font-semibold hover:bg-emerald-400 transition"
        >
          View Campaigns
        </Link>
      </section>
    </div>
  );
}
