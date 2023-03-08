import Cardano from "../serialization-lib";
import { fromHex } from "../../utils/converter";
import { Buffer } from "buffer";

class Wallet {
  async enable(name) {
    this.availableWallets = [];
    if (name === "nami" || name === false) {
      const isEnabled = await window.cardano?.nami?.enable();
      if (isEnabled) {
        this._provider = isEnabled;
        this.availableWallets.push("nami");
        return true;
      }
    }
    return false;
  }

  async getAvailableWallets() {
    await this.enable(false);

    return this.availableWallets;
  }

  async getBalance() {
    return await this._provider.getBalance();
  }

  async getCollateral() {
    if (!this._provider) return null;

    let CollatUtxos = [];

    const hexCollateral = await this._provider.experimental.getCollateral();
    //console.log(hexCollateral);

    for (const x of hexCollateral) {
      const utxo = Cardano.Instance.TransactionUnspentOutput.from_bytes(
        Buffer.from(x, "hex")
      );
      CollatUtxos.push(utxo);
      // console.log(utxo)
    }

    return CollatUtxos;
  }

  async getNetworkId() {
    return await this._provider.getNetworkId();
  }

  async getUsedAddresses() {
    await Cardano.load();
    const usedAddresses = await this._provider.getUsedAddresses();

    return usedAddresses.map((address) =>
      Cardano.Instance.Address.from_bytes(fromHex(address)).to_bech32()
    );
  }

  async getUtxos() {
    return await this._provider.getUtxos();
  }

  async signTx(tx, partialSign = true) {
    return await this._provider.signTx(tx, partialSign);
  }

  async submitTx(tx) {
    return await this._provider.submitTx(tx);
  }
}

export default new Wallet();
