"use client";

import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-8 mt-20">
      <ConnectButton />

      <Link
        href="/campaigns"
        className="px-6 py-3 bg-black text-white rounded-lg"
      >
        View Campaigns
      </Link>
    </div>
  );
}