import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Web3Provider } from "./providers";
import Navbar from "../components/Navbar";
import { Toaster } from "sonner";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ZKPass",
  description: "A zero-knowledge proof-based authentication system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${geist.className} antialiased`}>
        <Web3Provider>
          <Navbar />
          <main className="min-h-screen pt-20">{children}</main>
          <Toaster theme="dark" position="top-right" />
        </Web3Provider>
      </body>
    </html>
  );
}
