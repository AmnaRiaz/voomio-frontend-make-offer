import React, { useEffect } from "react"
// @mui/material components
import { makeStyles, styled } from "@mui/styles"
import componentStyles from "/src/assets/theme/views/main/trending"
import tableStyles from "/src/assets/theme/views/profile/profileexplore"

import AOS from "aos"
import { styles } from "/src/assets/theme/views/collection/list";
import { Grid, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Table, Typography, Box, Select, MenuItem, Button, Skeleton } from '@mui/material'
import jem from "/src/assets/image/component/icon/jem.svg"
import ether from "/src/assets/image/coin/ethereum.svg"
import polygon from "/src/assets/image/coin/polygon.svg"
import binance from "/src/assets/image/coin/binance.svg"
import cardano from "/src/assets/image/coin/cardano.svg"
import solana from "/src/assets/image/coin/solana.svg"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { saveTab } from "../../redux/actions/nfts"
import { getRealPrice } from "../../utils/utility"
import { Stack } from "@mui/system"
import RemoveIcon from '@mui/icons-material/Remove';
import { getTrendCollections } from "../collections/state"
import { getalltopprice, getalltrendingprice } from "../../redux/actions/main"

// core components
const useStyles = makeStyles(componentStyles)
const tStyles = makeStyles(tableStyles)
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    fontSize: '1rem !important',
    '&:nth-of-type(odd)': {
        backgroundColor: `${theme.palette.action.hover}!important`,
        // border: '2px solid red !important',
        borderRadius: '10px !important'
    },
    '& td, th': {
        border: 'none !important'
    }
}))


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


