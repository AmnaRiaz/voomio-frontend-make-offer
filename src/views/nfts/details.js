import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Chart from "react-apexcharts";
import Web3 from "web3";
import { OpenSeaSDK, Network, OpenSeaAPI } from "opensea-js";

// @mui/material components
import {
  Box,
  Card,
  Grid,
  Stack,
  Table,
  Paper,
  Select,
  Dialog,
  Button,
  Avatar,
  TableRow,
  MenuItem,
  TableBody,
  TableHead,
  TableCell,
  Accordion,
  CardHeader,
  Typography,
  CardContent,
  TableContainer,
  CircularProgress,
  AccordionSummary,
  styled,
  Modal,
  Fade,
  FormControlLabel,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { styles } from "../../assets/theme/views/nftgenerator/upload";
import componentStyles from "../../assets/theme/views/nft/details";
//MUI icon
import NotesIcon from "@mui/icons-material/Notes";
import TwitterIcon from "@mui/icons-material/Twitter";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import LanguageIcon from "@mui/icons-material/Language";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import InstagramIcon from "@mui/icons-material/Instagram";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import CategoryIcon from "@mui/icons-material/Category";

// Svg img
import Vector from "/src/assets/image/views/profile/detail/vector.svg";
import Traits from "/src/assets/image/views/profile/detail/traits.svg";
import Discord from "/src/assets/image/views/profile/detail/discord.svg";
import NFTcheck from "/src/assets/image/views/profile/detail/NFTcheck.svg";
import Ethereum from "/src/assets/image/views/profile/detail/etherum.svg";
import Ethereumcolor from "/src/assets/image/views/profile/detail/ethereumcolor.svg";
import Filterresult from "/src/assets/image/views/profile/collection/filterresult.svg";
import AccordionDetails from "@mui/material/AccordionDetails";
import Empty from "/src/assets/image/component/empty/empty-asks.svg";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

import marketplaceContractABI from "../../contracts/marketplace.json";
import Loading from "../../components/loading/Loading";

import {
  getNftById,
  getCollectionById,
  getAllNfts,
  getAssetsDetail,
  buyNFTAction,
  setFavoriteAction,
  removeFavoriteAction,
  addViewer,
} from "../../redux/actions/main";
import {
  getRealPrice,
  getCoinIcons,
  socialBaseUrls,
  replaceIpfsUrl,
  sliceLongString,
  networkInfo,
  notification,
  getUSDPrice,
  getBlockchainTxScanUrl,
  getWalletName,
  getChainId,
  getSupportedChainIds,
  removeLocalStorageItem,
  aboutHours,
  compare,
} from "../../utils/utility";

import IDL from "../../nfttrade.json";
import { purchaseTokenViaCbor, purchaseToken } from "../../cardano/token";

import { Buffer } from "buffer";
import {
  getJpgStoreNftActivity,
  getJpgStoreNftOwner,
  getJpgStoreNftPriceHistory,
  getJpgStoreTransactionBuild,
  getJpgStoreNftDetails,
  getJpgStoreUserProfile,
} from "../../redux/actions/jpg.store";
import MakeOfferModal from "./makeoffermodal";
import UpdatePriceModal from "./updatepricemodal";
import { useWeb3React } from "@web3-react/core";
import { useRef } from "react";
import {
  CoinbaseWallet,
  Injected,
  switchNetwork,
} from "../../utils/connectors";
import { BrowserWallet } from "@meshsdk/core";
import { setWalletData } from "../../redux/actions/wallet";
import { setUserData } from "../../redux/actions/user";
import { useWallet } from "@solana/wallet-adapter-react";
import axios from "axios";
import AuthConsumer from "../../pages/authContext";
import { buildBuyTransaction } from "../../services/api/api";
import NftCard from "../../components/nft-card/NFTCard";
import nftStyles from "../../assets/theme/views/nft/list";
import AcceptOfferModal from "./acceptOfferModal";
import { marketAddress, marketFeeAddress, marketScriptHex } from "../../config";
import {
  getBuyDatum,
  getMarketPlaceFee,
  getReallyPrice,
  getRoyaltyFee,
  mergeSignatures,
} from "../../utils/cardano";
import useWasm from "../../hooks/useWasm";

async function openseabuy() {
  // await this.connectWebsite();
  const apiKey = "47ecc73b776649359b932b67e0c0100e";
  const opensea = new OpenSeaAPI(apiKey);
  const ethers = require("ethers");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();

  const address = await signer.getAddress();

  // const openseaSDK = new OpenSeaSDK(provider, {
  //   networkName: Network.Main,
  //   apiKey: YOUR_API_KEY
  // })

  const openseaSDK = new OpenSeaSDK(provider, {
    networkName: Network.Goerli,
    // apiKey: process.env.NEXT_PUBLIC_OPENSEA_APIKEY
  });

  const order = await openseaSDK.api
    .getOrder({
      side: "ask",
      tokenId: "329848",
      assetContractAddress: "0x317a8fe0f1c7102e7674ab231441e485c64c178a",
      // tokenId: nftDetails.tokenId,
      // assetContractAddress: nftDetails.contractAddress
    })
    .catch((e) => Promise.resolve(null));

  // const order = await openseaSDK.api.getOrder({
  //     side: "ask",
  //     assetContractAddress: "0x317a8fe0f1c7102e7674ab231441e485c64c178a",
  //     tokenId: "329848"
  // })
  const accountAddress = walletData.wallet; // The buyer's wallet address, also the taker
  const transactionHash = await openseaSDK
    .fulfillOrder({ order, accountAddress })
    .then((res) => {
      console.log(res);
    });
  // const order = await openseaSDK.api.getOrder({
  //     side: "ask", assetContractAddress: "0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270",
  //     tokenId: "282000111"
  // })
  // console.log("order: ", order);
  // console.log(address)
  // let asd = await openseaSDK.fulfillOrder({ "order": order, "accountAddress": address })
  // asd.then((res) => {
  //     console.log(res)
  // })
}

async function makePolygonTransaction(orderId) {
  const asdfff = async () => {
    const response = await axios.get(
      "https://api.nftrade.com/api/v1/orders/" + orderId,
      {
        headers: {
          authority: "api.nftrade.com",
          accept: "application/json, text/plain, /",
          "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
          origin: "https://nftrade.com",
          referer: "https://nftrade.com/",
          "sec-ch-ua":
            '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Linux"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          "user-agent":
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
        },
      }
    );
    return response.data;
  };
  return asdfff().then((res) => {
    (async function () {
      const ethers = require("ethers");
      //After adding your Hardhat network to your metamask, this code will get providers and signers
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x89" }],
        });
      } catch {
        await window.ethereum
          .request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x89",
                rpcUrls: ["https://polygon-rpc.com/"],
                chainName: "Matic Mainnet",
                nativeCurrency: {
                  name: "MATIC",
                  symbol: "MATIC",
                  decimals: 18,
                },
                blockExplorerUrls: ["https://polygonscan.com/"],
              },
            ],
          })
          .then(async () => {
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: "0x89" }],
            });
          });
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      //Pull the deployed contract instance
      let contract = new ethers.Contract(
        "0xBF6bfE5D6B86308cF3B7F147Dd03ef11f80bfDE3",
        IDL.abi,
        signer
      );
      //create an NFT Token

      let asd = {
        makerAddress: res.makerAddress, //res.makerAddress
        takerAddress: res.takerAddress, //res.takeraddress and so on
        royaltiesAddress: res.royaltiesAddress,
        senderAddress: res.senderAddress,
        makerAssetAmount: res.makerAssetAmount,
        takerAssetAmount: res.takerAssetAmount,
        royaltiesAmount: res.royaltiesAddress,
        expirationTimeSeconds: res.expirationTimeSeconds,
        salt: res.salt,
        makerAssetData: res.makerAssetData,
        takerAssetData: res.takerAssetData,
      };

      try {
        let price;
        if (res.price.toString().length < 8) {
          if (res.price.toString().includes(".")) {
            let value1,
              value2 = res.price.toString().split(".")[1];
            value2 =
              value2 +
              "000000000000000000000000000000000000000000000000000000000000000";
            price = value2.substr(0, 17);
          } else {
            price = res.price.toString() + "000000000000000000";
          }
        } else {
          price = res.price;
        }
        console.log("price", price);
        contract.fillOrder(asd, res.signature, res.orderHash, {
          value: ethers.BigNumber.from(price),
          gasLimit: 300000,
        });
      } catch (e) {
        console.log(e);
      }
    })();
  });
}

const useStyles = makeStyles(componentStyles);
const useNftStyles = makeStyles(nftStyles);
const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
    width: "150px",
    height: "40px",
    fontSize: "1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10px",
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  pt: 2,
  px: 4,
  pb: 3,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "&:focus-visible": {
    outline: "none !important",
  },
};

