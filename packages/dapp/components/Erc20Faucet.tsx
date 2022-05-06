import { useEffect, useState } from "react";
import { BigNumberish, ethers } from "ethers";
import { useWeb3 } from "@/lib/useWeb3";
import { erc20Faucet } from "@/contracts/index";
import { TxReceipt } from "@/components/TxReceipt";

type Faucet = {
  token: string;
  drip: BigNumberish;
  waitTime: BigNumberish;
};

export const Erc20Faucet = () => {
  const { provider } = useWeb3();
  const [faucet, setFaucet] = useState<Faucet | null>(null);
  const [receipt, setReceipt] = useState<ethers.ContractReceipt | null>(null);

  useEffect(() => {
    if (!provider) return;

    const init = async () => {
      const contract = erc20Faucet.connect(provider);
      const [token, drip, waitTime] = await Promise.all([
        contract.token(),
        contract.drip(),
        contract.waitTime(),
      ]);

      setFaucet({ token, drip, waitTime });
    };

    init();
  }, [provider]);

  const handleSubmit = async () => {
    if (!provider) return;

    try {
      const contract = erc20Faucet.connect(provider.getSigner());
      const transaction = await contract.request();
      const receipt = await transaction.wait();

      setReceipt(receipt);
    } catch (e) {
      console.log("Tx error: ", e.message);
      alert(`Tx error: ${e.message}`);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>ERC20 Faucet</h1>
      <span>Address: {erc20Faucet.address} </span>
      <span>Token: {faucet?.token}</span>
      <span>Drip: {faucet?.drip.toString()}</span>
      <span>Wait Time: {faucet?.waitTime.toString()} seconds</span>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingTop: 10,
        }}
      >
        <h3>Request</h3>

        <button onClick={handleSubmit}>Submit</button>
      </div>

      <h4>Latest Receipt</h4>
      {receipt ? <TxReceipt receipt={receipt} /> : <span>None</span>}
    </div>
  );
};
