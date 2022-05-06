import { useEffect, useState } from "react";
import { BigNumberish, ethers } from "ethers";
import { useWeb3 } from "@/lib/useWeb3";
import { erc20 } from "@/contracts/index";
import { TxReceipt } from "@/components/TxReceipt";

type Token = {
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: BigNumberish;
};

export const Erc20 = () => {
  const { provider } = useWeb3();
  const [token, setToken] = useState<Token | null>(null);
  const [address, setAddress] = useState<string>("");
  const [value, setValue] = useState<BigNumberish>(0);
  const [receipt, setReceipt] = useState<ethers.ContractReceipt | null>(null);

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

      setToken({ name, symbol, decimals, totalSupply });
    };

    init();
  }, [provider]);

  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleChangeValue = (e) => {
    setValue(ethers.utils.parseUnits(e.target.value, token?.decimals));
  };

  const handleSubmit = async () => {
    if (!provider) return;

    try {
      const contract = erc20.connect(provider.getSigner());
      const transaction = await contract.transfer(
        ethers.utils.getAddress(address),
        ethers.BigNumber.from(value)
      );
      const receipt = await transaction.wait();

      setReceipt(receipt);
    } catch (e: any) {
      console.log("Tx error: ", e.message);
      alert(`Tx error: ${e.message}`);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>ERC20 Token</h1>
      <span>Address: {erc20.address} </span>
      <span>Name: {token?.name}</span>
      <span>Symbol: {token?.symbol}</span>
      <span>Decimals: {token?.decimals}</span>
      <span>Total Supply: {token?.totalSupply.toString()}</span>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingTop: 10,
        }}
      >
        <h3>Transfer</h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "50% 50%",
            width: "auto",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>To Address: </span>
            <span>Value: (giga GDBV)</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <input
              type="text"
              placeholder="0x..."
              value={address}
              onChange={handleChangeAddress}
            />

            <input
              type="number"
              min={0}
              placeholder="value"
              value={ethers.utils.formatUnits(value, token?.decimals)}
              onChange={handleChangeValue}
            />
          </div>
        </div>

        <button onClick={handleSubmit}>Submit</button>
      </div>

      <h4>Latest Receipt</h4>
      {receipt ? <TxReceipt receipt={receipt} /> : <span>None</span>}
    </div>
  );
};
