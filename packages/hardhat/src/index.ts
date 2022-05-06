import erc20 from "../artifacts/contracts/erc20/ERC20.sol/ERC20.json";
import erc20Faucet from "../artifacts/contracts/faucet/ERC20Faucet.sol/ERC20Faucet.json";

// just export abis to prevent information leak
export default {
  contracts: {
    erc20: {
      abi: erc20.abi,
    },
    erc20Faucet: {
      abi: erc20Faucet.abi,
    },
  },
};
