/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Campaign" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contractAddress" TEXT NOT NULL,
    "merkleRoot" TEXT NOT NULL,
    "chainId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AllowList" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "wallet" TEXT NOT NULL,

    CONSTRAINT "AllowList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Claim" (
    "id" TEXT NOT NULL,
    "campaignId" TEXT NOT NULL,
    "wallet" TEXT NOT NULL,
    "txHash" TEXT NOT NULL,
    "claimedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Claim_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Campaign_contractAddress_key" ON "Campaign"("contractAddress");

-- CreateIndex
CREATE INDEX "AllowList_wallet_idx" ON "AllowList"("wallet");

-- CreateIndex
CREATE INDEX "AllowList_campaignId_idx" ON "AllowList"("campaignId");

-- CreateIndex
CREATE UNIQUE INDEX "AllowList_campaignId_wallet_key" ON "AllowList"("campaignId", "wallet");

-- CreateIndex
CREATE INDEX "Claim_wallet_idx" ON "Claim"("wallet");

-- CreateIndex
CREATE INDEX "Claim_campaignId_idx" ON "Claim"("campaignId");

-- CreateIndex
CREATE UNIQUE INDEX "Claim_campaignId_wallet_key" ON "Claim"("campaignId", "wallet");

-- AddForeignKey
ALTER TABLE "AllowList" ADD CONSTRAINT "AllowList_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Claim" ADD CONSTRAINT "Claim_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;
