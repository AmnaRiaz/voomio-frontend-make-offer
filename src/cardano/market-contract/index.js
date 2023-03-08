import Cardano from "../serialization-lib";
import ErrorTypes from "./error.types";
import { serializeSale, deserializeSale } from "./datums";
import { BUYER, SELLER } from "./redeemers";
import { contractAddress, contractScripts } from "./validator";
import {
  assetsToValue,
  createTxOutput,
  finalizeTx,
  initializeTx,
  serializeTxUnspentOutput,
} from "../transaction";
import { toHex } from "../../utils/converter";

export const listAsset = async (datum, seller, version, sa32, ra32) => {
  await Cardano.load();
  try {
    console.log("listing");
    const { txBuilder, datums, outputs } = await initializeTx();
    const utxos = await Promise.all(
      seller.utxos.map((utxo) => serializeTxUnspentOutput(utxo))
    );
    console.log("pass");
    const lockAssetDatum = await serializeSale(datum);
    datums.add(lockAssetDatum);

    console.log("pass");
    outputs.add(
      await createTxOutput(
        contractAddress(version),
        await assetsToValue([
          {
            unit: `${datum.cs}${datum.tn}`,
            quantity: "1",
          },
          { unit: "lovelace", quantity: "2000000" },
        ]),
        { datum: lockAssetDatum }
      )
    );

    console.log("pass");
    const datumHash = toHex(
      Cardano.Instance.hash_plutus_data(lockAssetDatum).to_bytes()
    );
    console.log("pass");
    const txHash = await finalizeTx({
      txBuilder,
      datums,
      utxos,
      outputs,
      changeAddress: seller.address,
      metadata: await deserializeSale(lockAssetDatum),
      sa32,
      ra32,
    });
    return {
      datumHash,
      txHash,
    };
  } catch (error) {
    handleError(error, "listAsset");
  }
};

export const updateListing = async (
  currentDatum,
  newDatum,
  seller,
  assetUtxo,
  currentVersion,
  latestVersion
) => {
  try {
    const { txBuilder, datums, outputs } = await initializeTx();
    const utxos = seller.utxos.map((utxo) => serializeTxUnspentOutput(utxo));

    const currentListingDatum = await serializeSale(currentDatum);
    datums.add(currentListingDatum);

    const newListingDatum = await serializeSale(newDatum);
    datums.add(newListingDatum);

    outputs.add(
      await createTxOutput(
        contractAddress(latestVersion),
        assetUtxo.output().amount(),
        {
          datum: newListingDatum,
        }
      )
    );

    const requiredSigners = Cardano.Instance.Ed25519KeyHashes.new();
    requiredSigners.add(seller.address.payment_cred().to_keyhash());
    txBuilder.set_required_signers(requiredSigners);

    const datumHash = toHex(
      Cardano.Instance.hash_plutus_data(newListingDatum).to_bytes()
    );

    const txHash = await finalizeTx({
      txBuilder,
      datums,
      utxos,
      outputs,
      changeAddress: seller.address,
      metadata: await deserializeSale(newListingDatum),
      assetUtxo,
      plutusScripts: contractScripts(currentVersion),
      action: SELLER,
    });

    return {
      datumHash,
      txHash,
    };
  } catch (error) {
    handleError(error, "updateListing");
  }
};

export const cancelListing = async (datum, seller, assetUtxo, version) => {
  try {
    const { txBuilder, datums, outputs } = await initializeTx();
    const utxos = seller.utxos.map((utxo) => serializeTxUnspentOutput(utxo));

    const cancelListingDatum = await serializeSale(datum);
    datums.add(cancelListingDatum);

    outputs.add(
      await createTxOutput(
        seller.address.to_address(),
        assetUtxo.output().amount()
      )
    );

    const requiredSigners = Cardano.Instance.Ed25519KeyHashes.new();
    requiredSigners.add(seller.address.payment_cred().to_keyhash());
    txBuilder.set_required_signers(requiredSigners);

    const txHash = await finalizeTx({
      txBuilder,
      datums,
      utxos,
      outputs,
      changeAddress: seller.address,
      assetUtxo,
      plutusScripts: contractScripts(version),
      action: SELLER,
    });

    return txHash;
  } catch (error) {
    handleError(error, "cancelListing");
  }
};

