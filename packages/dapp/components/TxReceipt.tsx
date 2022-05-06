import { ethers } from "ethers";
import { EtherscanLink } from "@/components/EtherscanLink";

export const TxReceipt = ({ receipt }: { receipt: ethers.ContractReceipt }) => {
  const { transactionHash } = receipt;

  return (
    <>
      <span>Tx Hash: {transactionHash}</span>
      <EtherscanLink type="tx" value={transactionHash} />
    </>
  );
};
