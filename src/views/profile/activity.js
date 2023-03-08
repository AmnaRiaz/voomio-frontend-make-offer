import React, { useEffect, useState } from "react"
// @mui/material components
import { makeStyles, styled } from "@mui/styles"
import Grid from "@mui/material/Grid"
// core components
import Stack from '@mui/material/Stack'
import activityStyles from "/src/assets/theme/views/nft/sidebar"
import componentStyles from "/src/assets/theme/views/profile/activity"
import { Box, CardActions, CardContent, Collapse, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Pagination, Typography } from "@mui/material"
import Checkbox from '@mui/material/Checkbox'
import CardHeader from '@mui/material/CardHeader'
import Avatar from '@mui/material/Avatar'
import { useParams } from "react-router-dom";

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import FilterListIcon from '@mui/icons-material/FilterList'
import NFTcheck from "/src/assets/image/views/profile/collection/NFTcheck.svg"
import { getTransactionsByUser } from "../../redux/actions/main"
import { getCoinIcons, getDate, getRealPrice, sliceLongString, sliceLongString1 } from "../../utils/utility"
import Loading from "../../components/loading/Loading"

function createData(name, calories, fat, carbs, protein, time) {
    return { name, calories, fat, carbs, protein, time }
}

const useStyles = makeStyles(componentStyles)
const tStyles = makeStyles(activityStyles)
const ExpandMore = styled((props) => {
    const { expand, ...other } = props

    return <IconButton {...other} />
})(({ theme, expand }) => ({
    display: !expand ? 'block' : 'none',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest
    })
}))
const ExpandLess = styled((props) => {
    const { expand, ...other } = props
    return <IconButton {...other} />
})(({ theme, expand }) => ({
    display: !expand ? 'none' : 'block',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest
    })
}))

