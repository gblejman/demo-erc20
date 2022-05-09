import { Erc20FaucetInfo } from "@/components/erc20Faucet/Erc20FaucetInfo";
import { Erc20FaucetForm } from "@/components/erc20Faucet/Erc20FaucetForm";

export const Erc20Faucet = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Erc20FaucetInfo />
      <Erc20FaucetForm />
    </div>
  );
};
