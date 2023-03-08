import React, { useCallback, useEffect, useState } from "react"

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
import Loading from "../../../components/loading/Loading";

import {
    MenuItem,
    Paper,
    Select,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getalltopprice, getTrendingCollections } from "../../../redux/actions/main"

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

// const navigate = useNavigate()
// const classes = useStyles()
// const tclasses = tStyles()

class Trend extends React.Component {
    state = {
        loadingstate: false,
        index: 1,
        data: {},
        loadmore: false,
        scrollevent: true,
        select: 0,
        toppage: 2,
        totalTopPages: 1,
        priceone: [],
        priceseven: [],
        filters: {
            category: 'all',
            blockchain: 'all',
            name: ''
        },
        error: "",
        loading: false,
    }
    loadfirstdata = async (category, blockchain) => {
        this.setState({ loading: true })
        const data = await this.props.getData(1, 10, category, blockchain, this.state.filters.name)
        if (data?.collection?.length > 0) {
            this.setState({ data })
        } else {
            this.setState({ scrollevent: false, error: "No Collections" })
        }
        this.setState({ loading: false })
        this.props.fetchdata(data).then((price) => {
            if (price?.price_percents_one?.length && price?.price_percents_seven?.length) {
                this.setState({ priceone: [...this.state?.priceone, ...price?.price_percents_one], priceseven: [...this.state?.priceseven, ...price?.price_percents_seven] })
            }
        })
    }

    async componentDidMount() {
        await this.loadfirstdata("all", "all")
        window.addEventListener('scroll', this.listenToScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.listenToScroll)
    }

    listenToScroll = async () => {
        if (this.state.scrollevent) {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
            const scrolled = (winScroll + 350) / height
            if (scrolled >= 1 && !this.state.loadmore) {
                this.setState({ loading: true })
                await this.setState({ loadingstate: true, toppage: this.state.toppage + 1, scrollevent: false })

                const data = await this.props.getData(this.state.toppage, 10, this.state.filters.category, this.state.filters.blockchain, this.state.filters.name)

                this.props.fetchdata(data).then((price) => {
                    if (price?.price_percents_one?.length && price?.price_percents_seven?.length) {
                        this.setState({ priceone: [...this.state?.priceone, ...price?.price_percents_one], priceseven: [...this.state?.priceseven, ...price?.price_percents_seven] })
                    }
                })
                this.setState({ loading: false })
                if (data?.collection?.length > 0) {
                    this.setState({ loadingstate: false, scrollevent: true, data: { collection: [...this.state?.data?.collection, ...data.collection], pagination: data?.pagination } })
                }
                if (this.state.data.collection.length >= 90) {
                    this.setState({ loadmore: true })
                }
            }
        }
    }

    handleCategoryChange = async (e) => {
        this.setState({
            filters: { ...this.state.filters, category: e.target.value },
            loadingstate: false,
            loading: false,
            index: 1,
            data: {},
            loadmore: false,
            scrollevent: true,
            select: 0,
            toppage: 2,
            totalTopPages: 1,
            priceone: [],
            priceseven: []
        })
        await this.loadfirstdata(e.target.value, this.state.filters.blockchain)
    }

    setChainFilter = async (val) => {
        this.setState({
            filters: { ...this.state.filters, blockchain: val },
            loadingstate: false,
            loading: false,
            index: 1,
            data: {},
            loadmore: false,
            scrollevent: true,
            select: 0,
            toppage: 2,
            totalTopPages: 1,
            priceone: [],
            priceseven: []
        })

        await this.loadfirstdata(this.state.filters.category, val)
    }

    TypeItem = (item) => {
        if (item > 0) {
            return (<Box className={this.props.classes.percent}>
                <Typography >{item?.toFixed(2)}%</Typography>
            </Box>)
        } else {
            return (<Box className={this.props.classes.mpercent}>
                <Typography >{item?.toFixed(2)}%</Typography>
            </Box>)
        }
    }

    gotoCollectionDetails = (key) => {
        if (this.state.data && this.state.data.collection.length > 0) {
            this.props.navigate("/collection/" + this.state.data?.collection[key][0]?._id)
        }
    }

    TophandlePagination = (_, pageNum) => {
        this.setState({ toppage: pageNum })
    }
    // componentDidMount() {
    //     if (this.state?.data) {
    //         this.setState({ totalTopPages: Math.ceil(this.state?.data?.pagination?.total / this.state?.data?.pagination?.items) })
    //     }
    // }
    loadmoredata = async () => {
        this.setState({ loading: true })
        await this.setState({ toppage: this.state.toppage + 1, scrollevent: false })

        const data = await this.props.getData(this.state.toppage, 10, this.state.filters.category, this.state.filters.blockchain, this.state.filters.name)

        this.setState({ loading: false })
        this.props.fetchdata(data).then((price) => {
            this.setState({ priceone: [...this.state?.priceone, ...price?.price_percents_one], priceseven: [...this.state?.priceseven, ...price?.price_percents_seven] })

        })

        this.setState({ scrollevent: true, data: { collection: [...this.state?.data?.collection, ...data.collection], pagination: data?.pagination } })
    }