const allhours = [
    { value: '24h', title: "24h", selected: true },
    { value: '7d', title: "7d", selected: false },
]
const Trending = () => {
    const classes = useStyles()
    const tclasses = tStyles()
    const dispatch = useDispatch()

    const navigate = useNavigate();
    const [price, setPrice] = React.useState({})
    const [filters, setFilters] = React.useState({
        hour: '24h',
        blockchain: 'all',
        category: "all",
        name: ''
    })

    const {
        data,
        isSuccess,
        isLoading
    } = getTrendCollections(1, 10, filters.category, filters.blockchain, filters.name)

    const handleHourChange = (e) => {
        setFilters(p => ({
            ...p,
            hour: e.target.value
        }))
        // gettopcollections(e.target.value, filters.blockchain)
    }
    const setChainFilter = (val) => {
        setFilters(p => ({
            ...p,
            blockchain: val
        }))
    }


    const TypeItem = ({ item }) => {
        if (item > 0) {
            return <Box className={tclasses.percent}>
                <Typography >+{item.toFixed(2)}%</Typography>
            </Box>
        } else {
            return <Box className={tclasses.mpercent}>
                <Typography >{item.toFixed(2)}%</Typography>
            </Box>
        }
    }
    const gotoCollectionDetails = (key) => {
        if (data && data.collection.length > 0) {
            navigate("/collection/" + data?.collection[key][0]?._id)
        }
    }
    useEffect(() => {
        const fetchdata = async () => {
            let index = []
            if (data && data?.collection?.length > 0) {
                data.collection.map((item, key) => {
                    index.push(item[0]?._id)
                })
                const result = await getalltrendingprice(index)
                if (result) {
                    setPrice(result)
                }
            }

        }
        fetchdata()
    }, [data])

    useEffect(() => {
        AOS.init()
        AOS.refresh()
    }, [])

    const goTop = () => {
        dispatch(saveTab({ tab: "2" }))
        navigate("/ranking")
    }

    return (
        <Grid container classes={{ root: classes.trend }}>
            <Grid item lg={12} xs={12}>
                <Grid container classes={{ root: classes.select }} alignItems="flex-end">
                    <Grid item lg={6} justifyContent="left" >
                        <Typography variant="h1">Trending</Typography>
                    </Grid>
                    <Grid item lg={6} sx={{ display: "flex", justifyContent: "right", alignItems: "flex-end" }}>
                        <Box sx={{ display: "flex", alignItems: "center", columnGap: "15px" }}>
                            <Box>
                                <Select
                                    value={filters.hour}
                                    onChange={handleHourChange}
                                    displayEmpty
                                    className={classes.nativeselect}
                                    sx={styles.selectButton1}
                                >
                                    {allhours.map((item, index) => (
                                        <MenuItem key={index}
                                            sx={styles.selectMenuItem}
                                            value={item.value}>
                                            <Stack component="span">{item.title}</Stack>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Box>
                            <Box sx={{
                                display: "flex", justifyContent: "center", alignItems: "center", border: "2px solid #6549F6",
                                borderRadius: "10px", height: "40px"
                            }}>
                                <Button className={tclasses.chainsearchbtn} onClick={() => setChainFilter("all")}>All Chains</Button>
                                <Button className={tclasses.chainsearchbtn1} onClick={() => setChainFilter("ethereum")}>ETH</Button>
                                <Button className={tclasses.chainsearchbtn1} onClick={() => setChainFilter("solana")}>SOL</Button>
                                <Button className={tclasses.chainsearchbtn1} onClick={() => setChainFilter("binance")}>BINANCE</Button>
                                <Button className={tclasses.chainsearchbtn1} onClick={() => setChainFilter("polygon")}>POLYGON</Button>
                                <Button className={tclasses.chainsearchbtn2} onClick={() => setChainFilter("cardano")}>CARDANO</Button>
                            </Box>
                            <Box sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100px",
                                height: "40px",
                                border: "2px solid #6549F6",
                                cursor: "pointer",
                                borderRadius: "10px",
                                "&:hover":
                                {
                                    "& > h4": {
                                        color: "#222 !important"
                                    },
                                    borderRadius: "10px"
                                }
                            }}>
                                <Typography variant="h4" sx={{ color: "#666 !important", fontWeight: "700" }} onClick={goTop}>View all</Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            <Grid
                pt={4}
                item container
                lg={12}
                classes={{ root: classes.items }}
                sx={{ marginTop: "0px !important" }}
                data-aos="fade-right"
                data-aos-offset="300"
                data-aos-easing="ease-in-sine"
                spacing={3}
                alignItems='center'
                justifyContent='center'>
                {isLoading && Array(10).fill(0).map((_, index) => (
                    <Grid item key={index} lg={3} md={4} sm={6} xs={12}>
                        <Skeleton
                            variant='rectangular'
                            width='100%'
                            height={100}
                        />
                    </Grid>
                ))}
                {isSuccess && !isLoading &&
                    data?.collection?.length ?
                    <TableContainer component={Paper} className={tclasses.table}>
                        <Table aria-label="caption table">
                            <TableHead>
                                <TableRow>
                                    <TableCell component="th" scope="row" className={tclasses.thead} sx={{ width: "40% !important" }}>Collection</TableCell>
                                    <TableCell align="right" className={tclasses.thead}>Floor price</TableCell>
                                    <TableCell align="right" className={tclasses.thead}>Volume</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {
                                    data?.collection?.map((row, index) => (
                                        index < 5 &&
                                        <StyledTableRow key={index} onClick={() => gotoCollectionDetails(index)} sx={{ cursor: "pointer", "&:hover": { background: "#ddd !important" } }}>
                                            <TableCell component="th" scope="row" className={tclasses.tdbox} sx={{ columnGap: "20px" }}>
                                                <Box sx={{ width: "10px" }}>
                                                    <Typography variant="h2" sx={{ color: "#707a83 !important", fontWeight: "600 !important" }}>{index + 1}</Typography>
                                                </Box>
                                                <Box className={tclasses.namebox}>
                                                    <span className={tclasses.spanbox}>
                                                        <Box className={tclasses.imgbox} component="img" src={row[0]?.coverUrl}>
                                                        </Box>
                                                    </span>
                                                </Box>
                                                <Box sx={{ display: "flex" }}>
                                                    <Typography className={tclasses.name}>{row[0]?.name}</Typography>&nbsp;&nbsp;
                                                    <Box component='img' src={jem.src}>
                                                    </Box>
                                                </Box>

                                            </TableCell>
                                            <TableCell align="right" className={tclasses.ether}>
                                                {
                                                    row[0]?.floor !== 0 ?
                                                        <Stack direction="row" alignItems="center" justifyContent="right">
                                                            <Box className={tclasses.namebox} sx={{ height: "100%", width: "30px", backgroundColor: "unset !important", border: "none" }}>
                                                                {
                                                                    row[0]?.blockchain === "cardano" ? <Box component="img" className={classes.imgbox} src={cardano.src}></Box> : row[0]?.blockchain === "ethereum" ? <Box component="img" className={classes.imgbox} src={ether.src}></Box> : row[0]?.blockchain === "binance" ? <Box component="img" className={classes.imgbox} src={binance.src}></Box> : row[0]?.blockchain === "polygon" ? <Box component="img" className={classes.imgbox} src={polygon.src}></Box> : row[0]?.blockchain === "solana" ? <Box component="img" className={classes.imgbox} src={solana.src}></Box> : ""
                                                                }
                                                            </Box>
                                                            <Typography className={tclasses.volletter}>&nbsp;&nbsp;{convertFormatedDigit((row[0]?.floor || 0), 2, row[0]?.blockchain)}</Typography>
                                                        </Stack> : <RemoveIcon></RemoveIcon>
                                                }
                                            </TableCell>
                                            <TableCell align="right" className={tclasses.ether}>
                                                <Stack direction="column" alignItems="end" justifyContent="center">
                                                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                        <Box className={tclasses.namebox} sx={{ height: "100%", width: "30px", backgroundColor: "unset !important", border: "none" }}>
                                                            {
                                                                row[0]?.blockchain === "cardano" ? <Box component="img" className={classes.imgbox} src={cardano.src}></Box> : row[0]?.blockchain === "ethereum" ? <Box component="img" className={classes.imgbox} src={ether.src}></Box> : row[0]?.blockchain === "binance" ? <Box component="img" className={classes.imgbox} src={binance.src}></Box> : row[0]?.blockchain === "polygon" ? <Box component="img" className={classes.imgbox} src={polygon.src}></Box> : row[0]?.blockchain === "solana" ? <Box component="img" className={classes.imgbox} src={solana.src}></Box> : ""
                                                            }
                                                        </Box>
                                                        <Typography className={tclasses.volletter}>
                                                            &nbsp;&nbsp;{convertFormatedDigit((row[0]?.volume || 0), 2, row[0]?.blockchain)}
                                                        </Typography>
                                                    </Box>

                                                    <Box>
                                                        {
                                                            filters.hour === "24h" ?
                                                                price.price_percents_one?.length ?
                                                                    price.price_percents_one[index] ?
                                                                        <TypeItem item={price.price_percents_one[index]} /> :
                                                                        <RemoveIcon></RemoveIcon>
                                                                    : <RemoveIcon></RemoveIcon>
                                                                :
                                                                price.price_percents_seven?.length ?
                                                                    price.price_percents_seven[index] ?
                                                                        <TypeItem item={price.price_percents_seven[index]} /> :
                                                                        <RemoveIcon></RemoveIcon>
                                                                    : <RemoveIcon></RemoveIcon>

                                                        }
                                                    </Box>
                                                </Stack>
                                            </TableCell>
                                        </StyledTableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                        <Table aria-label="caption table">
                            <TableHead>
                                <TableRow>
                                    <TableCell component="th" scope="row" className={tclasses.thead} sx={{ width: "40% !important" }}>Collection</TableCell>
                                    <TableCell align="right" className={tclasses.thead}>Floor price</TableCell>
                                    <TableCell align="right" className={tclasses.thead}>Volume</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {
                                    data?.collection?.map((row, index) => (
                                        index >= 5 &&
                                        <StyledTableRow key={index} onClick={() => gotoCollectionDetails(index)} sx={{ cursor: "pointer", "&:hover": { background: "#ddd !important" } }}>
                                            <TableCell component="th" scope="row" className={tclasses.tdbox} sx={{ columnGap: "20px" }}>
                                                <Box sx={{ width: "10px" }}>
                                                    <Typography variant="h2" sx={{ color: "#707a83 !important", fontWeight: "600 !important" }}>{index + 1}</Typography>
                                                </Box>
                                                <Box className={tclasses.namebox}>
                                                    <span className={tclasses.spanbox}>
                                                        <Box className={tclasses.imgbox} component="img" src={row[0]?.coverUrl}>
                                                        </Box>
                                                    </span>
                                                </Box>
                                                <Box sx={{ display: "flex" }}>
                                                    <Typography className={tclasses.name}>{row[0]?.name}</Typography>&nbsp;&nbsp;
                                                    <Box component='img' src={jem.src}>
                                                    </Box>
                                                </Box>

                                            </TableCell>
                                            <TableCell align="right" className={tclasses.ether}>
                                                {
                                                    row[0]?.floor !== 0 ?
                                                        <Stack direction="row" alignItems="center" justifyContent="right">
                                                            <Box className={tclasses.namebox} sx={{ height: "100%", width: "30px", backgroundColor: "unset !important", border: "none" }}>
                                                                {
                                                                    row[0]?.blockchain === "cardano" ? <Box component="img" className={classes.imgbox} src={cardano.src}></Box> : row[0]?.blockchain === "ethereum" ? <Box component="img" className={classes.imgbox} src={ether.src}></Box> : row[0]?.blockchain === "binance" ? <Box component="img" className={classes.imgbox} src={binance.src}></Box> : row[0]?.blockchain === "polygon" ? <Box component="img" className={classes.imgbox} src={polygon.src}></Box> : row[0]?.blockchain === "solana" ? <Box component="img" className={classes.imgbox} src={solana.src}></Box> : ""
                                                                }
                                                            </Box>
                                                            <Typography className={tclasses.volletter}>&nbsp;&nbsp;{convertFormatedDigit((row[0]?.floor || 0), 2, row[0]?.blockchain)}</Typography>
                                                        </Stack>
                                                        : <RemoveIcon></RemoveIcon>
                                                }
                                            </TableCell>
                                            <TableCell align="right" className={tclasses.ether}>
                                                <Stack direction="column" alignItems="end" justifyContent="center">
                                                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                        <Box className={tclasses.namebox} sx={{ height: "100%", width: "30px", backgroundColor: "unset !important", border: "none" }}>
                                                            {
                                                                row[0]?.blockchain === "cardano" ? <Box component="img" className={classes.imgbox} src={cardano.src}></Box> : row[0]?.blockchain === "ethereum" ? <Box component="img" className={classes.imgbox} src={ether.src}></Box> : row[0]?.blockchain === "binance" ? <Box component="img" className={classes.imgbox} src={binance.src}></Box> : row[0]?.blockchain === "polygon" ? <Box component="img" className={classes.imgbox} src={polygon.src}></Box> : row[0]?.blockchain === "solana" ? <Box component="img" className={classes.imgbox} src={solana.src}></Box> : ""
                                                            }
                                                        </Box>
                                                        <Typography className={tclasses.volletter}>
                                                            &nbsp;&nbsp;{convertFormatedDigit((row[0]?.volume || 0), 2, row[0]?.blockchain)}
                                                        </Typography>
                                                    </Box>

                                                    <Box>

                                                        {
                                                            filters.hour === "24h" ?
                                                                price.price_percents_one?.length ?
                                                                    price.price_percents_one[index] !== 0 ?
                                                                        < TypeItem item={price.price_percents_one[index]} /> :
                                                                        <RemoveIcon></RemoveIcon>
                                                                    : <RemoveIcon></RemoveIcon>
                                                                :
                                                                price.price_percents_seven?.length ?
                                                                    price.price_percents_seven[index] !== 0 ?
                                                                        < TypeItem item={price.price_percents_seven[index]} /> :
                                                                        <RemoveIcon></RemoveIcon>
                                                                    : <RemoveIcon></RemoveIcon>

                                                        }
                                                    </Box>
                                                </Stack>
                                            </TableCell>
                                        </StyledTableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    : <Box sx={{ width: "100%", height: "80px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Typography variant="h3" sx={{ color: "red", fontWeight: "800" }}>No Collections</Typography>
                    </Box>
                }

            </Grid>
        </Grid >
    )
}

export default Trending