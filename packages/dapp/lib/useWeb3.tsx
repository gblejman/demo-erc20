import {
  useEffect,
  useState,
  useCallback,
  useContext,
  createContext,
} from "react";
import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";

type TWeb3State = {
  provider: ethers.providers.Web3Provider | null;
  account: string | null;
  network: ethers.providers.Network | null;
};

type TWeb3 = TWeb3State & {
  connect: () => void;
  disconnect: () => void;
};

const useInjectedWeb3 = ({ reloadOnChainChange = true } = {}): TWeb3 => {
  const [provider, setProvider] = useState<TWeb3["provider"]>(null);
  const [account, setAccount] = useState<TWeb3["account"]>(null);
  const [network, setNetwork] = useState<TWeb3["network"]>(null);

  // Initialization
  useEffect(() => {
    const init = async () => {
      const injected =
        (await detectEthereumProvider()) as ethers.providers.ExternalProvider;

      if (!injected) {
        console.error("No Provider Detected");
        return;
      }

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

  // Auto-reconnect, just check accounts existance (no ui dialog)
  useEffect(() => {
    const check = async () => {
      if (!provider) return;

      const accounts = await provider.send("eth_accounts", []);
      handleAccounts(accounts);
    };

    check();
  }, [provider]);

  // Network Handling
  // TODO: https://docs.ethers.io/v5/concepts/best-practices/#best-practices -> reload? Emit event an let user decide?
  const handleNetwork = (newNetwork, oldNetwork) => {
    if (oldNetwork && reloadOnChainChange) {
      window.location.reload();
    }

    setNetwork(newNetwork);
  };

  // Account request (triggers ui dialog)
  const requestAccounts = useCallback(async () => {
    if (!provider) return;

    const accounts = await provider.send("eth_requestAccounts", []);
    handleAccounts(accounts);
  }, [provider]);

  // Manual Connection
  const connect = useCallback(requestAccounts, [provider, requestAccounts]);

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