const ItemDetails = () => {
  const ref = useRef(null);
  const wasm = useWasm();
  const classes = useStyles();
  const nftclasses = useNftStyles();
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authed } = AuthConsumer();
  const [dataloading, setDataLoading] = useState(true);
  const userData = useSelector((state) => state.user);
  const walletData = useSelector((state) => state.wallet);
  const { chainId, activate } = useWeb3React();
  const { select } = useWallet();

  const [nftDetails, setNftDetails] = useState({
    blockchain: "",
    ownerAddress: "",
    tokenId: "",
    contractAddress: "",
    listings: [],
  });

  const [nftActivity, setNftActivity] = useState({
    data: [],
    limit: 5,
    offset: 0,
    total: 0,
  });

  const [offers, setOffers] = useState({
    data: [],
    limit: 5,
    offset: 0,
    total: 0,
  });
  const [isCopy, setIsCopy] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [favoriteState, setFavoriteState] = useState(false);
  const [favoriteNfts, setFavoriteNfts] = useState([]);
  const [viewCnt, setViewCnt] = useState(0);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [showUpdatePriceModal, setShowUpdatePriceModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contract, setContract] = useState(null);
  const [usdPrice, setUsdPrice] = useState(0);
  const [showNftDetailsPanel, setShowNftDetailsPanel] = useState(true);
  const [morenft, setMoreNft] = useState([]);
  const [showOwnerDetailsPanel, setShowOwnerDetailsPanel] = useState(false);
  const [showPropertisPanel, setShowPropertisPanel] = useState(true);
  const [priceHistoryChartOptions, setPriceHistoryChartOptions] = useState({
    chart: {
      toolbar: {
        show: false,
      },
    },
    colors: ["#7B61FF", "#247BA0"],
    transform: "none",
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    grid: {
      row: {
        colors: ["#f3f3f3"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      type: "category",
      categories: [],
      labels: {
        show: true,
        format: "dd/MM",
      },
    },
  });
  const [checked, setChecked] = React.useState(false);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const [showAcceptModal, setShowAcceptModal] = useState(false);

  const [openseaOrder, setOpenseaOrder] = React.useState(null);
  const [openseaSDK, setOpenseaSDK] = React.useState(null);
  const [offerItem, setOfferItem] = useState({});

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [priceHistoryChartSeries, setPriceHistoryChartSeries] = useState([
    {
      name: "Average Sale Price",
      data: [],
    },
    {
      name: "Min Sale Price",
      data: [],
    },
  ]);

  const onSetFavorite = async () => {
    if (userData && userData?.user?._id) {
      if (nftDetails._id) {
        const request = {
          _id: userData?.user?._id,
          assetId: nftDetails.assetId,
        };
        if (favoriteState) {
          const result = await setFavoriteAction(request);
          if (result._id) {
            setFavoriteNfts(result.favoriteNfts);
            notification("success removed", "success");
          }
        } else {
          const result = await setFavoriteAction(request);
          if (result._id) {
            setFavoriteNfts(result.favoriteNfts);
            notification("success favorite", "success");
          } else {
            notification(result, "error");
          }
        }
        await fetchData();
        return true;
      } else {
        notification("Please list to marketplace", "error");
        return false;
      }
    } else {
      notification("Connect to wallet", "error");
      return false;
    }
  };

  const gotoSocialSite = (type) => {
    if (nftDetails.socials[type] !== "") {
      window.open(socialBaseUrls[type] + nftDetails.socials[type]);
    }
  };

  const gotoDetails = (data) => {
    navigate("/asset/" + data.id);
    window.scrollTo(0, 0);
  };

  const buyEVMNft = async (_nftContract, itemId, price) => {
    if (!nftDetails.platform) {
      try {
        const tx = await contract.methods.buyByETH(_nftContract, itemId).send({
          from: walletData.address,
          value: price,
        });
        return tx;
      } catch (error) {
        console.log("buy error: ", error);
        return false;
      }
    } else if (nftDetails.platform === "opensea") {
      const accountAddress = walletData.address; // The buyer's wallet address, also the taker
      const transactionHash = await openseaSDK.fulfillOrder({
        openseaOrder,
        accountAddress,
      });
      return transactionHash;
    }
  };

  const fromHex = (hex) => Buffer.from(hex, "hex");
  const toHex = (bytes) => Buffer.from(bytes).toString("hex");

  const buyNFT = async () => {
    if (!walletData.address) {
      notification("Please connect to wallet", "error");
      return false;
    }

    if (
      walletData.network.toLowerCase() !==
        nftDetails.blockchain.toLowerCase() &&
      nftDetails.blockchain !== "polygon"
    ) {
      notification(
        "Please connect to " + getWalletName(nftDetails.blockchain) + " wallet",
        "error"
      );
      return false;
    }
    setLoading(true);
    if (walletData.network === "CARDANO") {
      const assetId = nftDetails.assetId;
      let txHash;
      console.log(nftDetails);
      if (nftDetails.platform === "jpg.store") {
        const cardanoApi = window.cardano;
        const hexCollateralUtxos = await cardanoApi.getUtxos();
        const {
          cbor,
          oldBuilder,
          txHash: buildTx,
          message: buildResultMessage,
        } = await getJpgStoreTransactionBuild({
          action: "BUY",
          address: walletData.address,
          assets: [],
          collateral: hexCollateralUtxos,
          listingId: nftDetails.activeList?.id,
          tracingId:
            "stake1u9qef3xsv2xl60fat43le507wlvpemsvamygstgs2tprj8cd4daru-"
              .concat(new Date().toISOString(), "-")
              .concat(Math.random()),
          utxos: hexCollateralUtxos,
        });

        if (buildResultMessage) {
          notification(buildResultMessage, "error");
          setLoading(false);
          return;
        }

        const { result, tx, message } = await purchaseTokenViaCbor({
          cborHex: cbor,
          txHash: buildTx,
        });
        txHash = tx;
        if (!result) {
          notification(message, "error");
          setLoading(false);
          return;
        }
      } else {
        const cardanoApi = window.cardano;
        const balance = await cardanoApi.getBalance();

        const tx = wasm.Transaction.from_hex(
          "84a600828258203575b915ca47e0017a9f1542236fb61630ee93986a2f74e5a59acbf8e83af5f300825820b0b9ed1750064ec080ee6a784929fc3b024f198e77455b9a95d02fa6a1b8539b01018582583900a0d503489eaaba8fca0f394c76637eeef655f1f261599654397ba5a441056ea286c955a90bbe1f52f2a29e7562483402f5f181ae9ed5198f821a001e8480a1581c9b7f532518d0d917fc462d7a36e19ba5af95f427de10ce567d4ab9e9a14854657374204e465401825839002be4a303e36f628e2a06d977e16f77ce2b9046b8c56576bb5286d1be00c23aa3244cd60632116f82437b41232d7d2935a48aebc781c9ded21a000f42408258390013f0731ecc931d463411380d8bcc337bc49847bcbe388eb0dee475f9b8511ed4eafba4def3fe38756756a81ebeaeba9fb8486535160a05041a002625a0825839002be4a303e36f628e2a06d977e16f77ce2b9046b8c56576bb5286d1be00c23aa3244cd60632116f82437b41232d7d2935a48aebc781c9ded21a05cfbb6082583900a0d503489eaaba8fca0f394c76637eeef655f1f261599654397ba5a441056ea286c955a90bbe1f52f2a29e7562483402f5f181ae9ed5198f821b0000000260558f65a1581c9b7f532518d0d917fc462d7a36e19ba5af95f427de10ce567d4ab9e9a147486173686b657902021a000e44d50b5820792e8fd2650538f7ef5e6b5ef9f30f4d37e55f6e3fc506006ec2ec640264b3860d818258203d7d7a6557a05ba9116543382a881b51360a263ac790610c2a266c2c253b8dd2000e81581ca0d503489eaaba8fca0f394c76637eeef655f1f261599654397ba5a4a30381590a04590a015909fe010000323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232222323232533535533357346064606a0062646464642466002008004a666ae68c0d8c0e00044c848c004008c078d5d0981b8008191baa357426ae88c0d80154ccd5cd1819981b0008991919191919191919191919191919191919191919190919999999999980080b80a8098088078068058048038028018011aba135744004666068eb88004d5d08009aba2002357420026ae88008cc0c9d71aba1001357440046ae84004d5d10011aba1001357440046ae84004d5d10011aba1001357440046ae84004d5d10011981300f1aba1001357440046ae84004d5d1181b001198111192999ab9a30353038001132321233001003002301d357426ae88c0e0008c078d5d0981b8008191baa00135742606a0020606ea8d5d0981a001817911a8011111111111111a80691919299aa99a998149aa99a80109815a481035054380022100203d00303903a03a1533501213302549101350033302330340362350012232333027303803a235001223500122533533302b0440040062153353333026303e040223500222533500321533533303104a0030062153353302b0010031303f3305722533500104c221350022253353305100200a100313304d33047002001300600300215335330370010031303f333302d04b0043370200200600409209008e60720020044266060920102313000333573466e20ccd54c0fc104c0a8cc0f1c024000400266aa608008246a00209600200809208e266ae712410231310004813357389201023132000470023335530360393501b0403501b04233355303603922533535002222253353302200800413038003042213303d001002100103f010333301c303403622350022253353303c00b002100313333020303803a235001222533533302a0210030012133330260220043355303e03f235001223303d002333500120012235002223500322330433370000800466aa608e09046a002446608c004666a0024002e008004ccc0c013400c0048004ccc09c11000c0040084cccc09408400c00800400c0040f140044cc0952410134003330233034036235001223303b00a0025001153353355303403523500122350012222302c533350021303104821001213304e2253350011303404a221350022253353304800200710011300600300c0011302a49010136002213355303603723500122350012222302e533350021303304a2100121330502253350011303604c221350022253353304a00200710011300600300e0033335530310342253353353530283500203f03d203f253353303c001330482253350011302e044221350022253353303000200a135302f001223350022303504b20011300600301003b1302c4901013300133037002001100103a00d1120011533573892010350543500165333573460640020502a666ae68c0c400409c0b8c0ccdd50019baa00133019223355301f020235001223301e002335530220232350012233021002333500137009000380233700002900000099aa980f81011a800911980f001199a800919aa981181211a8009119811001180880080091199806815001000919aa981181211a80091198110011809000800999804012801000812111919807198021a8018139a801013a99a9a80181490a99a8011099a801119a80111980400100091101711119a80210171112999ab9a3370e00c0062a666ae68cdc38028010998068020008158158120a99a80090120121a8008141119a801119a8011198128010009014119a801101411981280100091199ab9a3370e00400204604a44446666aa00866032444600660040024002006002004444466aa603803a46a0024466036004666a0024002052400266600a0080026603c66030006004046444666aa603003603866aa603403646a00244660320046010002666aa6030036446a00444a66a666aa603a03e60106603444a66a00404a200204e46a002446601400400a00c200626604000800604200266aa603403646a00244660320046605e44a66a002260160064426a00444a66a6601800401022444660040140082600c00600800446602644666a0060420040026a00204242444600600842444600200844604e44a66a0020364426a00444a66a6601000400e2602a0022600c0064466aa0046602000603600244a66a004200202e44a66a00202e266ae7000806c8c94ccd5cd180f9811000899190919800801801198079192999ab9a3022302500113232123300100300233301075c464a666ae68c094c0a00044c8cc0514cd4cc028005200110011300e4901022d330033301375c464a66a660180029000080089808249022d3200375a0026ae84d5d118140011bad35742604e0020446ea8004d5d09aba23025002300c35742604800203e6ea8004d5d09aba23022002375c6ae84c084004070dd500091199ab9a3371200400203202e46a002444400844a666ae68cdc79a80100b1a80080b0999ab9a3370e6a0040306a00203002a02e024464a666ae68c06cc0780044c8c8c8c8c8c8c8c848cccc00402401c00c008d5d09aba20045333573466e1d2004001132122230020043574260460042a666ae68c0880044c84888c004010dd71aba1302300215333573460420022244400603c60460026ea8d5d08009aba200233300a75c66014eb9d69aba100135744603c004600a6ae84c074004060dd50009299ab9c001162325333573460326038002264646424660020060046eb4d5d09aba2301d003533357346034603a00226eb8d5d0980e00080b9baa35742603600202c6ea80048c94ccd5cd180c180d80089919191909198008028012999ab9a301b00113232300953335734603c00226464646424466600200c0080066eb4d5d09aba2002375a6ae84004d5d118100019bad35742603e0042a666ae68c0740044c8488c00800cc020d5d0980f80100d180f8009baa35742603a0042a666ae68c070004044060c074004dd51aba135744603600460066ae84c068004054dd5000919192999ab9a30190011321223001003375c6ae84c06800854ccd5cd180c00089909118010019bae35742603400402a60340026ea80048488c00800c888cc06888cccd55cf800900911919807198041803980e8009803180e00098021aba2003357420040166eac0048848cc00400c00888cc05c88cccd55cf800900791980518029aba10023003357440040106eb0004c05088448894cd40044008884cc014008ccd54c01c028014010004c04c88448894cd40044d400c040884ccd4014040c010008ccd54c01c024014010004c0488844894cd4004024884cc020c010008cd54c01801c0100044800488488cc00401000cc03c8894cd40080108854cd4cc02000800c01c4cc01400400c4014400888ccd5cd19b8f0020010030051001220021001220011533573892010350543100164901022d31004901013700370e90001b874800955cf2ab9d23230010012233003300200200110481d866820082581c2be4a303e36f628e2a06d977e16f77ce2b9046b8c56576bb5286d1be83d866820082d866820082d866820081581c2be4a303e36f628e2a06d977e16f77ce2b9046b8c56576bb5286d1bed866820081581c00c23aa3244cd60632116f82437b41232d7d2935a48aebc781c9ded2a140d866820082c24100a140c24100d866820082d866820082d866820081581c13f0731ecc931d463411380d8bcc337bc49847bcbe388eb0dee475f9d866820081581cb8511ed4eafba4def3fe38756756a81ebeaeba9fb8486535160a0504a140d866820082c24100a1401a002625a0d866820082d866820082d866820081581c2be4a303e36f628e2a06d977e16f77ce2b9046b8c56576bb5286d1bed866820081581c00c23aa3244cd60632116f82437b41232d7d2935a48aebc781c9ded2a140d866820082c24100a1401a05cfbb600581840000d866820080821a006acfc01ab2d05e00f5f6"
        );
        console.log(tx.to_js_value());
        setLoading(false);
        return;

        const balanceWasm = wasm.Value.from_bytes(Buffer.from(balance, "hex"));
        const lovelaces = balanceWasm.coin().to_str();
        if (parseInt(lovelaces) < nftDetails.price + 1000000) {
          notification("Your balance does not enough", "error");
          setLoading(false);
          return false;
        }
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

        // This particular redeemer corresponds to the "Buy" data type in  my script
        const wasmRedeemData = wasm.encode_json_str_to_plutus_datum(
          JSON.stringify({ constructor: 1, fields: [] }),
          wasm.PlutusDatumSchema.DetailedSchema
        );
        const wasmRedeemer = wasm.Redeemer.new(
          wasm.RedeemerTag.new_spend(),
          wasm.BigNum.from_str("0"),
          wasmRedeemData,
          wasm.ExUnits.new(
            wasm.BigNum.from_str("2180128"),
            wasm.BigNum.from_str("632475719")
          )
        );
        // Next build the Tx Input and Value
        const wasmTxInputsBuilder = wasm.TxInputsBuilder.new();
        const wasmOfferTxInput = wasm.TransactionInput.new(
          wasm.TransactionHash.from_hex(nftDetails.auctions[0]?.tx),
          nftDetails.auctions[0]?.scriptOutputId
        );
        // The datum is inlined, so we can build a DatumSource and point it to the offer UTXO
        const plutusScriptWitness = wasm.PlutusWitness.new_with_ref(
          wasm.PlutusScriptSource.new(
            wasm.PlutusScript.from_hex_with_version(
              marketScriptHex,
              wasm.Language.new_plutus_v2()
            )
          ),
          wasm.DatumSource.new_ref_input(wasmOfferTxInput),
          wasmRedeemer
        );

        // Should grab the value of the input from backend
        const wasmValue = wasm.Value.new(wasm.BigNum.from_str("2000000"));
        const wasmMultiasset = wasm.MultiAsset.new();
        const wasmAssets = wasm.Assets.new();
        wasmAssets.insert(
          wasm.AssetName.new(Buffer.from(nftDetails.name, "utf8")),
          wasm.BigNum.from_str("1")
        );
        wasmMultiasset.insert(
          wasm.ScriptHash.from_hex(nftDetails.collectionAddress),
          wasmAssets
        );
        wasmValue.set_multiasset(wasmMultiasset);

        // Finally we add the plutus script input to the inputs builder
        wasmTxInputsBuilder.add_plutus_script_input(
          plutusScriptWitness,
          wasmOfferTxInput,
          wasmValue
        );

        const hexInputUtxos = await cardanoApi.getUtxos();
        for (let i = 0; i < hexInputUtxos.length; i++) {
          const wasmUtxo = wasm.TransactionUnspentOutput.from_bytes(
            fromHex(hexInputUtxos[i])
          );
          wasmTxInputsBuilder.add_input(
            wasmUtxo.output().address(),
            wasmUtxo.input(),
            wasmUtxo.output().amount()
          );
        }
        // Then we can set the tx inputs to the tx inputs builder
        txBuilder.set_inputs(wasmTxInputsBuilder);

        // For plutus transactions, we need some collateral also
        const hexCollateralUtxos = await cardanoApi.getCollateral(3000000);
        if (hexCollateralUtxos.length === 0) {
          notification("You need to set collateral at your wallet.", "error");
          setLoading(false);
          return;
        }
        const collateralTxInputsBuilder = wasm.TxInputsBuilder.new();
        for (let i = 0; i < hexCollateralUtxos.length; i++) {
          const wasmUtxo = wasm.TransactionUnspentOutput.from_hex(
            hexCollateralUtxos[i]
          );
          collateralTxInputsBuilder.add_input(
            wasmUtxo.output().address(),
            wasmUtxo.input(),
            wasmUtxo.output().amount()
          );
        }
        txBuilder.set_collateral(collateralTxInputsBuilder);
        // We need to handle hashing of plutus witness. Because the datum is actually included inline within the script UTXO
        // therefore, we need to intentionally leave out the datum in the witness set for the hash.
        const wasmRedeemers = wasm.Redeemers.new();
        wasmRedeemers.add(
          txBuilder.get_plutus_input_scripts().get(0).redeemer()
        );
        // The cost models of v2 scripts must be manually built currently
        const costModel =
          wasm.TxBuilderConstants.plutus_vasil_cost_models().get(
            wasm.Language.new_plutus_v2()
          );
        const costmdls = wasm.Costmdls.new();
        costmdls.insert(wasm.Language.new_plutus_v2(), costModel);
        // I intentionally put an undefined where the datum should go to make it clearer, but the argument can simply be left empty
        const plutusWitnessHash = wasm.hash_script_data(
          wasmRedeemers,
          costmdls,
          undefined
        );
        txBuilder.set_script_data_hash(plutusWitnessHash);

        const wasmMarketplaceAddress =
          wasm.Address.from_bech32(marketFeeAddress);
        const wasmPayoutAddress = wasm.Address.from_bech32(
          nftDetails.collection.payoutWallet
        );

        let marketplaceAmount = getMarketPlaceFee(nftDetails.price);
        let royaltiesAmount = getRoyaltyFee(
          nftDetails.price,
          nftDetails.royaltyPercentage
        );

        const wasmSellerAddress = wasm.Address.from_bech32(
          nftDetails.ownerAddress
        );
        const wasmOutput = wasm.TransactionOutput.new(
          wasmSellerAddress,
          wasm.Value.new(
            wasm.BigNum.from_str(
              String(
                getReallyPrice(nftDetails.price, nftDetails.royaltyPercentage)
              )
            )
          )
        );

        const wasmDatum = wasm.encode_json_str_to_plutus_datum(
          JSON.stringify(
            getBuyDatum(
              nftDetails.ownerAddress,
              marketFeeAddress,
              nftDetails.collection.payoutWallet,
              nftDetails.price,
              nftDetails.royaltyPercentage
            )
          ),
          wasm.PlutusDatumSchema.DetailedSchema
        );
        wasmOutput.set_plutus_data(wasmDatum);
        txBuilder.add_output(wasmOutput);

        const wasmMarketplaceOutput = wasm.TransactionOutput.new(
          wasmMarketplaceAddress,
          wasm.Value.new(wasm.BigNum.from_str(String(marketplaceAmount)))
        );
        txBuilder.add_output(wasmMarketplaceOutput);
        if (
          nftDetails.royaltyPercentage
          // &&
          // nftDetails.collection.payoutWallet
        ) {
          const wasmOutput = wasm.TransactionOutput.new(
            wasmPayoutAddress,
            wasm.Value.new(wasm.BigNum.from_str(String(royaltiesAmount)))
          );
          txBuilder.add_output(wasmOutput);
        }
        // Handle change (this should include the NFT in the offer)
        const hexChangeAddress = await cardanoApi.getChangeAddress();
        const wasmChangeAddress = wasm.Address.from_hex(hexChangeAddress);
        txBuilder.add_change_if_needed(wasmChangeAddress);
        const unsignedTransaction = txBuilder.build_tx();
        const deserializedTx = wasm.Transaction.from_bytes(
          unsignedTransaction.to_bytes()
        );
        const txWitnessSet = deserializedTx.witness_set();
        cardanoApi
          .signTx(unsignedTransaction.to_hex(), true)
          .then((newWitnessSet) => {
            const newSignatures =
              wasm.TransactionWitnessSet.from_bytes(
                fromHex(newWitnessSet)
              ).vkeys() ?? wasm.Vkeywitnesses.new();

            const txSignatures = mergeSignatures(
              wasm,
              txWitnessSet,
              newSignatures
            );
            txWitnessSet.set_vkeys(txSignatures);

            const signedTx = Buffer.from(
              wasm.Transaction.new(
                deserializedTx.body(),
                txWitnessSet,
                deserializedTx.auxiliary_data()
              ).to_bytes()
            ).toString("hex");

            cardanoApi
              .submitTx(signedTx)
              .then((txId) => {
                buyNFTAction({
                  id: nftDetails._id,
                  price: nftDetails.price,
                  buyer: walletData.address,
                  tx: txId,
                }).then((buyData) => {
                  if (buyData) {
                    setLoading(false);
                    notification("Success", "success");
                    fetchData();
                  } else {
                    setLoading(false);
                    notification("Server error", "error");
                  }
                });
              })
              .catch((e) => {
                console.log("submit error", e.message);
                notification("Failed buying NFT", "error");
                setLoading(false);
              });
          })
          .catch((e) => {
            console.log("signing error", e.message);
            notification("Failed buying NFT", "error");
            setLoading(false);
          });
      }
    } else if (nftDetails.blockchain === "polygon") {
      makePolygonTransaction(nftDetails.orderId).then(() => {
        setLoading(false);
      });
    } else if (nftDetails.platform === "opensea") {
      await openseabuy();
      setLoading(false);
    } else {
      if (chainId !== getChainId(nftDetails.blockchain)) {
        await switchNetwork(getChainId(nftDetails.blockchain));
      }

      const web3 = new Web3(window.web3.currentProvider);
      const balance = await web3.eth.getBalance(walletData.address);
      if (balance < nftDetails.price) {
        notification("Your balance does not enough", "error");
        setLoading(false);
        return;
      }
      const nftContract = nftDetails.collectionAddress;
      const transaction = await buyEVMNft(
        nftContract,
        nftDetails.tokenId,
        nftDetails.price
      ).catch((error) => {
        setLoading(false);
        notification("Failed buying NFT", "error");
        console.log("buy error:", error);
        return false;
      });
      if (transaction) {
        const buyData = await buyNFTAction({
          id: nftDetails._id,
          price: nftDetails.price,
          buyer: walletData.address,
          tx: transaction.transactionHash,
        });
        if (buyData) {
          setLoading(false);
          notification("Success", "success");
          fetchData();
        } else {
          setLoading(false);
          notification("Server error", "error");
        }
      } else {
        setLoading(false);
        notification("Failed buying", "error");
        return false;
      }
    }
  };

  const getNftActivity = async (limit = 5, offset = 0) => {
    if (nftDetails.platform === "jpg.store") {
      const data = await getJpgStoreNftActivity({
        assetId: nftDetails.assetId,
        offset,
        limit,
      });
      setNftActivity((preState) => ({
        ...preState,
        data: preState.data.concat(
          data.txs.map((t) => ({
            name: t.action,
            price: t.amount_lovelace / 1e6,
            blockchain: "cardano",
            from: t.seller_address,
            to: t.signer_address === t.seller_address ? "" : t.signer_address,
            createdAt: t.created_at,
            transactionHash: t.tx_hash,
          }))
        ),
        limit,
        offset,
        total: data.count,
      }));
    }
  };

  // to add NFT viewer count
  const addViewCnt = async (id) => {
    const result = await addViewer({ assetId: id });
    setViewCnt(result);
    await fetchData();
  };

  // to get NFT detail
  const fetchData = async () => {
    const result = await getAssetsDetail(params.id);
    if (result.list) {
      result.listings = result.list
        .filter((l) => l.type === "SELL")
        .map((l) => ({
          ...l,
          listedAt: l.createdAt,
        }));
      setNftActivity({
        data: result.list,
        limit: 100,
        offset: 0,
        total: result.list.length,
      });
    }
    if (result.attributes && result.attributes.length) {
      const tmp = {};
      result.attributes.map((v, ind) => {
        tmp[v.name] = v.value;
      });
      result.attributes = tmp;
    }
    result.auctions = result.auctions.filter((auction) => !auction.deleted);
    if (result.auctions[0]) {
      result.auctions[0].bids.sort(compare);
      setOffers({
        data: result.auctions[0].bids,
        limit: 5,
        offset: 0,
        total: result.auctions[0].bids.length,
      });
    }
    if (result.platform === "jpg.store") {
      const nftOwner = await getJpgStoreNftOwner(result.assetId);
      const nftJpgStoreDetails = await getJpgStoreNftDetails(result.assetId);
      const userProfile = await getJpgStoreUserProfile(result.assetId);
      const nftPriceHistory = await getJpgStoreNftPriceHistory(result.assetId);
      getNftActivity();
      setPriceHistoryChartOptions({
        ...priceHistoryChartOptions,
        xaxis: {
          ...priceHistoryChartOptions.xaxis,
          categories: nftPriceHistory.map((e) => e.daily),
        },
      });
      setPriceHistoryChartSeries([
        {
          name: "Average Sale Price",
          data: nftPriceHistory.map((e) => [
            new Date(e.daily).getTime(),
            e.avg_sale_price,
          ]),
        },
        {
          name: "Min Sale Price",
          data: nftPriceHistory.map((e) => [
            new Date(e.daily).getTime(),
            e.min_sale_price,
          ]),
        },
      ]);

      const sellListing = nftJpgStoreDetails.listings.find(
        (l) =>
          l.active_transaction_obj.seller_address ===
          l.active_transaction_obj.signer_address
      );
      const activeList = nftJpgStoreDetails.listings.find(
        (l) => l.active_transaction
      );
      setNftDetails({
        ...result,
        ownerAddress: nftOwner.address,
        owner: userProfile
          ? {
              profileUrl: userProfile.profile_pic,
              name: userProfile.name,
              displayName: userProfile.username,
              bio: userProfile.bio,
            }
          : null,
        price: sellListing?.active_transaction_obj?.amount_lovelace || 0,
        activeList,
      });
      if (result?.collection?._id) {
        const request = {
          collectionId: result.collection._id,
        };
        const sresult = await getAllNfts(1, request);
        if (sresult.nfts) {
          setMoreNft(sresult.nfts);
        }
      }
    } else {
      if (result.platform === "opensea") {
      }
      setNftDetails(result);
      if (result?.collection?._id) {
        const request = {
          collectionId: result.collection._id,
        };
        const sresult = await getAllNfts(1, request);
        if (sresult.nfts) {
          setMoreNft(sresult.nfts);
        }
      }
    }
  };

  const copyAddress = () => {
    setIsCopy(true);
    navigator.clipboard.writeText(nftDetails.owner);
    setTimeout(() => {
      setIsCopy(false);
    }, 2000);
  };

  const setProvider = (type) => {
    window.localStorage.setItem("provider", type);
  };

  const switchWallet = async (type) => {
    removeLocalStorageItem("token");
    if (type === "Metamask") {
      if (!window.ethereum) {
        notification("Please install Metamask wallet", "error");
        return;
      }
      if (getSupportedChainIds(type).indexOf(chainId) == -1) {
        await switchNetwork(getSupportedChainIds(type)[0]);
      }
      setProvider("Metamask");
      activate(Injected);
    } else if (type === "Coinbase") {
      setProvider("Coinbase");
      activate(CoinbaseWallet);
    } else if (type === "Nami") {
      setProvider("Nami");
      if (!window.cardano || !window.cardano.nami) {
        notification("Please install Nami wallet", "error");
        return;
      }

      try {
        handleNamiWallet();
      } catch (e) {
        notification("Please install Nami wallet", "error");
        return;
      }
    } else if (type === "Phantom") {
      if (!window.phantom) {
        notification("Please install Phantom wallet", "error");
        return;
      }

      setProvider("Phantom");
      select(type);
    } else {
      console.log(type);
    }
  };

  const handleNamiWallet = async () => {
    const namiWallet = await BrowserWallet.enable("nami");
    const changeAddress = await namiWallet.getChangeAddress();
    const networkId = await namiWallet.getNetworkId();
    const balance = await namiWallet.getBalance();

    const obj = {
      content: changeAddress.slice(0, 8) + ".." + changeAddress.slice(-3),
      address: changeAddress,
      name: "Nami",
      network: "CARDANO",
      index: 2,
    };
    const result = {
      wallet: obj.name,
      address: obj.address,
      token: {
        address: changeAddress,
        chainId: networkId,
      },
      chainId: networkId,
      balance: balance,
      networkVersion: obj.network,
      network: obj.network,
      currencyName: "ADA",
    };
    dispatch(setWalletData(result));
    dispatch(setUserData(obj));
  };
  const accpetOffer = async (index) => {
    setShowAcceptModal(true);
    setOfferItem(offers.data[index]);
  };

  useEffect(() => {
    if (nftDetails.ownerAddress == walletData.address) {
      setIsOwner(true);
    }

    if (
      nftDetails.blockchain === "ethereum" ||
      nftDetails.blockchain === "polygon"
    ) {
      if (networkInfo[getChainId(nftDetails.blockchain)].marketplaceContract) {
        window.ethereum.enable();
        const web3 = new Web3(window.web3.currentProvider);
        setContract(
          new web3.eth.Contract(
            marketplaceContractABI,
            networkInfo[getChainId(nftDetails.blockchain)].marketplaceContract
          )
        );
      }
    }
    setViewCnt(nftDetails.viewCount);

    if (
      nftDetails.blockchain &&
      walletData.network?.toLowerCase() !== nftDetails.blockchain
    ) {
      // notification("Invalied wallet selected. Please change wallet to " + getWalletName(nftDetails.blockchain), "error");
      switchWallet(getWalletName(nftDetails.blockchain));
    }
  }, [nftDetails]);

  useEffect(() => {
    if (
      nftDetails.blockchain &&
      walletData.network?.toLowerCase() !== nftDetails.blockchain
    ) {
      // notification("Invalied wallet selected. Please change wallet to " + getWalletName(nftDetails.blockchain), "error");
      switchWallet(getWalletName(nftDetails.blockchain));
    }
  }, [walletData.network]);

  useEffect(() => {
    fetchData();
    addViewCnt(params.id);
  }, [params.id]);

  useEffect(() => {
    if (nftDetails.blockchain) {
      getUSDPrice(nftDetails.blockchain).then((price) => setUsdPrice(price));
      if (nftDetails.platform === "opensea") {
        const sdk = new OpenSeaSDK(window.web3.currentProvider, {
          // networkName: Network.Main,
          networkName: Network.Goerli,
          // apiKey: process.env.NEXT_PUBLIC_OPENSEA_APIKEY
        });
        setOpenseaSDK(sdk);
        if (nftDetails.tokenId) {
          (async function (sdk) {
            const order = await sdk.api
              .getOrder({
                side: "ask",
                tokenId: "329848",
                assetContractAddress:
                  "0x317a8fe0f1c7102e7674ab231441e485c64c178a",
                // tokenId: nftDetails.tokenId,
                // assetContractAddress: nftDetails.contractAddress
              })
              .catch((e) => Promise.resolve(null));
            setOpenseaOrder(order);
            if (order) {
              setNftDetails({
                ...nftDetails,
                price: order.currentPrice,
              });
            }
          })(sdk);
        }
      }
    }
  }, [nftDetails.blockchain]);
  useEffect(() => {
    if (userData && userData.user) {
      setFavoriteNfts(userData.user.favoriteNfts);
    }
  }, [userData]);

  useEffect(() => {
    if (favoriteNfts?.includes(nftDetails?.assetId)) {
      setFavoriteState(true);
    } else {
      setFavoriteState(false);
    }
  }, [favoriteNfts, nftDetails]);
  return (
    <React.Fragment>
      {/* {
                loading &&
                <Loading></Loading>
            } */}
      <MakeOfferModal
        nftDetails={nftDetails}
        openseaSDK={openseaSDK}
        closeAction={() => {
          setShowOfferModal(false);
          fetchData();
        }}
        show={showOfferModal}
      />
      <AcceptOfferModal
        nftDetails={nftDetails}
        openseaSDK={openseaSDK}
        offer={offerItem}
        closeAction={() => {
          setShowAcceptModal(false);
          fetchData();
        }}
        show={showAcceptModal}
      />
      <UpdatePriceModal
        nftDetails={nftDetails}
        closeAction={setShowUpdatePriceModal}
        show={showUpdatePriceModal}
      />
      <Dialog sx={styles.mintLoadingDialog} open={loading}>
        <Box sx={styles.mintLoadingTitle} component={"span"}>
          Please wait
        </Box>
        <Box sx={styles.mintLoadingBox}>
          <CircularProgress />
        </Box>
      </Dialog>
      <Stack spacing={2} className={classes.NFTpreview}>
        <Grid container spacing={3}>
          <Grid
            item
            lg={5}
            md={6}
            sm={12}
            xs={12}
            className={classes.cardgridleft}
          >
            <Stack>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <BootstrapTooltip title={"Chain: " + nftDetails.blockchain}>
                  <Button sx={{ display: "flex", justifyContent: "left" }}>
                    <Box
                      component="img"
                      src={getCoinIcons(nftDetails.blockchain)}
                      sx={{
                        width: "1.5rem",
                        height: "1.5rem",
                        background: "#000",
                        borderRadius: "100%",
                        padding: "2px",
                      }}
                    ></Box>
                  </Button>
                </BootstrapTooltip>
                <Stack
                  direction="row"
                  justifyContent={"right"}
                  alignItems="center"
                  sx={{ columnGap: "5px" }}
                >
                  <Typography>{nftDetails.favouriteCount}</Typography>
                  <FavoriteBorderIcon
                    sx={{ cursor: "pointer", "&:hover": { color: "red" } }}
                  ></FavoriteBorderIcon>
                </Stack>
              </Box>
              <Card
                className={classes.cardimg}
                sx={{ boxShadow: "none !important" }}
              >
                <Box
                  component="img"
                  className={classes.cardimggroup}
                  src={replaceIpfsUrl(nftDetails.imageUrl)}
                  width={"100%"}
                  onClick={handleOpen}
                  sx={{ borderRadius: "5px" }}
                ></Box>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="parent-modal-title"
                  aria-describedby="parent-modal-description"
                  className="modal-back"
                >
                  <Box sx={{ ...style, width: 200 }} onClick={handleClose}>
                    <Box
                      component="img"
                      src={replaceIpfsUrl(nftDetails.imageUrl)}
                      maxHeight={800}
                      height={800}
                    ></Box>
                  </Box>
                </Modal>
              </Card>
            </Stack>
            <Stack>
              <Accordion expanded className={classes.nabarhead}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Stack direction={"row"} spacing={1}>
                    <Box
                      component="img"
                      src={Traits.src}
                      className={classes.nfttraits}
                    ></Box>
                    <Typography className={classes.nfttraits}>
                      Propertis
                    </Typography>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack
                    direction={"row"}
                    flexWrap={"wrap"}
                    className={classes.bgcolorcard}
                  >
                    {Object.keys(nftDetails?.attributes || {}).map((k, ind) => {
                      const values = Object.values(nftDetails.attributes);
                      return (
                        <Card
                          className={[
                            classes.bgcolorcard,
                            classes.nftAttributeCard,
                          ]}
                        >
                          <CardContent>
                            <Box className={classes.cardbox}>
                              <Stack spacing={1} alignItems={"center"}>
                                <Typography className={classes.background}>
                                  {k}
                                </Typography>
                                <Typography className={classes.pink}>
                                  {values[ind]}
                                </Typography>
                                {/* <Typography className={classes.cardtrait}>13% have this trait</Typography> */}
                              </Stack>
                            </Box>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </Stack>
                </AccordionDetails>
              </Accordion>
              {showOwnerDetailsPanel ? (
                <Accordion expanded className={classes.nabarhead}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Stack direction={"row"} spacing={1}>
                      <Box
                        component="img"
                        src={Traits.src}
                        className={classes.nfttraits}
                      ></Box>
                      <Typography className={classes.nfttraits}>
                        About
                      </Typography>
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Card className={classes.bgcolorcard}>
                      <CardContent>
                        <Stack
                          direction={"row"}
                          justifyContent={"space-between"}
                          className={classes.cardheaderdetail}
                        >
                          <CardHeader
                            avatar={
                              <Avatar
                                className={classes.cardavatar}
                                aria-label="recipe"
                              >
                                <Box
                                  component="img"
                                  className={classes.cardimggroup}
                                  src={nftDetails.owner?.profileUrl}
                                ></Box>
                              </Avatar>
                            }
                            title={
                              <Stack
                                direction={"row"}
                                spacing={1}
                                alignItems={"center"}
                              >
                                <Typography className={classes.doodles}>
                                  {nftDetails.owner?.displayName ||
                                    (nftDetails.blockchain !== "polygon" &&
                                      sliceLongString(
                                        nftDetails.ownerAddress,
                                        5
                                      ))}
                                </Typography>
                                <Box
                                  component="img"
                                  src={NFTcheck.src}
                                  className={classes.nftcheck}
                                ></Box>
                              </Stack>
                            }
                            className={classes.cardheader}
                          />
                          {/* <Stack direction={"row"} spacing={1} alignItems={"center"}>
                                            <Box onClick={() => { gotoSocialSite("discord") }} className={classes.icongroup}><Box component="img" src={Discord.src} className={classes.discord} ></Box></Box>
                                            <Box onClick={() => { gotoSocialSite("twitter") }} className={classes.icongroup}><TwitterIcon /> </Box>
                                            <Box onClick={() => { gotoSocialSite("instagram") }} className={classes.icongroup}><InstagramIcon /> </Box>
                                        </Stack> */}
                        </Stack>
                        <Typography className={classes.cardheadtext}>
                          {nftDetails.owner?.bio || ""}
                        </Typography>
                      </CardContent>
                    </Card>{" "}
                    : null
                  </AccordionDetails>
                </Accordion>
              ) : (
                <></>
              )}
              <Accordion expanded className={classes.nabarhead}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Stack direction={"row"} spacing={1}>
                    <Box className={classes.notedetailicon}>
                      <NotesIcon className={classes.detailicon} />
                    </Box>
                    <Typography className={classes.nfttraits}>
                      Detail
                    </Typography>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>
                  {showNftDetailsPanel ? (
                    <Card className={classes.bgcolorcard}>
                      <CardContent>
                        <Stack spacing={2}>
                          {nftDetails.contractAddress ? (
                            <Stack
                              direction={"row"}
                              justifyContent={"space-between"}
                            >
                              <Typography className={classes.contractAddress}>
                                Contract Address:{" "}
                              </Typography>
                              <Typography className={classes.contracthash}>
                                {sliceLongString(nftDetails.contractAddress, 6)}
                              </Typography>
                            </Stack>
                          ) : null}
                          {nftDetails.tokenId ? (
                            <Stack
                              direction={"row"}
                              justifyContent={"space-between"}
                            >
                              <Typography className={classes.contractAddress}>
                                Token ID:{" "}
                              </Typography>
                              <Typography className={classes.contracthash}>
                                {sliceLongString(nftDetails.tokenId, 5)}
                              </Typography>
                            </Stack>
                          ) : null}
                          {nftDetails.contractType ? (
                            <Stack
                              direction={"row"}
                              justifyContent={"space-between"}
                            >
                              <Typography className={classes.contractAddress}>
                                Token Standard:{" "}
                              </Typography>
                              <Typography className={classes.contractAddress}>
                                {nftDetails.contractType}
                              </Typography>
                            </Stack>
                          ) : null}
                          {nftDetails.blockchain ? (
                            <Stack
                              direction={"row"}
                              justifyContent={"space-between"}
                            >
                              <Typography className={classes.contractAddress}>
                                Blockchain:{" "}
                              </Typography>
                              <Typography className={classes.contractAddress}>
                                {nftDetails.blockchain}
                              </Typography>
                            </Stack>
                          ) : null}
                          {nftDetails.creatorEarnings ? (
                            <Stack
                              direction={"row"}
                              justifyContent={"space-between"}
                            >
                              <Typography className={classes.contractAddress}>
                                Creator Earnings:{" "}
                              </Typography>
                              <Typography className={classes.contractAddress}>
                                {nftDetails.creatorEarnings}
                              </Typography>
                            </Stack>
                          ) : null}
                        </Stack>
                      </CardContent>
                    </Card>
                  ) : null}
                </AccordionDetails>
              </Accordion>
            </Stack>
          </Grid>
          <Grid
            item
            lg={7}
            md={6}
            sm={12}
            xs={12}
            className={classes.cardgridright}
            sx={{ rowGap: "20px" }}
          >
            <Stack
              spacing={5}
              justifyContent={"space-between"}
              className={classes.cardimg}
              sx={{ height: "auto !important" }}
            >
              <Stack spacing={2} sx={{ rowGap: "20px" }}>
                <Stack
                  direction={"column"}
                  justifyContent="center"
                  alignItems="left"
                  sx={{ rowGap: "20px" }}
                >
                  <Stack direction={"row"} spacing={1} alignItems={"center"}>
                    <Typography className={classes.doodles}>
                      {nftDetails?.collection?.name}
                    </Typography>
                    <Box
                      component="img"
                      src={NFTcheck.src}
                      className={classes.nftcheck}
                    ></Box>
                  </Stack>
                  <Typography
                    className={classes.fonttype}
                    sx={{ textAlign: "left" }}
                  >
                    {nftDetails.name}
                  </Typography>
                </Stack>
                <Stack direction={"row"}>
                  <Typography sx={{ mr: 1 }} className={classes.ownedby}>
                    Owned by
                  </Typography>
                  <Tooltip placement="top" title={isCopy ? "Copied!" : "Copy"}>
                    <Typography
                      ref={ref}
                      sx={{ cursor: "pointer" }}
                      onClick={() => copyAddress()}
                      className={classes.avdrwwc}
                    >
                      {nftDetails.ownerAddress == walletData.address
                        ? "You"
                        : sliceLongString(nftDetails.ownerAddress, 5)}
                    </Typography>
                  </Tooltip>
                </Stack>
                <Stack
                  direction={"row"}
                  justifyContent={"left"}
                  alignItems="center"
                  sx={{ columnGap: "10px" }}
                >
                  <Stack direction={"row"} spacing={1} alignItems={"center"}>
                    <VisibilityIcon className={classes.viewicon} />
                    <Typography className={classes.NFTviews}>
                      {viewCnt} views
                    </Typography>
                  </Stack>
                  <Stack direction={"row"} spacing={1}>
                    {favoriteState ? (
                      <FavoriteIcon
                        sx={{ color: "red" }}
                        onClick={(e) => {
                          onSetFavorite();
                        }}
                        className={classes.viewicon}
                      />
                    ) : (
                      <FavoriteBorderIcon
                        onClick={(e) => {
                          onSetFavorite();
                        }}
                        className={classes.viewicon}
                      />
                    )}
                    <Typography className={classes.NFTviews}>
                      {nftDetails.favouriteCount} favorites
                    </Typography>
                  </Stack>
                  <Stack direction={"row"} spacing={1} alignItems={"center"}>
                    <CategoryIcon className={classes.viewicon}></CategoryIcon>
                    <Typography className={classes.NFTviews}>
                      {nftDetails.platform}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
              <Stack>
                <Card>
                  <CardContent sx={{ padding: "0px" }}>
                    <Stack spacing={3} p={3}>
                      {(() => {
                        if (nftDetails.expiry) {
                          return (
                            <Box>
                              <Stack direction={"row"} spacing={1}>
                                <AccessTimeIcon
                                  className={classes.cardnftdetail}
                                />
                                <Typography className={classes.cardnftdetail}>
                                  Sale ends November 21st at 6:30am GMT-7
                                </Typography>
                              </Stack>
                              <Stack spacing={2} direction={"row"}>
                                <Stack
                                  direction={"row"}
                                  alignItems={"flex-end"}
                                  spacing={1}
                                >
                                  <Typography className={classes.timenumber}>
                                    18
                                  </Typography>
                                  <Typography className={classes.datetype}>
                                    Hours
                                  </Typography>
                                </Stack>
                                <Stack
                                  direction={"row"}
                                  alignItems={"flex-end"}
                                  spacing={1}
                                >
                                  <Typography className={classes.timenumber}>
                                    18
                                  </Typography>
                                  <Typography className={classes.datetype}>
                                    Hours
                                  </Typography>
                                </Stack>
                                <Stack
                                  direction={"row"}
                                  alignItems={"flex-end"}
                                  spacing={1}
                                >
                                  <Typography className={classes.timenumber}>
                                    18
                                  </Typography>
                                  <Typography className={classes.datetype}>
                                    Hours
                                  </Typography>
                                </Stack>
                              </Stack>
                            </Box>
                          );
                        } else {
                          return null;
                        }
                      })()}
                      <Stack
                        direction={"column"}
                        spacing={1}
                        alignItems="flex-start"
                        justifyContent={"center"}
                      >
                        {offers.data.length > 0 ? (
                          <Typography
                            className={classes.cardnftdetail}
                            variant="h4"
                            sx={{
                              color: "#707a83 !important",
                              fontWeight: "500 !important",
                            }}
                          >
                            Best Offer
                          </Typography>
                        ) : (
                          <Typography
                            className={classes.cardnftdetail}
                            variant="h4"
                            sx={{
                              color: "#707a83 !important",
                              fontWeight: "500 !important",
                            }}
                          >
                            Current price
                          </Typography>
                        )}
                        {offers.data.length > 0 ? (
                          <Stack
                            direction={"row"}
                            spacing={1}
                            alignItems="flex-end"
                            justifyContent="left"
                          >
                            <Box
                              component="img"
                              src={getCoinIcons(offers?.data[0]?.blockchain)}
                              className={classes.nftethereum}
                              sx={{ width: "30px", height: "30px" }}
                            ></Box>
                            <Typography
                              variant="h1"
                              sx={{
                                color: "#353840 !important",
                                fontWeight: "600 !important",
                              }}
                              className={classes.ethereumnumber}
                            >
                              {offers?.data[0]?.amount}
                            </Typography>
                            <Typography
                              variant="h4"
                              sx={{
                                color: "#707a83 !important",
                                fontWeight: "600 !important",
                              }}
                              className={classes.ethereumnumber}
                            >
                              ${(offers?.data[0]?.amount * usdPrice).toFixed(2)}
                            </Typography>
                          </Stack>
                        ) : (
                          <Stack
                            direction={"row"}
                            spacing={1}
                            alignItems="flex-end"
                            justifyContent="left"
                          >
                            <Box
                              component="img"
                              src={getCoinIcons(nftDetails.blockchain)}
                              className={classes.nftethereum}
                              sx={{ width: "30px", height: "30px" }}
                            ></Box>
                            <Typography
                              variant="h1"
                              sx={{
                                color: "#353840 !important",
                                fontWeight: "600 !important",
                              }}
                              className={classes.ethereumnumber}
                            >
                              {getRealPrice(
                                nftDetails.price || 0,
                                nftDetails.blockchain
                              )}
                            </Typography>
                            <Typography
                              variant="h4"
                              sx={{
                                color: "#707a83 !important",
                                fontWeight: "600 !important",
                              }}
                              className={classes.ethereumnumber}
                            >
                              $
                              {(
                                getRealPrice(
                                  nftDetails.price || 0,
                                  nftDetails.blockchain
                                ) * usdPrice
                              ).toFixed(2)}
                            </Typography>
                          </Stack>
                        )}
                      </Stack>
                      <Stack direction={"row"} spacing={1}>
                        {authed &&
                          (() => {
                            if (
                              nftDetails.ownerAddress === walletData.address
                            ) {
                              if (
                                nftDetails.price > 0 &&
                                nftDetails.isForSale
                              ) {
                                return (
                                  <>
                                    <Button
                                      className={classes.buybutton}
                                      onClick={() =>
                                        setShowUpdatePriceModal(
                                          !showUpdatePriceModal
                                        )
                                      }
                                      sx={{ width: "200px", height: "50px" }}
                                    >
                                      Update Price
                                    </Button>
                                    {/* <Button
                                                                    className={classes.buybutton}
                                                                    onClick={() => onCancel()}
                                                                    sx={{ width: "200px", height: "50px" }}>
                                                                    Cancel
                                                                </Button> */}
                                  </>
                                );
                              } else {
                                return (
                                  <Button
                                    className={classes.buybutton}
                                    onClick={() =>
                                      navigate("/asset/" + params.id + "/sell")
                                    }
                                    sx={{ width: "200px", height: "50px" }}
                                  >
                                    Sell
                                  </Button>
                                );
                              }
                            } else {
                              return (
                                <>
                                  {(nftDetails?.auctions?.find(
                                    (auction) => !auction.deleted
                                  ) ||
                                    true ||
                                    (nftDetails.price > 0 &&
                                      nftDetails.platform)) && (
                                    <Button
                                      onClick={buyNFT}
                                      className={classes.buybutton}
                                      sx={{ width: "200px", height: "50px" }}
                                    >
                                      Buy Now
                                    </Button>
                                  )}
                                  {
                                    // nftDetails.price > 0 && nftDetails.platform ? null :
                                    <Button
                                      variant="outlined"
                                      onClick={() =>
                                        setShowOfferModal(!showOfferModal)
                                      }
                                      classes={{ root: classes.makeofferbut }}
                                      sx={{ width: "200px", height: "50px" }}
                                    >
                                      <LocalOfferIcon
                                        sx={{ color: "#3386ee !important" }}
                                      ></LocalOfferIcon>
                                      &nbsp;&nbsp;
                                      <Box component={"span"}>Make Offer</Box>
                                    </Button>
                                  }
                                </>
                              );
                            }
                          })()}
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Stack>
              <Stack sx={{ marginTop: "0px !important" }}>
                <Accordion expanded className={classes.nabarhead}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Stack direction={"row"} spacing={1} onClick={handleChange}>
                      <Box
                        component="img"
                        src={Vector.src}
                        className={classes.nftcheck}
                      ></Box>
                      <Typography className={classes.nfttraits}>
                        Price History
                      </Typography>
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Card className={classes.bgcard}>
                      <Chart
                        options={priceHistoryChartOptions}
                        series={priceHistoryChartSeries}
                        type="line"
                        height={"180px"}
                      />
                    </Card>
                  </AccordionDetails>
                </Accordion>
                <Accordion expanded className={classes.nabarhead}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Stack direction={"row"} spacing={1}>
                      <Box
                        component="img"
                        src={Filterresult.src}
                        className={classes.filterresult}
                      ></Box>
                      <Typography className={classes.nfttraits}>
                        Listings
                      </Typography>
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Card>
                      {nftDetails.listings.length > 0 ? (
                        <TableContainer component={Paper}>
                          <Table
                            className={classes.tablelist}
                            size="small"
                            aria-label="a dense table"
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell
                                  align="center"
                                  className={classes.itemhead}
                                >
                                  Price
                                </TableCell>
                                <TableCell
                                  align="center"
                                  className={classes.itemhead}
                                >
                                  USD Price
                                </TableCell>
                                <TableCell
                                  align="center"
                                  className={classes.itemhead}
                                >
                                  Expiration
                                </TableCell>
                                <TableCell
                                  align="center"
                                  className={classes.itemhead}
                                >
                                  From
                                </TableCell>
                                <TableCell
                                  align="center"
                                  className={classes.itemhead}
                                ></TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {nftDetails.listings?.map((row, i) => (
                                <TableRow
                                  key={i}
                                  className={
                                    i % 2 === 0
                                      ? classes.rowtype
                                      : classes.rowstyle
                                  }
                                >
                                  <TableCell
                                    className={classes.NFTitemlist}
                                    component="th"
                                    scope="row"
                                  >
                                    <Stack
                                      direction={"row"}
                                      alignItems={"center"}
                                    >
                                      <Box
                                        component="img"
                                        className={classes.ethereumicon}
                                        src={getCoinIcons(
                                          nftDetails.blockchain
                                        )}
                                      ></Box>
                                      <Typography className={classes.NFTprice}>
                                        {getRealPrice(
                                          row.price || 0,
                                          nftDetails.blockchain
                                        )}
                                      </Typography>
                                    </Stack>
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    className={classes.NFTitemlist}
                                  >
                                    <Typography className={classes.NFTtype}>
                                      $
                                      {(
                                        getRealPrice(
                                          row.price || 0,
                                          nftDetails.blockchain
                                        ) * usdPrice
                                      ).toFixed(4)}
                                    </Typography>
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    className={classes.NFTitemlist}
                                  >
                                    <Typography className={classes.NFTtype}>
                                      {row.expiry || ""}
                                    </Typography>
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    className={classes.NFTitemlist}
                                  >
                                    <Typography className={classes.NFTtype}>
                                      {sliceLongString(row.from || "", 5)}
                                    </Typography>
                                  </TableCell>
                                  {/* <TableCell align="center"
                                                                            className={classes.NFTitemlist}>
                                                                            <Button variant="outlined"
                                                                                classes={{ root: classes.makebuy }}
                                                                                onClick={buyNFT}>
                                                                                <Box component={"span"}>
                                                                                    Buy
                                                                                </Box>
                                                                            </Button>
                                                                        </TableCell> */}
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      ) : (
                        <Stack
                          direction={"column"}
                          justifyContent={"center"}
                          alignItems={"center"}
                          sx={{ padding: "30px" }}
                        >
                          <Box component="img" src={Empty.src}></Box>
                          <Typography className={classes.nfttraits}>
                            No listings Yet
                          </Typography>
                        </Stack>
                      )}
                    </Card>
                  </AccordionDetails>
                </Accordion>
                <Accordion expanded className={classes.nabarhead}>
                  <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <Stack direction={"row"} spacing={1}>
                      <FormatListBulletedIcon />
                      <Typography className={classes.nfttraits}>
                        Offers
                      </Typography>
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Card>
                      {offers.data.length > 0 ? (
                        <TableContainer component={Paper}>
                          <Table
                            className={classes.tablelist}
                            size="small"
                            aria-label="a dense table"
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell
                                  align="center"
                                  className={classes.itemhead}
                                >
                                  Price
                                </TableCell>
                                <TableCell
                                  align="center"
                                  className={classes.itemhead}
                                >
                                  USD Price
                                </TableCell>
                                <TableCell
                                  align="center"
                                  className={classes.itemhead}
                                >
                                  Floor Difference
                                </TableCell>
                                <TableCell
                                  align="center"
                                  className={classes.itemhead}
                                >
                                  Expiration
                                </TableCell>
                                <TableCell
                                  align="center"
                                  className={classes.itemhead}
                                >
                                  From
                                </TableCell>
                                {nftDetails.ownerAddress ===
                                  walletData.address && (
                                  <TableCell
                                    align="center"
                                    className={classes.itemhead}
                                  ></TableCell>
                                )}
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {offers.data.map((row, i) => (
                                <TableRow
                                  key={i}
                                  className={
                                    i % 2 === 0
                                      ? classes.rowtype
                                      : classes.rowstyle
                                  }
                                >
                                  <TableCell
                                    className={classes.NFTitemlist}
                                    component="th"
                                    scope="row"
                                    align="center"
                                  >
                                    <Stack
                                      direction={"row"}
                                      alignItems={"center"}
                                      justifyContent="center"
                                    >
                                      <Box
                                        component="img"
                                        className={classes.ethereumicon}
                                        src={getCoinIcons(row.blockchain)}
                                      ></Box>
                                      {/* <Typography className={classes.NFTprice}>{getRealPrice(row.amount || 0, nftDetails.blockchain)}</Typography> */}
                                      <Typography className={classes.NFTprice}>
                                        {row.amount}
                                      </Typography>
                                    </Stack>
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    className={classes.NFTitemlist}
                                  >
                                    <Typography className={classes.NFTtype}>
                                      ${(row.amount * usdPrice).toFixed(2)}
                                    </Typography>
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    className={classes.NFTitemlist}
                                  >
                                    <Typography className={classes.NFTtype}>
                                      {row.floorDiff || ""}
                                    </Typography>
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    className={classes.NFTitemlist}
                                  >
                                    <Typography className={classes.NFTtype}>
                                      about {aboutHours(row.expiry)} hours
                                    </Typography>
                                  </TableCell>
                                  <TableCell
                                    align="center"
                                    className={classes.NFTitemlist}
                                  >
                                    <Typography
                                      className={classes.NFTtype}
                                      sx={{ color: "#2081e2 !important" }}
                                    >
                                      {sliceLongString(
                                        row.bidderAddress || "",
                                        5
                                      )}
                                    </Typography>
                                  </TableCell>
                                  {nftDetails.ownerAddress ===
                                    walletData.address && (
                                    <TableCell
                                      align="center"
                                      className={classes.NFTitemlist}
                                    >
                                      <Stack
                                        direction="row"
                                        justifyContent={"center"}
                                        alignItems="center"
                                        columnSpacing={1}
                                      >
                                        <Button className={classes.counterbtn}>
                                          Counter
                                        </Button>
                                        <Button
                                          className={classes.acceptbtn}
                                          onClick={() => accpetOffer(i)}
                                        >
                                          Accept
                                        </Button>
                                      </Stack>
                                    </TableCell>
                                  )}
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      ) : (
                        <Stack
                          direction={"column"}
                          justifyContent={"center"}
                          alignItems={"center"}
                          sx={{ padding: "30px" }}
                        >
                          <Box component="img" src={Empty.src}></Box>
                          <Typography className={classes.nfttraits}>
                            No listings Yet
                          </Typography>
                        </Stack>
                      )}
                    </Card>
                  </AccordionDetails>
                </Accordion>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Accordion expanded className={classes.nabarhead}>
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Stack direction={"row"} spacing={1}>
                  <SwapVertIcon />
                  <Typography className={classes.nfttraits}>
                    Item Activity
                  </Typography>
                  <ExpandMoreIcon className={classes.nfttraits} />
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <Card>
                  {nftActivity.data.length > 0 ? (
                    <TableContainer component={Paper}>
                      <Table
                        className={classes.tablelist}
                        size="small"
                        aria-label="a dense table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell
                              align="left"
                              className={classes.itemhead}
                            >
                              Type
                            </TableCell>
                            <TableCell
                              align="left"
                              className={classes.itemhead}
                            >
                              Price
                            </TableCell>
                            <TableCell
                              align="left"
                              className={classes.itemhead}
                            >
                              From
                            </TableCell>
                            <TableCell
                              align="left"
                              className={classes.itemhead}
                            >
                              To
                            </TableCell>
                            <TableCell
                              align="left"
                              className={classes.itemhead}
                            >
                              Date
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {nftActivity.data.map((row, i) => (
                            <TableRow
                              key={i}
                              className={
                                i % 2 === 0 ? classes.rowtype : classes.rowstyle
                              }
                            >
                              <TableCell
                                className={classes.NFTitemlist}
                                component="th"
                                scope="row"
                              >
                                {row.name}
                              </TableCell>
                              <TableCell
                                align="left"
                                className={classes.NFTitemlist}
                              >
                                {getRealPrice(row.price, nftDetails.blockchain)}
                              </TableCell>
                              <TableCell
                                align="left"
                                className={classes.NFTitemlist}
                              >
                                {sliceLongString(row.from, 5)}
                              </TableCell>
                              <TableCell
                                align="left"
                                className={classes.NFTitemlist}
                              >
                                {sliceLongString(row.to, 5)}
                              </TableCell>
                              <TableCell
                                align="left"
                                className={classes.NFTitemlist}
                              >
                                <Link
                                  to={
                                    getBlockchainTxScanUrl(
                                      nftDetails.blockchain
                                    ) + row.transactionHash
                                  }
                                >
                                  {row.createdAt}
                                </Link>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  ) : (
                    <Stack
                      direction={"column"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      sx={{ padding: "30px" }}
                    >
                      <Box component="img" src={Empty.src}></Box>
                      <Typography className={classes.nfttraits}>
                        No listings Yet
                      </Typography>
                    </Stack>
                  )}
                  <Stack
                    direction={"row"}
                    spacing={1}
                    className={classes.loadmore}
                  >
                    {nftActivity.total < nftActivity.limit ? null : (
                      <Button
                        variant="outlined"
                        onClick={() =>
                          getNftActivity(
                            nftActivity.limit + 5,
                            nftActivity.offset + 5
                          )
                        }
                      >
                        Load More
                      </Button>
                    )}
                  </Stack>
                </Card>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Box sx={{ padding: "0 15px", width: "100%" }}>
            <Box
              sx={{
                paddingBottom: "50px",
                display: "flex",
                alignItems: "baseline",
                columnGap: "50px",
              }}
            >
              <Stack direction={"row"} spacing={1}>
                <Box
                  component="img"
                  src={Filterresult.src}
                  className={classes.filterresult}
                ></Box>
                <Typography className={classes.nfttraits}>
                  More From This Collection
                </Typography>
              </Stack>
            </Box>
            <Box
              className={nftclasses.introCard}
              sx={{
                display: "flex",
                "overflow-x": "auto",
                width: "100%",
                columnGap: "20px",
              }}
            >
              {morenft?.slice(0, 10).map((item, index) => (
                <Box
                  container
                  spacing={2}
                  className={nftclasses.nftGrid}
                  sx={{ display: "flex", minWidth: "15%", flexFlow: "column" }}
                >
                  <NftCard key={item._id} item={item} />
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
      </Stack>
    </React.Fragment>
  );
};

export default ItemDetails;
