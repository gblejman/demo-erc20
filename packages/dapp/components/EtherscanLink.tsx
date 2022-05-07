import { useWeb3 } from "@/lib/useWeb3";

type LinkType = "address" | "tx" | "block" | "token" | "ens";

const linkTypes = {
  address: "address",
  tx: "tx",
  block: "block",
  token: "token",
  ens: "ens",
} as const;

export const EtherscanLink = ({
  type = linkTypes.address,
  value = "",
  children = <span>View on Etherscan</span>,
}: {
  type?: LinkType;
  value: string;
  children?: React.ReactNode;
}) => {
  const { network } = useWeb3();

  return (
    <a
      href={`https://${network?.name}.etherscan.io/${type}/${value}`}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
};
