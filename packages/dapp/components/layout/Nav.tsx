import { useWeb3 } from "@/lib/useWeb3";

export const Nav = () => {
  const { network, account, connect, disconnect } = useWeb3();

  return (
    <nav
      style={{
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        border: "1px solid #c3c3c3",
        flex: 1,
        padding: 5,
      }}
    >
      {!account && (
        <button onClick={connect} style={{ padding: 10 }}>
          Connect
        </button>
      )}
      {account && (
        <button onClick={disconnect} style={{ padding: 10 }}>
          Disconnect
        </button>
      )}

      {network && (
        <div style={{ display: "flex", flexDirection: "column", padding: 10 }}>
          Network
          <span>Name: {network.name}</span>
          <span>ChainId: {network.chainId}</span>
          <span>Ens: {network.ensAddress}</span>
        </div>
      )}

      {account && <span style={{ padding: 10 }}>Account: {account}</span>}
    </nav>
  );
};
