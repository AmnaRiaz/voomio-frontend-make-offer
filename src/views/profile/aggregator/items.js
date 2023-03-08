import React, { useState, useEffect } from "react"
// @mui/material components
import { makeStyles } from "@mui/styles"
// core components
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import componentStyles from "/src/assets/theme/views/profile/aggregator"
import { Box, Typography, Grid, IconButton, InputBase, Paper, MenuItem, Menu, Divider, Pagination, Button } from "@mui/material"
import CardContent from '@mui/material/CardContent'

import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Select from '@mui/material/Select'
import { Search } from "@mui/icons-material"

// lists
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Checkbox from '@mui/material/Checkbox'
// icons
import CachedIcon from '@mui/icons-material/Cached'
import GridViewIcon from '@mui/icons-material/GridView'
import CloseIcon from '@mui/icons-material/Close'
import { getAllNfts } from "/src/redux/actions/main"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getRealPrice, getCoinIcons, replaceIpfsUrl, sliceLongString } from "/src/utils/utility"

import ScrollIcon from "/src/assets/image/views/profile/collection/scroll.svg"
import ScrollIconfilter from "/src/assets/image/views/profile/explore/scrollfilter.svg"
import MonkeyNFT from "/src/assets/image/views/profile/collection/monkeyNFT.svg"
import Ethereum from "/src/assets/image/views/profile/collection/etherum.svg"
import NFTcheck from "/src/assets/image/views/profile/collection/NFTcheck.svg"
import Logo from "/src/assets/image/component/headers/logo.svg"
import Toggleicon from "/src/assets/image/views/profile/collection/cardgroup.svg"
import Toggleiconcolor from "/src/assets/image/views/profile/collection/cardgroupicon.svg"
import Union from "/src/assets/image/views/profile/explore/union.svg"

import { LazyLoadImage } from 'react-lazy-load-image-component';

const useStyles = makeStyles(componentStyles)

