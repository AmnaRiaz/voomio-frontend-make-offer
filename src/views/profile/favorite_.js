import React, { useEffect, useState } from "react"
// @mui/material components
import { makeStyles } from "@mui/styles"
// core components
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import componentStyles from "/src/assets/theme/views/profile/collection"
import { Box, Button, Typography, Grid, IconButton, InputBase, Paper, Divider, Menu } from "@mui/material"
import CardContent from '@mui/material/CardContent'

import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { Search } from "@mui/icons-material"

import AppsIcon from '@mui/icons-material/Apps'
import CachedIcon from '@mui/icons-material/Cached'
import GridViewIcon from '@mui/icons-material/GridView'

import ScrollIcon from "/src/assets/image/views/profile/collection/scroll.svg"
import MonkeyNFT from "/src/assets/image/views/profile/collection/monkeyNFT.svg"
import Ethereum from "/src/assets/image/views/profile/collection/etherum.svg"
import NFTcheck from "/src/assets/image/views/profile/collection/NFTcheck.svg"
import Logo from "/src/assets/image/component/headers/logo.svg"
import Toggleiconcolor from "/src/assets/image/views/profile/collection/cardgroupicon.svg"
import Toggleicon from "/src/assets/image/views/profile/collection/cardgroup.svg"

import { getRealPrice, getCoinIcons, replaceIpfsUrl, sliceLongString } from "/src/utils/utility"
import { getFavoriteAction } from "/src/redux/actions/main"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const useStyles = makeStyles(componentStyles)

const Create = () => {
    const classes = useStyles()
    const navigate = useNavigate()

    const userData = useSelector(state => state.user)
    const walletData = useSelector(state => state.wallet)
    const [cardList, setCardList] = useState([])
    const [state, setState] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const [filterData, setFilterData] = useState([])
    const [priceSortValue, setPriceSortValue] = useState(0)
    const [totalNumbers, setTotalNumbers] = useState(0)

    const onChangePriceSort = (e) => {
        setPriceSortValue(e.target.value)
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const toggleChange = (data) => {
        if (data === "left") {
            setState(true)
        } else {
            setState(false)
        }
    }

    const onChangeSearch = (e) => {
        const value = e.target.value
        const result = cardList.filter((data) => {
            return (
                data.name.toLowerCase().includes(value.toLowerCase())
            )
        })
        setFilterData(result)
        setTotalNumbers(result.length)
    }

    const gotoDetails = (data) => {
        navigate("/assets/" + data.id)
        window.scrollTo(0, 0)
    }

    useEffect(() => {
        async function fetchData() {
            const request = { userId: userData?.user?._id }
            const result = await getFavoriteAction(request)
            console.log(result, "333")
            if (result && result.length > 0) {
                setCardList(result)
                setFilterData(result)
                setTotalNumbers(result.length)
            }
        }
        fetchData()
    }, [userData])

    return (
        <>
            {/* card header */}
            <Stack direction={"row"} justifyContent={"space-between"} className={classes.header}>
                <Grid container spacing={2}>
                    <Grid item xl={8} lg={9} md={12} xs={12}>
                        <Stack direction={"row"} spacing={6} alignItems={"center"} justifyContent={"centers"} >
                            <Box component="img" src={ScrollIcon.src} className={classes.scrollicon} ></Box>
                            <Paper className={classes.searchforn} >
                                <IconButton aria-label="menu">
                                    <Search className={classes.iconsearch} />
                                </IconButton>
                                <InputBase onChange={e => { onChangeSearch(e) }} className={classes.searchinput} placeholder="Search by name" onClick={handleClick} />
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
            <Stack direction={"row"} p={"20px 100px"} spacing={2} alignItems={"center"} >
                <CachedIcon className={classes.cachedicon} />
                <Typography className={classes.cachedicon} >{totalNumbers} Items</Typography>
            </Stack>
            {/* card header end */}
            <Stack className={classes.collectionhead}>
                {state ? <Grid container spacing={2} >
                    {filterData.map((item, index) => {
                        return (
                            <Grid item key={index} lg={3} md={4} sm={6} xs={12} >
                                <Card onClick={() => { gotoDetails(item) }} className={classes.boxshadow}>
                                    <Box component="img" className={classes.cardimggroup} src={replaceIpfsUrl(item.imageUrl)} ></Box>
                                    <CardContent>
                                        <Stack direction={"row"} spacing={1}>
                                            <Typography className={classes.cardnftdetail}>
                                                {item.name}
                                            </Typography>
                                            <Box component="img" src={NFTcheck.src} className={classes.nftcheck} ></Box>
                                        </Stack>
                                        <Stack direction={"row"} justifyContent={"flex-end"} alignItems={"center"} spacing={1} paddingTop={1}>
                                            {/* <Typography className={classes.cardnftfooter}>
                                                Floor
                                            </Typography> */}
                                            <Box component="img" src={getCoinIcons(item.blockchain)} className={classes.nftethereum} ></Box>
                                            <Typography >{getRealPrice(item.price, item.blockchain)}</Typography>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid> : <Grid container spacing={2}>
                    {filterData.map((item, index) => {
                        return (
                            <Grid item key={index} lg={2.4} md={3} sm={4} xs={12} >
                                <Card onClick={() => { gotoDetails(item) }} className={classes.boxshadow}>
                                    <Box className={classes.cardlogo}>
                                        <Box component="img" src={Logo.src} ></Box>
                                    </Box>
                                    <Box component="img" className={classes.cardimggroup} src={replaceIpfsUrl(item.imageUrl)} ></Box>
                                    <CardContent>
                                        <Stack direction={"row"} spacing={1}>
                                            <Typography className={classes.cardnftdetail}>
                                                {item.name}
                                            </Typography>
                                            <Box component="img" src={NFTcheck.src} className={classes.nftcheck} ></Box>
                                        </Stack>
                                        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} spacing={1} paddingTop={1}>
                                            <Stack>
                                                <Box className={classes.colorstyle} >#{sliceLongString(item.contentId, 3)}</Box>
                                            </Stack>
                                            <Stack direction={"row"} justifyContent={"flex-end"} alignItems={"center"} spacing={1}>
                                                {/* <Typography className={classes.cardnftfooter}>
                                                    Floor
                                                </Typography> */}
                                                <Box component="img" src={getCoinIcons(item.blockchain)} className={classes.nftethereum} ></Box>
                                                <Typography >{getRealPrice(item.price, item.blockchain)}</Typography>
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

export default Create