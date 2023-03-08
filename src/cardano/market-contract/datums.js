import Cardano from "../serialization-lib";
import { fromHex, toHex } from "../../utils/converter";

export const serializeSale = async ({
  ma,
  mas,
  sa,
  sas,
  ra,
  ras,
  rp,
  price,
}) => {
  await Cardano.load();
  const fields = Cardano.Instance.PlutusList.new();
  fields.add(Cardano.Instance.PlutusData.new_bytes(fromHex(sa)));
  const list = Cardano.Instance.PlutusList.new();
  const royaltyPaymentKeyFields = Cardano.Instance.PlutusList.new();
  royaltyPaymentKeyFields.add(
    Cardano.Instance.PlutusData.new_bytes(fromHex(ra))
  );
  const royaltyStakeKeyFields = Cardano.Instance.PlutusList.new();
  royaltyStakeKeyFields.add(
    Cardano.Instance.PlutusData.new_bytes(fromHex(ras))
  );
  const royaltyAddressFields = Cardano.Instance.PlutusList.new();
  royaltyAddressFields.add(
    Cardano.Instance.PlutusData.new_constr_plutus_data(
      Cardano.Instance.ConstrPlutusData.new(
        Cardano.Instance.Int.new_i32(0),
        royaltyPaymentKeyFields
      )
    )
  );
  royaltyAddressFields.add(
    Cardano.Instance.PlutusData.new_constr_plutus_data(
      Cardano.Instance.ConstrPlutusData.new(
        Cardano.Instance.Int.new_i32(0),
        royaltyStakeKeyFields
      )
    )
  );
  const royaltyFields = Cardano.Instance.PlutusList.new();
  royaltyFields.add(
    Cardano.Instance.PlutusData.new_constr_plutus_data(
      Cardano.Instance.ConstrPlutusData.new(
        Cardano.Instance.Int.new_i32(0),
        royaltyAddressFields
      )
    )
  );
  const royaltyPriceMap = Cardano.Instance.PlutusMap.new();
  const royaltyValueFields = Cardano.Instance.PlutusList.new();
  royaltyValueFields.add(
    Cardano.Instance.PlutusData.new_integer(
      Cardano.Instance.BigInt.from_str("0")
    )
  );
  const royaltyPriceValueMap = Cardano.Instance.PlutusMap.new();
  royaltyPriceValueMap.insert(
    Cardano.Instance.PlutusData.new_bytes(fromHex(toHex(""))),
    Cardano.Instance.PlutusData.new_integer(
      Cardano.Instance.BigInt.from_str(((price * rp) / 100000).toString())
    )
  );
  royaltyValueFields.add(
    Cardano.Instance.PlutusData.new_map(royaltyPriceValueMap)
  );
  royaltyPriceMap.insert(
    Cardano.Instance.PlutusData.new_bytes(fromHex(toHex(""))),
    Cardano.Instance.PlutusData.new_constr_plutus_data(
      Cardano.Instance.ConstrPlutusData.new(
        Cardano.Instance.Int.new_i32(0),
        royaltyValueFields
      )
    )
  );
  royaltyFields.add(Cardano.Instance.PlutusData.new_map(royaltyPriceMap));
  const royaltyData = Cardano.Instance.PlutusData.new_constr_plutus_data(
    Cardano.Instance.ConstrPlutusData.new(
      Cardano.Instance.Int.new_i32(0),
      royaltyFields
    )
  );
  list.add(royaltyData);
  console.log(1);
  const marketPaymentKeyFields = Cardano.Instance.PlutusList.new();
  marketPaymentKeyFields.add(
    Cardano.Instance.PlutusData.new_bytes(fromHex(ma))
  );

  const marketStakeKeyFields = Cardano.Instance.PlutusList.new();
  marketStakeKeyFields.add(Cardano.Instance.PlutusData.new_bytes(fromHex(mas)));
  const marketAddressFields = Cardano.Instance.PlutusList.new();
  marketAddressFields.add(
    Cardano.Instance.PlutusData.new_constr_plutus_data(
      Cardano.Instance.ConstrPlutusData.new(
        Cardano.Instance.Int.new_i32(0),
        marketPaymentKeyFields
      )
    )
  );
  marketAddressFields.add(
    Cardano.Instance.PlutusData.new_constr_plutus_data(
      Cardano.Instance.ConstrPlutusData.new(
        Cardano.Instance.Int.new_i32(0),
        marketStakeKeyFields
      )
    )
  );
  const marketFields = Cardano.Instance.PlutusList.new();
  marketFields.add(
    Cardano.Instance.PlutusData.new_constr_plutus_data(
      Cardano.Instance.ConstrPlutusData.new(
        Cardano.Instance.Int.new_i32(0),
        marketAddressFields
      )
    )
  );

  const marketPriceMap = Cardano.Instance.PlutusMap.new();
  const marketValueFields = Cardano.Instance.PlutusList.new();
  marketValueFields.add(
    Cardano.Instance.PlutusData.new_integer(
      Cardano.Instance.BigInt.from_str("0")
    )
  );
  const marketPriceValueMap = Cardano.Instance.PlutusMap.new();
  marketPriceValueMap.insert(
    Cardano.Instance.PlutusData.new_bytes(fromHex(toHex(""))),
    Cardano.Instance.PlutusData.new_integer(
      Cardano.Instance.BigInt.from_str((price * 0.025).toString())
    )
  );
  marketValueFields.add(
    Cardano.Instance.PlutusData.new_map(marketPriceValueMap)
  );
  marketPriceMap.insert(
    Cardano.Instance.PlutusData.new_bytes(fromHex(toHex(""))),
    Cardano.Instance.PlutusData.new_constr_plutus_data(
      Cardano.Instance.ConstrPlutusData.new(
        Cardano.Instance.Int.new_i32(0),
        marketValueFields
      )
    )
  );
  marketFields.add(Cardano.Instance.PlutusData.new_map(marketPriceMap));
  const marketData = Cardano.Instance.PlutusData.new_constr_plutus_data(
    Cardano.Instance.ConstrPlutusData.new(
      Cardano.Instance.Int.new_i32(0),
      marketFields
    )
  );
  list.add(marketData);
  console.log(2);
  const sellerPaymentKeyFields = Cardano.Instance.PlutusList.new();
  sellerPaymentKeyFields.add(
    Cardano.Instance.PlutusData.new_bytes(fromHex(sa))
  );

  const sellerStakeKeyFields = Cardano.Instance.PlutusList.new();
  sellerStakeKeyFields.add(Cardano.Instance.PlutusData.new_bytes(fromHex(sas)));

  const sellerAddressFields = Cardano.Instance.PlutusList.new();
  sellerAddressFields.add(
    Cardano.Instance.PlutusData.new_constr_plutus_data(
      Cardano.Instance.ConstrPlutusData.new(
        Cardano.Instance.Int.new_i32(0),
        sellerPaymentKeyFields
      )
    )
  );
  sellerAddressFields.add(
    Cardano.Instance.PlutusData.new_constr_plutus_data(
      Cardano.Instance.ConstrPlutusData.new(
        Cardano.Instance.Int.new_i32(0),
        sellerStakeKeyFields
      )
    )
  );

  const sellerFields = Cardano.Instance.PlutusList.new();
  sellerFields.add(
    Cardano.Instance.PlutusData.new_constr_plutus_data(
      Cardano.Instance.ConstrPlutusData.new(
        Cardano.Instance.Int.new_i32(0),
        sellerAddressFields
      )
    )
  );

  const sellerPriceMap = Cardano.Instance.PlutusMap.new();
  const sellerValueFields = Cardano.Instance.PlutusList.new();
  sellerValueFields.add(
    Cardano.Instance.PlutusData.new_integer(
      Cardano.Instance.BigInt.from_str("0")
    )
  );
  const sellerPriceValueMap = Cardano.Instance.PlutusMap.new();
  sellerPriceValueMap.insert(
    Cardano.Instance.PlutusData.new_bytes(fromHex(toHex(""))),
    Cardano.Instance.PlutusData.new_integer(
      Cardano.Instance.BigInt.from_str(
        (price * (1 - 0.025 - rp / 100000)).toString()
      )
    )
  );
  sellerValueFields.add(
    Cardano.Instance.PlutusData.new_map(sellerPriceValueMap)
  );
  sellerPriceMap.insert(
    Cardano.Instance.PlutusData.new_bytes(fromHex(toHex(""))),
    Cardano.Instance.PlutusData.new_constr_plutus_data(
      Cardano.Instance.ConstrPlutusData.new(
        Cardano.Instance.Int.new_i32(0),
        sellerValueFields
      )
    )
  );
  sellerFields.add(Cardano.Instance.PlutusData.new_map(sellerPriceMap));
  const sellerData = Cardano.Instance.PlutusData.new_constr_plutus_data(
    Cardano.Instance.ConstrPlutusData.new(
      Cardano.Instance.Int.new_i32(0),
      sellerFields
    )
  );
  list.add(sellerData);
  console.log(3);
  fields.add(Cardano.Instance.PlutusData.new_list(list));

  const datum = Cardano.Instance.PlutusData.new_constr_plutus_data(
    Cardano.Instance.ConstrPlutusData.new(
      Cardano.Instance.Int.new_i32(0),
      fields
    )
  );
  console.log("pass serialize");
  return datum;
};

