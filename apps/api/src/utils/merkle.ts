import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';

export function generateMerkleTree(addresses: string[]) {
  const leaves = addresses.map((addr) => keccak256(addr.toLowerCase()));

  const tree = new MerkleTree(leaves, keccak256, {
    sortPairs: true,
  });

  const root = tree.getHexRoot();

  return { tree, root };
}