const Items = () => {
    const navigate = useNavigate()
    const classes = useStyles()
    const params = useParams()
    const dispatch = useDispatch()

    const pLimit = 20


    const collectionData = useSelector(state => state.collections)
    const [priceSortValue, setPriceSortValue] = useState(0)
    const [state, setState] = useState(true)
    const [filterData, setFilterData] = useState([])
    const [collectionList, setCollectionList] = useState([])
    const [pNumber, setPNumber] = useState(1)
    const [currentPNumber, setCurrentPNumber] = useState(1)
    const [totalNumbers, setTotalNumbers] = useState(0)
    const [ftotalNumbers, setfTotalNumbers] = useState(0)

    const toggleChange = (data) => {
        if (data === "left") {
            setState(true)
        } else {
            setState(false)
        }
    }

    // filter slider down
    const [dropslider, setDropslider] = useState(false)

    const filtersliderChange = () => {
        setDropslider(!dropslider)
    }

    // list
    const [checked, setChecked] = useState([0])

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value)
        const newChecked = [...checked]

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
    }

    const [componentsFilterValue, setComponentsFilterValue] = useState(1)

    const handleComponentsFilterChange = (event) => {
        setComponentsFilterValue(event.target.value)
    }

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const gotoDetails = (data) => {
        if (data.name) {
            navigate("/assets/" + data._id)
        } else {
            navigate("/assets/" + data.id)
        }
    }

    const onChangeSearch = (e) => {
        const value = e.target.value
        const result = collectionList.filter((data) => {
            if (data.tokenName) {
                return data.tokenName.toLowerCase().includes(value.toLowerCase())
            } else {
                return data.name.toLowerCase().includes(value.toLowerCase())
            }
        })
        setFilterData(result)
        if (value === "") {
            setTotalNumbers(ftotalNumbers)
        } else {
            setTotalNumbers(result.length)
        }
    }

    const onChangePagination = (event, value) => {
        setCurrentPNumber(value)
        fetchData(value, priceSortValue)
    }

    const onChangePriceSort = (e) => {
        setPriceSortValue(e.target.value)
        fetchData(currentPNumber, e.target.value)
    }

    const fetchData = async (skip, sortValue) => {
        if (!params.id) {
            return;
        }
        const request = {
            collectionId: params?.id || '',
        }
        const result = await getAllNfts(currentPNumber, request, { price: (sortValue === 0 ? -1 : sortValue) })
        if (result) {
            setFilterData(result.nfts)
            setPNumber(parseInt(result.pagination.total / result.pagination.items) + 1)
            setTotalNumbers(result.pagination.total)
        }
    }

    useEffect(() => {
        fetchData(currentPNumber, priceSortValue)
    }, [params.id])

    return (
        <>
            {/* card header */}
            <Stack direction={"row"} justifyContent={"space-between"} className={classes.header}>
                <Grid container spacing={2}>
                    <Grid item lg={6} md={12} xs={12}>
                        <Stack direction={"row"} spacing={6} alignItems={"center"} justifyContent={"centers"} >
                            {dropslider ? <Box className={classes.scrollfilter}><Box component="img" src={ScrollIconfilter.src} className={classes.scrollicon}  ></Box ></Box> : <Box component="img" src={ScrollIcon.src} className={classes.scrollicon} ></Box >}
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
                    <Grid item lg={6} md={12} xs={12}>
                        <Stack direction={"row"} spacing={2}>
                            <Button className={classes.uniongroup}>
                                <Box component="img" src={Union.src} className={classes.scrollicon} ></Box>
                                <Typography>Octosweep</Typography>
                            </Button>
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
                        </Stack>
                    </Grid>
                </Grid>
            </Stack>
            <Stack direction={"row"} className={classes.filterdirection} gap={2}>
                <Stack direction={"row"} paddingLeft={12} gap={2} alignItems={"center"} >
                    <CachedIcon className={classes.cachedicon} />
                    <Typography className={classes.cachedicon} >{totalNumbers} Items</Typography>
                </Stack>
                {/* <Stack alignItems={"center"} direction={"row"} gap={2} className={classes.activityfilter} >
                    <Typography className={classes.filters} onClick={filtersliderChange}>Filters</Typography>
                    <Stack className={classes.activitybar} direction={"row"} gap={1}>
                        <Box className={classes.filtervalue}>
                            <Typography> Sales</Typography>
                            <CloseIcon className={classes.filteritemvalue} />
                        </Box>
                        <Box className={classes.filtervalue}>
                            <Typography> Listings</Typography>
                            <CloseIcon className={classes.filteritemvalue} />
                        </Box>
                    </Stack>
                </Stack> */}
            </Stack>
            {dropslider && <Stack gap={2} className={classes.scolltoolbar} >
                <Stack direction={"row"} gap={1} alignItems={"center"} flexWrap={"wrap"}>
                    <Select value={componentsFilterValue}
                        onChange={handleComponentsFilterChange}
                        displayEmpty
                        className={classes.nativeselect}
                    >
                        <MenuItem className={classes.selectMenuItem} value={0}>Marketplace</MenuItem>
                        <MenuItem className={classes.selectMenuItem} value={1}>Marketplace</MenuItem>
                        <MenuItem className={classes.selectMenuItem} value={2}>Marketplace</MenuItem>
                    </Select>
                    <Typography>Price</Typography>
                    <InputBase className={classes.filterlistsearch} placeholder="Min" />
                    <Typography>to</Typography>
                    <InputBase className={classes.filterlistsearch} placeholder="Max" />
                    <Select value={componentsFilterValue}
                        onChange={handleComponentsFilterChange}
                        displayEmpty
                        className={classes.nativeselect}
                    >
                        <MenuItem className={classes.selectMenuItem} value={0}>Rarity</MenuItem>
                        <MenuItem className={classes.selectMenuItem} value={1}>Rarity</MenuItem>
                        <MenuItem className={classes.selectMenuItem} value={2}>Rarity</MenuItem>
                    </Select>
                </Stack>
                <Stack alignItems={"center"} direction={"row"} spacing={2} className={classes.activityfilter} >
                    <Typography className={classes.filters}>Traits</Typography>
                    <Stack className={classes.activitybar} direction={"row"} gap={1}>
                        <Box className={classes.filterTrait}>
                            <Typography> Trait</Typography>
                            <CloseIcon className={classes.filteritemvalue} />
                        </Box>
                        <Box className={classes.filterTrait}>
                            <Typography> Trait</Typography>
                            <CloseIcon className={classes.filteritemvalue} />
                        </Box>
                    </Stack>
                </Stack>
                <Stack direction={"row"} gap={1} className={classes.scrolltoobarlist} justifyContent={"flex-start"}>
                    {[0, 1, 2, 3, 4].map((item) => {
                        return (
                            <List className={classes.filterlist} key={item}>
                                <InputBase placeholder="Search Fur" className={classes.listsearch} />
                                {[0, 1, 2, 3, 4].map((value) => {
                                    const labelId = `checkbox-list-label-${value}`

                                    return (
                                        <ListItem
                                            key={value}
                                            disablePadding
                                        >
                                            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                                                <Checkbox className={classes.listcheckbox} {...label} />
                                                <ListItemText id={labelId} primary={<Stack>
                                                    <Stack direction={"row"} spacing={1}>
                                                        <Typography className={classes.listdark}>M1 dark br..</Typography>
                                                        <Typography className={classes.listblock}>1981 (10.20%)</Typography>
                                                    </Stack>
                                                </Stack>} />
                                            </ListItemButton>
                                        </ListItem>
                                    )
                                })}
                            </List>
                        )

                    })}
                </Stack>

            </Stack>}
            {/* card header end */}
            <Stack className={classes.collectionhead}>
                {state ? <Grid container spacing={2}>
                    {filterData.map((item, index) => {
                        return (
                            <Grid item key={index} lg={3} md={4} sm={6} xs={12} >
                                <Card onClick={() => { gotoDetails(item) }} className={classes.boxshadow}>
                                    <Box className={classes.cardlogo}>
                                        <Box component="img" src={Logo.src} ></Box>
                                    </Box>
                                    <LazyLoadImage
                                        alt={item.tokenName ? item.tokenName : item.name} src={replaceIpfsUrl(item.imageUrl)} className={classes.cardimggroup}
                                        effect="blur"
                                    />
                                    {/* <Box key={item._id} loading="eager" component="img" className={classes.cardimggroup} src={replaceIpfsUrl(item.imageUrl)} /> */}
                                    <CardContent>
                                        <Stack direction={"row"} spacing={1}>
                                            <Typography className={classes.cardnftdetail}>
                                                {item.tokenName ? item.tokenName : item.name ? item.name : ""}
                                            </Typography>
                                            <Box component="img" src={NFTcheck.src} className={classes.nftcheck} ></Box>
                                        </Stack>
                                        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} spacing={1} paddingTop={1} className={classes.NFTprice}>
                                            <Stack>
                                                <Box className={classes.colorstyle} >#{sliceLongString(item._id, 3)}</Box>
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
                </Grid> : <Grid container spacing={2}>
                    {filterData.map((item, index) => {
                        return (
                            <Grid item key={index} lg={2.4} md={3} sm={4} xs={12} >
                                <Card className={classes.boxshadow}>
                                    <Box className={classes.cardlogo}>
                                        <Box component="img" src={Logo.src} ></Box>
                                    </Box>
                                    <LazyLoadImage
                                        alt={item.tokenName ? item.tokenName : item.name} src={replaceIpfsUrl(item.imageUrl)} className={classes.cardimggroup}
                                        effect="blur"
                                    />
                                    <CardContent>
                                        <Stack direction={"row"} spacing={1}>
                                            <Typography className={classes.cardnftdetail}>
                                                {item.tokenName ? item.tokenName : item.name ? item.name : ""}
                                            </Typography>
                                            <Box component="img" src={NFTcheck.src} className={classes.nftcheck} ></Box>
                                        </Stack>
                                        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} spacing={1} paddingTop={1} className={classes.NFTprice}>
                                            <Stack>
                                                <Box className={classes.colorstyle} >#{sliceLongString(item._id, 3)}</Box>
                                            </Stack>
                                            <Stack direction={"row"} justifyContent={"flex-end"} alignItems={"center"} spacing={1} >
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
                <Stack mt={3} flexDirection={"row"} justifyContent={"end"} >
                    <Pagination onChange={(e, v) => { onChangePagination(e, v) }} count={pNumber} />
                </Stack>
            </Stack>
        </>
    )
}

export default Items