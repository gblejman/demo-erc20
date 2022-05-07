export const config = {
  contracts: {
    erc20: {
      address: process.env.NEXT_PUBLIC_ERC20_CONTRACT_ADDRESS || "",
    },
    erc20Faucet: {
      address: process.env.NEXT_PUBLIC_ERC20FAUCET_CONTRACT_ADDRESS || "",
    },
  },
};
