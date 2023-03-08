import * as Cardano from "../serialization-lib/@emurgo/cardano-serialization-lib-browser";
import Contracts from "./plutus";
import { fromHex } from "../../utils/converter";

export const contractAddress = (version) => {
  return Cardano.Address.from_bech32(Contracts[version].address);
};

export const contractScripts = (version) => {
  const scripts = Cardano.PlutusScripts.new();

  scripts.add(Cardano.PlutusScript.new(fromHex(Contracts[version].cborHex)));

  return scripts;
};
