import {
  useEffect,
  useState,
  useCallback,
  useContext,
  createContext,
} from "react";
import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";

type TWeb3 = {
  provider: ethers.providers.Web3Provider | null;
  account: string | null;
  network: ethers.providers.Network | null;
  connect: () => void;
  disconnect: () => void;
};

const useInjectedWeb3 = (): TWeb3 => {
  const [provider, setProvider] = useState<TWeb3["provider"]>(null);
  const [account, setAccount] = useState<TWeb3["account"]>(null);
  const [network, setNetwork] = useState<TWeb3["network"]>(null);

  // Initialization
  useEffect(() => {
    const init = async () => {
      const injected =
        (await detectEthereumProvider()) as ethers.providers.ExternalProvider;

      setProvider(new ethers.providers.Web3Provider(injected, "any"));
    };

    init();
  }, []);

  // Event subscriptions
  useEffect(() => {
    const subscribe = () => {
      if (!provider) return;

      // fires on the wrapped provider (ie: window.ethereum) object
      // @ts-ignore
      provider.provider.on("accountsChanged", handleAccounts);
      // fires on ethers Web3Provider object
      provider.on("network", handleNetwork);

      return () => {
        // @ts-ignore
        provider.provider.off("accountsChanged", handleAccounts);
        provider.off("network", handleNetwork);
      };
    };

    subscribe();
  }, [provider]);

  // Account Handling
  const handleAccounts = ([account] = []) => setAccount(account);

  // Network Handling
  // TODO: https://docs.ethers.io/v5/concepts/best-practices/#best-practices -> reload? Emit event an let user decide?
  const handleNetwork = (newNetwork, oldNetwork) => setNetwork(newNetwork);

  // Account fetching
  const fetchAccounts = useCallback(async () => {
    if (!provider) return;

    const accounts = await provider.send("eth_requestAccounts", []);
    handleAccounts(accounts);
  }, [provider]);

  // Auto-connect if
  // useEffect(() => {
  //   fetchAccounts();
  // }, [provider, fetchAccounts]);

  // Manual Connection
  const connect = useCallback(fetchAccounts, [provider, fetchAccounts]);

  // Manual Disconnection (really doesn't disconnect from the provider, only the account info is cleared)
  const disconnect = useCallback(async () => {
    handleAccounts([]);
  }, []);

  return {
    provider,
    account,
    network,
    connect,
    disconnect,
  };
};

const Context = createContext<TWeb3 | null>(null);

export const Web3Provider = ({ children }) => {
  const value = useInjectedWeb3();

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useWeb3 = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("Missing Web3Provider");
  }

  return context;
};
