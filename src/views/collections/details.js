import React, { useEffect, useState } from "react"
// @mui/material components
import { makeStyles } from "@mui/styles"
import Grid from "@mui/material/Grid"
// core components
import Stack from '@mui/material/Stack'
import { Box, Divider, Tab, Typography } from "@mui/material"
import TabPanel from '@mui/lab/TabPanel'
import { TabContext, TabList } from "@mui/lab"

import { getCollectionById } from "../../redux/actions/main"
import { useParams } from "react-router-dom"

import { getCoinIcons } from "/src/utils/utility"

import Items from './items'
import Activity from './activity'

import trendStyles from "/src/assets/theme/views/main/trending"
import componentStyles from "/src/assets/theme/views/collection/details"
import NFTcheck from "/src/assets/image/views/profile/collection/NFTcheck.svg"
import RemoveIcon from '@mui/icons-material/Remove';
import Chat from "./chat";
import { useSelector } from "react-redux";
import { getRealPrice } from "../../utils/utility"

const useStyles = makeStyles(componentStyles)
const tStyles = makeStyles(trendStyles)

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

const CollectionDetails = () => {
    const classes = useStyles()
    const tclasses = tStyles()

    const params = useParams()
    const [collectionData, setCollectionData] = useState(null);
    const [activeTab, setActiveTab] = useState('1');

    const user = useSelector(state => state.user.user)

    const getCollectionDetailsInfo = async () => {
        if (!params.id) {
            return;
        }

        const collectionData = await getCollectionById(params.id);
        setCollectionData(collectionData);
    }


    useEffect(() => {
        getCollectionDetailsInfo()
    }, [params.id])

    return (
        <React.Fragment>
            <Grid item classes={{ root: classes.pageroot }} lg={12} >
                <Box component="img" className={classes.bannerbackgroundimg} style={{ textAlign: 'center' }} src={collectionData?.coverUrl} ></Box>
                <Box className={classes.bannericon} >
                    <Box className={classes.bannerbackground} >
                        <Box component="img" className={classes.ellipseImg} src={collectionData?.coverUrl} ></Box>
                    </Box>
                </Box>
            </Grid >
            {/* ////////////// */}
            <Grid item classes={{ root: classes.pagecontaner }} lg={12} >
                <Grid container spacing={2}>
                    <Grid item md={12}>
                        <Stack direction={"row"} sx={{ justifyContent: 'center', paddingTop: '30px' }}>
                            <Typography className={classes.extrasoho} >{collectionData?.name}</Typography>
                            <Box ml={1} component="img" src={NFTcheck.src} className={classes.nftcheck} ></Box>
                        </Stack>
                    </Grid>
                    {/* <Grid item lg={4} md={4} xs={12}>
                        <Stack spacing={1} direction={"row"}>
                            <Box onClick={e => { gotoSocialSite("twitter") }} className={classes.radiusbutton}><TwitterIcon /></Box>
                            <Box onClick={e => { gotoSocialSite("instagram") }} className={classes.radiusbutton}><InstagramIcon /></Box>
                            <Box onClick={e => { gotoSocialSite("discord") }} className={classes.radiusbutton}><Box component="img" src={Discord.src} className={classes.nftcheck} ></Box></Box>
                            <Box className={classes.radiusbutton}><MoreVertIcon /></Box>
                        </Stack>
                    </Grid> */}
                </Grid>

                <Grid container paddingTop={5}>
                    <Grid item lg={8} md={10} xs={12}>
                        <Typography className={classes.fontformat} >{collectionData?.description}</Typography>
                    </Grid>
                </Grid>
                <Grid container paddingBottom={5} paddingTop={5}>
                    <Grid item md={12}>
                        <Stack direction={"row"} spacing={4} md={12} sx={{ justifyContent: 'center' }}>
                            <Stack>
                                <Typography className={classes.itemprice}>Items</Typography>
                                <Typography className={classes.itemamount}>{collectionData?.tokenCount}</Typography>
                            </Stack>
                            <Stack>
                                <Typography className={classes.itemprice}>Owners</Typography>
                                <Typography className={classes.itemamount}>{collectionData?.owners}</Typography>
                            </Stack>
                            <Stack>
                                <Typography className={classes.totalprice}>Total</Typography>
                                <Stack direction={"row"} alignItems="center" justifyContent={"left"}>
                                    <Box className={classes.namebox} sx={{ height: "30px", width: "30px", backgroundColor: "unset !important", border: "none" }}>
                                        <Box component="img" src={getCoinIcons(collectionData?.blockchain)} className={tclasses.imgbox} sx={{ width: "100%", height: "100%" }} ></Box>
                                    </Box>
                                    <Typography className={classes.totalamount}>{convertFormatedDigit((collectionData?.volume || 0), 2, collectionData?.blockchain)}</Typography>
                                </Stack>
                            </Stack>
                            <Stack>
                                <Typography className={classes.totalprice}>Floor</Typography>
                                <Stack direction={"row"} alignItems="center" justifyContent={"left"}>
                                    {
                                        collectionData?.floor !== 0 ?
                                            <>
                                                <Box className={classes.namebox} sx={{ height: "30px", width: "30px", backgroundColor: "unset !important", border: "none" }}>
                                                    <Box component="img" src={getCoinIcons(collectionData?.blockchain)} className={tclasses.imgbox} sx={{ width: "100%", height: "100%" }} ></Box>
                                                </Box>
                                                <Typography className={classes.totalamount}>
                                                    {convertFormatedDigit((collectionData?.floor || 0), 2, collectionData?.blockchain)}
                                                </Typography>
                                            </>
                                            : <RemoveIcon></RemoveIcon>
                                    }
                                </Stack>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid >

            {/* //////////// */}
            <Grid item lg={12}>
                <TabContext value={activeTab}>
                    <Box className={classes.tablist} >
                        <Grid container>
                            <Grid item xl={12} lg={12} md={12} xs={12} className={classes.tablistitem}  >
                                <TabList onChange={(e, selectedTabIndex) => setActiveTab(selectedTabIndex)} aria-label="lab API tabs example" className={classes.tabindicator} >
                                    <Tab className={classes.tabitems} label="Items" value="1" />
                                    <Tab className={classes.tabitems} label="Community" value="2" />
                                    <Tab className={classes.tabitems} label="Activity" value="3" />
                                </TabList>
                            </Grid>
                        </Grid>
                        <Divider />
                    </Box>
                    <TabPanel value="1">
                        <Items />
                    </TabPanel>
                    <TabPanel value="2">
                        {user && <Chat />}
                        {!user && <Typography textAlign='center'>You are not logged in</Typography>}
                    </TabPanel>
                    <TabPanel value="3">
                        <Activity collection={collectionData} />
                    </TabPanel>
                </TabContext>
            </Grid>
        </React.Fragment>
    )
}

export default CollectionDetails