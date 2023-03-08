import React, { useEffect, useState } from "react"
// @mui/material components
import { makeStyles } from "@mui/styles"
// core components
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import componentStyles from "/src/assets/theme/views/profile/collection"
import { Box, Button, Typography, Grid, IconButton, InputBase, Paper, MenuItem, Menu, Divider, Pagination } from "@mui/material"
import CardContent from '@mui/material/CardContent'

import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Select from '@mui/material/Select'
import { Search } from "@mui/icons-material"

import CachedIcon from '@mui/icons-material/Cached'
import GridViewIcon from '@mui/icons-material/GridView'

import { useSelector } from "react-redux"
import { getAllListings } from "../../redux/actions/main"
import { useNavigate } from "react-router-dom"
import ScrollIcon from "/src/assets/image/views/profile/collection/scroll.svg"
import NFTcheck from "/src/assets/image/views/profile/collection/NFTcheck.svg"
import Logo from "/src/assets/image/component/headers/logo.svg"
import cardano from "/src/assets/image/views/profile/collection/CardanoIconwhite.svg"
import eth from "/src/assets/image/views/profile/collection/etherumwhite.svg"
import solana from "/src/assets/image/views/profile/collection/solanawhite.svg"
import polygon from "/src/assets/image/component/headers/polygon.svg"
import binance from "/src/assets/image/component/headers/binance.svg"
import Toggleiconcolor from "/src/assets/image/views/profile/collection/cardgroupicon.svg"
import Toggleicon from "/src/assets/image/views/profile/collection/cardgroup.svg"

import { getRealPrice, getCoinIcons, replaceIpfsUrl, sliceLongString } from "/src/utils/utility"
import { sliceLongString1 } from "../../utils/utility"

const useStyles = makeStyles(componentStyles)

