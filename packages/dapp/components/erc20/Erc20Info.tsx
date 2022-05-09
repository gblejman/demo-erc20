import { useEffect, useState } from "react";
import { BigNumberish } from "ethers";
import { useWeb3 } from "@/lib/useWeb3";
import { erc20 } from "@/contracts/index";

export type ContractInfo = {
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: BigNumberish;
};

export const Erc20Info = () => {
  const { provider } = useWeb3();
  const [data, setData] = useState<ContractInfo | null>(null);

  useEffect(() => {
    if (!provider) return;

    const init = async () => {
      const contract = erc20.connect(provider);
      const [name, symbol, decimals, totalSupply] = await Promise.all([
        contract.name(),
        contract.symbol(),
        contract.decimals(),
        contract.totalSupply(),
      ]);

      setData({ name, symbol, decimals, totalSupply });
    };

    init();
  }, [provider]);

  return (
    <>
      <h1>ERC20 Token</h1>
      <span>Address: {erc20.address} </span>
      <span>Name: {data?.name}</span>
      <span>Symbol: {data?.symbol}</span>
      <span>Decimals: {data?.decimals}</span>
      <span>Total Supply: {data?.totalSupply.toString()}</span>
    </>
  );
};
