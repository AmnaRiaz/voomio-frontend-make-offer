import React, { useEffect, useState } from "react"

import { useSelector } from "react-redux"
import Web3 from 'web3';
import { OpenSeaSDK, Network } from 'opensea-js'

// @mui/material components
import { makeStyles } from "@mui/styles"
// core components
import { styles } from "../../assets/theme/views/nftgenerator/upload"
import componentStyles from "/src/assets/theme/views/profile/makeoffermodal"
import { Box, Stack } from "@mui/system"
import {
    Button,
    Dialog,
    DialogContent,
    IconButton,
    InputBase,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    CircularProgress
} from "@mui/material"
import Checkbox from '@mui/material/Checkbox';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { replaceIpfsUrl } from "/src/utils/utility"
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import reviewCollection from "/src/assets/image/views/profile/detail/review-collection.png"
import { getChainId, getCoinIcons, getRealPrice, getWalletName, networkInfo, notification, sliceLongString } from "../../utils/utility"
import { switchNetwork } from "../../utils/connectors"

import marketplaceContractABI from "../../contracts/marketplace.json"
import { makeOfferAction } from "../../redux/actions/main";
import { useWeb3React } from "@web3-react/core";
import { getJpgStoreCollectionTransactions } from "../../redux/actions/jpg.store";
import { purchaseTokenViaCbor } from "../../cardano/token";

