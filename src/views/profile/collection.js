import React, { useEffect, useState } from "react"
// @mui/material components
import { makeStyles } from "@mui/styles"
// core components
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import componentStyles from "../../assets/theme/views/profile/collection"
import { Box, Typography, Grid, IconButton, InputBase, Paper, MenuItem, Menu, Divider } from "@mui/material"
import CardContent from '@mui/material/CardContent'

import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Select from '@mui/material/Select'
import { Search } from "@mui/icons-material"

import CachedIcon from '@mui/icons-material/Cached'
import GridViewIcon from '@mui/icons-material/GridView'

import ScrollIcon from "../../assets/image/views/profile/collection/scroll.svg"

import MonkeyNFT from "/src/assets/image/views/profile/collection/monkeyNFT.svg"
import Ethereum from "/src/assets/image/views/profile/collection/etherum.svg"
import NFTcheck from "/src/assets/image/views/profile/collection/NFTcheck.svg"
import Logo from "/src/assets/image/component/headers/logo.svg"
import cardano from "/src/assets/image/views/profile/collection/CardanoIconwhite.svg"
import eth from "/src/assets/image/views/profile/collection/etherumwhite.svg"
import solana from "/src/assets/image/views/profile/collection/solanawhite.svg"
import polygon from "/src/assets/image/component/headers/polygon.svg"
import binance from "/src/assets/image/component/headers/binance.svg"
import Toggleicon from "/src/assets/image/views/profile/collection/cardgroup.svg"
import Toggleiconcolor from "/src/assets/image/views/profile/collection/cardgroupicon.svg"

import { getAllCollection } from "../../redux/actions/main/index"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { getRealPrice, getCoinIcons, replaceIpfsUrl, sliceLongString } from "../../utils/utility"