export const deserializeSale = async (datum) => {
  await Cardano.load();
  const details = datum.as_constr_plutus_data().data();
  const ra = toHex(
    details
      .get(1)
      .as_list()
      .get(0)
      .as_constr_plutus_data()
      .data()
      .get(0)
      .as_constr_plutus_data()
      .data()
      .get(0)
      .as_constr_plutus_data()
      .data()
      .get(0)
      .as_bytes()
  );
  const ras = toHex(
    details
      .get(1)
      .as_list()
      .get(0)
      .as_constr_plutus_data()
      .data()
      .get(0)
      .as_constr_plutus_data()
      .data()
      .get(1)
      .as_constr_plutus_data()
      .data()
      .get(0)
      .as_bytes()
  );
  const ma = toHex(
    details
      .get(1)
      .as_list()
      .get(1)
      .as_constr_plutus_data()
      .data()
      .get(0)
      .as_constr_plutus_data()
      .data()
      .get(0)
      .as_constr_plutus_data()
      .data()
      .get(0)
      .as_bytes()
  );
  const mas = toHex(
    details
      .get(1)
      .as_list()
      .get(1)
      .as_constr_plutus_data()
      .data()
      .get(0)
      .as_constr_plutus_data()
      .data()
      .get(1)
      .as_constr_plutus_data()
      .data()
      .get(0)
      .as_bytes()
  );
  const sas = toHex(
    details
      .get(1)
      .as_list()
      .get(2)
      .as_constr_plutus_data()
      .data()
      .get(0)
      .as_constr_plutus_data()
      .data()
      .get(1)
      .as_constr_plutus_data()
      .data()
      .get(0)
      .as_bytes()
  );
  const rp = details
    .get(1)
    .as_list()
    .get(0)
    .as_constr_plutus_data()
    .data()
    .get(1)
    .as_map()
    .get(Cardano.Instance.PlutusData.new_bytes(fromHex(toHex(""))))
    .as_constr_plutus_data()
    .data()
    .get(1)
    .as_map()
    .get(Cardano.Instance.PlutusData.new_bytes(fromHex(toHex(""))))
    .as_integer()
    .to_str();
  const mp = details
    .get(1)
    .as_list()
    .get(1)
    .as_constr_plutus_data()
    .data()
    .get(1)
    .as_map()
    .get(Cardano.Instance.PlutusData.new_bytes(fromHex(toHex(""))))
    .as_constr_plutus_data()
    .data()
    .get(1)
    .as_map()
    .get(Cardano.Instance.PlutusData.new_bytes(fromHex(toHex(""))))
    .as_integer()
    .to_str();
  const sp = details
    .get(1)
    .as_list()
    .get(2)
    .as_constr_plutus_data()
    .data()
    .get(1)
    .as_map()
    .get(Cardano.Instance.PlutusData.new_bytes(fromHex(toHex(""))))
    .as_constr_plutus_data()
    .data()
    .get(1)
    .as_map()
    .get(Cardano.Instance.PlutusData.new_bytes(fromHex(toHex(""))))
    .as_integer()
    .to_str();
  console.log(sp, rp, mp);
  return {
    sa: toHex(details.get(0).as_bytes()),
    ra,
    ma,
    sas,
    ras,
    mas,
    rp:
      (parseInt(rp) * 1000) / (parseInt(rp) + parseInt(mp) + parseInt(sp)) || 0,
    price: parseInt(rp) + parseInt(mp) + parseInt(sp),
  };
};

export const serializeUpdate = async ({ vh }) => {
  await Cardano.load();
  const fieldsNested = Cardano.Instance.PlutusList.new();

  fieldsNested.add(Cardano.Instance.PlutusData.new_bytes(fromHex(vh)));

  const fields = Cardano.Instance.PlutusList.new();

  fields.add(
    Cardano.Instance.PlutusData.new_constr_plutus_data(
      Cardano.Instance.ConstrPlutusData.new(
        Cardano.Instance.Int.new_i32(0),
        fieldsNested
      )
    )
  );

  const datum = Cardano.Instance.PlutusData.new_constr_plutus_data(
    Cardano.Instance.ConstrPlutusData.new(
      Cardano.Instance.Int.new_i32(0),
      fields
    )
  );

  return datum;
};
