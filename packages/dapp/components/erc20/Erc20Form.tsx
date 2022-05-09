import { useState } from "react";
import { ethers } from "ethers";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useWeb3 } from "@/lib/useWeb3";
import { erc20 } from "@/contracts/index";
import { TxReceipt } from "@/components/TxReceipt";

const schema = yup
  .object({
    address: yup
      .string()
      .test("eth-address", "Invalid Eth Address", function (value = "") {
        return ethers.utils.isAddress(value);
      })
      .required("Required"),
    value: yup.string().required("Required"),
  })
  .required();

const defaultValues = {
  address: "",
  value: 0,
};

const styles = {
  error: { border: "1px solid red" },
};

export const Erc20Form = () => {
  const { provider } = useWeb3();
  const [receipt, setReceipt] = useState<ethers.ContractReceipt | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    // console.log("onSubmit", data);
    // return;
    if (!provider) return;

    try {
      const { address, value } = data;
      const contract = erc20.connect(provider.getSigner());
      const transaction = await contract.transfer(
        address,
        ethers.utils.parseUnits(value, 18)
      );
      const receipt = await transaction.wait();

      setReceipt(receipt);
    } catch (e: any) {
      console.log("Tx error: ", e.message);
      setError("custom", { type: "custom", message: e.message });
    }
  };

  return (
    <>
      <h4>Transfer</h4>

      <form onSubmit={handleSubmit(onSubmit)} style={{ paddingTop: 10 }}>
        <fieldset
          style={{ display: "flex", flexDirection: "column" }}
          disabled={isSubmitting}
        >
          <legend>Params</legend>

          <label htmlFor="address">To Address:</label>
          <input
            id="address"
            placeholder="0x..."
            {...register("address", { required: true })}
            style={errors.address && styles.error}
          />
          <span>{errors.address?.message}</span>

          <label htmlFor="value" style={{ marginTop: 5 }}>
            Value: (giga GDBV)
          </label>
          <input
            id="value"
            type="number"
            min={0}
            step={1}
            {...register("value", { required: true })}
            style={errors.address && styles.error}
          />
          <span>{errors.value?.message}</span>
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
