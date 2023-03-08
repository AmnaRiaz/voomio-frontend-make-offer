import React, { useEffect, useState } from "react"
// @mui/material components
import { makeStyles, styled } from "@mui/styles"
import Grid from "@mui/material/Grid"
// core components
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

import {
    MenuItem,
    Paper,
    Select,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAllTrendCollections } from "../../collections/state";

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

const alltrendCategories = [
    { value: 'all', title: "All categories", selected: true },
    { value: 'Art', title: "Art", selected: false },
    { value: 'Collections', title: "Collections", selected: false },
    { value: 'Domain names', title: "Domain names", selected: false },
    { value: "Music", title: "Music", selected: false },
    { value: "Photography", title: "Photography", selected: false },
    { value: "Sports", title: "Sports", selected: false }
]

const Trend = () => {
    const classes = useStyles()
    const navigate = useNavigate()

    const [trendpage, setTrendPage] = useState(1);
    const [totalTrendPages, setTotalTrendPages] = useState(1);

    const [tfilters, setTFilters] = React.useState({
        category: 'all',
        blockchain: 'all',
        name: ''
    })

    const {
        data,
        isSuccess,
        isLoading,
    } = getAllTrendCollections(trendpage, 100, tfilters.category, tfilters.blockchain, tfilters.name)

    const handleCategoryTrendChange = (e) => {
        setTFilters(p => ({
            ...p,
            category: e.target.value
        }))
        alltrendCategories.map((item, key) => {
            if (item.value === e.target.value) {
                item.selected = true
            } else {
                item.selected = false
            }
        })
    }
    const setTrendChainFilter = (val) => {
        setTFilters(p => ({
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

    const gotoTrendCollectionDetails = (key) => {
        if (data && data.collection.length > 0) {
            navigate("/collection/" + data?.collection[key][0]?._id)
        }
    }

    const TrendhandlePagination = (_, pageNum) => {
        setTrendPage(pageNum)
    }

    // update number of pages when data changed
    useEffect(() => {
        if (data) {
            setTotalTrendPages(Math.ceil(data?.pagination?.total / data?.pagination?.items))
        }
    }, [data])

    return (
        <>
            <Stack direction={"row"} gap={2} paddingTop={3} className={classes.pasttime}>
                <Select
                    value={tfilters.category}
                    onChange={handleCategoryTrendChange}
                    displayEmpty
                    className={classes.nativeselect}
                    sx={styles.selectButton2}
                >
                    {alltrendCategories.map((item, index) => (
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
                    <Button className={classes.chainsearchbtn} onClick={() => setTrendChainFilter("all")}>All Chains</Button>
                    <Button className={classes.chainsearchbtn1} onClick={() => setTrendChainFilter("ethereum")}>ETH</Button>
                    <Button className={classes.chainsearchbtn1} onClick={() => setTrendChainFilter("solana")}>SOL</Button>
                    <Button className={classes.chainsearchbtn1} onClick={() => setTrendChainFilter("binance")}>BINANCE</Button>
                    <Button className={classes.chainsearchbtn1} onClick={() => setTrendChainFilter("polygon")}>POLYGON</Button>
                    <Button className={classes.chainsearchbtn2} onClick={() => setTrendChainFilter("cardano")}>CARDANO</Button>
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
                                <TableCell align="right" className={classes.thead}>24hr</TableCell>
                                <TableCell align="right" className={classes.thead}>7d</TableCell>
                                <TableCell align="right" className={classes.thead}>Floor price</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {
                                data?.collection?.map((row, index) => (
                                    <StyledTableRow key={index} onClick={() => gotoTrendCollectionDetails(index)} sx={{ cursor: "pointer", "&:hover": { background: "#ddd !important" } }}>
                                        <TableCell component="th" scope="row" className={classes.tdbox} sx={{ columnGap: "20px" }}>
                                            <Box sx={{ width: "10px" }}>
                                                <Typography variant="h2" sx={{ color: "#707a83 !important", fontWeight: "600 !important" }}>{index + 1}</Typography>
                                            </Box>
                                            <Box className={classes.namebox}>
                                                <span className={classes.spanbox}>
                                                    <Box className={classes.imgbox} component="img" src={row[0].coverUrl}>
                                                    </Box>
                                                </span>
                                            </Box>
                                            <Box sx={{ display: "flex" }}>
                                                <Typography className={classes.name}>{row[0].name}</Typography>&nbsp;&nbsp;
                                                <Box component='img' src={jem.src}>
                                                </Box>
                                            </Box>

                                        </TableCell>
                                        <TableCell align="center" className={classes.ether}>
                                            <Box sx={{ display: "flex", justifyContent: "right", alignItems: "center" }}>
                                                <Box className={classes.namebox} sx={{ height: "100%", width: "30px", backgroundColor: "unset !important", border: "none" }}>
                                                    {
                                                        row[0]?.blockchain === "cardano" ? <Box component="img" className={classes.imgbox} src={cardano.src}></Box> : row[0]?.blockchain === "ethereum" ? <Box component="img" className={classes.imgbox} src={ether.src}></Box> : row[0]?.blockchain === "binance" ? <Box component="img" className={classes.imgbox} src={binance.src}></Box> : row[0]?.blockchain === "polygon" ? <Box component="img" className={classes.imgbox} src={polygon.src}></Box> : row[0]?.blockchain === "solana" ? <Box component="img" className={classes.imgbox} src={solana.src}></Box> : ""
                                                    }
                                                </Box>
                                                <Typography className={classes.volletter}>
                                                    &nbsp;&nbsp;{convertFormatedDigit((row[0]?.volume || 0), 2, row[0]?.blockchain)}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center" className={classes.tdbox1}>
                                            {
                                                data?.price_percents_one[index] !== 0 ?
                                                    < TypeItem item={data?.price_percents_one[index]} />
                                                    : <RemoveIcon></RemoveIcon>
                                            }
                                        </TableCell>
                                        <TableCell align="center" className={classes.tdbox1}>
                                            {
                                                data?.price_percents_seven[index] !== 0 ?
                                                    < TypeItem item={data?.price_percents_seven[index]} />
                                                    : <RemoveIcon></RemoveIcon>
                                            }
                                        </TableCell>
                                        <Stack direction="row" alignItems="center" justifyContent="right">
                                            {
                                                row[0].floor !== 0 ?
                                                    <Stack direction="row" alignItems="center" justifyContent="right">
                                                        <Box className={classes.namebox} sx={{ height: "100%", width: "30px", backgroundColor: "unset !important", border: "none" }}>
                                                            {
                                                                row[0]?.blockchain === "cardano" ? <Box component="img" className={classes.imgbox} src={cardano.src}></Box> : row[0]?.blockchain === "ethereum" ? <Box component="img" className={classes.imgbox} src={ether.src}></Box> : row[0]?.blockchain === "binance" ? <Box component="img" className={classes.imgbox} src={binance.src}></Box> : row[0]?.blockchain === "polygon" ? <Box component="img" className={classes.imgbox} src={polygon.src}></Box> : row[0]?.blockchain === "solana" ? <Box component="img" className={classes.imgbox} src={solana.src}></Box> : ""
                                                            }
                                                        </Box>
                                                        <Typography className={classes.volletter}>&nbsp;&nbsp;{convertFormatedDigit((row[0]?.floor || 0), 2, row[0]?.blockchain)}</Typography>
                                                    </Stack>
                                                    : <RemoveIcon></RemoveIcon>
                                            }
                                        </Stack>
                                    </StyledTableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            }

            <Stack mt={3} flexDirection={"row"} justifyContent={"end"}>
                <Pagination
                    onChange={TrendhandlePagination}
                    count={totalTrendPages}
                />
            </Stack>
        </>
    )
}

export default Trend