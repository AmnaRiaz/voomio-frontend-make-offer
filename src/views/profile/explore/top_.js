import React, { useEffect, useState } from "react"

// @mui/material components
import { makeStyles, styled } from "@mui/styles"
import Grid from "@mui/material/Grid"
// core components
import trendStyles from "/src/assets/theme/views/main/trending"
import componentStyles from "/src/assets/theme/views/profile/profileexplore"
import { styles } from "../../../assets/theme/views/collection/list";
import { Box, Typography, Button, Table, Pagination, Skeleton } from "@mui/material"

// import CardActions from '@mui/material/CardActions'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import jem from "/src/assets/image/component/icon/jem.svg"
import ether from "/src/assets/image/coin/ethereum.svg"
import polygon from "/src/assets/image/coin/polygon.svg"
import binance from "/src/assets/image/coin/binance.svg"
import cardano from "/src/assets/image/coin/cardano.svg"
import solana from "/src/assets/image/coin/solana.svg"
import { Stack } from "@mui/system"
import { getRealPrice } from "../../../utils/utility"
import RemoveIcon from '@mui/icons-material/Remove';
import { useQuery } from "@tanstack/react-query";

import {
    MenuItem,
    Paper,
    Select,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAllTopCollections } from "../../collections/state";
import { getalltopprice } from "../../../redux/actions/main"

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

const useStyles = makeStyles(componentStyles)
const tStyles = makeStyles(trendStyles)

const allCategories = [
    { value: 'all', title: "All categories", selected: true },
    { value: 'Art', title: "Art", selected: false },
    { value: 'Collections', title: "Collections", selected: false },
    { value: 'Domain names', title: "Domain names", selected: false },
    { value: "Music", title: "Music", selected: false },
    { value: "Photography", title: "Photography", selected: false },
    { value: "Sports", title: "Sports", selected: false }
]