const Listing = () => {
    const classes = useStyles()

    const navigate = useNavigate()
    const userData = useSelector(state => state.user)
    const [priceSortValue, setPriceSortValue] = useState(0)
    const [currentPNumber, setCurrentPNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [nfts, setNfts] = useState({
        data: [],
        pagination: {
            total: 0,
            page: 1,
            items: 25
        }
    })
    const [nameQuery, setNameQuery] = useState('')
    const [state, setState] = useState(false)
    const toggleChange = (data) => {
        if (data === "left") {
            setState(true)
        } else {
            setState(false)
        }
    }

    const onChangePriceSort = (e) => {
        setPriceSortValue(e.target.value)
        // fetchData(currentPNumber, e.target.value)
    }

    const gotoDetails = (data) => {
        navigate("/asset/" + data._id)
    }

    const onCreateNew = () => {
        navigate("/create")
    }
    const onChangePagination = (_, value) => {
        setCurrentPNumber(value)
    }
    useEffect(() => {
        if (userData && userData.user) {
            async function fetchData() {
                const result = await getAllListings(currentPNumber, { sellerId: userData.user._id, name: nameQuery })
                if (result.data) {
                    setNfts(result)
                }
            }
            fetchData()
        }
    }, [userData, nameQuery])

    useEffect(() => {
        if (nfts) {
            setTotalPages(Math.ceil(nfts?.pagination?.total / nfts?.pagination?.items))
        }
    }, [nfts])
    return (
        <>
            {/* card header */}
            <Stack direction={"row"} justifyContent={"space-between"} className={classes.header} sx={{ padding: "50px 0px !important" }}>
                <Grid container spacing={2}>
                    <Grid item xl={8} lg={9} md={12} xs={12}>
                        <Stack direction={"row"} spacing={6} alignItems={"center"} justifyContent={"centers"} >
                            <Box component="img" src={ScrollIcon.src} className={classes.scrollicon} ></Box>
                            <Paper className={classes.searchforn} >
                                <IconButton aria-label="menu">
                                    <Search className={classes.iconsearch} />
                                </IconButton>
                                <InputBase
                                    onChange={(e) => { setNameQuery(e.target.value) }}
                                    className={classes.searchinput}
                                    placeholder="Search by name or attribute"
                                />
                            </Paper>
                        </Stack>
                    </Grid>
                    <Grid item xl={4} lg={3} md={12} xs={12}>
                        <Stack direction={"row"} spacing={2} justifyContent={"center"}>
                            <Select value={priceSortValue}
                                onChange={onChangePriceSort}
                                displayEmpty
                                className={classes.nativeselect}
                            >
                                <MenuItem className={classes.selectMenuItem} value={0}>Price high to low</MenuItem>
                                <MenuItem className={classes.selectMenuItem} value={1}>Price low to high</MenuItem>
                            </Select>
                            <ToggleButtonGroup
                                value={state ? "web" : "ios"}
                                exclusive
                                // onChange={toggleChange}
                                aria-label="Platform"
                                className={classes.toggleicongroup}
                            >
                                <ToggleButton value="web" onClick={() => { toggleChange("left") }}>
                                    <GridViewIcon className={state ? classes.toggleiconleft : classes.activeleft} />
                                </ToggleButton>
                                <ToggleButton value="ios" onClick={() => { toggleChange("right") }}>
                                    {state ? <Box component="img" src={Toggleicon.src} className={classes.activeright} ></Box> : <Box component="img" src={Toggleiconcolor.src} className={classes.toggleiconright} ></Box>
                                    }
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Stack>
                    </Grid>
                </Grid>
            </Stack>
            <Stack direction={"row"} p={"20px 100px"} spacing={2} alignItems={"center"} sx={{ padding: "24px 0px !important" }} >
                <CachedIcon className={classes.cachedicon} />
                <Typography className={classes.cachedicon} >{nfts && nfts?.data.length} Items</Typography>
            </Stack>
            {/* card header end */}
            <Stack className={classes.collectionhead} sx={{ padding: "24px 0px !important" }}>
                {state ? <Grid container spacing={2} >
                    {nfts?.data.map((item, index) => {
                        return (
                            <Grid item key={index} lg={3} md={4} sm={6} xs={12} >
                                <Card onClick={() => { gotoDetails(item) }} className={classes.boxshadow} sx={{ position: "relative" }}>
                                    <Box sx={{ position: "absolute", top: "20px", left: "20px", display: "flex", columnGap: "10px", width: "30%" }}>
                                        <Box component="img" src={Logo.src} sx={{ width: "45%" }}></Box>
                                        {
                                            item.nft.blockchain === "cardano" ? <Box component="img" src={cardano.src} sx={{ width: "45%", background: "#7b61ff", borderRadius: "18px", padding: "6px" }}></Box> : item.nft.blockchain === "ethereum" ? <Box component="img" src={eth.src} sx={{ width: "45%", background: "#7b61ff", borderRadius: "18px", padding: "6px" }}></Box> : item.nft.blockchain === "binance" ? <Box component="img" src={binance.src} sx={{ width: "45%", background: "#7b61ff", borderRadius: "18px", padding: "6px" }}></Box> : item.nft.blockchain === "polygon" ? <Box component="img" src={polygon.src} sx={{ width: "45%", background: "#7b61ff", borderRadius: "18px", padding: "6px" }}></Box> : item.nft.blockchain === "solana" ? <Box component="img" src={solana.src} sx={{ width: "45%", background: "#7b61ff", borderRadius: "18px", padding: "6px" }}></Box> : ""
                                        }
                                    </Box>
                                    <Box component="img" className={classes.cardimggroup} src={replaceIpfsUrl(item.nft.imageUrl)} ></Box>
                                    <CardContent>
                                        <Stack direction={"row"} spacing={1}>
                                            <Typography className={classes.cardnftdetail}>
                                                {item.nft.tokenName ? sliceLongString1(item.nft.tokenName, 20) : item.nft.name ? sliceLongString1(item.nft.name, 20) : ""}
                                            </Typography>
                                            <Box component="img" src={NFTcheck.src} className={classes.nftcheck} ></Box>
                                        </Stack>
                                        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} spacing={1} paddingTop={1}>

                                            <Stack>
                                                <Box className={classes.colorstyle} sx={{ fontSize: "1rem" }} >#{sliceLongString(item.nft._id, 3)}</Box>
                                            </Stack>
                                            <Stack direction={"row"} justifyContent={"flex-end"} alignItems={"center"} spacing={1}>
                                                {/* <Typography className={classes.cardnftfooter}>
                                                    {item.nft.currency ? item.nft.currency : ""}
                                                </Typography> */}
                                                <Box component="img" src={getCoinIcons(item.nft.blockchain)} className={classes.nftethereum} ></Box>
                                                <Typography className={classes.nftethereum} >
                                                    {item.nft.price ? getRealPrice(item.nft.price, item.nft.blockchain) : "no certain"}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid> : <Grid container spacing={2}>
                    {nfts?.data.map((item, index) => {
                        return (
                            <Grid item key={index} lg={2.4} md={3} sm={4} xs={12} >
                                <Card onClick={() => { gotoDetails(item.nft) }} className={classes.boxshadow} sx={{ position: "relative" }}>
                                    <Box sx={{ position: "absolute", top: "20px", left: "20px", display: "flex", columnGap: "10px", width: "30%" }}>
                                        <Box component="img" src={Logo.src} sx={{ width: "45%" }}></Box>
                                        {
                                            item.nft.blockchain === "cardano" ? <Box component="img" src={cardano.src} sx={{ width: "45%", background: "#7b61ff", borderRadius: "18px", padding: "6px" }}></Box> : item.nft.blockchain === "ethereum" ? <Box component="img" src={eth.src} sx={{ width: "45%", background: "#7b61ff", borderRadius: "18px", padding: "6px" }}></Box> : item.nft.blockchain === "binance" ? <Box component="img" src={binance.src} sx={{ width: "45%", background: "#7b61ff", borderRadius: "18px", padding: "6px" }}></Box> : item.nft.blockchain === "polygon" ? <Box component="img" src={polygon.src} sx={{ width: "45%", background: "#7b61ff", borderRadius: "18px", padding: "6px" }}></Box> : item.nft.blockchain === "solana" ? <Box component="img" src={solana.src} sx={{ width: "45%", background: "#7b61ff", borderRadius: "18px", padding: "6px" }}></Box> : ""
                                        }
                                    </Box>
                                    <Box component="img" className={classes.cardimggroup} src={replaceIpfsUrl(item.nft.imageUrl)} >
                                    </Box>
                                    <CardContent>
                                        <Stack direction={"row"} spacing={1}>
                                            <Typography className={classes.cardnftdetail}>
                                                {item.nft.tokenName ? sliceLongString1(item.nft.tokenName, 20) : item.nft.name ? sliceLongString1(item.nft.name, 20) : ""}
                                            </Typography>
                                            <Box component="img" src={NFTcheck.src} className={classes.nftcheck} ></Box>
                                        </Stack>
                                        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} spacing={1} paddingTop={1}>
                                            <Stack>
                                                <Box className={classes.colorstyle} sx={{ fontSize: "1rem" }} >#{sliceLongString(item.nft._id, 3)}</Box>
                                            </Stack>
                                            <Stack direction={"row"} justifyContent={"flex-end"} alignItems={"center"} spacing={1}>
                                                {/* <Typography className={classes.cardnftfooter}>
                                                    {item.nft.currency ? item.nft.currency : ""}
                                                </Typography> */}
                                                <Box component="img" src={getCoinIcons(item.nft.blockchain)} className={classes.nftethereum} ></Box>
                                                <Typography className={classes.nftethereum} >
                                                    {item.nft.price ? getRealPrice(item.nft.price, item.nft.blockchain) : "no certain"}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
                }
            </Stack>
            <Stack mt={3} flexDirection={"row"} justifyContent={"end"}>
                <Pagination
                    onChange={onChangePagination}
                    count={totalPages} />
            </Stack>
        </>
    )
}

export default Listing