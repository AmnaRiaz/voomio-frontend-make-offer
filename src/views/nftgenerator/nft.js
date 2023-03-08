import { useState } from "react";
import { useSelector } from "react-redux";

// @material-ui/core components
import { makeStyles } from "@mui/styles";
import componentStyles, {
  styles,
} from "/src/assets/theme/views/nftgenerator/upload";

import {
  Box,
  Grid,
  Stack,
  Dialog,
  Container,
  CircularProgress,
  Button,
} from "@mui/material";
import CardanoModule from "../../cardano/serialization-lib";

import DefaultNftImage from "/src/assets/image/component/nftGenerator/UploadButton.svg";

import { addCollection, uploadImageToIpfs } from "../../redux/actions/main";

import CreateCmp from "./create";
import MintCmp from "./mint";

const useStyles = makeStyles(componentStyles);

const NftGenerator = () => {
  const classes = useStyles();

  const userData = useSelector((state) => state.user);
  const walletData = useSelector((state) => state.wallet);
  const [mintLoading, setMintLoading] = useState(false);

  const [newNftItem, setNewNftItem] = useState({
    name: "",
    description: "",
    imageUrl: "",
    collectionId: "",
    collectionAddress: "",
    attributes: [{ type: "", value: "" }],
    blockchain: walletData.network.toLowerCase(),
    website: "",
  });

  const fromHex = (hex) => Buffer.from(hex, "hex");

  const getCardanoPolicyScript = async () => {
    await CardanoModule.load();
    const CardanoWasm = CardanoModule.Instance;
    const cardanoApi = window.cardano;
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
    return { policyScripts, pubKeyScript };
  };
  const getCollectionAddress = async (blockchain) => {
    if (blockchain === "cardano") {
      const { pubKeyScript } = await getCardanoPolicyScript();
      const policyId = Buffer.from(pubKeyScript.hash().to_bytes()).toString(
        "hex"
      );
      return policyId;
    } else {
      return walletData.address;
    }
  };

  const createCollection = async (data) => {
    const policyId = await getCollectionAddress(
      walletData.network.toLowerCase()
    );
    const obj = {
      name: data.name,
      createdBy: userData?.user?._id,
      description: data.description,
      tokenName: data.tokenName,
      tokenCount: 1,
      payoutWallet: walletData.address,
      website: data.website,
      royaltyPercentage: data.royaltyPercentage || 25,
      blockchain: walletData.network.toLowerCase(),
      collectionType: "collection",
      symbol: data.symbol,
      coverUrl: data.coverUrl || data.imageUrl,
      ownerAddress: walletData.address,
      collectionAddress: policyId,
    };
    const result = await addCollection(obj);
    if (result) {
      return result;
    } else {
      return false;
    }
  };

  const handleUploadFile = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const uploadImage = await uploadImageToIpfs(e.target.files[0]);
      setNewNftItem({
        ...newNftItem,
        imageUrl: uploadImage.bucketUrl,
        cid: uploadImage.cid,
        ipfsUrl: uploadImage.ipfsUrl,
        bucketUrl: uploadImage.bucketUrl,
      });
    } else {
      console.log("error!");
    }
  };

  return (
    <Container maxWidth="xl" className={classes.container}>
      <Dialog sx={styles.mintLoadingDialog} open={mintLoading}>
        <Box sx={styles.mintLoadingTitle} component={"span"}>
          Please wait
        </Box>
        <Box sx={styles.mintLoadingBox}>
          <CircularProgress />
        </Box>
      </Dialog>

      <Box mt={{ xl: 4, xs: 2 }}>
        <Grid container direction="row">
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Box className={classes.uploadSection}>
              <Grid container flexDirection={"row"}>
                <Grid item xs={6}>
                  <Box
                    mt={3}
                    className={classes.dropzone}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Box
                      component="img"
                      sx={styles.previewImage}
                      alt={"upload image"}
                      src={
                        newNftItem.imageUrl
                          ? newNftItem.imageUrl
                          : DefaultNftImage.src
                      }
                    />
                    <Box
                      mt={3}
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <p style={{ display: "flex" }}>
                        Choose your collection folder
                        <Box sx={{ color: "red" }}>*</Box>
                      </p>
                      <Button
                        size="large"
                        component="label"
                        variant="contained"
                        color="primary"
                      >
                        Choose file...
                        <input
                          hidden
                          onChange={(e) => {
                            handleUploadFile(e);
                          }}
                          accept="image/*"
                          type="file"
                        />
                      </Button>
                    </Box>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={6}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  flexDirection="column"
                >
                  <Box className={classes.nftName}>
                    {newNftItem.name ? newNftItem.name : "NFT Name"}
                  </Box>
                  <Box mt={2} className={classes.nftDescription}>
                    {newNftItem.description
                      ? newNftItem.description
                      : "NFT Description"}
                  </Box>
                </Grid>
              </Grid>

              <Box mt={{ xl: 5, xs: 3 }} className={classes.successDropzone}>
                <Stack>
                  <Box
                    mb={{ xs: 5 }}
                    mt={10}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      mt={{ md: 3, xs: 3 }}
                      sx={{ width: "100%" }}
                      textAlign={"center"}
                    >
                      <CreateCmp
                        newNftItem={newNftItem}
                        setNewNftItem={setNewNftItem}
                      />
                    </Box>
                  </Box>
                </Stack>
              </Box>
              <Box mt={{ xl: 0, xs: 3 }} className={classes.successDropzone}>
                <MintCmp
                  newNftItem={newNftItem}
                  createCollection={createCollection}
                  getCardanoPolicyScript={getCardanoPolicyScript}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default NftGenerator;
