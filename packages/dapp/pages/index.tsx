import type { NextPage } from "next";
import Head from "next/head";
import { Nav } from "../components/layout/Nav";
import { Erc20 } from "../components/Erc20";
import { Erc20Faucet } from "../components/Erc20Faucet";
import { LogWatcher } from "../components/LogWatcher";

const Home: NextPage = () => {
  return (
    <div style={{ padding: "0 2rem" }}>
      <Head>
        <title>Dapp</title>
        <meta name="description" content="Dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <main>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "50% 50%",
            gap: 20,
          }}
        >
          <Erc20 />
          {/* <Erc20Faucet /> */}
        </div>

        {/* <LogWatcher /> */}
      </main>
    </div>
  );
};

export default Home;
