import {
  resolvePaymentKeyHash,
  resolveRewardAddress,
  resolveStakeKeyHash,
} from "@meshsdk/core";

export function bytesToHex(bytes) {
  return Buffer.from(bytes).toString("hex");
}

export function hexToBytes(hex) {
  return Buffer.from(hex, "hex");
}

export const mergeSignatures = (wasm, txWitnessSet, newSignatures) => {
  const txSignatures = txWitnessSet.vkeys();

  if (txSignatures !== undefined) {
    const signatures = new Set();

    for (let index = 0; index < txSignatures.len(); index += 1) {
      signatures.add(txSignatures.get(index).to_hex());
    }

    for (let index = 0; index < newSignatures.len(); index += 1) {
      signatures.add(newSignatures.get(index).to_hex());
    }

    const allSignatures = wasm.Vkeywitnesses.new();
    signatures.forEach((witness) => {
      allSignatures.add(wasm.Vkeywitness.from_hex(witness));
    });

    return allSignatures;
  }

  return newSignatures;
};

export const getMarketPlaceFee = (price) => {
  let marketplaceAmount = Math.trunc((price * 2.5) / 100);
  if (marketplaceAmount < 1000000) marketplaceAmount = 1000000;
  return marketplaceAmount;
};

export const getRoyaltyFee = (price, royaltyPercentage) => {
  let royaltiesAmount = Math.trunc((price * royaltyPercentage) / 100);
  if (royaltiesAmount < 1000000) royaltiesAmount = 1000000;
  return royaltiesAmount;
};

export const getReallyPrice = (price, royaltyPercentage) => {
  return (
    price - getMarketPlaceFee(price) - getRoyaltyFee(price, royaltyPercentage)
  );
};

