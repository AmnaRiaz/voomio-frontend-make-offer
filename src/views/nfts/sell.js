import { useEffect, useState } from "react";
import { useNavigate, useParams, useRouteLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useWeb3React } from "@web3-react/core";
import { Transaction, Asset, BrowserWallet } from "@meshsdk/core";
import Web3 from "web3";
import BigNumber from "bignumber.js";

// @mui/material components
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import ButtonGroup from "@mui/material/ButtonGroup";
import CircularProgress from "@mui/material/CircularProgress";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
//MUI icon
import TimelapseIcon from "@mui/icons-material/Timelapse";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// SVG img
import NFTcheck from "/src/assets/image/views/profile/detail/NFTcheck.svg";
// Contract ABI
import mintNFTContractABI from "../../contracts/nft.json";
import marketplaceContractABI from "../../contracts/marketplace.json";

import componentStyles from "/src/assets/theme/views/profile/detail";
import { styles } from "/src/assets/theme/views/nftgenerator/upload";
import {
  getAssetsDetail,
  getAllNfts,
  addBuySell,
} from "../../redux/actions/main";
import Cardano from "../../cardano/serialization-lib";

// import { listToken } from "../../cardano/token";
import {
  getChainId,
  replaceIpfsUrl,
  sliceLongString,
  networkInfo,
  notification,
  getBlockchainDecimalNumber,
} from "../../utils/utility";
import { switchNetwork } from "../../utils/connectors";
import { marketAddress, secretDatum } from "../../config";
import { buildListingTransaction } from "../../services/api/api";
import useWasm from "../../hooks/useWasm";
import { getSellDatum } from "../../utils/cardano";

const useStyles = makeStyles(componentStyles);

