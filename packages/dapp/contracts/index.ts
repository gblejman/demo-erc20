import { ethers } from "ethers";
import { ERC20 } from "@demo-dapp-erc20/hardhat/typechain/ERC20";
import { ERC20Faucet } from "@demo-dapp-erc20/hardhat/typechain/ERC20Faucet";
import { config } from "../config";

export const erc20 = new ethers.Contract(
  config.contracts.erc20.address,
  config.contracts.erc20.abi
) as ERC20;

export const erc20Faucet = new ethers.Contract(
  config.contracts.erc20Faucet.address,
  config.contracts.erc20Faucet.abi
) as ERC20Faucet;
