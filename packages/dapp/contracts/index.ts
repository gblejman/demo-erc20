import { ethers } from "ethers";
import {
  ERC20,
  ERC20Faucet,
  erc20Abi,
  erc20FaucetAbi,
} from "@demo-erc20/hardhat";

import { config } from "@/config/index";

export const erc20 = new ethers.Contract(
  config.contracts.erc20.address,
  erc20Abi
) as ERC20;

export const erc20Faucet = new ethers.Contract(
  config.contracts.erc20Faucet.address,
  erc20FaucetAbi
) as ERC20Faucet;