const useStyles = makeStyles(componentStyles)

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const MakeOfferModal = ({ show, closeAction, nftDetails, openseaSDK }) => {
    const classes = useStyles()

    const walletData = useSelector(state => state.wallet)
    const { chainId } = useWeb3React();

    const [makeofferpage, setMakeOfferPage] = useState(true)
    const [Moreflag, setMoreflag] = useState(false)
    const [loading, setLoading] = useState(false)
    const [contract, setContract] = useState(null);
    const date1 = new Date().valueOf() + 1000 * 3600 * 12

    const [value, setValue] = React.useState(new Date(date1));
    const [price, setPrice] = React.useState('');

    const [durationvalue, setdurationvalue] = useState(0)
    const handleDurationValue = (event) => {
        setdurationvalue(event.target.value)
        if (event.target.value === 0) {
            const date = new Date().valueOf() + 1000 * 3600 * 12
            setValue(new Date(date))
        } else if (event.target.value === 1) {
            const date = new Date().valueOf() + 1000 * 3600 * 24
            setValue(new Date(date))
        } else if (event.target.value === 2) {
            const date = new Date().valueOf() + 1000 * 3600 * 24 * 3
            setValue(new Date(date))
        } else if (event.target.value === 3) {
            const date = new Date().valueOf() + 1000 * 3600 * 24 * 7
            setValue(new Date(date))
        } else if (event.target.value === 4) {
            const date = new Date().valueOf() + 1000 * 3600 * 24 * 30
            setValue(new Date(date))
        }
    }

    const makeOffer = async () => {
        if (!walletData.address) {
            notification("Please connect to wallet", "error")
            return false
        }

        if (walletData.network.toLowerCase() !== nftDetails.blockchain.toLowerCase()) {
            notification("Please connect to " + getWalletName(nftDetails.blockchain) + " wallet", "error")
            return false
        }
        setLoading(true);
        if (nftDetails.blockchain === 'cardano') {
            if (nftDetails.platform === 'jpg.store') {
                const cardanoApi = window.cardano
                const hexCollateralUtxos = await cardanoApi.getUtxos();
                const { cbor, oldBuilder, txHash: buildTx, message: buildResultMessage } = await getJpgStoreCollectionTransactions({
                    action: 'OFFER',
                    address: walletData.address,
                    assets: [],
                    collateral: hexCollateralUtxos,
                    offerTxHash: null,
                    tracingId: "stake1u9qef3xsv2xl60fat43le507wlvpemsvamygstgs2tprj8cd4daru-".concat((new Date).toISOString(), "-").concat(Math.random() + '-AssetActionModal'),
                    utxos: hexCollateralUtxos,
                    assets: [{ asset: nftDetails.assetId, price: price * (10 ** 6), policy: null }]
                });

                if (buildResultMessage) {
                    notification('Build transaction failed. Please check Collateral status.', "error");
                    setLoading(false);
                    return;
                }

                const { result, tx, message } = await purchaseTokenViaCbor({ cborHex: cbor, txHash: buildTx });
                if (tx) {
                    setLoading(false)
                    notification("Success", "success");
                    closeAction(false)
                }
                if (!result) {
                    notification(message, "error");
                    setLoading(false)
                    return;
                }
            }
        } else if (nftDetails.blockchain === 'solana') {

        } else {
            if (chainId !== getChainId(nftDetails.blockchain)) {
                await switchNetwork(getChainId(nftDetails.blockchain));
            }
            if (nftDetails.platform === 'opensea') {
                const accountAddress = walletData.address // The buyer's wallet address, also the taker
                const expirationTime = Math.round(value.valueOf() / 1000)
                try {
                    const offer = await openseaSDK.createBuyOrder({
                        asset: {
                            // tokenId: nftDetails.tokenId,
                            // tokenAddress: nftDetails.contractAddress || nftDetails.collectionAddress,
                            tokenId: "107508847570861476402818560013842935961877337364393281416909217677644113379348",
                            tokenAddress: "0xf4910c763ed4e47a585e2d34baa9a4b611ae448c",
                        },
                        accountAddress,
                        startAmount: price,
                        expirationTime
                    })
                    if (offer) {
                        const state = await makeOfferAction({
                            id: nftDetails._id,
                            price: price,
                            buyer: accountAddress,
                            tx: offer.orderHash,
                            expiry: expirationTime,
                        });
                        if (state) {
                            setLoading(false)
                            notification("Success", "success");
                            closeAction(false)
                        } else {
                            setLoading(false)
                            notification("Server error", "error");
                        }
                    }
                } catch (err) {
                    console.log(err)
                    setLoading(false)
                    notification("Failed make offer", "error");
                }
            } else {
                const nftContract = nftDetails.collectionAddress;
                try {
                    const price = Web3.utils.toWei(value.toString());
                    const transaction = await contract.methods.makeETHOffer(nftContract, itemId, price).send({
                        from: walletData.address,
                        value: price
                    });
                    if (transaction) {
                        const buyData = await makeOfferAction({
                            id: nftDetails._id,
                            price: price,
                            buyer: walletData.address,
                            tx: transaction.transactionHash,
                            expiry: new Date(durationvalue).getTime()
                        });
                        if (buyData) {
                            setLoading(false)
                            notification("Success", "success");
                            closeAction(false)
                        } else {
                            setLoading(false)
                            notification("Server error", "error");
                        }
                    } else {
                        setLoading(false)
                        notification("Failed make offer", "error");
                        return false;
                    }
                } catch (e) {
                    setLoading(false)
                    notification("Failed make offer", "error");
                }
            }
        }
    }
    const getDate = (item) => {
        const date = new Date(item)
        return date.getFullYear() + " " + (date.getMonth() + 1) + " " + date.getDate()
    }
    useEffect(() => {
        if (nftDetails.blockchain === 'ethereum' || nftDetails.blockchain === 'polygon') {
            if (networkInfo[getChainId(nftDetails.blockchain)].marketplaceContract) {
                window.ethereum.enable();
                const web3 = new Web3(window.web3.currentProvider);
                setContract(new web3.eth.Contract(marketplaceContractABI, networkInfo[getChainId(nftDetails.blockchain)].marketplaceContract))
            }
        }
    }, [nftDetails.blockchain])

    return (
        <React.Fragment>
            <Dialog sx={styles.mintLoadingDialog} open={loading}>
                <Box sx={styles.mintLoadingTitle} component={"span"}>Please wait</Box>
                <Box sx={styles.mintLoadingBox}>
                    <CircularProgress />
                </Box>
            </Dialog>
            <Dialog open={show} onClose={() => closeAction(false)} className={classes.generateModal} >
                {
                    !makeofferpage ?
                        <DialogContent className={classes.generateModalContent} >
                            <Stack className={classes.generateModalHeader} gap={2}>
                                <Typography variant="h3">
                                    Make an offer
                                </Typography>
                            </Stack>
                            <Stack mt={5}  >
                                <Stack sx={{ alignItems: "center" }} >
                                    <Box component={"img"} src={reviewCollection.src} sx={{ height: "114px", width: "200px" }} >
                                    </Box>
                                    <Typography sx={{ padding: "10px 0" }}>
                                        Review this information to ensure it’s what you want to buy. info
                                    </Typography>
                                </Stack>
                                <Stack sx={{ margin: "10px 0" }}>
                                    <TableContainer component={Paper}>
                                        <Table aria-label="simple table">
                                            <TableBody>
                                                <TableRow
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        Collection name
                                                    </TableCell>
                                                    <TableCell align="left" sx={{ color: "rgb(32, 129, 226)", fontWeight: "bold" }}>
                                                        {nftDetails?.collection?.name}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        Creator
                                                    </TableCell>
                                                    <TableCell align="left" sx={{ color: "rgb(32, 129, 226)", fontWeight: "bold" }}>
                                                        {nftDetails?.createdBy ? nftDetails?.createdBy : "You"} ({getDate(nftDetails?.listingTime)})
                                                    </TableCell>
                                                </TableRow>
                                                {/* <TableRow
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        Total sales

                                                    </TableCell>
                                                    <TableCell align="left" sx={{ fontWeight: "bold" }}>
                                                        1 sale
                                                    </TableCell>
                                                </TableRow> */}

                                                <TableRow
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        Total volume
                                                    </TableCell>
                                                    <TableCell align="left" sx={{ fontWeight: "bold" }}>
                                                        {getRealPrice(nftDetails?.price || 0, nftDetails?.blockchain)}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                                    <TableCell component="th" scope="row">
                                                        Social links
                                                    </TableCell>
                                                    <TableCell align="left" sx={{ fontWeight: "bold" }}>
                                                        {nftDetails?.collection?.socials ? nftDetails?.collection?.socials : "Not specified"}
                                                    </TableCell>
                                                </TableRow>
                                                {
                                                    Moreflag ? <React.Fragment>

                                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                                            <TableCell component="th" scope="row">
                                                                Contract address

                                                            </TableCell>
                                                            <TableCell align="left" sx={{ color: "rgb(32, 129, 226)", fontWeight: "bold" }}>
                                                                {sliceLongString(nftDetails?.contractAddress)}
                                                            </TableCell>
                                                        </TableRow>

                                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                                            <TableCell component="th" scope="row">
                                                                Total items
                                                            </TableCell>
                                                            <TableCell align="left" sx={{ fontWeight: "bold" }}>
                                                                {nftDetails?.collection?.tokenCount || 0}
                                                            </TableCell>
                                                        </TableRow>

                                                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                                            <TableCell component="th" scope="row">
                                                                Created date
                                                            </TableCell>
                                                            <TableCell align="left" sx={{ fontWeight: "bold" }}>
                                                                {getDate(nftDetails?.collection.addedOn)}
                                                            </TableCell>
                                                        </TableRow>
                                                    </React.Fragment> : null
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <Stack>
                                        <Button onClick={() => setMoreflag(prev => { return !prev })} sx={{ fontWeight: "bold", padding: "10px", border: "1px solid rgba(224, 224, 224, 1)" }}>
                                            {
                                                !Moreflag ?
                                                    "Show More" :
                                                    "Show Less"
                                            }
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Stack className={classes.generateModalFooter} >
                                <Stack sx={{ flexDirection: "row" }} onClick={() => setMakeOfferPage(true)} >
                                    <Box component={"span"}>
                                        <Checkbox {...label} />
                                    </Box>
                                    <Typography>
                                        I understand that OpenSea has not reviewed this collection and blockchain transactions are irreversible.
                                    </Typography>
                                </Stack>
                            </Stack>
                        </DialogContent> :
                        <DialogContent className={classes.generateModalContent}>
                            <Stack className={classes.generateModalHeader} gap={2}>
                                <Stack>
                                    <Typography variant="h3">
                                        Make an offer
                                    </Typography>
                                </Stack>
                                <Stack sx={{ flexDirection: "row", width: "100%", alignItems: "center" }}>
                                    <Stack>
                                        <Box component="img" className={classes.makeofferimg} src={replaceIpfsUrl(nftDetails.imageUrl)} ></Box>
                                    </Stack>
                                    <Stack sx={{ flex: "1 1 auto", padding: "10px" }} >
                                        <Typography sx={{ fontWeight: "bold" }}>
                                            {nftDetails?.name}
                                        </Typography>
                                        <Typography>
                                            {nftDetails?.collection?.name}
                                        </Typography>
                                    </Stack>
                                    {/* <Stack>
                                        <Typography>
                                            --- WETH
                                        </Typography>
                                        <Typography>
                                            ---
                                        </Typography>
                                    </Stack> */}
                                </Stack>
                            </Stack>
                            <Stack mt={1}  >
                                <Stack sx={{
                                    border: "1px solid rgb(229, 232, 235)",
                                    borderRadius: "10px"
                                }}>
                                    {/* <Stack sx={{ justifyContent: "space-between", flexDirection: "row", padding: "10px" }}>
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                            <AccountBalanceWalletIcon />
                                            <Box component={"span"}>
                                                Balance
                                            </Box>
                                        </Box>
                                        <Box>
                                            0 WETH
                                        </Box>
                                    </Stack>
                                    <Stack sx={{ justifyContent: "space-between", flexDirection: "row", padding: "10px" }}>
                                        <Box>
                                            Floor price

                                        </Box>
                                        <Box>
                                            23 ETH
                                        </Box>
                                    </Stack>
                                    <Stack sx={{ justifyContent: "space-between", flexDirection: "row", padding: "10px" }}>
                                        <Box>
                                            Best offer
                                        </Box>
                                        <Box>
                                            ---
                                        </Box>
                                    </Stack> */}
                                </Stack>
                                <Stack sx={{
                                    margin: "10px 0px"
                                }} >
                                    <Paper
                                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
                                        style={{
                                            padding: "14px 20px 10px 20px",
                                            boxSizing: "border-box",
                                            borderRadius: "5px",
                                            border: "1px solid #d1daf1"
                                        }}
                                    >
                                        <InputBase
                                            sx={{ ml: 1, flex: 1 }}
                                            placeholder="price"
                                            inputProps={{ 'aria-label': 'price' }}
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                        <Box>
                                            <Box component="img" src={getCoinIcons(nftDetails.blockchain)} sx={{ width: "1.5rem", background: "#000", borderRadius: "100%", padding: "2px" }}></Box>
                                        </Box>

                                    </Paper>
                                </Stack>
                                <Stack>
                                    When making an offer, your {nftDetails.currency} will be locked in the smart contract. To retrieve your {nftDetails.currency}, you must cancel your offer as it will not be returned automatically.
                                </Stack>
                                {
                                    nftDetails.platform === 'opensea' ? <Stack sx={{ margin: "10px 0" }} >
                                        <Stack>
                                            <Typography>
                                                Duration
                                            </Typography>
                                        </Stack>
                                        <Stack sx={{ flexDirection: "row" }}>
                                            <Select value={durationvalue}
                                                onChange={handleDurationValue}
                                                displayEmpty
                                                className={classes.nativeselects}
                                            >
                                                <MenuItem value={0}> 12 hours</MenuItem>
                                                <MenuItem value={1}> 1 day</MenuItem>
                                                <MenuItem value={2}> 3 days</MenuItem>
                                                <MenuItem value={3}> 7 days</MenuItem>
                                                <MenuItem value={4}> 1 month</MenuItem>
                                            </Select>
                                            <Box sx={{ flex: "auto", padding: "0 5px" }}>
                                                <LocalizationProvider sx={{ width: "100%" }} dateAdapter={AdapterDayjs}>
                                                    <DateTimePicker
                                                        className={classes.datepicker}
                                                        renderInput={(props) => <TextField {...props} />}
                                                        label="DateTimePicker"
                                                        value={value}
                                                        onChange={(newValue) => {
                                                            setValue(newValue);
                                                        }}
                                                    />
                                                </LocalizationProvider>
                                            </Box>
                                        </Stack>
                                    </Stack> : null
                                }

                            </Stack>
                            <Stack className={classes.generateModalFooter} >
                                <Stack sx={{ flexDirection: "row", justifyContent: "center" }}>
                                    <Button className={classes.buybutton} onClick={makeOffer}>Make Offer</Button>
                                </Stack>
                            </Stack>
                        </DialogContent>
                }
                <Button onClick={() => closeAction(false)} sx={{ position: "absolute", top: "16px", right: "0px" }} className={{ root: classes.generateModalClosebtn }}>
                    <CloseIcon />
                </Button>
                {/* <Button onClick={() => setMakeOfferPage(false)} sx={{ position: "absolute", top: "16px", left: "0px" }} className={{ root: classes.generateModalClosebtn }}>
                    <ChevronLeftIcon />
                </Button> */}
            </Dialog>
        </React.Fragment >
    )
}

export default MakeOfferModal