import React, { useEffect, useState } from 'react';
import { Box, Skeleton, Typography, Stack, IconButton, Button } from "@mui/material";
import { getCoinIcons, getRealPrice, replaceIpfsUrl, sliceLongString1 } from "../../utils/utility";
import { Bolt } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import componentStyles from "../../assets/theme/views/nft/list";
import { setCartNfts, setAddCartBoxState, setAddedItemsTotalPrice } from "../../redux/actions/nfts";
import { useDispatch, useSelector } from "react-redux";
import Logo from "/src/assets/image/component/headers/logo.svg"
import cardano from "/src/assets/image/views/profile/collection/CardanoIconwhite.svg"
import eth from "/src/assets/image/views/profile/collection/etherumwhite.svg"
import solana from "/src/assets/image/views/profile/collection/solanawhite.svg"
import polygon from "/src/assets/image/component/headers/polygon.svg"
import binance from "/src/assets/image/component/headers/binance.svg"
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useAddToFavorites } from "../add-to-favorites-button/state";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import { toast } from 'react-toastify';

const useStyles = makeStyles(componentStyles)

const NftCard = ({ item, hideActionButtons }) => {
    const [imageIsLoaded, setImageIsLoaded] = useState(false)
    const classes = useStyles()
    const navigate = useNavigate();
    const jpgcartNfts = useSelector(state => state.nfts.jpgcartNfts);
    const opencartNfts = useSelector(state => state.nfts.opencartNfts);
    const solcartNfts = useSelector(state => state.nfts.solcartNfts);
    const polycartNfts = useSelector(state => state.nfts.polycartNfts);

    const walletData = useSelector(state => state.wallet)
    const [net, setNet] = useState("")
    const [wallet, setWallet] = useState("")
    const dispatch = useDispatch();
    // const favorited = useSelector(state => state.nfts.favoritestate)

    const gotoDetails = () => {
        navigate('/asset/' + (item._id))
    }

    const { isFavorite, add, remove } = useAddToFavorites(item._id, item.isFavorited);

    const addOrRemoveCart = () => {
        if (wallet === net) {
            let jpgadded = JSON.parse(localStorage.getItem('jpgcartItems') || '[]');
            let openadded = JSON.parse(localStorage.getItem('opencartItems') || '[]');
            let soladded = JSON.parse(localStorage.getItem('solcartItems') || '[]');
            let polyadded = JSON.parse(localStorage.getItem('polycartItems') || '[]');
            if (item.platform === "jpg.store") {
                const ids = jpgadded.map((i) => i.id);
                const id = item._id;
                if (ids.indexOf(id) > -1) {
                    jpgadded = jpgadded.filter((i) => i.id !== id);
                } else {
                    jpgadded.push({
                        name: item.name,
                        price: item.price,
                        blockchain: item.blockchain,
                        image: replaceIpfsUrl(item.imageUrl),
                        platform: item.platform,
                        id: id
                    })
                    dispatch(setAddCartBoxState({
                        boxstate: true
                    }))
                }
                priceCalculate(jpgadded);
                localStorage.setItem('jpgcartItems', JSON.stringify(jpgadded));
                dispatch(setCartNfts({
                    jpgcartNfts: jpgadded
                }))
            } else if (item.platform === "opensea") {
                const ids = openadded.map((i) => i.id);
                const id = item._id;
                if (ids.indexOf(id) > -1) {
                    openadded = openadded.filter((i) => i.id !== id);
                } else {
                    openadded.push({
                        name: item.name,
                        price: item.price,
                        blockchain: item.blockchain,
                        image: replaceIpfsUrl(item.imageUrl),
                        platform: item.platform,
                        id: id
                    })
                    dispatch(setAddCartBoxState({
                        boxstate: true
                    }))
                }
                priceCalculate(openadded);
                localStorage.setItem('opencartItems', JSON.stringify(openadded));
                dispatch(setCartNfts({
                    opencartNfts: openadded
                }))
            } else if (item.platform === "solanart") {
                const ids = soladded.map((i) => i.id);
                const id = item._id;
                if (ids.indexOf(id) > -1) {
                    soladded = soladded.filter((i) => i.id !== id);
                } else {
                    soladded.push({
                        name: item.name,
                        price: item.price,
                        blockchain: item.blockchain,
                        image: replaceIpfsUrl(item.imageUrl),
                        platform: item.platform,
                        id: id
                    })
                    dispatch(setAddCartBoxState({
                        boxstate: true
                    }))
                }
                priceCalculate(soladded);
                localStorage.setItem('solcartItems', JSON.stringify(soladded));
                dispatch(setCartNfts({
                    solcartNfts: soladded
                }))
            } else if (item.platform === "nftrade.com") {
                const ids = polyadded.map((i) => i.id);
                const id = item._id;
                if (ids.indexOf(id) > -1) {
                    polyadded = polyadded.filter((i) => i.id !== id);
                } else {
                    polyadded.push({
                        name: item.name,
                        price: item.price,
                        blockchain: item.blockchain,
                        image: replaceIpfsUrl(item.imageUrl),
                        platform: item.platform,
                        id: id
                    })
                    dispatch(setAddCartBoxState({
                        boxstate: true
                    }))
                }
                priceCalculate(polyadded);
                localStorage.setItem('polycartItems', JSON.stringify(polyadded));
                dispatch(setCartNfts({
                    polycartNfts: polyadded
                }))
            }
        } else {
            if (item.blockchain === "cardano") {
                toast.warning("Switch to Nami wallet.")
            } if (item.blockchain === "solana") {
                toast.warning("Switch to Phantom wallet.")
            } if (item.blockchain === "ethereum") {
                toast.warning("Switch to Metamask wallet.")
            } if (item.blockchain === 'polygon') {
                toast.warning("Switch to Metamask wallet.")
            } if (item.blockchain === "binance") {
                toast.warning("Switch to Metamask wallet.")
            }
        }
    }

    const isCartedNft = () => {
        const id = item._id;
        let ids = ""
        if (item.platform === "jpg.store" && walletData?.wallet === "Nami") {
            ids = jpgcartNfts.map((i) => i.id)
        } else if (item.platform === "opensea" && walletData?.wallet === "Metamask") {
            ids = opencartNfts.map((i) => i.id)
        } else if (item.platform === "solanart" && walletData?.wallet === "Phantom") {
            ids = solcartNfts.map((i) => i.id)
        } else if (item.platform === "nftrade.com" && walletData?.wallet === "Metamask") {
            ids = polycartNfts.map((i) => i.id)
        }
        return ids.indexOf(id) > -1;
    }

    const priceCalculate = (data) => {
        var jpgprice = 0, openseaprice = 0, solprice = 0, polyprice = 0;
        for (let i = 0; i < data.length; i++) {
            if (data[i].platform === "jpg.store") {
                jpgprice += Number(getRealPrice(data[i].price, data[i].blockchain));
            } else if (data[i].platform === "opensea") {
                openseaprice += Number(getRealPrice(data[i].price, data[i].blockchain));
            } else if (data[i].platform === "solanart") {
                solprice += Number(getRealPrice(data[i].price, data[i].blockchain));
            } else if (data[i].platform === "nftrade.com") {
                polyprice += Number(getRealPrice(data[i].price, data[i].blockchain));
            }
        }
        dispatch(setAddedItemsTotalPrice({
            jpgprice: jpgprice,
            openseaprice: openseaprice,
            solprice: solprice,
            polyprice: polyprice
        }))
    }
    useEffect(() => {
        if (item.blockchain === "polygon") {
            setNet("ethereum")
        } else if (item.blockchain === "solana") {
            setNet("solana")
        } else if (item.blockchain === "binance") {
            setNet("ethereum")
        } else if (item.blockchain === "cardano") {
            setNet("cardano")
        } else if (item.blockchain === "ethereum") {
            setNet("ethereum")
        }
    }, [item])
    useEffect(() => {
        if (walletData.network) {
            setWallet(walletData.network.toLowerCase())
        }
    }, [walletData])

    return (
        <Box key={item._id} item>
            <Box className={[classes.card, isCartedNft() ? classes.selectedCard : null]}>
                <Box className={classes.link} sx={{
                    "&:hover": {
                        "div div: nth-child(2)": {
                            "button: nth-child(2)": {
                                opacity: "1"
                            }
                        }
                    }
                }}>
                    {!imageIsLoaded &&
                        <Skeleton
                            width='100%'
                            height='100%'
                            sx={{ pb: '100%' }}
                            variant='rectangular'
                        />
                    }
                    <Box className={classes.cardlogo} sx={{ position: "absolute", top: "10px", left: "10px", display: "flex", columnGap: "10px", zIndex: "1", width: "30%" }}>
                        <Box component="img" src={Logo.src} sx={{ width: "45%" }} ></Box>
                        {
                            item.blockchain === "cardano" ? <Box component="img" src={cardano.src} sx={{ width: "45%", background: "#7b61ff", borderRadius: "40%", padding: "6px" }}></Box> : item.blockchain === "ethereum" ? <Box component="img" src={eth.src} sx={{ width: "45%", background: "#7b61ff", borderRadius: "40%", padding: "6px" }}></Box> : item.blockchain === "binance" ? <Box component="img" src={binance.src} sx={{ width: "45%", background: "#7b61ff", borderRadius: "40%", padding: "6px" }}></Box> : item.blockchain === "polygon" ? <Box component="img" src={polygon.src} sx={{ width: "45%", background: "#7b61ff", borderRadius: "40%", padding: "6px" }}></Box> : item.blockchain === "solana" ? <Box component="img" src={solana.src} sx={{ width: "45%", background: "#7b61ff", borderRadius: "40%", padding: "6px" }}></Box> : ""
                        }
                    </Box>
                    <Box
                        hidden={!imageIsLoaded}
                        onClick={addOrRemoveCart}
                        className={classes.nftImageWrapper}
                    >
                        <Box
                            key={item._id}
                            component="img"
                            loading="eager"
                            className={classes.nftImage}
                            src={replaceIpfsUrl(item.imageUrl)}
                            onLoad={() => setImageIsLoaded(true)}
                        />
                        <IconButton sx={{ position: 'absolute', top: "0px", right: "0px" }} color="primary" aria-label="add to shopping cart">
                            {
                                isCartedNft() ?
                                    <CheckCircleOutlineIcon sx={{ color: "#fff", background: "#615cf5", borderRadius: "100%" }} /> : null

                            }
                        </IconButton>
                        {/* <IconButton sx={{ position: 'absolute', top: "0px", right: "0px", opacity: "0.6" }} color="primary" aria-label="add to shopping cart">
                            {
                                !isCartedNft() ?
                                    <AddCircleIcon sx={{ color: "#444", background: "#fff", borderRadius: "100%" }} /> : null
                            }
                        </IconButton> */}
                    </Box>

                    <Box className={classes.nftInfoWrapper} sx={{ rowGap: "10px" }}>
                        <Stack direction='row' alignItems={"center"} justifyContent={"left"}>
                            <Typography
                                className={classes.title}
                                variant="h3"
                                color={'#000'}
                            >
                                {sliceLongString1(item.name, 25)}
                            </Typography>
                        </Stack>


                        <Box sx={{ display: "flex", justifyContent: 'space-between', alignItems: "center" }}>
                            <Box sx={{ display: 'flex', alignItems: "center" }}>
                                <Box
                                    mr={1}
                                    component="img"
                                    src={getCoinIcons(item.blockchain)}
                                    className={classes.nftethereum}
                                />

                                <Typography
                                    variant="h4"
                                    color={'#000'}
                                >
                                    {getRealPrice(item.price, item.blockchain)}
                                </Typography>
                            </Box>
                            {
                                item.price ?
                                    <Stack direction="row" alignItems={"center"} justifyContent={"right"} sx={{ columnGap: "10px" }}>
                                        <Box sx={{ padding: "5px 10px", background: "#e5c21890", borderRadius: "5px", color: "#dd8f00" }}>For Sale</Box>
                                    </Stack>
                                    : <Stack direction="row" alignItems={"center"} justifyContent={"right"} sx={{ columnGap: "10px" }}>
                                        <Box sx={{ padding: "5px 10px", background: "#4386ffb8", borderRadius: "5px", color: "#3686ff" }}>Offer</Box>
                                    </Stack>
                            }
                        </Box>
                        <Stack direction="row" alignItems={"center"} justifyContent={"space-between"} sx={{ columnGap: "10px" }}>
                            <Button sx={{ padding: "0 5px", fontSize: '13px', display: "flex", alignItems: "center", justifyContent: "center", color: "#333", textTransform: "none !important", "&:hover": { background: "#7b61ff", color: "#fff !important" } }} variant="outlined" aria-label="add to shopping cart" onClick={gotoDetails}>
                                <Typography>Detail</Typography>
                                <ArrowRightIcon></ArrowRightIcon>
                            </Button>
                            <Stack direction={"row"} spacing={1}>
                                {isFavorite ? (
                                    <FavoriteIcon sx={{ color: "red" }} onClick={remove} />
                                ) : (
                                    <FavoriteBorderIcon onClick={add} />
                                )}
                            </Stack>
                        </Stack>

                    </Box>


                </Box>
            </Box>
        </Box >
    );
};

export default NftCard;