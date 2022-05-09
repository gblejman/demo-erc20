import type { NextPage } from "next";
import { Erc20 } from "@/components/erc20/Erc20";
import { Erc20Faucet } from "@/components/erc20Faucet/Erc20Faucet";
import { LogWatcher } from "@/components/LogWatcher";
import { DefaultLayout } from "@/components/layout/DefaultLayout";
import { useWeb3 } from "@/lib/useWeb3";
import { config } from "@/config/index";

const Home: NextPage = () => {
  const { network } = useWeb3();

  const isDeploymentEnabled = !!config.deploymentChains[network?.chainId ?? 0];

  if (!isDeploymentEnabled) {
    return (
      <DefaultLayout>
        <p>Currently only deployed to localhost (hardhat) & Ropsten</p>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "50% 50%",
          gap: 20,
        }}
      >
        <Erc20 />
        <Erc20Faucet />
      </div>
      <LogWatcher />
    </DefaultLayout>
  );
};

export default Home;
