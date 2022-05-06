import { ethers } from "ethers";
import { default as hardhat, ERC20, ERC20Faucet } from "@demo-erc20/hardhat";
import { config } from "@/config/index";

export const erc20 = new ethers.Contract(
  config.contracts.erc20.address,
  hardhat.contracts.erc20.abi
) as ERC20;

export const erc20Faucet = new ethers.Contract(
  config.contracts.erc20Faucet.address,
  hardhat.contracts.erc20Faucet.abi
) as ERC20Faucet;
