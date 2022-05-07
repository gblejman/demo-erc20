import { useWeb3 } from "@/lib/useWeb3";

export const Nav = () => {
  const { provider, network, account, connect, disconnect } = useWeb3();

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

      <div style={{ display: "flex", flexDirection: "column", padding: 10 }}>
        <span>Provider: {String(!!provider)}</span>
        <span>Network Name: {network?.name ?? "None"}</span>
        <span>Network ChainId: {network?.chainId ?? "None"}</span>
        <span>Network Ens: {network?.ensAddress ?? "None"}</span>
      </div>

      {account && <span style={{ padding: 10 }}>Account: {account}</span>}
    </nav>
  );
};
