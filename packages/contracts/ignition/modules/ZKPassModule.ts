import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("ZKPassModule", (m) => {
  const merkleRoot = "0x0000000000000000000000000000000000000000000000000000000000000000";

  const owner = m.getAccount(0);

  const factory = m.contract("ZKPassFactory")

  const paymaster = m.contract("ZKPassPaymaster")

  return { factory, paymaster };
});
