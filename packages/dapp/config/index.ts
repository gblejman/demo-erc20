import ERC20 from "@demo-erc20/hardhat/artifacts/contracts/erc20/ERC20.sol/ERC20.json";
import ERC20Faucet from "@demo-erc20/hardhat/artifacts/contracts/faucet/ERC20Faucet.sol/ERC20Faucet.json";

export const config = {
  contracts: {
    erc20: {
      abi: ERC20.abi,
      address: process.env.NEXT_PUBLIC_ERC20_CONTRACT_ADDRESS || "",
    },
    erc20Faucet: {
      abi: ERC20Faucet.abi,
      address: process.env.NEXT_PUBLIC_ERC20FAUCET_CONTRACT_ADDRESS || "",
    },
  },
};
