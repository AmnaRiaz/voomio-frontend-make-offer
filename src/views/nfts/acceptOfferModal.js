import React, { useEffect, useState } from "react"

import { useSelector } from "react-redux"
import Web3 from 'web3';

// @mui/material components
import { makeStyles } from "@mui/styles"
// core components
import { styles } from "../../assets/theme/views/nftgenerator/upload"
import componentStyles from "../../assets/theme/views/profile/makeoffermodal"
import { Box, Stack } from "@mui/system"
import {
    Button,
    Dialog,
    DialogContent,
    Typography,
    CircularProgress,
} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { replaceIpfsUrl } from "/src/utils/utility"
import { aboutHours, getChainId, getCoinIcons, getUSDPrice, getWalletName, networkInfo, notification, sliceLongString } from "../../utils/utility"
import RemoveIcon from '@mui/icons-material/Remove';

import marketplaceContractABI from "../../contracts/marketplace.json"
import { useWeb3React } from "@web3-react/core";

const useStyles = makeStyles(componentStyles)

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const AcceptOfferModal = ({ show, closeAction, nftDetails, openseaSDK, offer }) => {
    const classes = useStyles()

    const walletData = useSelector(state => state.wallet)
    const { chainId } = useWeb3React();

    const [loading, setLoading] = useState(false)
    const [contract, setContract] = useState(null);
    const [usdPrice, setUsdPrice] = useState(0);

    const acceptOffer = async () => {
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
            }
        } else if (nftDetails.blockchain === 'solana') {

        } else {
            if (chainId !== getChainId(nftDetails.blockchain)) {
                await switchNetwork(getChainId(nftDetails.blockchain));
            }
            if (nftDetails.platform === 'opensea') {
                try {
                    const orders = await openseaSDK.api.getOrders({
                        side: "bid"
                    })
                    const order = orders.orders.find((item) => (item.orderHash === offer.orderHash))
                    const accountAddress = walletData.address
                    const accept = await openseaSDK.fulfillOrder({ order, accountAddress })
                    console.log(accept)
                    setLoading(false)
                } catch (err) {
                    console.log(err)
                    setLoading(false)
                    notification("Failed make offer", "error");
                }
            } else {
            }
        }
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

    useEffect(() => {
        getUSDPrice(nftDetails.blockchain).then(price => setUsdPrice(price));
    }, [nftDetails])

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
                    <DialogContent className={classes.generateModalContent1}>
                        <Stack rowGap={4} direction="column" justifyContent={"center"} alignItems={"center"} sx={{ width: "100%" }}>
                            <Stack className={classes.generateModalHeader} gap={2} sx={{ width: "100%" }}>
                                <Stack>
                                    <Typography variant="h2" sx={{ color: "rgb(4, 17, 29) !important", fontWeight: "600" }}>
                                        Accept Offer
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
                                    <Stack>
                                        <Stack direction={"row"}
                                            alignItems={"flex-end"}
                                            justifyContent="right">
                                            <Box component="img"
                                                sx={{ width: "25px", height: "25px" }}
                                                src={getCoinIcons(offer.blockchain)}></Box>
                                            <Typography variant="h3" sx={{ color: "rgb(4, 17, 29) !important", fontWeight: "600 !important" }}>{offer.amount}</Typography>
                                        </Stack>
                                        <Typography variant="h4" sx={{ color: "#353840 !important", fontWeight: "400 !important", textAlign: "right" }}>
                                            ${(offer.amount * usdPrice).toFixed(2)}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Stack mt={1} rowGap={2} direction="column" justifyContent={"center"} alignItems="flex-start" sx={{ width: "100%" }}>
                                <Stack direction="row" justifyContent={"left"} alignItems="center">
                                    <Typography variant="h3" sx={{ color: "rgb(4, 17, 29) !important", fontWeight: "600 !important" }}>Offer Details</Typography>
                                </Stack>
                                <Stack direction="row" justifyContent={"space-between"} alignItems="center" sx={{ width: "100%" }}>
                                    <Typography variant="h3" sx={{ color: "rgb(4, 17, 29) !important", fontWeight: "400 !important" }}>Floor Difference</Typography>
                                    <Typography variant="h3" sx={{ color: "rgb(4, 17, 29) !important", fontWeight: "600 !important" }}>{offer.floordif ? offer.floordif : <RemoveIcon></RemoveIcon>}</Typography>
                                </Stack>
                                <Stack direction="row" justifyContent={"space-between"} alignItems="center" sx={{ width: "100%" }}>
                                    <Typography variant="h3" sx={{ color: "rgb(4, 17, 29) !important", fontWeight: "400 !important" }}>From</Typography>
                                    <Typography variant="h3" sx={{ color: "#2081e2 !important", fontWeight: "600 !important" }}>{sliceLongString(offer.bidderAddress || "", 5)}</Typography>
                                </Stack>
                                <Stack direction="row" justifyContent={"space-between"} alignItems="center" sx={{ width: "100%" }}>
                                    <Typography variant="h3" sx={{ color: "rgb(4, 17, 29) !important", fontWeight: "600 !important" }}>Expiration</Typography>
                                    <Typography variant="h3" sx={{ color: "rgb(4, 17, 29) !important", fontWeight: "600 !important" }}>about {aboutHours(offer.expiry)} hours</Typography>
                                </Stack>
                            </Stack>
                            <Stack mt={1} rowGap={2} direction="column" justifyContent={"center"} alignItems="flex-start" sx={{ width: "100%" }}>
                                <Stack direction="row" justifyContent={"left"} alignItems="center">
                                    <Typography variant="h3" sx={{ color: "rgb(4, 17, 29) !important", fontWeight: "600 !important" }}>Fees</Typography>
                                </Stack>
                                <Stack direction="row" justifyContent={"space-between"} alignItems="center" sx={{ width: "100%" }}>
                                    <Typography variant="h3" sx={{ color: "rgb(4, 17, 29) !important", fontWeight: "400 !important" }}>Service fee</Typography>
                                    <Typography variant="h3" sx={{ color: "rgb(4, 17, 29) !important", fontWeight: "600 !important" }}>0%</Typography>
                                </Stack>
                                <Stack direction="row" justifyContent={"space-between"} alignItems="center" sx={{ width: "100%" }}>
                                    <Typography variant="h3" sx={{ color: "rgb(4, 17, 29) !important", fontWeight: "400 !important" }}>Creator earnings</Typography>
                                    <Typography variant="h3" sx={{ color: "#2081e2 !important", fontWeight: "600 !important" }}>0%</Typography>
                                </Stack>
                            </Stack>
                            <Stack mt={1} rowGap={2} direction="row" justifyContent={"space-between"} alignItems="flex-start" sx={{ width: "100%" }}>
                                <Stack>
                                    <Typography variant="h3" sx={{ color: "rgb(4, 17, 29) !important", fontWeight: "600 !important" }}>Total earnings</Typography>
                                </Stack>
                                <Stack>
                                    <Stack direction={"row"}
                                        alignItems={"flex-end"}
                                        justifyContent="right">
                                        <Box component="img"
                                            sx={{ width: "25px", height: "25px" }}
                                            src={getCoinIcons(offer.blockchain)}></Box>
                                        <Typography variant="h3" sx={{ color: "rgb(4, 17, 29) !important", fontWeight: "600 !important" }}>{offer.amount}</Typography>
                                    </Stack>
                                    <Typography variant="h4" sx={{ color: "#353840 !important", fontWeight: "400 !important", textAlign: "right" }}>
                                        ${(offer.amount * usdPrice).toFixed(2)}
                                    </Typography>
                                </Stack>
                            </Stack>
                            <Stack className={classes.generateModalFooter} sx={{ width: "100%" }}>
                                <Stack sx={{ flexDirection: "row", justifyContent: "center" }}>
                                    <Button className={classes.buybutton} onClick={acceptOffer}>Accept</Button>
                                </Stack>
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

export default AcceptOfferModal