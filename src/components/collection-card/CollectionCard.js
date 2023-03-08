import React, { useState } from 'react';
import { Avatar, Box, Card, CardHeader, Skeleton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { componentStyles } from "../../assets/theme/components/collection-card";
import TcomponentStyles from "/src/assets/theme/views/main/trending"
import NFTcheck from "../../assets/image/views/profile/collection/NFTcheck.svg";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import Logo from "/src/assets/image/component/headers/logo.svg"
import cardano from "/src/assets/image/views/profile/collection/CardanoIconwhite.svg"
import eth from "/src/assets/image/views/profile/collection/etherumwhite.svg"
import solana from "/src/assets/image/views/profile/collection/solanawhite.svg"
import polygon from "/src/assets/image/component/headers/polygon.svg"
import binance from "/src/assets/image/component/headers/binance.svg"


import ether1 from "/src/assets/image/coin/ethereum.svg"
import polygon1 from "/src/assets/image/coin/polygon.svg"
import binance1 from "/src/assets/image/coin/binance.svg"
import cardano1 from "/src/assets/image/coin/cardano.svg"
import solana1 from "/src/assets/image/coin/solana.svg"

import { getRealPrice, getCoinIcons, sliceLongString } from '../../utils/utility';

const useStyles = makeStyles(componentStyles)
const tStyles = makeStyles(TcomponentStyles)

const convertFormatedDigit = (orgNumber, floor = 2, blockchain) => {
    const realNumber = getRealPrice(orgNumber, blockchain) === "no certain" ? 0 : getRealPrice(orgNumber, blockchain);

    if (realNumber < 1000) {
        return realNumber;
    }
    else if (realNumber / 1000 < 100) {
        return (realNumber / 1000).toFixed(floor) + 'k';
    } else {
        return (realNumber / 1000000).toFixed(floor) + 'm';
    }
}

const CollectionCard = ({ data }) => {
    const [imageIsLoaded, setImageIsLoaded] = useState(false);
    const navigate = useNavigate()

    const gotoCollectionDetails = () => {
        navigate("/collection/" + data._id)
    }

    const classes = useStyles()
    const tclasses = tStyles()

    return (
        <Card className={classes.collectionCard} onClick={gotoCollectionDetails} sx={{
            height: "400px !important",
        }}>

            <Box className={classes.cardlogo} sx={{ position: "absolute", top: "10px", left: "10px", display: "flex", columnGap: "10px", width: "30%" }}>
                <Box component="img" src={Logo.src} sx={{ width: "30%" }}></Box>
                {
                    data.blockchain === "cardano" ? <Box component="img" src={cardano.src} sx={{ width: "30%", background: "#7b61ff", borderRadius: "40%", padding: "6px" }}></Box> : data.blockchain === "ethereum" ? <Box component="img" src={eth.src} sx={{ width: "30%", background: "#7b61ff", borderRadius: "40%", padding: "6px" }}></Box> : data.blockchain === "binance" ? <Box component="img" src={binance.src} sx={{ width: "30%", background: "#7b61ff", borderRadius: "40%", padding: "6px" }}></Box> : data.blockchain === "polygon" ? <Box component="img" src={polygon.src} sx={{ width: "30%", background: "#7b61ff", borderRadius: "40%", padding: "6px" }}></Box> : data.blockchain === "solana" ? <Box component="img" src={solana.src} sx={{ width: "30%", background: "#7b61ff", borderRadius: "40%", padding: "6px" }}></Box> : ""
                }
            </Box>
            {!imageIsLoaded &&
                <Skeleton
                    width='100%'
                    height='100%'
                    sx={{ pb: '100%' }}
                    variant='rectangular'
                />
            }

            <Box
                hidden={!imageIsLoaded}
                key={data._id}
                loading="eager"
                component="img"
                className={classes.cardimggroup}
                src={data.coverUrl}
                onLoad={() => setImageIsLoaded(true)}
            />

            <Stack
                sx={{
                    position: "absolute",
                    width: "100%",
                    bottom: "0px",
                    background: "#FFFFFF",
                    padding: "20px",
                    flexFlow: "column"
                }}
                direction={"row"}>
                <Stack direction={"row"} alignItems={"center"}>
                    <Typography className={classes.doodles}>{data.name}</Typography>
                    <Box ml={1} component="img" src={NFTcheck.src}></Box>
                </Stack>
                <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} spacing={1} paddingTop={1}>
                    <Stack direction="row">
                        <Box className={classes.colorstyle} >#{sliceLongString(data._id, 3)}</Box>
                    </Stack>
                    <Stack direction="row" alignItems={"center"} spacing={1} paddingTop={1}>
                        {/* <Box component="img" src={Ethereum.src} className={classes.nftethereum} ></Box> */}
                        <Box className={tclasses.namebox} sx={{ height: "30px", width: "30px", backgroundColor: "unset !important", border: "none" }}>
                            {
                                data?.blockchain === "cardano" ? <Box component="img" className={tclasses.imgbox} sx={{ width: "100%", height: "100%" }} src={cardano1.src}></Box> : data?.blockchain === "ethereum" ? <Box component="img" className={tclasses.imgbox} sx={{ width: "100%", height: "100%" }} src={ether1.src}></Box> : data?.blockchain === "binance" ? <Box component="img" className={tclasses.imgbox} sx={{ width: "100%", height: "100%" }} src={binance1.src}></Box> : data?.blockchain === "polygon" ? <Box component="img" className={tclasses.imgbox} sx={{ width: "100%", height: "100%" }} src={polygon1.src}></Box> : data?.blockchain === "solana" ? <Box component="img" className={tclasses.imgbox} sx={{ width: "100%", height: "100%" }} src={solana1.src}></Box> : ""
                            }
                        </Box>
                        <Typography className={classes.nftethereum} >
                            {data.volume ? convertFormatedDigit(data.volume, 2, data.blockchain) : "no certain"}
                        </Typography>

                    </Stack>
                </Stack>
            </Stack>
        </Card>
    );
};

export default CollectionCard;