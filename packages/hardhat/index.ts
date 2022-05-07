import erc20 from "./artifacts/contracts/erc20/ERC20.sol/ERC20.json";
import erc20Faucet from "./artifacts/contracts/faucet/ERC20Faucet.sol/ERC20Faucet.json";

export const erc20Abi = erc20.abi;
export const erc20FaucetAbi = erc20Faucet.abi;

export type { ERC20 } from "./typechain";
export type { ERC20Faucet } from "./typechain";