const Top = () => {

    const classes = useStyles()
    const tclasses = tStyles()
    const navigate = useNavigate()

    const [toppage, setTopPage] = useState(1);
    const [totalTopPages, setTotalTopPages] = useState(1);
    const [priceone, setPriceOne] = useState([])
    const [priceseven, setPriceSeven] = useState([])

    const [filters, setFilters] = React.useState({
        category: 'all',
        blockchain: 'all',
        name: ''
    })


    const {
        data,
        isSuccess,
        isLoading,
    } = getAllTopCollections(toppage, 100, filters.category, filters.blockchain, filters.name)

    const handleCategoryChange = (e) => {
        setFilters(p => ({
            ...p,
            category: e.target.value
        }))
    }

    const setChainFilter = (val) => {
        setFilters(p => ({
            ...p,
            blockchain: val
        }))
    }

    const TypeItem = ({ item }) => {
        if (item > 0) {
            return <Box className={classes.percent}>
                <Typography >+{item.toFixed(2)}%</Typography>
            </Box>
        } else {
            return <Box className={classes.mpercent}>
                <Typography >{item.toFixed(2)}%</Typography>
            </Box>
        }
    }

    const gotoCollectionDetails = (key) => {
        if (data && data.collection.length > 0) {
            navigate("/collection/" + data?.collection[key]?._id)
        }
    }

    const TophandlePagination = (_, pageNum) => {
        setTopPage(pageNum)
    }

    const getData = async (rowID) => {
        const result = await getalltopprice(rowID)
        console.log(result)
        if (rowID) {
            return (
                <Typography >{rowID}%</Typography>
            )
        } else {
            <Stack direction="row" alignItems="center" justifyContent="center">
                <RemoveIcon></RemoveIcon>
            </Stack>
        }
    }

    // update number of pages when data changed
    useEffect(() => {
        if (data) {
            setTotalTopPages(Math.ceil(data?.pagination?.total / data?.pagination?.items))
        }
    }, [data])

    useEffect(() => {
        const fetchdata = async () => {
            let index = []
            if (data && data?.collection.length > 0) {
                data.collection.map((item, key) => {
                    index.push(item._id)
                })
                const result = await getalltopprice(index)
                console.log(result)
                if (result.price_percents_one.length > 0) {
                    setPriceOne(result.price_percents_one)
                } else if (result.price_percents_seven.length > 0) {
                    setPriceSeven(result.price_percents_seven)
                }
            }
        }
        fetchdata()
    }, [data])

    return (
        <>
            <Stack direction={"row"} gap={2} paddingTop={3} className={classes.pasttime}>
                <Select
                    value={filters.category}
                    onChange={handleCategoryChange}
                    displayEmpty
                    className={classes.nativeselect}
                    sx={styles.selectButton2}
                >
                    {allCategories.map((item, index) => (
                        <MenuItem key={index}
                            sx={styles.selectMenuItem}
                            value={item.value}>
                            <Stack component="span">{item.title}</Stack>
                        </MenuItem>
                    ))}
                </Select>
                <Box sx={{
                    display: "flex", justifyContent: "center", alignItems: "center", border: "2px solid #6549F6",
                    borderRadius: "10px", height: "40px"
                }}>
                    <Button className={classes.chainsearchbtn} onClick={() => setChainFilter("all")}>All Chains</Button>
                    <Button className={classes.chainsearchbtn1} onClick={() => setChainFilter("ethereum")}>ETH</Button>
                    <Button className={classes.chainsearchbtn1} onClick={() => setChainFilter("solana")}>SOL</Button>
                    <Button className={classes.chainsearchbtn1} onClick={() => setChainFilter("binance")}>BINANCE</Button>
                    <Button className={classes.chainsearchbtn1} onClick={() => setChainFilter("polygon")}>POLYGON</Button>
                    <Button className={classes.chainsearchbtn2} onClick={() => setChainFilter("cardano")}>CARDANO</Button>
                </Box>
            </Stack>
            {isLoading && Array(10).fill(0).map((_, index) => (
                <Grid item key={index} lg={3} md={4} sm={6} xs={12}>
                    <Skeleton
                        variant='rectangular'
                        width='100%'
                        height={100}
                    />
                </Grid>
            ))}
            {isSuccess &&
                <TableContainer component={Paper} className={classes.table}>
                    <Table sx={{ minWidth: 650 }} aria-label="caption table">
                        <TableHead>
                            <TableRow>
                                <TableCell component="th" scope="row" className={classes.thead} sx={{ width: "40% !important" }}>Collection</TableCell>
                                <TableCell align="right" className={classes.thead}>Volume</TableCell>
                                <TableCell align="center" className={classes.thead}>24hr</TableCell>
                                <TableCell align="center" className={classes.thead}>7d</TableCell>
                                <TableCell align="right" className={classes.thead}>Floor price</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody
                        // id="scrollableDiv"
                        // style={{
                        //     height: 300,
                        //     overflow: 'auto',
                        //     display: 'flex',
                        //     flexDirection: 'column-reverse',
                        // }}
                        >
                            {/* <InfiniteScroll
                                dataLength={data?.collection.length}
                                next={this.fetchMoreData}
                                style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
                                inverse={true} //
                                hasMore={true}
                                loader={<h4>Loading...</h4>}
                                scrollableTarget="scrollableDiv"
                            > */}
                            {
                                data?.collection?.map(async (row, index) => (
                                    <StyledTableRow key={index} onClick={() => gotoCollectionDetails(index)} sx={{ cursor: "pointer", "&:hover": { background: "#ddd !important" } }}>
                                        <TableCell component="th" scope="row" className={classes.tdbox} sx={{ columnGap: "20px" }}>
                                            <Box sx={{ width: "10px" }}>
                                                <Typography variant="h2" sx={{ color: "#707a83 !important", fontWeight: "600 !important" }}>{index + 1}</Typography>
                                            </Box>
                                            <Box className={classes.namebox}>
                                                <span className={classes.spanbox}>
                                                    <Box className={classes.imgbox} component="img" src={row.coverUrl}>
                                                    </Box>
                                                </span>
                                            </Box>
                                            <Box sx={{ display: "flex" }}>
                                                <Typography className={classes.name}>{row.name}</Typography>&nbsp;&nbsp;
                                                <Box component='img' src={jem.src}>
                                                </Box>
                                            </Box>

                                        </TableCell>
                                        <TableCell align="center" className={classes.ether}>
                                            <Box sx={{ display: "flex", justifyContent: "right", alignItems: "center" }}>
                                                <Box className={classes.namebox} sx={{ height: "100%", width: "30px", backgroundColor: "unset !important", border: "none" }}>
                                                    {
                                                        row?.blockchain === "cardano" ? <Box component="img" className={tclasses.imgbox} src={cardano.src}></Box> : row?.blockchain === "ethereum" ? <Box component="img" className={tclasses.imgbox} src={ether.src}></Box> : row?.blockchain === "binance" ? <Box component="img" className={tclasses.imgbox} src={binance.src}></Box> : row?.blockchain === "polygon" ? <Box component="img" className={tclasses.imgbox} src={polygon.src}></Box> : row?.blockchain === "solana" ? <Box component="img" className={tclasses.imgbox} src={solana.src}></Box> : ""
                                                    }
                                                </Box>
                                                <Typography className={classes.volletter}>
                                                    &nbsp;&nbsp;{convertFormatedDigit((row?.volume || 0), 2, row?.blockchain)}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center" className={classes.tdbox1}>
                                            {await getData(row?._id)}
                                            {/* {
                                                data?.price_percents_one.length > 0 && data?.price_percents_one[index] !== 0 ?
                                                    // < TypeItem item={data?.price_percents_one[index]} />
                                                    getData(row?._id)
                                                    : <Stack direction="row" alignItems="center" justifyContent="center">
                                                        <RemoveIcon></RemoveIcon>
                                                    </Stack>
                                            } */}
                                        </TableCell>
                                        <TableCell align="center" className={classes.tdbox1}>
                                            {
                                                data?.price_percents_seven.length > 0 && data?.price_percents_seven[index] !== 0 ?
                                                    < TypeItem item={data?.price_percents_seven[index]} />
                                                    : <Stack direction="row" alignItems="center" justifyContent="center">
                                                        <RemoveIcon></RemoveIcon>
                                                    </Stack>
                                            }
                                        </TableCell>
                                        <Stack direction="row" alignItems="center" justifyContent="right" sx={{}}>
                                            {
                                                row.floor !== 0 ?
                                                    <Stack direction="row" alignItems="center" justifyContent="right">
                                                        <Box className={classes.namebox} sx={{ height: "30px", width: "30px", backgroundColor: "unset !important", border: "none" }}>
                                                            {
                                                                row?.blockchain === "cardano" ? <Box component="img" className={tclasses.imgbox} sx={{ width: "100%" }} src={cardano.src}></Box> : row?.blockchain === "ethereum" ? <Box component="img" className={tclasses.imgbox} sx={{ width: "100%" }} src={ether.src}></Box> : row?.blockchain === "binance" ? <Box component="img" className={tclasses.imgbox} sx={{ width: "100%" }} src={binance.src}></Box> : row?.blockchain === "polygon" ? <Box component="img" className={tclasses.imgbox} sx={{ width: "100%" }} src={polygon.src}></Box> : row?.blockchain === "solana" ? <Box component="img" className={tclasses.imgbox} sx={{ width: "100%" }} src={solana.src}></Box> : ""
                                                            }
                                                        </Box>
                                                        <Typography className={classes.volletter}>&nbsp;&nbsp;{convertFormatedDigit((row?.floor || 0), 2, row?.blockchain)}</Typography>
                                                    </Stack>
                                                    : <RemoveIcon></RemoveIcon>
                                            }
                                        </Stack>
                                    </StyledTableRow>
                                ))
                            }
                            {/* </InfiniteScroll> */}
                        </TableBody>
                    </Table>
                </TableContainer>
            }

            <Stack mt={3} flexDirection={"row"} justifyContent={"end"}>
                <Pagination
                    onChange={TophandlePagination}
                    count={totalTopPages}
                />
            </Stack>
        </>
    )
}
export default Top