const useStyles = makeStyles(componentStyles)
const Collection = () => {
    const classes = useStyles()

    const navigate = useNavigate()
    const walletData = useSelector(state => state.wallet)
    const userData = useSelector(state => state.user)
    const [priceSortValue, setPriceSortValue] = useState(0)
    const [collections, setCollections] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [state, setState] = useState(false)
    const [totalNumbers, setTotalNumbers] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    const toggleChange = (data) => {
        if (data === "left") {
            setState(true)
        } else {
            setState(false)
        }
    }

    const onChangePriceSort = (e) => {
        setPriceSortValue(e.target.value)
        let result = []
        if (e.target.value == 0) {
            result = filterData.sort((first, second) => first.price - second.price)
        } else {
            result = filterData.sort((first, second) => second.price - first.price)
        }
        setFilterData(result)
    }

    const gotoCollections = (data) => {
        navigate(`/collection/${data._id}`)
    }

    const onChangeSearch = (e) => {
        const value = e.target.value
        const result = collections.filter((data) => {
            return (
                data.name.toLowerCase().includes(value.toLowerCase())
            )
        })
        setFilterData(result)
        setTotalNumbers(result.length)
    }

    useEffect(() => {
        (async () => {
            const result = await getAllCollection({
                query: {
                    createdBy: userData?.user?._id || '',
                    blockchain: walletData.network.toLowerCase()
                }
            });
            console.log(result, "1111")
            if (result.collections) {
                setCollections(result.collections)
                setFilterData(result.collections)
                setTotalNumbers(result.pagination.total)
                setTotalPages(parseInt(result.pagination.total / result.pagination.size) + 1)
            }
        })();
    }, [walletData])

    return (
        <>
            {/* card header */}
            <Stack direction={"row"} justifyContent={"space-between"} className={classes.header}>
                <Grid container spacing={2}>
                    <Grid item lg={8} md={12} xs={12}>
                        <Stack direction={"row"} spacing={6} alignItems={"center"} justifyContent={"centers"} >
                            <Box component="img" src={ScrollIcon.src} className={classes.scrollicon} ></Box>
                            <Paper className={classes.searchforn} >
                                <IconButton aria-label="menu">
                                    <Search className={classes.iconsearch} />
                                </IconButton>
                                <InputBase onChange={(e) => { onChangeSearch(e) }} className={classes.searchinput} placeholder="Search by name or attribute" />
                                {/* <InputBase className={classes.searchinput} placeholder="Search by name or attribute" onClick={handleClick} /> */}
                                {/* <Menu
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    className={classes.filtermadal}
                                >
                                    <MenuItem>
                                        <Paper className={classes.searchforn} >
                                            <IconButton aria-label="menu">
                                                <Search className={classes.iconsearch} />
                                            </IconButton>
                                            <InputBase className={classes.searchinput} placeholder="Search by name or attribute" />
                                        </Paper>
                                    </MenuItem>

                                    <MenuItem onClick={handleClose}>
                                        <Typography paddingTop={2} className={classes.collectionsearch}>
                                            Collections
                                        </Typography>
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={handleClose}>
                                        <Stack direction={"row"} gap={2} alignItems={"center"}>
                                            <Box className={classes.collectionfilterlist} />
                                            <Typography className={classes.filterparentitem}>Mutant Ape Yacht Club
                                            </Typography>
                                        </Stack>
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={handleClose}>
                                        <Stack direction={"row"} gap={2} alignItems={"center"}>
                                            <Box className={classes.collectionfilterlist} />
                                            <Typography className={classes.filterparentitem}>Mutant Intervention Team
                                            </Typography>
                                        </Stack>
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={handleClose}>
                                        <Stack direction={"row"} gap={2} alignItems={"center"}>
                                            <Box className={classes.collectionfilterlist} />
                                            <Typography className={classes.filterparentitem}>Mutant Grandpa Country Club
                                            </Typography>
                                        </Stack>
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={handleClose}>
                                        <Stack direction={"row"} gap={2} alignItems={"center"}>
                                            <Box className={classes.collectionfilterlist} />
                                            <Typography className={classes.filterparentitem}>Mutant Shiba Clb | MSC
                                            </Typography>
                                        </Stack>
                                    </MenuItem>
                                    <Divider />

                                    <MenuItem onClick={handleClose}>
                                        <Typography className={classes.collectionsearch}>
                                            Assets
                                        </Typography>
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={handleClose}>
                                        <Stack direction={"row"} gap={2} alignItems={"center"}>
                                            <Box className={classes.collectionfilterlist} />
                                            <Typography className={classes.filterparentitem}>Mutant Warrior Club
                                            </Typography>
                                        </Stack>
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={handleClose}>
                                        <Stack direction={"row"} gap={2} alignItems={"center"}>
                                            <Box className={classes.collectionfilterlist} />
                                            <Typography className={classes.filterparentitem}>Mutant Ape x Pizza
                                            </Typography>
                                        </Stack>
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={handleClose}>
                                        <Stack direction={"row"} gap={2} alignItems={"center"}>
                                            <Box className={classes.collectionfilterlist} />
                                            <Typography className={classes.filterparentitem}>Cyberpunk Style 025 Mutant
                                            </Typography>
                                        </Stack>
                                    </MenuItem>
                                </Menu> */}
                            </Paper>
                        </Stack>
                    </Grid>
                    <Grid item lg={4} md={12} xs={12}>
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
            <Stack direction={"row"} p={"20px 100px"} spacing={2} alignItems={"center"} >
                <CachedIcon className={classes.cachedicon} />
                <Typography className={classes.cachedicon} >{totalNumbers} Items</Typography>
            </Stack>
            {/* card header end */}
            <Stack className={classes.collectionhead}>
                {state ? <Grid container spacing={2} >
                    {filterData.map((item, index) => {
                        return (
                            <Grid item key={index} lg={3} md={4} sm={6} xs={12} sx={{ paddingLeft: "30px !important" }}>
                                <Card onClick={() => { gotoCollections(item) }} className={classes.boxshadow} sx={{ position: "relative" }}>
                                    <Box sx={{ position: "absolute", top: "20px", left: "20px", display: "flex", columnGap: "10px", width: "30%" }}>
                                        <Box component="img" src={Logo.src} sx={{ width: "45%" }}></Box>
                                        {
                                            item.blockchain === "cardano" ? <Box component="img" src={cardano.src} sx={{ width: "45%", background: "#7b61ff", borderRadius: "40%", padding: "6px" }}></Box> : item.blockchain === "ethereum" ? <Box component="img" src={eth.src} sx={{ width: "45%", background: "#7b61ff", borderRadius: "40%", padding: "6px" }}></Box> : item.blockchain === "binance" ? <Box component="img" src={binance.src} sx={{ width: "45%", background: "#7b61ff", borderRadius: "40%", padding: "6px" }}></Box> : item.blockchain === "polygon" ? <Box component="img" src={polygon.src} sx={{ width: "45%", background: "#7b61ff", borderRadius: "40%", padding: "6px" }}></Box> : item.blockchain === "solana" ? <Box component="img" src={solana.src} sx={{ width: "45%", background: "#7b61ff", borderRadius: "40%", padding: "6px" }}></Box> : ""
                                        }
                                    </Box>
                                    <Box component="img" className={classes.cardimggroup} src={replaceIpfsUrl(item.coverUrl)} ></Box>
                                    <CardContent>
                                        <Stack direction={"row"} spacing={1}>
                                            <Typography className={classes.cardnftdetail}>
                                                {item.tokenName ? item.tokenName : item.name ? item.name : ""}
                                            </Typography>
                                            <Box component="img" src={NFTcheck.src} className={classes.nftcheck} ></Box>

                                        </Stack>
                                        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} spacing={1} paddingTop={1}>
                                            <Stack>
                                                <Box className={classes.colorstyle} sx={{ fontSize: "1rem" }}>#{sliceLongString(item._id, 3)}</Box>
                                            </Stack>
                                            <Stack direction={"row"} justifyContent={"flex-end"} alignItems={"center"} spacing={1}>
                                                {/* <Typography className={classes.cardnftfooter}>
                                                    Floor
                                                </Typography> */}
                                                <Box component="img" src={getCoinIcons(item.blockchain)} className={classes.nftethereum} ></Box>
                                                <Typography className={classes.cardprice}>{getRealPrice(item.volume, item.blockchain)}</Typography>
                                            </Stack>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid> : <Grid container spacing={2}>
                    {filterData.map((item, index) => {
                        return (
                            <Grid item key={index} lg={3} md={3} sm={4} xs={12} sx={{ paddingLeft: "30px !important" }}>
                                <Card onClick={() => { gotoCollections(item) }} className={classes.boxshadow} sx={{ position: "relative" }}>
                                    <Box sx={{ position: "absolute", top: "20px", left: "20px", display: "flex", columnGap: "10px", width: "30%" }}>
                                        <Box component="img" src={Logo.src} sx={{ width: "45%" }}></Box>
                                        {
                                            item.blockchain === "cardano" ? <Box component="img" src={cardano.src} sx={{ width: "45%", background: "#7b61ff", borderRadius: "18px", padding: "6px" }}></Box> : item.blockchain === "ethereum" ? <Box component="img" src={eth.src} sx={{ width: "45%", background: "#7b61ff", borderRadius: "18px", padding: "6px" }}></Box> : item.blockchain === "binance" ? <Box component="img" src={binance.src} sx={{ width: "45%", background: "#7b61ff", borderRadius: "18px", padding: "6px" }}></Box> : item.blockchain === "polygon" ? <Box component="img" src={polygon.src} sx={{ width: "45%", background: "#7b61ff", borderRadius: "18px", padding: "6px" }}></Box> : item.blockchain === "solana" ? <Box component="img" src={solana.src} sx={{ width: "45%", background: "#7b61ff", borderRadius: "18px", padding: "6px" }}></Box> : ""
                                        }
                                    </Box>
                                    <Box component="img" className={classes.cardimggroup} src={replaceIpfsUrl(item.coverUrl)} >
                                    </Box>
                                    <CardContent>
                                        <Stack direction={"row"} spacing={1}>
                                            <Typography className={classes.cardnftdetail}>
                                                {item.tokenName ? item.tokenName : item.name ? item.name : ""}
                                            </Typography>
                                            <Box component="img" src={NFTcheck.src} className={classes.nftcheck} ></Box>

                                        </Stack>
                                        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} spacing={1} paddingTop={1}>
                                            <Stack>
                                                <Box className={classes.colorstyle} sx={{ fontSize: "1rem" }}>#{sliceLongString(item._id, 3)}</Box>
                                            </Stack>
                                            <Stack direction={"row"} justifyContent={"flex-end"} alignItems={"center"} spacing={1}>
                                                {/* <Typography className={classes.cardnftfooter}>
                                                    Floor
                                                </Typography> */}
                                                <Box component="img" src={getCoinIcons(item.blockchain)} className={classes.nftethereum} ></Box>
                                                <Typography className={classes.cardprice}>{getRealPrice(item.volume, item.blockchain)}</Typography>
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
        </>
    )
}

export default Collection