    render() {
        return (
            <>
                {this.state.loading && <Loading sx={{ p: 4 }} />}
                {!this.state.loading &&
                    <>
                        <Stack direction={"row"} gap={2} paddingTop={3} className={this.props.classes.pasttime}>
                            <Select
                                value={this.state.filters.category}
                                onChange={this.handleCategoryChange}
                                displayEmpty
                                className={this.props.classes.nativeselect}
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
                                <Button className={this.props.classes.chainsearchbtn} onClick={() => this.setChainFilter("all")}>All Chains</Button>
                                <Button className={this.props.classes.chainsearchbtn1} onClick={() => this.setChainFilter("ethereum")}>ETH</Button>
                                <Button className={this.props.classes.chainsearchbtn1} onClick={() => this.setChainFilter("solana")}>SOL</Button>
                                <Button className={this.props.classes.chainsearchbtn1} onClick={() => this.setChainFilter("binance")}>BINANCE</Button>
                                <Button className={this.props.classes.chainsearchbtn1} onClick={() => this.setChainFilter("polygon")}>POLYGON</Button>
                                <Button className={this.props.classes.chainsearchbtn2} onClick={() => this.setChainFilter("cardano")}>CARDANO</Button>
                            </Box>
                        </Stack>
                        {this.state?.data?.collection?.length <= 0 && Array(10).fill(0).map((_, index) => (
                            <Grid item key={index} lg={3} md={4} sm={6} xs={12}>
                                <Skeleton
                                    variant='rectangular'
                                    width='100%'
                                    height={100}
                                />
                            </Grid>
                        ))}
                        {
                            this.state.error !== "" ?
                                <Box sx={{ width: "100%", height: "80px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <Typography variant="h3" sx={{ color: "red", fontWeight: "800" }}>{this.state.error}</Typography>
                                </Box> :
                                this.state?.data?.collection?.length &&
                                <TableContainer component={Paper} className={this.props.classes.table}>
                                    <Table sx={{ minWidth: 650 }} aria-label="caption table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell component="th" scope="row" className={this.props.classes.thead} sx={{ width: "40% !important" }}>Collection</TableCell>
                                                <TableCell align="right" className={this.props.classes.thead}>Volume</TableCell>
                                                <TableCell align="center" className={this.props.classes.thead}>24hr</TableCell>
                                                <TableCell align="center" className={this.props.classes.thead}>7d</TableCell>
                                                <TableCell align="right" className={this.props.classes.thead}>Floor price</TableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {
                                                this.state.data?.collection?.map((row, index) => (
                                                    <StyledTableRow key={index} onClick={() => this.gotoCollectionDetails(index)} sx={{ cursor: "pointer", "&:hover": { background: "#ddd !important" } }}>
                                                        <TableCell component="th" scope="row" className={this.props.classes.tdbox} sx={{ columnGap: "20px" }}>
                                                            {/* <Box sx={{ width: "10px" }}>
                                                <Typography variant="h2" sx={{ color: "#707a83 !important", fontWeight: "600 !important" }}>{index + 1}</Typography>
                                            </Box> */}
                                                            <Box className={this.props.classes.namebox}>
                                                                <span className={this.props.classes.spanbox}>
                                                                    <Box className={this.props.classes.imgbox} component="img" src={row[0]?.coverUrl}>
                                                                    </Box>
                                                                </span>
                                                            </Box>
                                                            <Box sx={{ display: "flex" }}>
                                                                <Typography className={this.props.classes.name}>{row[0]?.name}</Typography>&nbsp;&nbsp;
                                                                <Box component='img' src={jem.src}>
                                                                </Box>
                                                            </Box>

                                                        </TableCell>
                                                        <TableCell align="center" className={this.props.classes.ether}>
                                                            <Box sx={{ display: "flex", justifyContent: "right", alignItems: "center" }}>
                                                                <Box className={this.props.classes.namebox} sx={{ height: "100%", width: "30px", backgroundColor: "unset !important", border: "none" }}>
                                                                    {
                                                                        row[0]?.blockchain === "cardano" ? <Box component="img" className={this.props.tclasses.imgbox} src={cardano.src}></Box> : row[0]?.blockchain === "ethereum" ? <Box component="img" className={this.props.tclasses.imgbox} src={ether.src}></Box> : row[0]?.blockchain === "binance" ? <Box component="img" className={this.props.tclasses.imgbox} src={binance.src}></Box> : row[0]?.blockchain === "polygon" ? <Box component="img" className={this.props.tclasses.imgbox} src={polygon.src}></Box> : row[0]?.blockchain === "solana" ? <Box component="img" className={this.props.tclasses.imgbox} src={solana.src}></Box> : ""
                                                                    }
                                                                </Box>
                                                                <Typography className={this.props.classes.volletter}>
                                                                    &nbsp;&nbsp;{convertFormatedDigit((row[0]?.volume || 0), 2, row[0]?.blockchain)}
                                                                </Typography>
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell align="center" className={this.props.classes.tdbox1}>
                                                            {
                                                                this.state?.priceone[index] !== undefined && this.state?.priceone[index] !== 0 ? this.TypeItem(this.state?.priceone[index])
                                                                    : <Stack direction="row" alignItems="center" justifyContent="center">
                                                                        <RemoveIcon></RemoveIcon>
                                                                    </Stack>
                                                            }
                                                        </TableCell>
                                                        <TableCell align="center" className={this.props.classes.tdbox1}>
                                                            {
                                                                this.state?.priceseven[index] !== undefined && this.state?.priceseven[index] !== 0 ?
                                                                    this.TypeItem(this.state?.priceseven[index])
                                                                    : <Stack direction="row" alignItems="center" justifyContent="center">
                                                                        <RemoveIcon></RemoveIcon>
                                                                    </Stack>
                                                            }
                                                        </TableCell>

                                                        <TableCell align="center" className={this.props.classes.ether}>
                                                            <Box sx={{ display: "flex", justifyContent: "right", alignItems: "center" }}>
                                                                {
                                                                    row[0]?.floor !== 0 ?
                                                                        <Stack direction="row" alignItems="center" justifyContent="right">
                                                                            <Box className={this.props.classes.namebox} sx={{ height: "30px", width: "30px", backgroundColor: "unset !important", border: "none" }}>
                                                                                {
                                                                                    row[0]?.blockchain === "cardano" ? <Box component="img" className={this.props.tclasses.imgbox} sx={{ width: "100%" }} src={cardano.src}></Box> : row[0]?.blockchain === "ethereum" ? <Box component="img" className={this.props.tclasses.imgbox} sx={{ width: "100%" }} src={ether.src}></Box> : row[0]?.blockchain === "binance" ? <Box component="img" className={this.props.tclasses.imgbox} sx={{ width: "100%" }} src={binance.src}></Box> : row[0]?.blockchain === "polygon" ? <Box component="img" className={this.props.tclasses.imgbox} sx={{ width: "100%" }} src={polygon.src}></Box> : row[0]?.blockchain === "solana" ? <Box component="img" className={this.props.tclasses.imgbox} sx={{ width: "100%" }} src={solana.src}></Box> : ""
                                                                                }
                                                                            </Box>
                                                                            <Typography className={this.props.classes.volletter}>&nbsp;&nbsp;{convertFormatedDigit((row[0]?.floor || 0), 2, row[0]?.blockchain)}</Typography>
                                                                        </Stack>
                                                                        : <RemoveIcon></RemoveIcon>
                                                                }
                                                            </Box>
                                                        </TableCell>
                                                    </StyledTableRow>
                                                ))
                                            }
                                            {/* </InfiniteScroll> */}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                        }
                        {
                            this.state.loadmore &&
                            <Stack direction={"row"} justifyContent="center" alignItems={"center"}>
                                <Button sx={styles.selectButton2} onClick={this.loadmoredata}>Load More</Button>
                            </Stack>
                        }
                    </>}
            </>

        )
    }
}


const TrendWrap = (props) => {
    const classes = useStyles()
    const tclasses = tStyles()
    const navigate = useNavigate()
    // return getAllTopCollections(toppage, 100, category, blockchain, name)
    const fetchdata = async (data) => {
        let index = []
        if (data && data?.collection?.length > 0) {
            data.collection.map((item, key) => {
                index.push(item[0]?._id)
            })
            const result = await getalltopprice(index)
            return result
        }
    }

    const getData = async (toppage, size = 100, category, blockchain, name) => {
        const result = await getTrendingCollections({
            toppage,
            size: size,
            query: {
                categories: category,
                blockchain: blockchain,
                nameQuery: name,
            },
        })
        return result;
    }

    return <Trend {...props} navigate={navigate} tclasses={tclasses} classes={classes} getData={getData} fetchdata={fetchdata} />;
}


export default TrendWrap;