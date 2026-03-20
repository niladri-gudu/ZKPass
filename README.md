# 🔐 ZKPass — Merkle-Gated Access Passes

> **Gasless on-chain access passes, built from scratch.** Create allowlist campaigns, verify eligibility with Merkle proofs, and claim passes with zero gas fees — powered by a backend relayer.

💻 **Project 3/6 of my [6 Projects in 60 Days](https://twitter.com/dev_niladri) challenge**  
← [Project 2: LendX](https://github.com/niladri-gudu/LendX)

---

## What is ZKPass?

ZKPass is a full-stack on-chain access control system — the kind of thing allowlist-gated mints, private communities, and token-gated apps are built on, but built from scratch so you actually understand what's happening.

Admins create campaigns by uploading a wallet list. A Merkle tree is generated off-chain, the root is stored on-chain inside a deployed smart contract, and eligible users can claim their access pass gaslessly — without holding any ETH — because a backend relayer submits the transaction on their behalf.

The architecture is hybrid: blockchain handles trust and verification, while a Postgres-backed backend handles campaign state, claim tracking, and relayer coordination.

---

## Features

- **Campaign Creation** — Admin uploads wallet list → Merkle root generated → smart contract deployed per campaign
- **Merkle Verification** — Secure allowlist proofs computed off-chain, verified on-chain — no centralised validation
- **Gasless Claims** — Backend relayer sponsors and submits transactions; users pay zero gas
- **Claim Tracking** — DB-backed state prevents double-claims and provides audit history
- **On-chain + DB Sync** — Hybrid architecture combining blockchain finality with database-backed tracking
- **Wallet-Native UX** — RainbowKit + wagmi; real transactions with live state refresh

---

## Tech Stack

### Monorepo
- **[Turborepo](https://turbo.build/)** — Monorepo build system

### Smart Contracts (`packages/contracts`)
- **Solidity 0.8.x** — Per-campaign access pass contracts with Merkle root verification
- **Foundry** — Testing and deployment

### Frontend (`apps/web`)
- **[Next.js](https://nextjs.org/)** — App Router
- **[RainbowKit](https://www.rainbowkit.com/)** — Wallet connection
- **[Wagmi](https://wagmi.sh/) + [Viem](https://viem.sh/)** — Ethereum hooks and utilities
- **[TailwindCSS](https://tailwindcss.com/)** — Styling

### Backend (`apps/api`)
- **[NestJS](https://nestjs.com/)** — Modular backend framework
- **[Prisma](https://www.prisma.io/)** — Type-safe ORM
- **[PostgreSQL](https://www.postgresql.org/)** — Campaign and claim state
- **[Viem](https://viem.sh/)** — On-chain interaction and relayer wallet

### Infrastructure
- **[Vercel](https://vercel.com/)** — Frontend
- **AWS EC2** — Backend (nginx + PM2)
- **Sepolia** — Testnet deployment

---

## Architecture

```
ZKPass/
├── apps/
│   ├── web/          # Next.js frontend
│   └── api/          # NestJS backend + relayer
├── packages/
│   └── contracts/    # ABIs, addresses (shared across apps)
└── turbo.json
```

```
Admin uploads wallet list
        ↓  Merkle tree computed
Backend stores root + deploys contract
        ↓  Root stored on-chain
User requests Merkle proof
        ↓  Proof returned by backend
Relayer submits claim tx on-chain
        ↓  Contract verifies proof
Access pass minted to user (zero gas)
        ↓  Claim recorded
Postgres via Prisma
```

The blockchain handles **trust and verification**. The backend handles **proof generation, relayer coordination, and claim tracking**.

---

## Core Flows

**Create Campaign** — Admin uploads wallet list → Merkle tree generated off-chain → root stored on-chain via contract deployment → campaign persisted in DB.

**Verify Eligibility** — User connects wallet → backend checks inclusion → Merkle proof returned if eligible.

**Gasless Claim** — Frontend sends proof to backend relayer → relayer signs and submits tx → contract verifies Merkle proof on-chain → pass minted → claim recorded in DB.

---

## API Endpoints

```
POST /campaigns                        # Create campaign, deploy contract
GET  /campaigns                        # List all active campaigns
GET  /campaigns/:id                    # Campaign details + Merkle root
GET  /campaigns/:id/proof/:wallet      # Generate Merkle proof for wallet
POST /campaigns/:id/claim              # Relayer submits gasless claim tx
GET  /claims/:wallet                   # Claim history for wallet
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm
- PostgreSQL (local or hosted)

### Installation

```bash
git clone https://github.com/niladri-gudu/ZKPass.git
cd ZKPass
pnpm install
```

### Environment Setup

```bash
# apps/api
DATABASE_URL=
RPC_URL=
RELAYER_PRIVATE_KEY=

# apps/web
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=
```

### Run Locally

```bash
pnpm --filter api dev
pnpm --filter web dev
```

---

## What I Learned

This was Project 3 of my 6 Projects in 60 Days challenge — the one where off-chain cryptography met on-chain verification.

- Merkle trees as infrastructure primitives, not just a data structures topic
- Why a relayer is different from a Paymaster — and the tradeoffs of each
- Idempotent claim tracking: why the DB and the chain can drift, and how to reconcile them
- Gasless UX design: who bears the cost, and how to protect the relayer wallet
- Hybrid architecture thinking: what belongs on-chain vs off-chain, and why

---

## Roadmap

- [ ] **Paymaster variant** — Replace relayer with an ERC-4337 Paymaster for native gas sponsorship
- [ ] Multi-chain campaign deployment
- [ ] Time-limited and supply-capped campaigns
- [ ] Campaign analytics dashboard
- [ ] IPFS-stored Merkle trees for full decentralisation
- [ ] Subgraph integration for on-chain indexing

---

## Author

**Niladri** — [@dev_niladri](https://x.com/dev_niladri)

6 projects. 60 days. Web2 → Web3 in public. 3 down, 3 to go.

---

## License

MIT