export const purchaseAsset = async (
  datum,
  buyer,
  beneficiaries,
  assetUtxo,
  version
) => {
  try {
    const { txBuilder, datums, outputs } = await initializeTx();
    console.log("------------------------------------");
    // console.log(buyer.utxos);
    const utxos = await Promise.all(
      buyer.utxos.map((utxo) => serializeTxUnspentOutput(utxo))
    );
    // console.log('------------------------------------');
    // console.log(utxos);
    console.log("price------------------------------------");
    console.log(datum.price);
    const purchaseAssetDatum = await serializeSale(datum);
    datums.add(purchaseAssetDatum);

    outputs.add(
      await createTxOutput(
        buyer.address.to_address(),
        assetUtxo.output().amount()
      )
    );

    await splitAmount(
      beneficiaries,
      {
        price: datum.price,
        royalties: datum.rp,
      },
      outputs
    );

    const requiredSigners = Cardano.Instance.Ed25519KeyHashes.new();
    requiredSigners.add(buyer.address.payment_cred().to_keyhash());
    txBuilder.set_required_signers(requiredSigners);
console.log("before finalize ");
console.log({
  txBuilder,
  utxos,
  outputs,
  datums,
  changeAddress: buyer.address,
  assetUtxo,
  plutusScripts: contractScripts(version),
  action: BUYER,
});
    const txHash = await finalizeTx({
      txBuilder,
      utxos,
      outputs,
      datums,
      changeAddress: buyer.address,
      assetUtxo,
      plutusScripts: contractScripts(version),
      action: BUYER,
    });
    console.log("after finalize ");
    
    return txHash;
  } catch (error) {
    handleError(error, "purchaseAsset");
  }
};

const handleError = (error, source) => {
  console.error(`Unexpected error in ${source}. [Message: ${error.message}]`);

  switch (error.message) {
    case "INPUT_LIMIT_EXCEEDED":
      throw new Error(ErrorTypes.TRANSACTION_FAILED_SO_MANY_UTXOS);
    case "INPUTS_EXHAUSTED":
      throw new Error(ErrorTypes.TRANSACTION_FAILED_NOT_ENOUGH_FUNDS);
    case "MIN_UTXO_ERROR":
      throw new Error(ErrorTypes.TRANSACTION_FAILED_CHANGE_TOO_SMALL);
    case "MAX_SIZE_REACHED":
      throw new Error(ErrorTypes.TRANSACTION_FAILED_MAX_TX_SIZE_REACHED);
    default:
      if (error.message.search("NonOutputSupplimentaryDatums") !== -1) {
        throw new Error(ErrorTypes.TRANSACTION_FAILED_DATUMS_NOT_MATCHING);
      } else if (error.message.search("MissingScriptWitnessesUTXOW") !== -1) {
        throw new Error(ErrorTypes.TRANSACTION_FAILED_WRONG_SCRIPT_CONTRACT);
      } else if (error.message.search("OutputTooSmallUTxO") !== -1) {
        throw new Error(ErrorTypes.TRANSACTION_FAILED_ASSET_NOT_SPENDABLE);
      }
      throw error;
  }
};

const splitAmount = async (
  { seller, artist, market },
  { price, royalties },
  outputs
) => {
  const minimumAmount = 1000000;
  const marketFeePercentage = 2.5 / 100;
  const royaltyFeePercentage = royalties / 1000;

  const royaltyFees =
    royaltyFeePercentage > 0
      ? Math.max(royaltyFeePercentage * price, minimumAmount)
      : 0;
  outputs.add(
    await createTxOutput(
      artist.to_address(),
      await assetsToValue([{ unit: "lovelace", quantity: `${royaltyFees}` }])
    )
  );

  const marketFees = Math.max(marketFeePercentage * price, minimumAmount);
  outputs.add(
    await createTxOutput(
      market.to_address(),
      await assetsToValue([{ unit: "lovelace", quantity: `${marketFees}` }])
    )
  );

  const netPrice = price - marketFees - royaltyFees;
  console.log(netPrice);
  outputs.add(
    await createTxOutput(
      seller.to_address(),
      await assetsToValue([
        { unit: "lovelace", quantity: `${Math.max(netPrice, minimumAmount)}` },
      ])
    )
  );
};
