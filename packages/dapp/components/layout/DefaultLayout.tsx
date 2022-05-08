import Head from "next/head";
import { Nav } from "@/components/layout/Nav";

export const DefaultLayout = ({ children }) => {
  return (
    <div style={{ padding: "0 2rem" }}>
      <Head>
        <title>Dapp</title>
        <meta name="description" content="Dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <main>{children}</main>
    </div>
  );
};