const SellDetails = () => {
  const params = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wasm = useWasm();
  const { chainId } = useWeb3React();

  const walletData = useSelector((state) => state.wallet);
  const userData = useSelector((state) => state.user);
  const [price, setPrice] = useState(0);
  const [endDate, setEndDate] = useState(new Date());
  const [saleType, setSaleType] = useState(0);
  const [contract, setContract] = useState(null);
  const [mintContract, setMintContract] = useState(null);
  const [mintLoading, setLoading] = useState(false);
  const [potentialEarnings, setPotentialEarnings] = useState(0);
  const [creatorFee, setCreatorFee] = useState(0);
  const [marketplaceFee, setMarketplaceFee] = useState(0);
  const [nftItem, setNftItem] = useState({
    blockchain: "",
    seller: "",
    tokenId: "",
    contractAddress: "",
  });

  const onChangePrice = (e) => {
    const price = Number(e.target.value);
    const marketplaceAmount = price * 0.025;
    const royaltiesAmount = (price * nftItem.royaltyPercentage) / 100;
    const isCardano = walletData.network.toUpperCase() === "CARDANO";
    const potentialEarnings =
      price -
      (isCardano && marketplaceAmount < 1 ? 1 : marketplaceAmount) -
      (isCardano && royaltiesAmount < 1 ? 1 : royaltiesAmount);
    setPrice(price);
    setPotentialEarnings(potentialEarnings);
    setMarketplaceFee(
      isCardano && marketplaceAmount < 1 ? 1 : marketplaceAmount
    );
    setCreatorFee(isCardano && royaltiesAmount < 1 ? 1 : royaltiesAmount);
  };

  const gotoDetails = (id) => {
    navigate("/assets/" + id);
    window.scrollTo(0, 0);
  };

  const checkApproved = async () => {
    try {
      const marketplaceContract =
        networkInfo[getChainId(nftItem.blockchain)].marketplaceContract;
      const tx = await mintContract.methods
        .isApprovedForAll(walletData.address, marketplaceContract)
        .call();
      return tx;
    } catch (error) {
      console.log("getApproved: ", error);
      return false;
    }
  };

  const setApprovalForAll = async (_address) => {
    try {
      console.log(_address);
      const tx = await mintContract.methods
        .setApprovalForAll(_address, true)
        .send({ from: walletData.address });
      console.log(tx);
      return tx;
    } catch (error) {
      console.log("approve error: ", error);
      return false;
    }
  };

  const addMarketItem = async (nftContractAddress, _tokenId, _price) => {
    try {
      const price = new BigNumber(_price).times(1e18).toString();
      console.log(nftContractAddress, _tokenId, _price, "99999");
      const tx = await contract.methods
        .createSell(
          nftContractAddress,
          _tokenId,
          "0x0000000000000000000000000000000000000000",
          price
        )
        .send({ from: walletData.address });
      return tx;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const sellRequest = () => {
    const result = {
      nftId: nftItem._id,
      sellerId: userData?.user?._id,
      startFrom: Date.now(),
      endsIn: new Date(endDate).getTime(),
      auctionType: saleType === 0 ? "fixed" : "auction",
      price: getBlockchainDecimalNumber(nftItem.blockchain, price),
      currency: {
        minimumBid: getBlockchainDecimalNumber(
          nftItem.blockchain,
          price + 0.0005
        ),
        blockchain: nftItem.blockchain,
      },
    };
    return result;
  };

  const addList = async () => {
    if (!price) return;
    if (walletData.network === "CARDANO" && price < 5) {
      notification("Please enter 5 ADA or more", "warning");
      return false;
    }

    setLoading(true);
    let request = sellRequest();
    if (walletData.network === "CARDANO") {
      notification("Selling NFT in progress", "info");
      const txBuilder = wasm.TransactionBuilder.new(
        wasm.TransactionBuilderConfigBuilder.new()
          .fee_algo(
            wasm.LinearFee.new(
              wasm.BigNum.from_str("44"),
              wasm.BigNum.from_str("155381")
            )
          )
          .coins_per_utxo_word(wasm.BigNum.from_str("34482"))
          .pool_deposit(wasm.BigNum.from_str("500000000"))
          .key_deposit(wasm.BigNum.from_str("2000000"))
          .ex_unit_prices(
            wasm.ExUnitPrices.new(
              wasm.UnitInterval.new(
                wasm.BigNum.from_str("577"),
                wasm.BigNum.from_str("10000")
              ),
              wasm.UnitInterval.new(
                wasm.BigNum.from_str("721"),
                wasm.BigNum.from_str("10000000")
              )
            )
          )
          .max_value_size(5000)
          .max_tx_size(16384)
          .build()
      );

      // build output value, so we can do utxo selection for it. We will use 2 ADA and token
      const wasmValue = wasm.Value.new(wasm.BigNum.from_str("2000000"));
      const wasmMultiasset = wasm.MultiAsset.new();
      const wasmAssets = wasm.Assets.new();
      wasmAssets.insert(
        wasm.AssetName.new(Buffer.from(nftItem.name, "utf8")),
        wasm.BigNum.from_str("1")
      );
      wasmMultiasset.insert(
        wasm.ScriptHash.from_hex(nftItem.collectionAddress),
        wasmAssets
      );
      wasmValue.set_multiasset(wasmMultiasset);

      const wasmContractAddress = wasm.Address.from_bech32(marketAddress);
      const wasmOutput = wasm.TransactionOutput.new(
        wasmContractAddress,
        wasmValue
      );
      // we first build the datum so we can inline it in the output
      // note that we're using the first used address of a wallet as the seller's address
      const usedAddresses = await window.cardano.getUsedAddresses({
        page: 0,
        limit: 1,
      });
      const wasmSellerAddress = wasm.Address.from_hex(usedAddresses[0]);
      const wasmDatum = wasm.encode_json_str_to_plutus_datum(
        JSON.stringify(
          getSellDatum(
            wasmSellerAddress.to_bech32(),
            marketAddress,
            nftItem.collection.payoutWallet,
            nftItem.collectionAddress,
            nftItem.assetName,
            nftItem.price,
            nftItem.royaltyPercentage
          )
        ),
        wasm.PlutusDatumSchema.DetailedSchema
      );
      wasmOutput.set_plutus_data(wasmDatum);

      // finally we can add the output to our txBuilder
      txBuilder.add_output(wasmOutput);

      // the next step is to get our utxos from the wallet API, so we can perform UTXO selection on it
      const hexBalanceUtxos = await window.cardano.getUtxos();
      const wasmUtxos = wasm.TransactionUnspentOutputs.new();
      for (let i = 0; i < hexBalanceUtxos.length; i++) {
        const wasmUtxo = wasm.TransactionUnspentOutput.from_hex(
          hexBalanceUtxos[i]
        );
        wasmUtxos.add(wasmUtxo);
      }

      try {
        // this performs utxo selection from all the utxos we got from our wallet PAI
        txBuilder.add_inputs_from(
          wasmUtxos,
          wasm.CoinSelectionStrategyCIP2.LargestFirstMultiAsset
        );
      } catch (e) {
        console.log(e);
        setLoading(false);
        notification("Invalied NFT. Please try other nft.", "error");
        return;
      }

      // now that we have all inputs and outputs handled, we can finally handle change and fees
      const hexChangeAddress = await window.cardano.getChangeAddress();
      const wasmChangeAddress = wasm.Address.from_hex(hexChangeAddress);
      txBuilder.add_change_if_needed(wasmChangeAddress);

      // then build the transaction so we can sign it with out wallet
      const unsignedTransactionHex = txBuilder.build_tx().to_hex();
      window.cardano
        .signTx(unsignedTransactionHex)
        .then((witnessSetHex) => {
          // the wallet api returns the witness set required
          const wasmWitnessSet =
            wasm.TransactionWitnessSet.from_hex(witnessSetHex);
          const wasmTx = wasm.Transaction.from_hex(unsignedTransactionHex);
          const wasmSignedTransaction = wasm.Transaction.new(
            wasmTx.body(),
            wasmWitnessSet,
            wasmTx.auxiliary_data()
          );
          const transactionHex = wasmSignedTransaction.to_hex();

          window.cardano
            .submitTx(transactionHex)
            .then((txId) => {
              // I'm using local storage here as our database, since it's just an example
              // but there should be a dedicated database for your app
              const wasmTxBody = wasmTx.body();
              const wasmTxOutputs = wasmTxBody.outputs();
              const jsonOutputs = JSON.parse(wasmTxOutputs.to_json());
              let scriptOutputId = 0;
              for (let i = 0; i < jsonOutputs.length; i++) {
                if (jsonOutputs[i]["address"] === marketAddress) {
                  scriptOutputId = i;
                }
              }

              request.tx = txId;
              request.scriptOutputId = scriptOutputId;
              addBuySell(request).then((addData) => {
                if (addData) {
                  setLoading(false);
                  navigate(`/asset/${nftItem._id}`);
                } else {
                  setLoading(false);
                  notification("Server error", "error");
                }
              });
            })
            .catch((err) => {
              setLoading(false);
              notification("Failed to list", "error");
            });
        })
        .catch((err) => {
          setLoading(false);
          notification("Failed to list", "error");
        });
    } else {
      const tokenId = nftItem.tokenId,
        nftContract = nftItem.collectionAddress,
        marketplaceContract =
          networkInfo[getChainId(nftItem.blockchain)].marketplaceContract;
      if (chainId !== getChainId(nftItem.blockchain)) {
        await switchNetwork(getChainId(nftItem.blockchain));
      }
      let isApproved = await checkApproved();
      console.log("isApproved", isApproved, marketplaceContract);
      if (!isApproved) {
        isApproved = await setApprovalForAll(marketplaceContract);
        if (!isApproved || !isApproved.status) {
          setLoading(false);
          notification("Failed Approve", "error");
          return false;
        }
      }
      const transaction = await addMarketItem(
        nftContract,
        tokenId,
        price
      ).catch((err) => {
        setLoading(false);
        notification("Failed listing", "error");
        console.log("lising error:", err);
        return false;
      });
      console.log(transaction);
      if (
        transaction.events &&
        transaction.events.ListedNFT &&
        transaction.events.ListedNFT.returnValues
      ) {
        request.tx = transaction.transactionHash;
        request.itemId = nftItem.tokenId;
        const addData = await addBuySell(request);
        setLoading(false);
        if (addData) {
          navigate(`/asset/${nftItem._id}`);
        } else {
          notification("Server error", "error");
        }
      } else {
        setLoading(false);
        notification("Failed listing", "error");
        return false;
      }
    }
  };

  async function fetchData() {
    const result = await getAssetsDetail(params.id);
    if (!result.message) {
      setNftItem(result);
    }

    if (result?.collectionId) {
      const request = {
        collectionId: result?.collectionId,
      };
      const sresult = await getAllNfts(1, request);
      console.log(sresult);
    }
  }

  useEffect(() => {
    if (
      nftItem.blockchain !== "cardano" &&
      nftItem.blockchain !== "phantom" &&
      nftItem.collectionAddress
    ) {
      window.ethereum.enable();
      const web3 = new Web3(window.web3.currentProvider);
      setMintContract(
        new web3.eth.Contract(mintNFTContractABI, nftItem.collectionAddress)
      );
      setContract(
        new web3.eth.Contract(
          marketplaceContractABI,
          networkInfo[chainId].marketplaceContract
        )
      );
    }
  }, [nftItem.collectionAddress]);

  useEffect(() => {
    fetchData();
  }, [params.id]);

  useEffect(() => {
    async function fetchData() {
      await Cardano.load();
      return true;
    }
    fetchData();
  }, []);

  return (
    <Stack spacing={2} className={classes.NFTpreview}>
      <Dialog sx={styles.mintLoadingDialog} open={mintLoading}>
        <Box sx={styles.mintLoadingTitle} component={"span"}>
          Please wait
        </Box>
        <Box sx={styles.mintLoadingBox}>
          <CircularProgress />
        </Box>
      </Dialog>
      <Box>
        <Stack flexDirection="row" alignItems="center">
          <IconButton onClick={() => gotoDetails(nftItem._id)}>
            <ChevronLeftIcon />
          </IconButton>
          <Typography sx={{ fontSize: 30, fontWeight: "bold" }}>
            List for sale
          </Typography>
        </Stack>
        <Grid container spacing={3}>
          <Grid
            item
            lg={6}
            md={6}
            sm={12}
            xs={12}
            className={classes.cardgridleft}
          >
            <Card className={classes.cardimg}>
              <Box
                component="img"
                className={classes.cardimggroup}
                src={replaceIpfsUrl(nftItem.imageUrl)}
              ></Box>
              <CardContent>
                <Stack spacing={2}>
                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <Stack direction={"row"} spacing={1} alignItems={"center"}>
                      <Typography className={classes.doodles}>
                        {nftItem.tokenName}
                      </Typography>
                      <Box
                        component="img"
                        src={NFTcheck.src}
                        className={classes.nftcheck}
                      ></Box>
                    </Stack>
                    {/* <Stack direction={"row"} spacing={1} alignItems={"center"}>
                                            <VisibilityIcon className={classes.viewicon} />
                                            <Typography className={classes.NFTviews}>{nftItem.viewCount}views</Typography>
                                        </Stack> */}
                  </Stack>
                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <Typography className={classes.fonttype}>
                      #{sliceLongString(nftItem.tokenId, 5)}
                    </Typography>
                    {/* <Stack direction={"row"} spacing={1}>
                                            <FavoriteBorderIcon className={classes.viewicon} />
                                            <Typography className={classes.NFTviews}>{nftItem.favouriteCount}views</Typography>
                                        </Stack> */}
                  </Stack>
                  <Stack direction={"row"}>
                    <Typography sx={{ mr: 1 }} className={classes.ownedby}>
                      Owned by
                    </Typography>
                    <Typography className={classes.avdrwwc}>
                      {(() => {
                        const owner = nftItem.seller
                          ? nftItem.seller
                          : nftItem.ownerAddress;
                        if (owner == walletData.address) {
                          return "you";
                        } else {
                          return sliceLongString(nftItem.seller, 5);
                        }
                      })()}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid
            item
            lg={6}
            md={6}
            sm={12}
            xs={12}
            className={classes.cardgridright}
          >
            <Stack spacing={5}>
              <Card>
                <CardContent>
                  <Stack flexDirection="row" alignItems="center">
                    <Typography sx={{ fontSize: 24, fontWeight: "600" }}>
                      Choose a type of sale
                    </Typography>
                  </Stack>
                  <ButtonGroup
                    variant="outlined"
                    aria-label="outlined button group"
                    sx={{ width: "100%", mt: 1, mb: 2 }}
                  >
                    <Button
                      sx={{
                        width: "50%",
                        p: 2,
                        background: saleType === 0 ? "aliceblue" : "white",
                      }}
                      onClick={() => setSaleType(0)}
                    >
                      <Stack sx={{ alignItems: "center" }}>
                        <AttachMoneyIcon />
                        <Typography sx={{ textTransform: "capitalize" }}>
                          Fixed Price
                        </Typography>
                      </Stack>
                    </Button>
                    <Button
                      sx={{
                        width: "50%",
                        p: 2,
                        background: saleType === 1 ? "aliceblue" : "white",
                      }}
                      onClick={() => setSaleType(1)}
                    >
                      <Stack sx={{ alignItems: "center" }}>
                        <TimelapseIcon />
                        <Typography sx={{ textTransform: "capitalize" }}>
                          Timed Auction
                        </Typography>
                      </Stack>
                    </Button>
                  </ButtonGroup>

                  <Stack spacing={1} sx={{ mb: 2 }}>
                    <Stack flexDirection="row" alignItems="center">
                      <Typography sx={{ fontSize: 24, fontWeight: "600" }}>
                        Set a price
                      </Typography>
                    </Stack>
                    {saleType ? <Typography>Starting Price</Typography> : null}
                    <TextField
                      error={!price}
                      value={price || ""}
                      onChange={(e) => {
                        onChangePrice(e);
                      }}
                      variant="outlined"
                      placeholder="0"
                      type="number"
                    />
                  </Stack>
                  {saleType ? (
                    <Stack spacing={1} sx={{ mb: 2 }}>
                      <Stack flexDirection="row" alignItems="center">
                        <Typography sx={{ fontSize: 24, fontWeight: "600" }}>
                          Set duration
                        </Typography>
                      </Stack>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                          renderInput={(props) => <TextField {...props} />}
                          value={endDate}
                          onChange={(newValue) => {
                            setEndDate(newValue);
                          }}
                        />
                      </LocalizationProvider>
                    </Stack>
                  ) : null}
                  <Stack spacing={1} sx={{ mb: 2 }}>
                    <Stack flexDirection="row" alignItems="center">
                      <Typography sx={{ fontSize: 24, fontWeight: "600" }}>
                        Summary
                      </Typography>
                    </Stack>
                    <Stack spacing={1}>
                      <Stack flexDirection="row" justifyContent="space-between">
                        <Typography>Listing price</Typography>
                        <Typography>{`${price} ${nftItem.currency}`}</Typography>
                      </Stack>
                      <Stack flexDirection="row" justifyContent="space-between">
                        <Typography>Service Fee</Typography>
                        <Typography>
                          {marketplaceFee.toFixed(2)} {nftItem.currency}
                        </Typography>
                      </Stack>
                      <Stack flexDirection="row" justifyContent="space-between">
                        <Typography>Creator Fee</Typography>
                        <Typography>
                          {creatorFee.toFixed(2)} {nftItem.currency}
                        </Typography>
                      </Stack>
                      <Divider />
                      <Stack flexDirection="row" justifyContent="space-between">
                        <Typography sx={{ fontSize: 24, fontWeight: 600 }}>
                          Total potential earnings
                        </Typography>
                        <Typography
                          sx={{ fontSize: 24, fontWeight: 600 }}
                        >{`${potentialEarnings.toFixed(5)} ${
                          nftItem.currency
                        }`}</Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                  {walletData.address &&
                  nftItem.ownerAddress === walletData.address ? (
                    <Button
                      className={classes.buybutton}
                      sx={{ mt: 2, width: "100%" }}
                      onClick={() =>
                        saleType === 0 ? addList() : createAuction()
                      }
                    >
                      {saleType === 0 ? "Create Sell" : "Create Auction"}
                    </Button>
                  ) : (
                    ""
                  )}
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
};

export default SellDetails;
