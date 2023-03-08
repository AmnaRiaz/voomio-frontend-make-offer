import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { styles } from "/src/assets/theme/views/nftgenerator/cardano";
import { Box, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";

import Cardano from "/src/cardano";
import { getLatestBlock } from "/src/cardano/blockfrost-api";

import { notification } from "/src/utils/utility";
import { addNft } from "/src/redux/actions/main";

import TimeLockIcon from "/src/assets/image/component/nftGenerator/TimeLock.svg";
import KeyIcon from "/src/assets/image/component/nftGenerator/Key.svg";

const CardanoCmp = () => {
  const navigate = useNavigate();

  const walletData = useSelector((state) => state.wallet);
  const userData = useSelector((state) => state.user);
  const [isMounted, setIsMounted] = useState(false);
  const [keyHashPolicyId, setKeyHashPolicyId] = useState("");
  const [timeLockPolicyId, setTimeLockPolicyId] = useState("");
  const [policyScript, setPolicyScript] = useState("");
  const [nativeScript, setNativeScript] = useState("");
  const [ttl, setTtl] = useState(0);

  const fromHex = (hex) => Buffer.from(hex, "hex");
  const toHex = (bytes) => Buffer.from(bytes).toString("hex");

  const getTxBuilder = () =>
    Cardano.Instance.TransactionBuilder.new(
      Cardano.Instance.TransactionBuilderConfigBuilder.new()
        .fee_algo(
          Cardano.Instance.LinearFee.new(
            Cardano.Instance.BigNum.from_str("44"),
            Cardano.Instance.BigNum.from_str("155381")
          )
        )
        .coins_per_utxo_word(Cardano.Instance.BigNum.from_str("34482"))
        .pool_deposit(Cardano.Instance.BigNum.from_str("500000000"))
        .key_deposit(Cardano.Instance.BigNum.from_str("2000000"))
        .max_value_size(5000)
        .max_tx_size(16384)
        .build()
    );

  const getTtl = async () => (await getLatestBlock()) + 1000;

  const mintNFT = async (type) => {
    const walletDetails = walletData;
    let policyId;
    const NFTIndex = 0;
    const assetName = "nftData.tokenName";
    const CardanoWasm = Cardano.Instance;
    const cardanoApi = window.cardano;
    const txBuilder = getTxBuilder();
    const hexInputUtxos = await cardanoApi.getUtxos();
    // add utxos for amount
    const txInputsBuilder = CardanoWasm.TxInputsBuilder.new();
    // let wasmKeyHash
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < hexInputUtxos.length; i++) {
      const wasmUtxo = CardanoWasm.TransactionUnspentOutput.from_bytes(
        fromHex(hexInputUtxos[i])
      );
      txInputsBuilder.add_input(
        wasmUtxo.output().address(),
        wasmUtxo.input(),
        wasmUtxo.output().amount()
      );
      // if (type === 'keyHash' && i === 0) {
      //   wasmKeyHash = CardanoWasm.BaseAddress.from_address(wasmUtxo.output().address())
      //     .payment_cred()
      //     .to_keyhash()
      //   // Add the keyhash script to ensure the NFT can only be minted by the corresponding wallet
      //   const keyHashScript = CardanoWasm.NativeScript.new_script_pubkey(
      //     CardanoWasm.ScriptPubkey.new(wasmKeyHash)
      //   )
      // }
    }
    if (type === "keyHash") {
      console.log(" keyHash value is ========>", keyHashPolicyId);
      policyId = keyHashPolicyId;
    } else {
      console.log(" timeLock value is ========>", timeLockPolicyId);
      txBuilder.set_ttl(ttl);
      policyId = timeLockPolicyId;
    }
    console.log(nativeScript, policyScript, "native and policy script");
    const metadataObj = {
      [policyId]: {
        [assetName]: {
          description: "nftData.description",
          name: "nftData.tokenName",
          id: NFTIndex,
          image: `ipfs://${"image.cid"}`,
          website: "nftData.website",
        },
      },
    };

    txBuilder.set_inputs(txInputsBuilder);
    const changeAddress = await cardanoApi.getChangeAddress();
    const wasmChangeAddress = CardanoWasm.Address.from_bytes(
      fromHex(changeAddress)
    );

    let outputBuilder = CardanoWasm.TransactionOutputBuilder.new();
    outputBuilder = outputBuilder.with_address(wasmChangeAddress);
    const wasmAssetName = CardanoWasm.AssetName.new(
      Buffer.from(`${assetName} #${NFTIndex.toString()}`, "utf8")
    );
    console.log(wasmAssetName);
    txBuilder.add_mint_asset_and_output_min_required_coin(
      policyScript,
      wasmAssetName,
      CardanoWasm.Int.new_i32(1),
      outputBuilder.next()
    );

    txBuilder.add_json_metadatum(
      CardanoWasm.BigNum.from_str("721"),
      JSON.stringify(metadataObj)
    );
    txBuilder.add_change_if_needed(wasmChangeAddress);
    console.log(txBuilder, "tx builder");

    const unsignedTransactionHex = toHex(txBuilder.build_tx().to_bytes());
    console.log(unsignedTransactionHex, "utx builder");

    cardanoApi
      .signTx(unsignedTransactionHex)
      .then(async (witnessSetHex) => {
        const witnessSet = CardanoWasm.TransactionWitnessSet.from_bytes(
          fromHex(witnessSetHex)
        );
        witnessSet.set_native_scripts(nativeScript);
        const tx = CardanoWasm.Transaction.from_bytes(
          fromHex(unsignedTransactionHex)
        );
        const transaction = CardanoWasm.Transaction.new(
          tx.body(),
          witnessSet,
          tx.auxiliary_data()
        );
        const transactionHex = toHex(transaction.to_bytes());
        const submitTx = await cardanoApi.submitTx(transactionHex);
        console.log("submitted tx", submitTx);
        await addNft({
          tokenId: `#${NFTIndex.toString()}`,
          transactionHash: submitTx,
          contentType: "image/jpeg",
          name: assetName,
          imageUrl: "image.bucketUrl",
          cid: "image.cid",
          ipfsUrl: "image.ipfsUrl",
          nftType: "ERC-721",
          ownerAddress: walletDetails.address,
          isForSale: false,
          description: "nftData.description",
          price: 0,
          blockchain: "cardano",
          currency: "ADA",
          collectionId: "nftData._id",
          collectionAddress: policyId,
          royaltyPercentage: "nftData.royaltyPercentage",
          createdBy: userData?.user?._id,
        });
        notification("Minted New NFT Success", "success");
        navigate("/profile/" + userData?.user?._id);
      })
      .catch((error) => {
        notification(error.info, "error");
      });
  };

  const clickSelect = async (type) => {
    const CardanoWasm = Cardano.Instance;
    const cardanoApi = window.cardano;
    if (type === "keyHash") {
      const changeAddress = await cardanoApi.getChangeAddress();
      const wasmChangeAddress = CardanoWasm.Address.from_bytes(
        fromHex(changeAddress)
      );
      const baseAddress =
        CardanoWasm.BaseAddress.from_address(wasmChangeAddress);
      console.log(changeAddress, wasmChangeAddress, baseAddress);
      const scriptPubKey = CardanoWasm.ScriptPubkey.new(
        baseAddress.payment_cred().to_keyhash()
      );
      const pubKeyScript =
        CardanoWasm.NativeScript.new_script_pubkey(scriptPubKey);
      const policyScripts = CardanoWasm.NativeScripts.new();
      policyScripts.add(pubKeyScript);
      console.log("pubKeyScript: >>", pubKeyScript);
      console.log("policyScripts :>> ", policyScripts);
      const policyId = Buffer.from(pubKeyScript.hash(0).to_bytes()).toString(
        "hex"
      );
      console.log("policyId :>> ", policyId);

      setKeyHashPolicyId(policyId);
      setPolicyScript(pubKeyScript);
      setNativeScript(policyScripts);
    } else {
      const expiry = await getTtl();
      setTtl(expiry);

      // We then need to add a timelock to ensure the NFT won't be minted again after the given expiry slot
      const timelock = CardanoWasm.TimelockExpiry.new(expiry);
      const timelockScript =
        CardanoWasm.NativeScript.new_timelock_expiry(timelock);
      const policyScripts = CardanoWasm.NativeScripts.new();
      policyScripts.add(timelockScript);

      console.log("policyScripts :>> ", policyScripts);
      const policyId = Buffer.from(timelockScript.hash(0).to_bytes()).toString(
        "hex"
      );
      console.log("policyId :>> ", policyId);

      setTimeLockPolicyId(policyId);
      setPolicyScript(timelockScript);
      setNativeScript(policyScripts);
    }
  };

  useEffect(() => {
    async function fetchData() {
      await Cardano.load();
      setIsMounted(true);
      return true;
    }
    fetchData();
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Box>
      <Box sx={styles.cardanoSection} my={5}>
        <Box mr={5} sx={styles.card}>
          <Box sx={styles.content}>
            <Box
              sx={styles.headerImage}
              component={"img"}
              src={TimeLockIcon.src}
            />
            <Box mt={2} sx={styles.headerTitle} component={"span"}>
              Time Lock Policy ID
            </Box>
            <Box mt={1} sx={styles.headerDescription}>
              After that time no NFTs through that Policy ID.
            </Box>
            {timeLockPolicyId && (
              <div className="font-TerminaRegular  text-black-30 flex flex-col">
                <p> {timeLockPolicyId.slice(0, 39)}</p>
                <p> {timeLockPolicyId.slice(39)}</p>
              </div>
            )}
          </Box>
          <Box sx={styles.footer} mt={1}>
            {timeLockPolicyId.length === 0 ? (
              <Button
                onClick={() => {
                  clickSelect("timelock");
                }}
                sx={styles.selectButton}
                variant="contained"
                color="primary"
              >
                Select
              </Button>
            ) : (
              <Button
                onClick={() => {
                  mintNFT("timelock");
                }}
                sx={styles.selectButton}
                variant="contained"
                color="primary"
              >
                Mint
              </Button>
            )}
          </Box>
        </Box>
        <Box sx={styles.card}>
          <Box sx={styles.content}>
            <Box sx={styles.headerImage} component={"img"} src={KeyIcon.src} />
            <Box mt={2} sx={styles.headerTitle} component={"span"}>
              Key Hash Policy ID
            </Box>
            <Box mt={1} sx={styles.headerDescription}>
              Only specific address can mint NFTs
            </Box>
            {keyHashPolicyId && (
              <div className="font-TerminaRegular  text-black-30 flex flex-col">
                <p>{keyHashPolicyId.slice(0, 39)}</p>
                <p>{keyHashPolicyId.slice(39)}</p>
              </div>
            )}
          </Box>
          <Box sx={styles.footer} mt={1}>
            {keyHashPolicyId.length === 0 ? (
              <Button
                onClick={() => {
                  clickSelect("keyHash");
                }}
                sx={styles.selectButton}
                variant="contained"
                color="primary"
              >
                Select
              </Button>
            ) : (
              <Button
                onClick={() => {
                  mintNFT("keyHash");
                }}
                sx={styles.selectButton}
                variant="contained"
                color="primary"
              >
                Mint
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CardanoCmp;
