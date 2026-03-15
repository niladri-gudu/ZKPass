"use client";

import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function NavBar() {
  return (
    <nav className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/campaigns" className="text-xl font-bold">
          ZKPass
        </Link>

        <ConnectButton />
      </div>
    </nav>
  );
}
