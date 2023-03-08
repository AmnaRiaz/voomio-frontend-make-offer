import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setslidestate, setAddCartBoxState } from "../../redux/actions/nfts"
// @mui/material components
import { makeStyles } from '@mui/styles'
import {
    Box,
    Grid,
    Pagination,
    Skeleton,
    Stack,
    Typography
} from "@mui/material"

// core components
import colStyles from "../../assets/theme/views/collection/list";
import componentStyles from "../../assets/theme/views/nft/list"

import SideBar from "./sidebar"
import NFTCard from "../../components/nft-card/NFTCard";
import { useAllNFTs } from "../../redux/actions/main";
import Loading from "../../components/loading/Loading";

const useStyles = makeStyles(componentStyles)
const cStyles = makeStyles(colStyles)

const NftList = () => {
    const classes = useStyles()
    const cclasses = cStyles()
    const dispatch = useDispatch();

    const [currentPNumber, setCurrentPNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const walletData = useSelector(state => state.wallet)
    const [query, setQuery] = useState({
        name: '',
        price: { min: "", max: "" },
        currency: "",
        isForSale: false
    })
    const [nfts, setNFTs] = useState([])
    const [loading, setLoading] = useState(false)

    const [filter, setFilter] = useState({});

    const onChangePagination = (_, value) => {
        setCurrentPNumber(value)
    }
    const [isQuery, setIsQuery] = useState(false);
    // const onChangeFilterPagination = (_, value) => {
    //     setFilterCurrentPNumber(value)
    // }

    useEffect(() => {
        if (!isQuery) {
            const fetchnfts = async () => {
                setLoading(true)
                const result = await useAllNFTs(
                    {
                        page: currentPNumber,
                        size: 25,
                        query: {
                            name: "",
                            price: { min: "", max: "" },
                            currency: "",
                            networks: filter.networks,
                            categories: filter.categories
                        }
                    })
                setLoading(false)
                if (result?.nfts) {
                    setNFTs(result)
                }
            }
            fetchnfts()
        }
    }, [filter, currentPNumber])
    useEffect(() => {
        const fetchnfts = async () => {
            setLoading(true)
            const result = await useAllNFTs(
                {
                    page: currentPNumber,
                    size: 25,
                    query: {
                        name: query.name,
                        price: query.price,
                        currency: query.currency,
                    }
                })
            setLoading(false)
            if (result?.nfts) {
                setNFTs(result)
            }

        }
        if (isQuery) {
            fetchnfts();
        }
    }, [query, currentPNumber])

    useEffect(() => {
        if (nfts) {
            setTotalPages(Math.ceil(nfts?.pagination?.total / nfts?.pagination?.items))
        }
    }, [nfts])
    const [size, setsize] = useState(9);
    const boxstate = useSelector(state => state.nfts.boxstate)
    const slidestate = useSelector(state => state.nfts.slidestate);
    useEffect(() => {
        if (boxstate && slidestate) {
            setsize(8.7)
        } else if (boxstate) {
            setsize(9.7)
        } else if (slidestate) {
            setsize(10.7)
        } else
            setsize(11.7)

    }, [slidestate, boxstate])

    useEffect(() => {
        let jpgdata = JSON.parse(localStorage.getItem('jpgcartItems') || '[]');
        let opendata = JSON.parse(localStorage.getItem('opencartItems') || '[]');
        let soldata = JSON.parse(localStorage.getItem('solcartItems') || '[]');
        let polydata = JSON.parse(localStorage.getItem('polycartItems') || '[]');
        if (walletData?.wallet === "Nami") {
            if (jpgdata.length) {
                dispatch(setAddCartBoxState({
                    boxstate: true
                }))
            }
        } else if (walletData?.wallet === "Metamask") {
            if (opendata.length || polydata.length) {
                dispatch(setAddCartBoxState({
                    boxstate: true
                }))
            }
        } else if (walletData?.wallet === "Phantom") {
            if (soldata.length) {
                dispatch(setAddCartBoxState({
                    boxstate: true
                }))
            }
        }
        dispatch(setslidestate({
            slidestate: true
        }))
    }, [])
    return (
        <Grid container classes={{ root: classes.pageroot }}>
            <Grid item md={slidestate ? 1.3 : 0.3}>
                <SideBar setFilter={setFilter} setQuery={setQuery} setCurrentPNumber={setCurrentPNumber} setIsQuery={setIsQuery} />
            </Grid>
            {loading && <Loading sx={{ p: 4 }} />}
            {
                !loading &&
                <Grid item md={size}>
                    <Grid className={classes.nftlist}>
                        <Box className={classes.introCard} sx={{ padding: "0 50px" }}>
                            <Box sx={{
                                paddingBottom: "50px",
                                display: "flex",
                                alignItems: "baseline",
                                columnGap: "50px"
                            }}>
                                <Typography className={cclasses.exploretitle}>Explore NFTs</Typography>
                                <Typography className={cclasses.total}>{nfts?.pagination?.total} results</Typography>
                            </Box>
                            <Box container spacing={2} className={classes.nftGrid}>
                                {loading && Array(25).fill(0).map((_, index) => (
                                    <Grid item key={index} lg={3} md={4} sm={6} xs={12}>
                                        <Skeleton
                                            variant='rectangular'
                                            width='100%'
                                            height={330}
                                        />
                                    </Grid>
                                ))}

                                {!loading &&
                                    nfts?.nfts?.map((item) => {
                                        return (
                                            <NFTCard
                                                key={item._id}
                                                item={item}
                                            />
                                        )
                                    })
                                }
                            </Box>
                        </Box>
                    </Grid>
                    <Stack mt={3} flexDirection={"row"} justifyContent={"end"}>
                        <Pagination
                            onChange={onChangePagination}
                            count={totalPages} />
                    </Stack>
                </Grid>
            }
        </Grid>
    )
}

export default NftList