/* eslint-disable consistent-return */
import {
  Transaction,
  BrowserWallet,
  BlockfrostProvider,
  resolveDataHash,
} from "@meshsdk/core";
import Contracts from "../market-contract/plutus";
import { marketAddress, secretDatum, apiKey } from "../../config";

// eslint-disable-next-line consistent-return
export const listToken = async (asset) => {
  console.log(asset);
  try {
    const wallet = await BrowserWallet.enable("nami");
    const tx = new Transaction({ initiator: wallet }).sendAssets(
      {
        address: marketAddress,
        datum: {
          value: secretDatum,
        },
      },
      [
        {
          unit: asset.assetName,
          quantity: asset.quantity,
        },
      ]
    );
    const unsignedTx = await tx.build();
    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await wallet.submitTx(signedTx);
    return { txHash };
  } catch (error) {
    // throw new Error(`Unexpected error in listToken. [Message: ${error}]`);
    console.log(`Unexpected error in listToken. [Message: ${error}]`);
    return false;
  }
};

async function getAssetUtxo({ scriptAddress, asset, datum }) {
  const blockfrostProvider = new BlockfrostProvider(apiKey);

  const utxos = await blockfrostProvider.fetchAddressUTxOs(
    scriptAddress,
    asset
  );
  const dataHash = resolveDataHash(datum);
  const validUtxo = utxos.find((utxo) => utxo.output.dataHash === dataHash);
  return validUtxo;
}

export const purchaseTokenViaCbor = async ({ cborHex, txHash }) => {
  try {
    const wallet = await BrowserWallet.enable("nami");
    const signedTx = await wallet.signTx(cborHex, true); // partial sign is true
    const txHash2 = await wallet.submitTx(signedTx);
    console.log(txHash, txHash2);
    return {
      result: true,
      tx: txHash2,
    };
  } catch (e) {
    return {
      result: false,
      message: "Transaction Signing Declined",
    };
  }
};

export const purchaseToken = async ({ asset, price, seller }) => {
  try {
    const wallet = await BrowserWallet.enable("nami");
    console.log(asset, seller);
    const assetUtxo = await getAssetUtxo({
      scriptAddress: marketAddress,
      asset: asset.asset,
      datum: secretDatum,
    });
    // get wallet change address
    const address = await wallet.getChangeAddress();
    // create transaction
    const lockedValue = assetUtxo.output.amount.find(
      (utxo) => utxo.unit === "lovelace"
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const { royaltyPercentage, createdByAddress } = collectionDetails;
    const royaltyPercentage = 2.5;
    const totalPrice = Number(price) + Number(lockedValue.quantity);
    const nftOwnerShare =
      totalPrice - parseInt(totalPrice * (royaltyPercentage / 100));
    const royalty = totalPrice - nftOwnerShare;
    if (assetUtxo) {
      const COLLATERAL_NAMI_AMOUNT = 5000000;
      const hexCollateralUtxos = await wallet.getCollateral(
        COLLATERAL_NAMI_AMOUNT
      );
      if (hexCollateralUtxos.length === 0) {
        return {
          result: false,
          message: "Add collateral on your wallet",
        };
      }
      // for (let i = 0; i < hexCollateralUtxos.length; i++) {
      //   const wasmUtxo = CardanoWasm.TransactionUnspentOutput.from_bytes(hexToBytes(hexCollateralUtxos[i]));
      //   console.log('tx', bytesToHex(wasmUtxo.input().transaction_id().to_bytes()));
      //   inputs.add(wasmUtxo.input());
      // }
      const tx = new Transaction({ initiator: wallet })
        .redeemValue({
          value: assetUtxo,
          script: {
            version: "V1",
            code: Contracts.v1.cborHex,
          },
          datum: secretDatum,
        })
        .sendLovelace(String(seller), String(nftOwnerShare))
        // .sendLovelace(String(seller), String(royalty))
        .sendValue(address, assetUtxo)
        .setCollateral(hexCollateralUtxos)
        .setRequiredSigners([address]);

      const unsignedTx = await tx.build();
      const signedTx = await wallet.signTx(unsignedTx, true); // partial sign is true
      const txHash = await wallet.submitTx(signedTx);
      return {
        result: true,
        tx: txHash,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      result: false,
      message: "Wallet error",
    };
  }
};
