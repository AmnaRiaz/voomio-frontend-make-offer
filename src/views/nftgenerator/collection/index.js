import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  Button,
  Grid,
  TextField,
  Dialog,
  CircularProgress,
} from "@mui/material";
import { Box, Stack } from "@mui/system";

import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";

import { addCollection } from "../../../redux/actions/main";
import { networkInfo, notification } from "../../../utils/utility";
import { uploadLogo } from "../../../redux/actions/user";

import componentStyles, {
  styles,
} from "/src/assets/theme/views/nftgenerator/upload";
import CloudUploadOutline from "/src/assets/image/component/nftGenerator/CloudUploadOutline.svg";
import UploadButton from "/src/assets/image/component/nftGenerator/UploadButton.svg";
import Category from "./category";

import collectionManagerContractABI from "../../../contracts/collectionManager.json";
// import { getCardanoNftPolicy } from "../../../services/api/api";
// import Cardano from "../../../cardano";
import Cardano from "../../../cardano/serialization-lib";

export const Collection = () => {
  const { chainId } = useWeb3React();

  const walletData = useSelector((state) => state.wallet);
  const userData = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);
  const [mintLoading, setMintLoading] = useState(false);
  const [collectionManagerContract, setCollectionManagerContract] =
    useState(null);
  const [collectionState, setCollectionState] = useState({
    name: "",
    createdBy: "",
    description: "",
    tokenName: "",
    payoutWallet: walletData.address,
    website: "",
    royaltyPercentage: "",
    blockchain: "",
    collectionType: "",
    symbol: "",
    coverUrl: "",
    bannerUrl: "",
    categories: [],
    ownerAddress: walletData.address,
    collectionAddress: "",
  });
  const [category, setCategory] = useState([]);

  const onChangeCollection = (value, type) => {
    setCollectionState({ ...collectionState, [type]: value });
  };

  const handleUploadCollectionLogo = async (e, type) => {
    if (e.target.files && e.target.files[0]) {
      const imageUrl = await uploadLogo(e.target.files);
      onChangeCollection(imageUrl.bucketUrl, type);
    } else {
      console.log("error!");
    }
  };

  const fromHex = (hex) => Buffer.from(hex, "hex");
  const toHex = (bytes) => Buffer.from(bytes).toString("hex");

  const generatePolicyId = async (type) => {
    const CardanoWasm = Cardano.Instance;
    const cardanoApi = window.cardano;
    if (type === "keyHash" || !type) {
      const changeAddress = await cardanoApi.getChangeAddress();
      const wasmChangeAddress = CardanoWasm.Address.from_bytes(
        fromHex(changeAddress)
      );
      const baseAddress =
        CardanoWasm.BaseAddress.from_address(wasmChangeAddress);
      const scriptPubKey = CardanoWasm.ScriptPubkey.new(
        baseAddress.payment_cred().to_keyhash()
      );
      const pubKeyScript =
        CardanoWasm.NativeScript.new_script_pubkey(scriptPubKey);
      const policyScripts = CardanoWasm.NativeScripts.new();
      policyScripts.add(pubKeyScript);
      const policyId = Buffer.from(pubKeyScript.hash(0).to_bytes()).toString(
        "hex"
      );
      return policyId;
    } else {
      const expiry = (await getLatestBlock()) + 1000;

      // We then need to add a timelock to ensure the NFT won't be minted again after the given expiry slot
      const timelock = CardanoWasm.TimelockExpiry.new(expiry);
      const timelockScript =
        CardanoWasm.NativeScript.new_timelock_expiry(timelock);
      const policyScripts = CardanoWasm.NativeScripts.new();
      policyScripts.add(timelockScript);

      const policyId = Buffer.from(timelockScript.hash(0).to_bytes()).toString(
        "hex"
      );
      return policyId;
    }
  };

  const getCollectionAddress = async (blockchain, collectionData) => {
    if (blockchain === "cardano") {
      // const response = await getCardanoNftPolicy(collectionData.name)
      // console.log(response);
      // if (response.error) {
      //     notification(response.error.message, 'error');
      //     return false;
      // }
      // return response.data.policyId;
      // return ForgeScript.withOneSignature(walletData.address);
      return await generatePolicyId();
    } else {
      const tx = await collectionManagerContract.methods
        .createNFTCollection(
          collectionData.name,
          collectionData.symbol,
          collectionData.coverUrl || collectionData.imageUrl,
          parseInt(collectionData.royaltyPercentage * 1000),
          walletData.address
        )
        .send({ from: walletData.address })
        .catch((err) => {
          return {};
        });
      console.log(tx.events);
      return tx.events?.CreatedNFTCollection?.returnValues?.nft;
    }
  };

  const createCollection = async (data) => {
    setLoading(true);
    const collectionAddress = await getCollectionAddress(
      walletData.network.toLowerCase(),
      data
    );
    if (collectionAddress === false) {
      setLoading(false);
      return;
    }
    console.log(collectionAddress);
    const obj = {
      name: data.name,
      createdBy: userData?.user?._id,
      description: data.description,
      tokenName: data.tokenName,
      payoutWallet: walletData.address,
      website: data.website,
      royaltyPercentage: data.royaltyPercentage * 1000 || 0,
      blockchain: walletData.network.toLowerCase(),
      collectionType: "collection",
      symbol: data.symbol,
      coverUrl: data.coverUrl || data.imageUrl,
      bannerUrl: data.bannerUrl,
      categories: data.categories,
      ownerAddress: walletData.address,
      collectionAddress,
    };
    const result = await addCollection(obj);
    console.log(result, "result");
    setLoading(false);
    if (result) {
      return result;
    } else {
      return false;
    }
  };

  const onAddCollection = async () => {
    if (
      collectionState.name &&
      collectionState.tokenName &&
      collectionState.categories.length > 0
    ) {
      setMintLoading(true);
      const result = await createCollection(collectionState);
      setMintLoading(false);
      if (result) {
        notification("Created a collection", "success");
        setCollectionState({
          name: "",
          createdBy: "",
          description: "",
          tokenName: "",
          payoutWallet: walletData.address,
          website: "",
          royaltyPercentage: "",
          blockchain: "",
          collectionType: "",
          symbol: "",
          coverUrl: "",
          bannerUrl: "",
          categories: [],
          ownerAddress: walletData.address,
          collectionAddress: "",
        });
        setCategory([]);
        return result;
      } else {
        notification("Failed to create Collection", "error");
      }
    } else {
      notification("please input the required* requirements exactly.", "error");
    }
  };

  useEffect(() => {
    onChangeCollection(category, "categories");
  }, [category]);

  useEffect(() => {
    if (walletData.network !== "CARDANO") {
      if (
        networkInfo[chainId] &&
        networkInfo[chainId].collectionManagerContract
      ) {
        window.ethereum.enable();
        const web3 = new Web3(window.web3.currentProvider);
        setCollectionManagerContract(
          new web3.eth.Contract(
            collectionManagerContractABI,
            networkInfo[chainId].collectionManagerContract
          )
        );
      }
    }
  }, [chainId]);

  useEffect(() => {
    async function fetchData() {
      await Cardano.load();
      return true;
    }
    fetchData();
  }, []);

  return (
    <Box sx={styles.generalSection}>
      <Dialog sx={styles.mintLoadingDialog} open={loading}>
        <Box sx={styles.mintLoadingTitle} component={"span"}>
          Please wait
        </Box>
        <Box sx={styles.mintLoadingBox}>
          <CircularProgress />
        </Box>
      </Dialog>
      <Box mt={2} sx={styles.generalHeader}>
        <Box component={"span"}>Create New Collection</Box>
      </Box>
      <Box sx={styles.generalContent} mt={6}>
        <Box mt={4} sx={styles.generalUpload}>
          <Box sx={styles.generalUploadImg}>
            {collectionState.bannerUrl !== "" ? (
              <Box>
                <Box
                  component={"img"}
                  src={collectionState.bannerUrl}
                  sx={styles.uploadBannerImage}
                ></Box>
              </Box>
            ) : (
              <Box sx={styles.uploadBannerImage}></Box>
            )}

            {collectionState.coverUrl ? (
              <Box sx={styles.uploadCoverBox}>
                <Box
                  component={"img"}
                  src={collectionState.coverUrl}
                  sx={styles.uploadCoverImage}
                ></Box>
              </Box>
            ) : (
              <Box sx={styles.uploadCoverBox}>
                <Box
                  component={"img"}
                  src={UploadButton.src}
                  sx={styles.uploadCoverImage}
                ></Box>
              </Box>
            )}
          </Box>
          <Box sx={styles.generalUploadContent} mt={2}>
            <Box sx={styles.generalUploadCollection}>
              {collectionState.name ? collectionState.name : "Collection Name"}
            </Box>
            <Box sx={styles.generalUploadDetail} mt={2}>
              {collectionState.description
                ? collectionState.description
                : "Collection Description"}
            </Box>
          </Box>
        </Box>
        <Grid mt={8} container spacing={2} sx={styles.generalInput}>
          <Grid item xs={8}>
            <Box mb={4} sx={styles.generalFormControl}>
              <Box mb={1} component={"label"} display="flex">
                Collection Name <Box sx={{ color: "red" }}>*</Box>
              </Box>
              <TextField
                value={collectionState.name}
                onChange={(e) => {
                  onChangeCollection(e.target.value, "name");
                }}
                sx={styles.generalFormTextField}
                placeholder="My new collection"
                variant="outlined"
                required
              />
            </Box>
            <Box mb={4} sx={styles.generalFormControl}>
              <Box mb={1} component={"label"}>
                Description
              </Box>
              <TextField
                value={collectionState.description}
                onChange={(e) => {
                  onChangeCollection(e.target.value, "description");
                }}
                multiline
                rows={3}
                sx={styles.generalFormTextField}
                placeholder="A short description"
                variant="outlined"
              />
            </Box>
            <Box mb={4} sx={styles.generalFormControl}>
              <Box mb={1} component={"label"}>
                Website
              </Box>
              <TextField
                value={collectionState.website}
                onChange={(e) => {
                  onChangeCollection(e.target.value, "website");
                }}
                sx={styles.generalFormTextField}
                placeholder="https://"
                variant="outlined"
              />
            </Box>
            <Box mb={4} sx={styles.generalFormControl}>
              <Box mb={1} component={"label"} display="flex">
                Token Name <Box sx={{ color: "red" }}>*</Box>
              </Box>
              <TextField
                value={collectionState.tokenName}
                onChange={(e) => {
                  onChangeCollection(e.target.value, "tokenName");
                }}
                sx={styles.generalFormTextField}
                placeholder="Token{{id}}"
                variant="outlined"
              />
            </Box>
            <Stack
              flexDirection={{ md: "row", xs: "column" }}
              justifyContent={"space-between"}
            >
              <Box mb={4} sx={styles.generalFormControl}>
                <Box mb={1} component={"label"} display="flex">
                  Payout Wallet <Box sx={{ color: "red" }}>*</Box>
                </Box>
                <TextField
                  value={collectionState.payoutWallet}
                  onChange={(e) => {
                    onChangeCollection(e.target.value, "payoutWallet");
                  }}
                  sx={styles.generalFormTextField}
                  placeholder="0X000..."
                  variant="outlined"
                />
              </Box>
              <Box sx={styles.generalFormControl}>
                <Box mb={1} component={"label"}>
                  Royalty Percentage
                </Box>
                <TextField
                  type="number"
                  value={collectionState.royaltyPercentage}
                  onChange={(e) => {
                    onChangeCollection(e.target.value, "royaltyPercentage");
                  }}
                  sx={styles.generalFormTextField}
                  placeholder="%"
                  variant="outlined"
                />
              </Box>
            </Stack>
            <Category category={category} setCategory={setCategory} />
            <Stack flexDirection={"row"} mt={4}>
              <Button
                onClick={() => {
                  onAddCollection();
                }}
                sx={styles.generalFormAddButton}
              >
                Add Collection
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={4} sx={styles.generalRight}>
            <Box mt={8} sx={styles.generalForm}>
              <Box mb={1} component={"span"} display="flex">
                Collection image<Box sx={{ color: "red" }}>*</Box>
              </Box>
              <Button
                component="label"
                startIcon={
                  <Box component={"img"} src={CloudUploadOutline.src} />
                }
                sx={styles.generalUploadButton}
              >
                Upload
                <input
                  onChange={(e) => {
                    handleUploadCollectionLogo(e, "coverUrl");
                  }}
                  hidden
                  accept="image/*"
                  multiple
                  type="file"
                />
              </Button>
            </Box>
            <Box mt={8} sx={styles.generalForm}>
              <Box mb={1} component={"span"} display="flex">
                Banner image<Box sx={{ color: "red" }}>*</Box>
              </Box>
              <Button
                component="label"
                startIcon={
                  <Box component={"img"} src={CloudUploadOutline.src} />
                }
                sx={styles.generalUploadButton}
              >
                Upload
                <input
                  onChange={(e) => {
                    handleUploadCollectionLogo(e, "bannerUrl");
                  }}
                  hidden
                  accept="image/*"
                  multiple
                  type="file"
                />
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
