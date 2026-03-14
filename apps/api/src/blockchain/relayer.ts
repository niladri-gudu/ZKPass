import { createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { sepolia } from 'viem/chains';

const account = privateKeyToAccount(
  process.env.RELAYER_PRIVATE_KEY as `0x${string}`,
);

export const relayer = createWalletClient({
  account,
  chain: sepolia,
  transport: http(process.env.RPC_URL),
});
