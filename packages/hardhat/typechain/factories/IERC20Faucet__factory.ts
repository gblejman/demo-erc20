/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IERC20Faucet, IERC20FaucetInterface } from "../IERC20Faucet";

const _abi = [
  {
    inputs: [],
    name: "request",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IERC20Faucet__factory {
  static readonly abi = _abi;
  static createInterface(): IERC20FaucetInterface {
    return new utils.Interface(_abi) as IERC20FaucetInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IERC20Faucet {
    return new Contract(address, _abi, signerOrProvider) as IERC20Faucet;
  }
}
