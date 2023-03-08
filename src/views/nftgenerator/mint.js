import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  TextField,
  Stack,
  Button,
  IconButton,
  Dialog,
  CircularProgress,
} from "@mui/material";
import { Box } from "@mui/system";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import { Transaction, BrowserWallet } from "@meshsdk/core";

import { styles } from "../../assets/theme/views/nftgenerator/mint";
import { notification } from "../../utils/utility";

import { addNft, uploadMetaDataAction } from "../../redux/actions/main";

import nftContractABI from "../../contracts/nft.json";
import DeleteIcon from "/src/assets/image/component/nftGenerator/DeleteIcon.svg";
import Cardano from "../../cardano/serialization-lib";

const MintCmp = (props) => {
  const { newNftItem } = props;
  const [list, setList] = useState(newNftItem.attributes);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [nftContract, setNftContract] = useState(null);
  const userData = useSelector((state) => state.user);
  const walletData = useSelector((state) => state.wallet);
  const { chainId } = useWeb3React();

  const fromHex = (hex) => Buffer.from(hex, "hex");
  const toHex = (bytes) => Buffer.from(bytes).toString("hex");

  const mintEvmNFT = async (metadata) => {
    let collectionAddress = newNftItem.collectionAddress;
    if (!collectionAddress) {
      notification("Select a Collection", "error");
      return { tokenId: "", transactionHash: "" };
    }
    const result = await uploadMetaDataAction(metadata);
    if (result && result.metadataUrl) {
      console.log(nftContract);
      const tx = await nftContract.methods
        .safeMint(walletData.address, result.metadataUrl)
        .send({ from: walletData.address })
        .catch((err) => {
          return { tokenId: "", transactionHash: "" };
        });
      if (tx) {
        let tokenId = result.id;
        if (
          tx.events &&
          tx.events.NewNFT &&
          tx.events.NewNFT.returnValues &&
          tx.events.NewNFT.returnValues.tokenId
        ) {
          tokenId = tx.events.NewNFT.returnValues.tokenId;
        }
        return { tokenId, transactionHash: tx.transactionHash };
      } else {
        return { tokenId: "", transactionHash: "" };
      }
    } else {
      notification("Failed upload metadata", "error");
      return { tokenId: "", transactionHash: "" };
    }
  };

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

  const mintCardanoNFT = async (newNftItem) => {
    let policyId = newNftItem.collectionAddress;
    if (!policyId) {
      notification("Select a Collection", "error");
      return { assetName: "", transactionHash: "" };
    }
    let tokenId = newNftItem.tokenId;
    const assetName = newNftItem.name;

    const CardanoWasm = Cardano.Instance;
    const cardanoApi = window.cardano;
    const txBuilder = getTxBuilder();
    const hexInputUtxos = await cardanoApi.getUtxos();
    // add utxos for amount
    const txInputsBuilder = CardanoWasm.TxInputsBuilder.new();
    for (let i = 0; i < hexInputUtxos.length; i++) {
      const wasmUtxo = CardanoWasm.TransactionUnspentOutput.from_bytes(
        fromHex(hexInputUtxos[i])
      );
      txInputsBuilder.add_input(
        wasmUtxo.output().address(),
        wasmUtxo.input(),
        wasmUtxo.output().amount()
      );
    }

    const changeAddress = await cardanoApi.getChangeAddress();
    const wasmChangeAddress = CardanoWasm.Address.from_bytes(
      fromHex(changeAddress)
    );
    const baseAddress = CardanoWasm.BaseAddress.from_address(wasmChangeAddress);
    const scriptPubKey = CardanoWasm.ScriptPubkey.new(
      baseAddress.payment_cred().to_keyhash()
    );
    const pubKeyScript =
      CardanoWasm.NativeScript.new_script_pubkey(scriptPubKey);
    const policyScripts = CardanoWasm.NativeScripts.new();
    policyScripts.add(pubKeyScript);

    txBuilder.set_inputs(txInputsBuilder);
    let outputBuilder = CardanoWasm.TransactionOutputBuilder.new();
    outputBuilder = outputBuilder.with_address(wasmChangeAddress);
    const wasmAssetName = CardanoWasm.AssetName.new(
      Buffer.from(`${assetName}`, "utf8")
    );
    console.log(wasmAssetName);
    txBuilder.add_mint_asset_and_output_min_required_coin(
      pubKeyScript,
      wasmAssetName,
      CardanoWasm.Int.new_i32(1),
      outputBuilder.next()
    );

    const assetNameHash2 = wasmAssetName.to_hex();
    const assetNameHash = toHex(assetName);
    console.log("assetNameHash", assetNameHash, assetNameHash2);
    const assetMetadata = {
      [policyId]: {
        [assetNameHash]: {
          id: tokenId,
          name: assetName,
          // image: newNftItem.ipfsUrl,
          // mediaType: "image/jpg",
          description: newNftItem.description,
          website: newNftItem.website,
        },
      },
    };

    txBuilder.add_json_metadatum(
      CardanoWasm.BigNum.from_str("721"),
      JSON.stringify(assetMetadata)
    );
    txBuilder.add_change_if_needed(wasmChangeAddress);
    console.log(txBuilder, "tx builder");

    const unsignedTransactionHex = toHex(txBuilder.build_tx().to_bytes());

    const wallet = await BrowserWallet.enable(walletData.wallet);
    const signedTx = await wallet.signTx(unsignedTransactionHex);
    const txHash = await wallet.submitTx(signedTx);
    return {
      transactionHash: txHash,
      assetName: assetNameHash,
    };
  };

  const onGenerate = async () => {
    if (newNftItem.name && newNftItem.imageUrl) {
      setLoading(true);
      const finalNftData = {
        ...newNftItem,
        attributes: list,
        blockchain: walletData.network.toLowerCase(),
        ownerAddress: walletData.address,
        chainId: walletData.chainId,
        currency: walletData.currencyName,
        createdBy: userData?.user?._id,
        contentType: "image/jpeg",
        nftType: "ERC721",
        price: 0,
        royaltyPercentage: 20,
        isForSale: false,
      };

      if (walletData.network !== "CARDANO") {
        const { tokenId, transactionHash } = await mintEvmNFT(finalNftData);
        finalNftData.tokenId = tokenId;
        finalNftData.transactionHash = transactionHash;
      } else {
        if (walletData.balance === 0) {
          setLoading(false);
          notification("Your balance is empty!", "error");
          return;
        }

        try {
          console.log(finalNftData);
          const { transactionHash, assetName } = await mintCardanoNFT(
            finalNftData
          );
          finalNftData.transactionHash = transactionHash;
          finalNftData.assetName = assetName;
          finalNftData.assetId = finalNftData.collectionAddress + assetName;
        } catch (e) {
          console.log(e);
          setLoading(false);
          notification("NFT mint failed! Please check your balance.", "error");
          return;
        }
      }
      setLoading(false);

      if (finalNftData.transactionHash) {
        const result = await addNft(finalNftData);
        if (result) {
          notification("Minted New NFT Success", "success");
          navigate("/profile/" + userData?.user?._id);
        }
      } else {
        notification("Failed confirm transaction", "error");
      }
    } else {
      notification("please input the required* requirements exactly.", "error");
    }
  };

  const updateListValue = (value, type, index) => {
    setList(
      list.map((l, ind) => {
        if (ind === index) {
          l[type] = value;
        }

        return l;
      })
    );
  };

  useEffect(() => {
    if (walletData.network !== "CARDANO") {
      if (newNftItem.collectionAddress) {
        window.ethereum.enable();
        const web3 = new Web3(window.web3.currentProvider);
        setNftContract(
          new web3.eth.Contract(nftContractABI, newNftItem.collectionAddress)
        );
      }
    }
  }, [newNftItem.collectionAddress]);

  useEffect(() => {
    async function fetchData() {
      await Cardano.load();
      return true;
    }
    fetchData();
  }, []);

  return (
    <Box sx={styles.generateSection}>
      <Dialog sx={styles.mintLoadingDialog} open={loading}>
        <Box sx={styles.mintLoadingTitle} component={"span"}>
          Please wait
        </Box>
        <Box sx={styles.mintLoadingBox}>
          <CircularProgress />
        </Box>
      </Dialog>
      <Box sx={styles.properties}>
        <Box mb={5} component={"span"} sx={styles.propertyTitle}>
          Properties
        </Box>
        {list.map((item, index) => {
          return (
            <Box key={index} mb={3} sx={styles.propertyList}>
              <Box mr={2} sx={styles.formControl}>
                <Box mb={1} component={"label"}>
                  Type
                </Box>
                <TextField
                  value={item.type}
                  onChange={(e) => {
                    updateListValue(e.target.value, "type", index);
                  }}
                  sx={styles.formTextField}
                  placeholder="Property type"
                  variant="outlined"
                />
              </Box>
              <Box mr={2} sx={styles.formControl}>
                <Box mb={1} component={"label"}>
                  Value
                </Box>
                <TextField
                  value={item.value}
                  onChange={(e) => {
                    updateListValue(e.target.value, "value", index);
                  }}
                  sx={styles.formTextField}
                  placeholder="Property value"
                  variant="outlined"
                />
              </Box>
              <IconButton
                onClick={() => {
                  setList(list.filter((l, ind) => ind !== index));
                }}
                sx={styles.deleteButton}
                color="primary"
                size="large"
              >
                <Box component={"img"} src={DeleteIcon.src} />
              </IconButton>
            </Box>
          );
        })}
        <Box sx={styles.addMore} mb={5}>
          <Button
            onClick={() => {
              setList([...list, { type: "", value: "" }]);
            }}
            sx={styles.addButton}
            variant="contained"
            color="primary"
          >
            Add more
          </Button>
        </Box>
        <Box sx={styles.footer}>
          <Stack width={"100%"} mb={3} sx={styles.formControl}>
            <Stack mb={1} component={"label"}>
              Current network
            </Stack>
            <TextField
              value={walletData.network}
              disabled
              sx={styles.formTextField}
              variant="outlined"
            />
          </Stack>
          <Box sx={styles.generate}>
            <Button
              onClick={() => {
                onGenerate();
              }}
              sx={styles.generateButton}
              variant="contained"
              color="primary"
            >
              Mint
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MintCmp;
