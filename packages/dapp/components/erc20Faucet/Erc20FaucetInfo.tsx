import { useEffect, useState } from "react";
import { BigNumberish } from "ethers";
import { useWeb3 } from "@/lib/useWeb3";
import { erc20Faucet } from "@/contracts/index";

export type ContractInfo = {
  token: string;
  drip: BigNumberish;
  waitTime: BigNumberish;
};

export const Erc20FaucetInfo = () => {
  const { provider } = useWeb3();
  const [data, setData] = useState<ContractInfo | null>(null);

  useEffect(() => {
    if (!provider) return;

    const init = async () => {
      const contract = erc20Faucet.connect(provider);
      const [token, drip, waitTime] = await Promise.all([
        contract.token(),
        contract.drip(),
        contract.waitTime(),
      ]);

      setData({ token, drip, waitTime });
    };

    init();
  }, [provider]);

  return (
    <>
      <h1>ERC20 Token</h1>
      <span>Address: {erc20Faucet.address} </span>
      <span>Token: {data?.token}</span>
      <span>Drip: {data?.drip.toString()}</span>
      <span>Wait Time: {data?.waitTime.toString()} seconds</span>
    </>
  );
};
