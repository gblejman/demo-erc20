import { ethers } from "ethers";
import { EtherscanLink } from "@/components/EtherscanLink";

export const TxReceipt = ({
  receipt: { transactionHash },
}: {
  receipt: ethers.ContractReceipt;
}) => (
  <>
    <span>Tx Hash: {transactionHash}</span>
    <EtherscanLink type="tx" value={transactionHash} />
  </>
);
