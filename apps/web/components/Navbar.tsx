"use client";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { LayoutDashboard, PlusCircle, History, Fingerprint } from "lucide-react";

export default function NavBar() {
  return (
    <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <div className="max-w-5xl w-full bg-zinc-900/70 backdrop-blur-md border border-zinc-800 px-6 py-3 rounded-2xl flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
              <Fingerprint size={20} className="text-white" />
            </div>
            <span className="text-white font-bold tracking-tighter text-xl">ZKPass</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/campaigns" className="text-zinc-400 hover:text-white flex items-center gap-2 transition-colors">
              <LayoutDashboard size={16} /> Campaigns
            </Link>
            <Link href="/admin" className="text-zinc-400 hover:text-white flex items-center gap-2 transition-colors">
              <PlusCircle size={16} /> Create
            </Link>
            <Link href="/claims" className="text-zinc-400 hover:text-white flex items-center gap-2 transition-colors">
              <History size={16} /> My Claims
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <ConnectButton showBalance={false} chainStatus="none" accountStatus="avatar" />
          </div>
        </div>
      </div>
    </nav>
  );
}