import { Erc20Info } from "@/components/erc20/Erc20Info";
import { Erc20Form } from "@/components/erc20/Erc20Form";

export const Erc20 = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Erc20Info />
      <Erc20Form />
    </div>
  );
};
