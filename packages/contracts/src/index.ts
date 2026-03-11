export { FACTORY_ADDRESS, PAYMASTER_ADDRESS } from "./deployments.js";

import factoryArtifact from "../artifacts/contracts/ZKPassFactory.sol/ZKPassFactory.json" with { type: "json" };
import paymasterArtifact from "../artifacts/contracts/ZKPassPaymaster.sol/ZKPassPaymaster.json" with { type: "json" };
import zkPassArtifact from "../artifacts/contracts/ZKPass.sol/ZKPass.json" with { type: "json" };

export const ZKPASS_FACTORY_ABI = factoryArtifact.abi;
export const PAYMASTER_ABI = paymasterArtifact.abi;
export const ZKPASS_ABI = zkPassArtifact.abi;