export const getBuyDatum = (
  sellerAddress,
  marketplaceAddress,
  payoutAddress,
  price,
  royaltyPercentage
) => {
  return {
    constructor: 0,
    fields: [
      { bytes: resolvePaymentKeyHash(sellerAddress) },
      {
        list: [
          {
            constructor: 0,
            fields: [
              {
                constructor: 0,
                fields: [
                  {
                    constructor: 0,
                    fields: [
                      {
                        bytes: resolvePaymentKeyHash(payoutAddress),
                      },
                    ],
                  },
                  {
                    constructor: 0,
                    fields: [
                      {
                        constructor: 0,
                        fields: [
                          {
                            constructor: 0,
                            fields: [
                              {
                                bytes: resolveStakeKeyHash(
                                  resolveRewardAddress(payoutAddress)
                                ),
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                map: [
                  {
                    k: { bytes: "" },
                    v: {
                      constructor: 0,
                      fields: [
                        { int: 0 },
                        {
                          map: [
                            {
                              k: { bytes: "" },
                              v: {
                                int: getRoyaltyFee(price, royaltyPercentage),
                              },
                            },
                          ],
                        },
                      ],
                    },
                  },
                ],
              },
            ],
          },
          {
            constructor: 0,
            fields: [
              {
                constructor: 0,
                fields: [
                  {
                    constructor: 0,
                    fields: [
                      {
                        bytes: resolvePaymentKeyHash(marketplaceAddress),
                      },
                    ],
                  },
                  {
                    constructor: 0,
                    fields: [
                      {
                        constructor: 0,
                        fields: [
                          {
                            constructor: 0,
                            fields: [
                              {
                                bytes: resolveStakeKeyHash(
                                  resolveRewardAddress(marketplaceAddress)
                                ),
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                map: [
                  {
                    k: { bytes: "" },
                    v: {
                      constructor: 0,
                      fields: [
                        { int: 0 },
                        {
                          map: [
                            {
                              k: { bytes: "" },
                              v: { int: getMarketPlaceFee(price) },
                            },
                          ],
                        },
                      ],
                    },
                  },
                ],
              },
            ],
          },
          {
            constructor: 0,
            fields: [
              {
                constructor: 0,
                fields: [
                  {
                    constructor: 0,
                    fields: [
                      {
                        bytes: resolvePaymentKeyHash(sellerAddress),
                      },
                    ],
                  },
                  {
                    constructor: 0,
                    fields: [
                      {
                        constructor: 0,
                        fields: [
                          {
                            constructor: 0,
                            fields: [
                              {
                                bytes: resolveStakeKeyHash(
                                  resolveRewardAddress(sellerAddress)
                                ),
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                map: [
                  {
                    k: { bytes: "" },
                    v: {
                      constructor: 0,
                      fields: [
                        { int: 0 },
                        {
                          map: [
                            {
                              k: { bytes: "" },
                              v: {
                                int: getReallyPrice(price, royaltyPercentage),
                              },
                            },
                          ],
                        },
                      ],
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
};

export const getSellDatum = (
  sellerAddress,
  marketplaceAddress,
  payoutAddress,
  policyId,
  assetName,
  price,
  royaltyPercentage
) => {
  return {
    constructor: 0,
    fields: [
      { bytes: resolvePaymentKeyHash(sellerAddress) },
      {
        list: [
          {
            constructor: 0,
            fields: [
              {
                constructor: 0,
                fields: [
                  {
                    constructor: 0,
                    fields: [
                      {
                        bytes: resolvePaymentKeyHash(payoutAddress),
                      },
                    ],
                  },
                  {
                    constructor: 0,
                    fields: [
                      {
                        constructor: 0,
                        fields: [
                          {
                            constructor: 0,
                            fields: [
                              {
                                bytes: resolveStakeKeyHash(
                                  resolveRewardAddress(payoutAddress)
                                ),
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                map: [
                  {
                    k: { bytes: "" },
                    v: {
                      constructor: 0,
                      fields: [
                        { int: 0 },
                        {
                          map: [
                            {
                              k: { bytes: "" },
                              v: {
                                int: getRoyaltyFee(price, royaltyPercentage),
                              },
                            },
                          ],
                        },
                      ],
                    },
                  },
                ],
              },
            ],
          },
          {
            constructor: 0,
            fields: [
              {
                constructor: 0,
                fields: [
                  {
                    constructor: 0,
                    fields: [
                      {
                        bytes: resolvePaymentKeyHash(marketplaceAddress),
                      },
                    ],
                  },
                  {
                    constructor: 0,
                    fields: [
                      {
                        constructor: 0,
                        fields: [
                          {
                            constructor: 0,
                            fields: [
                              {
                                bytes: resolveStakeKeyHash(
                                  resolveRewardAddress(marketplaceAddress)
                                ),
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                map: [
                  {
                    k: { bytes: "" },
                    v: {
                      constructor: 0,
                      fields: [
                        { int: 0 },
                        {
                          map: [
                            {
                              k: { bytes: "" },
                              v: { int: getMarketPlaceFee(price) },
                            },
                          ],
                        },
                      ],
                    },
                  },
                ],
              },
            ],
          },
          {
            constructor: 0,
            fields: [
              {
                constructor: 0,
                fields: [
                  {
                    constructor: 0,
                    fields: [
                      {
                        bytes: resolvePaymentKeyHash(sellerAddress),
                      },
                    ],
                  },
                  {
                    constructor: 0,
                    fields: [
                      {
                        constructor: 0,
                        fields: [
                          {
                            constructor: 0,
                            fields: [
                              {
                                bytes: resolveStakeKeyHash(
                                  resolveRewardAddress(sellerAddress)
                                ),
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                map: [
                  {
                    k: {
                      bytes: policyId,
                    },
                    v: {
                      constructor: 0,
                      fields: [
                        { int: 0 },
                        {
                          map: [
                            {
                              k: { bytes: assetName },
                              v: { int: 1 },
                            },
                          ],
                        },
                      ],
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
};
