import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from "@mui/styles"
import Stack from '@mui/material/Stack'
import componentStyles from "/src/assets/theme/views/collection/details"
import { Box, Typography, Grid, IconButton, InputBase, Paper, Button, Skeleton } from "@mui/material"
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { Search } from "@mui/icons-material"
import CachedIcon from '@mui/icons-material/Cached'
import GridViewIcon from '@mui/icons-material/GridView'
import Toggleicon from "/src/assets/image/views/profile/collection/cardgroup.svg"
import Toggleiconcolor from "/src/assets/image/views/profile/collection/cardgroupicon.svg"
import { useCollectionItems } from "./state";
import NFTCard from "../../components/nft-card/NFTCard";
import { setAddCartBoxState } from '../../redux/actions/nfts/index';

const useStyles = makeStyles(componentStyles)

const Items = () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const params = useParams()
    const boxstate = useSelector(state => state.nfts.boxstate)
    const [largeView, setLargeView] = useState(true)
    const [nameQuery, setNameQuery] = useState('');
    const [pageSize, setPageSize] = useState(20)
    const walletData = useSelector(state => state.wallet)

    const { data, isSuccess, isLoading } = useCollectionItems(nameQuery, pageSize, params?.id ?? '');

    const handleSearch = (e) => {
        setNameQuery(e.target.value)
    }

    const handleLoadMore = () => {
        setPageSize((p) => p + 20);
    }

    const breakpoints = {
        // xs: 12,
        // sm: largeView ? 6 : 4,
        // md: largeView ? 4 : 3,
        lg: largeView ? 2.4 : 1.5
    }
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
    }, [])
    return (
        <>
            {/* card header */}
            <Stack direction={"row"} justifyContent={"space-between"} className={classes.header}>
                <Grid container spacing={2}>
                    <Grid item md={12}>
                        <Stack direction={"row"} spacing={4} alignItems={"center"} justifyContent={"center"}>
                            <Paper className={classes.searchform}>
                                <IconButton aria-label="menu">
                                    <Search className={classes.iconsearch} />
                                </IconButton>
                                <InputBase
                                    onChange={handleSearch}
                                    className={classes.searchinput}
                                    placeholder="Search by name"
                                />
                            </Paper>

                            <ToggleButtonGroup
                                value={largeView ? "large" : "small"}
                                exclusive
                                aria-label="Platform"
                                className={classes.toggleicongroup}
                            >
                                <ToggleButton value="large" onClick={() => setLargeView(true)}>
                                    <GridViewIcon className={largeView ? classes.toggleiconleft : classes.activeleft} />
                                </ToggleButton>
                                <ToggleButton value="small" onClick={() => setLargeView(false)}>
                                    {
                                        largeView ? <Box
                                            component="img"
                                            src={Toggleicon.src}
                                            className={classes.activeright}></Box> :
                                            <Box
                                                component="img"
                                                src={Toggleiconcolor.src}
                                                className={classes.toggleiconright}></Box>
                                    }
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Stack>
                    </Grid>
                    <Grid item lg={6} md={12} xs={12}>
                        <Stack direction={"row"} spacing={2} justifyContent={"center"}>

                        </Stack>
                    </Grid>
                </Grid>
            </Stack>
            <Stack direction={"row"} className={classes.filterdirection} gap={2}>
                <Stack direction={"row"} paddingLeft={12} gap={2} alignItems={"center"}>
                    <CachedIcon className={classes.cachedicon} />
                    <Typography className={classes.cachedicon}>{data?.pagination?.total} Items</Typography>
                </Stack>
            </Stack>
            {/* card header end */}
            <Stack className={classes.collectionhead}>
                <Grid container spacing={2} md={boxstate ? 10.5 : 12}>
                    {isSuccess && data?.nfts?.map((item) => (
                        <Grid item key={item._id} {...breakpoints}>
                            <NFTCard key={item._id} item={item} />
                        </Grid>
                    ))}

                    {isLoading && Array(pageSize).fill(0).map((_, index) => (
                        <Grid item key={index} >
                            <Skeleton
                                variant='rectangular'
                                width='100%'
                                height={330}
                            />
                        </Grid>
                    ))}
                </Grid>

                <Stack mt={3} flexDirection={"row"} justifyContent={"center"}>
                    <Button className={classes.uniongroup} onClick={handleLoadMore}>
                        <Typography>Load More</Typography>
                    </Button>
                </Stack>
            </Stack>
        </>
    )
}

export default Items