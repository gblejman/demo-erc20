import { useCallback, useEffect, useState } from "react";
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

  const handleLog: ethers.providers.Listener = useCallback(
    (log: ethers.providers.Log) => {
      setLogs((prev) => {
        // ommit if exists, sometimes listener triggers multiple times with same info
        if (prev.find((e) => e.transactionHash === log.transactionHash)) {
          return prev;
        }

        // add abi parsed info
        return [{ ...log, parsed: contract.interface.parseLog(log) }, ...prev];
      });
    },
    []
  );

  useEffect(() => {
    const init = () => {
      if (!provider) return;

      // if we'd like to match all event types: const filter = { address: contract.address };
      const filter = contract.filters.Transfer();
      provider.on(filter, handleLog);

      return () => {
        provider.off(filter, handleLog);
      };
    };

    init();
  }, [provider, handleLog]);

  return (
    <div>
      <h1>Log Watcher</h1>
      <h5>
        Faucet requests also generate a transfer from faucet to requesting
        account
      </h5>

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
      {topics.map((topic, idx) => (
        <span key={idx}>{topic}</span>
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
