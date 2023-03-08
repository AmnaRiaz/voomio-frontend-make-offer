import React, { useEffect, useState } from "react"
import Web3 from 'web3';
// @mui/material components
import { makeStyles } from "@mui/styles"
// core components
import { styles } from "../../assets/theme/views/nftgenerator/upload"
import componentStyles from "/src/assets/theme/views/profile/makeoffermodal"
import { Box, Stack } from "@mui/system"
import {
    Button,
    CircularProgress,
    Dialog,
    DialogContent,
    InputBase,
    Paper,
    Typography
} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { getChainId, getRealPrice, networkInfo, notification } from "../../utils/utility"
import { useSelector } from "react-redux"

import marketplaceContractABI from "../../contracts/marketplace.json"
import { updatePriceAction } from "../../redux/actions/main";
import { useWeb3React } from "@web3-react/core";

const useStyles = makeStyles(componentStyles)

const UpdatePriceModal = ({ show, closeAction, nftDetails }) => {
    const classes = useStyles()
    const [value, setValue] = React.useState(0);

    const walletData = useSelector(state => state.wallet)
    const { chainId } = useWeb3React();

    const [loading, setLoading] = useState(false)
    const [contract, setContract] = useState(null);

    const updatePrice = async () => {
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

        } else if (nftDetails.blockchain === 'solana') {

        } else {
            const nftContract = nftDetails.collectionAddress;
            try {
                const price = Web3.utils.toWei(value.toString());
                const transaction = await contract.methods.updateSellPrice(nftContract, nftDetails.tokenId, price).send({
                    from: walletData.address
                });
                if (transaction) {
                    await updatePriceAction({
                        id: nftDetails._id,
                        price: price,
                        tx: transaction.transactionHash
                    });

                    setLoading(false)
                    notification("Success", "success");
                    closeAction(false)
                } else {
                    setLoading(false)
                    notification("Failed update price", "error");
                    return false;
                }
            } catch (e) {
                console.log(e)
                setLoading(false)
                notification("Failed update price", "error");
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
        const price = getRealPrice(nftDetails.price || 0, nftDetails.blockchain);
        const floatPrice = parseFloat(price);
        setValue((isNaN(floatPrice) ? 0 : floatPrice) + 0.001)
    }, [nftDetails.price])

    return (
        <React.Fragment>
            <Dialog sx={styles.mintLoadingDialog} open={loading}>
                <Box sx={styles.mintLoadingTitle} component={"span"}>Please wait</Box>
                <Box sx={styles.mintLoadingBox}>
                    <CircularProgress />
                </Box>
            </Dialog>
            <Dialog open={show} onClose={() => closeAction(false)} className={classes.generateModal} >
                <DialogContent className={classes.generateModalContent}>
                    <Stack className={classes.generateModalHeader} gap={2}>
                        <Stack>
                            <Typography variant="h3">
                                Update Price
                            </Typography>
                        </Stack>
                    </Stack>
                    <Stack mt={5}  >
                        <Stack sx={{
                            margin: "10px 0px"
                        }} >
                            <Paper
                                component="form"
                                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
                            >
                                <InputBase
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="price"
                                    inputProps={{ 'aria-label': 'price' }}
                                    onChange={(e) => setValue(e.target.value)}
                                    value={value}
                                />
                            </Paper>
                        </Stack>
                    </Stack>
                    <Stack className={classes.generateModalFooter} >
                        <Stack sx={{ flexDirection: "row", justifyContent: "center" }}>
                            <Button className={classes.buybutton} onClick={updatePrice}>Update</Button>
                        </Stack>
                    </Stack>
                </DialogContent>
                <Button onClick={() => closeAction(false)} sx={{ position: "absolute", top: "16px", right: "0px" }} className={{ root: classes.generateModalClosebtn }}>
                    <CloseIcon />
                </Button>
            </Dialog>
        </React.Fragment >
    )
}

export default UpdatePriceModal