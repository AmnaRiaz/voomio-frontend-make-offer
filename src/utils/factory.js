import Cardano from "../cardano/serialization-lib";
import { marketFeeAddress } from "../config";
import { toHex, toLovelace } from "./converter";

export const createDatum = (
  tokenName,
  policyId,
  sellerAddress,
  royaltiesAddress,
  royaltiesPercentage,
  price
) => {
  if (
    sellerAddress &&
    royaltiesAddress &&
    royaltiesPercentage !== undefined &&
    price
  ) {
    return {
      cs: policyId,
      tn: tokenName,
      ma: getAddressKeyHash(marketFeeAddress),
      sa: getAddressKeyHash(sellerAddress),
      ra: getAddressKeyHash(royaltiesAddress),
      mas: getStakeHash(marketFeeAddress),
      sas: getStakeHash(sellerAddress),
      ras: getStakeHash(royaltiesAddress),
      rp: royaltiesPercentage ? royaltiesPercentage : 0,
      price: toLovelace(price),
    };
  }
};

/**
 * @param {string} byWallet - a wallet address needs to be in bech32 format.
 */
export const createEvent = (action, datum, txHash, byWallet) => {
  if (action && datum && txHash && byWallet) {
    return {
      action,
      datum,
      txHash,
      submittedBy: byWallet,
      submittedOn: new Date().getTime(),
    };
  }
};

/**
 * @param {string} byWallet - a wallet address needs to be in bech32 format.
 */
export const createOffer = (byWallet, forAsset, value) => {
  if (byWallet && forAsset && value) {
    return {
      by: byWallet,
      for: forAsset,
      on: new Date().getTime(),
      value,
    };
  }
};

const getAddressKeyHash = (address) => {
  return toHex(
    Cardano.Instance.BaseAddress.from_address(
      Cardano.Instance.Address.from_bech32(address)
    )
      .payment_cred()
      .to_keyhash()
      .to_bytes()
  );
};

const getStakeHash = (address) => {
  return toHex(
    Cardano.Instance.BaseAddress.from_address(
      Cardano.Instance.Address.from_bech32(address)
    )
      .stake_cred()
      .to_keyhash()
      .to_bytes()
  );
};
