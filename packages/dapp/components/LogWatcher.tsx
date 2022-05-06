import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useWeb3 } from "@/lib/useWeb3";
import { EtherscanLink } from "@/components/EtherscanLink";
import { erc20 as contract } from "@/contracts/index";

type LogEnhanced = ethers.providers.Log & {
  parsed: ethers.utils.LogDescription;
};

export const LogWatcher = () => {
  const [logs, setLogs] = useState<LogEnhanced[]>([]);
  const { provider } = useWeb3();

  const handleLog: ethers.providers.Listener = (log: ethers.providers.Log) => {
    // ommit if exists, sometimes listener triggers multiple times with same info
    if (logs.find((e) => e.transactionHash === log.transactionHash)) {
      console.log("omit log");
      return;
    }

    // add abi parsed info
    setLogs((prev) => [
      { ...log, parsed: contract.interface.parseLog(log) },
      ...prev,
    ]);
  };

  useEffect(() => {
    const init = () => {
      if (!provider) return;

      const filter = contract.filters.Transfer();
      // if we'd like to match all event types
      //const filter = { address: contract.address };
      provider.on(filter, handleLog);

      return () => {
        provider.off(filter, handleLog);
      };
    };

    init();
  }, [provider]);

  return (
    <div>
      <h1>Log Watcher</h1>
      <h5>
        Faucet requests also generate a transfer from faucet to requesting
        account
      </h5>
      <span></span>

      {logs.map((log) => (
        <Log key={log.transactionHash} log={log} />
      ))}
    </div>
  );
};

const Log = ({ log }: { log: LogEnhanced }) => {
  const { address, blockHash, blockNumber, topics = [], transactionHash } = log;
  const { name } = log.parsed;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        borderBottom: "1px solid #c3c3c3",
      }}
    >
      <span>Address: {address}</span>
      <span>Transaction Hash: {transactionHash}</span>
      <span>Block Number: {blockNumber}</span>
      <span>Block Hash: {blockHash}</span>
      <span>Topics:</span>
      {topics.map((topic) => (
        <span key={topic}>{topic}</span>
      ))}

      <span>Event Name: {name}</span>
      {name === "Transfer" && <TransferInfo log={log} />}

      <EtherscanLink type="tx" value={transactionHash} />
    </div>
  );
};

const TransferInfo = ({ log }: { log: LogEnhanced }) => {
  const [from, to, value] = log.parsed.args;

  return (
    <>
      <span>From: {from}</span>
      <span>To: {to}</span>
      <span>Value: {value.toString()}</span>
    </>
  );
};
