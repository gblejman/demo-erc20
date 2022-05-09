import { useState } from "react";
import { ethers } from "ethers";
import { useForm } from "react-hook-form";
import { useWeb3 } from "@/lib/useWeb3";
import { erc20Faucet } from "@/contracts/index";
import { TxReceipt } from "@/components/TxReceipt";

const styles = {
  error: { border: "1px solid red" },
};

export const Erc20FaucetForm = () => {
  const { provider } = useWeb3();
  const [receipt, setReceipt] = useState<ethers.ContractReceipt | null>(null);

  const {
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async () => {
    if (!provider) return;

    try {
      const contract = erc20Faucet.connect(provider.getSigner());
      const transaction = await contract.request();
      const receipt = await transaction.wait();

      setReceipt(receipt);
    } catch (e: any) {
      console.log("Tx error: ", e.message);
      setError("custom", { type: "custom", message: e.message });
    }
  };

  return (
    <>
      <h3>Request</h3>

      <form onSubmit={handleSubmit(onSubmit)} style={{ paddingTop: 10 }}>
        <fieldset
          style={{ display: "flex", flexDirection: "column" }}
          disabled={isSubmitting}
        >
          <legend>Params</legend>
        </fieldset>

        {errors.custom && (
          <p style={styles.error}>
            <span>{errors.custom?.message}</span>
          </p>
        )}

        <input
          type="submit"
          value={isSubmitting ? "Submitting" : "Submit"}
          style={{ marginTop: 20 }}
          disabled={isSubmitting}
        />
      </form>

      <h4>Latest Receipt</h4>
      {receipt ? <TxReceipt receipt={receipt} /> : <span>None</span>}
    </>
  );
};