const Activity = () => {
    const params = useParams()
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const aclasses = tStyles()
    const [expanded, setExpanded] = React.useState({ 0: true, 1: true })
    const [filter, setFilter] = React.useState({})
    const anchorRef = React.useRef(null)
    const prevOpen = React.useRef(open)
    const [loading, setLoading] = useState(false)
    const [transaction, setTransaction] = useState([])

    const [currentPNumber, setCurrentPNumber] = useState(1)
    const [totalPages, setTotalPages] = useState(1);
    const [chainChecked, setChainChecked] = useState(["All", "Ethereum", "Binance", "Cardano", "Polygon", "Solana"]);
    const [categoryChecked, setCategoryChecked] = useState(["All", "Mint", "Sell", "Buy", "Update", 'Delist', 'Make offer', 'Accept offer', 'Bundle sell']);
    const listArr = [
        { key: "blockchain", name: 'Chains', data: ["All", "Ethereum", "Binance", "Cardano", "Polygon", "Solana"] },
        { key: "categories", name: 'Event Type', data: ["All", "Mint", "Sell", "Buy", "Update", 'Delist', 'Make offer', 'Accept offer', 'Bundle sell'] },
    ]

    const checkbox = (type, value) => {
        if (type === "blockchain") {
            const allChains = listArr.filter((item) => item.name === "Chains")[0]?.data;
            const currentIndex = chainChecked.indexOf(value);
            let newChecked = [...chainChecked];
            if (currentIndex === -1) {
                if (value === "All") {
                    newChecked = allChains;
                } else {
                    if (newChecked.length === 5 && newChecked.includes("All")) {
                        newChecked = allChains
                    } else if (newChecked.length === 4 && !newChecked.includes("All")) {
                        newChecked = allChains
                    } else {
                        newChecked.push(value);
                    }
                }
            } else {
                if (value === "All") {
                    newChecked = []
                } else {
                    if (newChecked.includes("All")) {
                        newChecked.splice(newChecked.indexOf("All"), 1);
                    }
                    newChecked.splice(newChecked.indexOf(value), 1);
                }
            }
            setChainChecked(newChecked);
        } else {
            const currentIndex = categoryChecked.indexOf(value);
            let newChecked = [...categoryChecked];
            const allChains = listArr.filter((item) => item.name === "Event Type")[0]?.data;
            if (currentIndex === -1) {
                if (value === "All") {
                    newChecked = allChains;
                } else {
                    if (newChecked.length === 6 && newChecked.includes("All")) {
                        newChecked = allChains
                    } else if (newChecked.length === 5 && !newChecked.includes("All")) {
                        newChecked = allChains
                    } else {
                        newChecked.push(value);
                    }
                }
            } else {
                if (value === "All") {
                    newChecked = []
                } else {
                    if (newChecked.includes("All")) {
                        newChecked.splice(newChecked.indexOf("All"), 1);
                    }
                    newChecked.splice(newChecked.indexOf(value), 1);
                }
            }
            setCategoryChecked(newChecked);
        }
    };

    const handleExpandClick = (item) => {
        setExpanded(prev => { return { ...prev, [item]: prev[item] ? false : true } })
        // if (item === 0) {
        //     setName("")
        //     setPrice({})
        //     setCrypto("ADA")
        //     setQuery({
        //         name: "",
        //         price: {},
        //         currency: "",
        //         isForSale: false
        //     })
        // }
    }

    const onChangePagination = (_, value) => {
        setCurrentPNumber(value)
    }

    const priceCalculate = (data) => {
        var price = 0;
        for (let i = 0; i < data.length; i++) {
            price += Number(getRealPrice(data[i].price, data[i].blockchain));
        }
        dispatch(setAddedItemsTotalPrice({
            price: price
        }))
    }
    useEffect(() => {
        let queries = {};
        if (categoryChecked.length !== 8 && categoryChecked.length !== 0) {
            queries.event = categoryChecked;
        }
        if (chainChecked.length !== 6 && chainChecked.length !== 0) {
            queries.networks = chainChecked
        }
        setFilter(queries)
    }, [chainChecked, categoryChecked])

    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus()
        }
        prevOpen.current = open
    }, [open])

    useEffect(() => {
        if (transaction) {
            setTotalPages(Math.ceil(transaction?.pagination?.total / transaction?.pagination?.items))
        }
    }, [transaction])

    useEffect(() => {
        const fetchnfts = async () => {
            setLoading(true)
            const result = await getTransactionsByUser(
                {
                    page: currentPNumber,
                    size: 10,
                    query: {
                        createdBy: params.id,
                        networks: filter.networks,
                        events: filter.event
                    }
                })
            setLoading(false)
            if (result?.transaction) {
                setTransaction(result)
            }
        }
        fetchnfts()
    }, [filter, currentPNumber])

    return (
        <div style={{ padding: "0 100px" }}>
            {
                loading ?
                    <Loading sx={{ p: 4 }} /> :
                    <>
                        <Stack alignItems={"center"} direction={"row"} paddingTop={2} paddingBottom={2} spacing={2} className={classes.activityfilter} >
                            <Typography className={classes.filters}>Filters</Typography>
                            <Stack sx={{ columnGap: "100px" }} direction="row" justifyContent={"left"} alignItems="center">
                                <Stack className={classes.activitybar} direction={"row"} spacing={1}>
                                    {
                                        chainChecked.map((item, key) => (
                                            item !== "All" &&
                                            <Box key={key} className={classes.filtervalue}>
                                                <Typography>{item}</Typography>
                                            </Box>
                                        ))
                                    }
                                    <Box className={classes.clearall} onClick={() => setChainChecked([])}>
                                        <Typography >Clear all</Typography>
                                    </Box>
                                </Stack>
                                <Stack className={classes.activitybar} direction={"row"} spacing={1}>
                                    {
                                        categoryChecked?.map((item, key) => (
                                            item !== "All" &&
                                            <Box key={key} className={classes.filtervalue}>
                                                <Typography>{item}</Typography>
                                            </Box>
                                        ))
                                    }
                                    <Box className={classes.clearall} onClick={() => setCategoryChecked([])}>
                                        <Typography >  Clear all</Typography>
                                    </Box>
                                </Stack>
                            </Stack>
                        </Stack>
                        <Grid container spacing={2}>
                            <Grid item lg={2} md={12} xs={12}>
                                <Stack spacing={5}>
                                    <FilterListIcon />
                                    <Stack>
                                        {
                                            listArr.map((item, index) => {
                                                if (item.name === "Event Type") {
                                                    return (
                                                        <Box key={index} className={aclasses.brandCard} >
                                                            <Box>
                                                                <Box className={aclasses.list} onClick={() => handleExpandClick(index)}>
                                                                    <Typography variant='h1'>{item.name}</Typography>
                                                                    <CardActions className={aclasses.detailCard} disableSpacing>
                                                                        <ExpandMore
                                                                            expand={expanded[index]}
                                                                            aria-expanded={expanded[index]}
                                                                            aria-label="show more"
                                                                        >
                                                                            <ExpandMoreIcon />
                                                                        </ExpandMore>
                                                                        {/* <ExpandLess
                                                                expand={expanded[index]}
                                                                aria-expanded={expanded[index]}
                                                                aria-label="show more"
                                                            >
                                                                <HorizontalRuleIcon />
                                                            </ExpandLess> */}
                                                                    </CardActions>
                                                                </Box>
                                                                <Collapse className={aclasses.collapseBoard} in={expanded[index]} timeout="auto" unmountOnExit>
                                                                    <CardContent className={aclasses.cardcontent}>
                                                                        <List>
                                                                            {
                                                                                item?.data.map((subItem, subIndex) => {
                                                                                    return (
                                                                                        <ListItem
                                                                                            key={subIndex}
                                                                                            disablePadding
                                                                                            onClick={(e) => { e.stopPropagation(), checkbox(item.key, subItem) }}
                                                                                        >
                                                                                            <ListItemButton className={aclasses.listBtn} dense>
                                                                                                <ListItemIcon>
                                                                                                    <Checkbox className={aclasses.checkBox} checked={item.key === "blockchain" ? chainChecked.includes(subItem) : categoryChecked.includes(subItem)} />
                                                                                                </ListItemIcon>
                                                                                                <ListItemText>
                                                                                                    {subItem}
                                                                                                </ListItemText>
                                                                                            </ListItemButton>
                                                                                        </ListItem>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </List>
                                                                    </CardContent>
                                                                </Collapse>
                                                            </Box>
                                                        </Box>
                                                    )
                                                } else {
                                                    return (
                                                        <Box key={index} className={aclasses.brandCard} >
                                                            <Box>
                                                                <Box className={aclasses.list} onClick={() => handleExpandClick(index)}>
                                                                    <Typography variant='h1'>{item.name}</Typography>
                                                                    <CardActions className={aclasses.detailCard} disableSpacing>
                                                                        <ExpandMore
                                                                            expand={expanded[index]}
                                                                            aria-expanded={expanded[index]}
                                                                            aria-label="show more"
                                                                        >
                                                                            <ExpandMoreIcon />
                                                                        </ExpandMore>
                                                                        {/* <ExpandLess
                                                                expand={expanded[index]}
                                                                aria-expanded={expanded[index]}
                                                                aria-label="show more"
                                                            >
                                                                <HorizontalRuleIcon />
                                                            </ExpandLess> */}
                                                                    </CardActions>
                                                                </Box>
                                                                <Collapse className={aclasses.collapseBoard} in={expanded[index]} timeout="auto" unmountOnExit>
                                                                    <CardContent className={aclasses.cardcontent}>
                                                                        <List>
                                                                            {
                                                                                item?.data.map((subItem, subIndex) => {
                                                                                    return (
                                                                                        <ListItem
                                                                                            key={subIndex}
                                                                                            disablePadding
                                                                                            onClick={(e) => { e.stopPropagation(), checkbox(item.key, subItem) }}
                                                                                        >
                                                                                            <ListItemButton className={aclasses.listBtn} dense>
                                                                                                <ListItemIcon>
                                                                                                    <Checkbox className={aclasses.checkBox} checked={item.key === "blockchain" ? chainChecked.includes(subItem) : categoryChecked.includes(subItem)} />
                                                                                                </ListItemIcon>
                                                                                                <ListItemText>
                                                                                                    {subItem}
                                                                                                </ListItemText>
                                                                                            </ListItemButton>
                                                                                        </ListItem>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </List>
                                                                    </CardContent>
                                                                </Collapse>
                                                            </Box>
                                                        </Box>
                                                    )
                                                }
                                            })
                                        }
                                    </Stack>
                                </Stack>
                            </Grid>
                            <Grid item lg={10} md={12} xs={12}>
                                {
                                    !transaction?.transaction?.length ?
                                        <Stack direction="row" justifyContent={"center"} alignItems="center" sx={{ width: "100%", height: "300px" }}>
                                            <Typography sx={{ color: "#e74c3c", fontWeight: "800 !important" }}>No Transactions</Typography>
                                        </Stack> :
                                        <TableContainer component={Paper}>
                                            <Table className={classes.tablelist} size="small" aria-label="a dense table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell align="center" className={classes.itemhead}>Type</TableCell>
                                                        <TableCell align="center" className={classes.itemhead}>Item</TableCell>
                                                        <TableCell align="center" className={classes.itemhead}>Price</TableCell>
                                                        <TableCell align="center" className={classes.itemhead}>Quantity</TableCell>
                                                        <TableCell align="center" className={classes.itemhead}>From</TableCell>
                                                        <TableCell align="center" className={classes.itemhead}>To</TableCell>
                                                        <TableCell align="center" className={classes.itemhead}> Time</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {
                                                        transaction?.transaction?.map((row, i) => (
                                                            <TableRow
                                                                key={i}
                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                            >
                                                                <TableCell className={classes.NFTitemlist} component="th" scope="row">
                                                                    <Stack alignItems={"center"} justifyContent={"center"} >
                                                                        <Typography className={classes.NFTprice}> {row.name}</Typography>
                                                                    </Stack>
                                                                </TableCell>
                                                                <TableCell align="center" className={classes.NFTitemlist} >
                                                                    <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} spacing={7}>
                                                                        <Stack >
                                                                            <CardHeader
                                                                                avatar={
                                                                                    <Avatar className={classes.cardavatar} aria-label="recipe">
                                                                                        <Box component="img" className={classes.cardimggroup} src={row.collections[0].coverUrl} ></Box>
                                                                                    </Avatar>
                                                                                }
                                                                                title={
                                                                                    <Stack direction={"row"} alignItems="center">
                                                                                        <Typography className={classes.NFTtype}>{sliceLongString1(row.collections[0].name)}</Typography>
                                                                                        <Box component="img" className={classes.nftcheck} src={NFTcheck.src} ></Box>
                                                                                    </Stack>
                                                                                }
                                                                                subheader={<Typography className={classes.NFTstyle}>{sliceLongString1(row.collections[0].description)}</Typography>}
                                                                            />
                                                                        </Stack>
                                                                    </Stack>
                                                                </TableCell>
                                                                <TableCell align="center" className={classes.NFTitemlist}>
                                                                    <Stack alignItems={"center"} justifyContent={"center"} >
                                                                        <Stack direction={"row"}>
                                                                            <Box
                                                                                mr={1}
                                                                                component="img"
                                                                                src={getCoinIcons(row.blockchain)}
                                                                                className={classes.ethereumicon}
                                                                            />
                                                                            <Typography className={classes.NFTprice}> {getRealPrice(row.price, row.blockchain)}</Typography>
                                                                        </Stack>
                                                                    </Stack>
                                                                </TableCell>
                                                                <TableCell align="center" className={classes.NFTitemlist} >1</TableCell>
                                                                <TableCell align="center" className={classes.NFTitemlist} >{sliceLongString(row.from)}</TableCell>
                                                                <TableCell align="center" className={classes.NFTitemlist} >{sliceLongString(row.to)}</TableCell>
                                                                <TableCell align="center" className={classes.NFTitemlist} >{getDate(row.createdAt)}</TableCell>
                                                            </TableRow>
                                                        ))
                                                    }
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                }
                            </Grid>
                            <Stack mt={3} flexDirection={"row"} justifyContent={"end"} sx={{ width: "100%" }}>
                                <Pagination
                                    onChange={onChangePagination}
                                    count={totalPages} />
                            </Stack>
                        </Grid>
                    </>
            }
        </div>
    )
}

export default Activity