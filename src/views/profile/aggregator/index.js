import React, { useEffect, useState } from "react"
// @mui/material components
import { makeStyles } from "@mui/styles"
import Grid from "@mui/material/Grid"
// core components
import Stack from '@mui/material/Stack'
import componentStyles from "/src/assets/theme/views/profile/aggregator"
import { Box, Button, Divider, Pagination, Tab, Typography } from "@mui/material"
import TabPanel from '@mui/lab/TabPanel'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'

import Collection from './items'
import Community from './community'
import Activity from './../activity'
import { TabContext, TabList } from "@mui/lab"
import { useDispatch, useSelector } from "react-redux"
import { getAllNfts } from "../../../redux/actions/main/index"
import { useParams } from "react-router-dom"
import { socialBaseUrls, getCoinIcons } from "/src/utils/utility"

import BannerBackground from "/src/assets/image/views/profile/explore/bannerbackground.svg"
import Ellipse from "/src/assets/image/views/profile/collection/ellipse.svg"
import NFTcheck from "/src/assets/image/views/profile/collection/NFTcheck.svg"
import Ethereum from "/src/assets/image/views/profile/collection/etherum.svg"
import Discord from "/src/assets/image/views/profile/explore/discord.svg"
import Chat from "./chat";


const useStyles = makeStyles(componentStyles)
const Profileaggregator = () => {
    const classes = useStyles()
    const params = useParams()
    const dispatch = useDispatch()

    const [value, setValue] = React.useState('1')
    const [collectionData, setCollectionData] = useState({
        blockchain: ""
    })
    const [totalNumbers, setTotalNumbers] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const gotoSocialSite = (type) => {
        if (collectionData.socials[type] !== "") {
            window.open(socialBaseUrls[type] + collectionData.socials[type])
        }
    }

    const fetchData = async () => {
        if (!params.id) {
            return;
        }
        const request = {
            collectionId: params?.id || '',
        }
        const result = await getAllNfts(request)
        if (result) {
            setTotalNumbers(parseInt(result.pagination.total / result.pagination.items) + 1)
            setCollectionData(result.nfts)
        }
    }

    useEffect(() => {
        fetchData()
    }, [params.id])

    return (
        <React.Fragment>
            <Grid item classes={{ root: classes.pageroot }} lg={12} >
                <Box component="img" className={classes.bannerbackgroundimg} src={collectionData ? collectionData.coverUrl : BannerBackground.src} ></Box>
                <Box className={classes.bannericon} >
                    <Box className={classes.bannerbackground} >
                        <Box component="img" className={classes.ellipseImg} src={Ellipse.src} ></Box>
                    </Box>
                </Box>
            </Grid >

            <Grid item classes={{ root: classes.pagecontaner }} lg={12} >
                <Grid container spacing={2}>
                    <Grid item lg={8} md={8} xs={12}>
                        <Stack direction={"row"} alignItems={"center"}>
                            <Typography className={classes.extrasoho} >{collectionData.name}</Typography>
                            <Box ml={1} component="img" src={NFTcheck.src} className={classes.nftcheck} ></Box>
                        </Stack>
                    </Grid>
                    <Grid item lg={4} md={4} xs={12}>
                        <Stack spacing={1} direction={"row"}>
                            <Box onClick={e => { gotoSocialSite("twitter") }} className={classes.radiusbutton}><TwitterIcon /></Box>
                            <Box onClick={e => { gotoSocialSite("instagram") }} className={classes.radiusbutton}><InstagramIcon /></Box>
                            <Box onClick={e => { gotoSocialSite("discord") }} className={classes.radiusbutton}><Box component="img" src={Discord.src} className={classes.nftcheck} ></Box></Box>
                            {/* <Box className={classes.radiusbutton}><MoreVertIcon /></Box> */}
                        </Stack>
                    </Grid>
                </Grid>

                <Grid container paddingTop={5}>
                    <Grid item lg={8} md={10} xs={12}>
                        <Typography className={classes.fontformat} >{collectionData.description}</Typography>
                    </Grid>
                </Grid>
                <Grid container paddingBottom={5} paddingTop={5}>
                    <Grid item lg={5} md={10} xs={12}>
                        <Stack direction={"row"} spacing={4}>
                            <Stack>
                                <Typography className={classes.itemprice}>Items</Typography>
                                <Typography className={classes.itemamount}>{totalNumbers}</Typography>
                            </Stack>
                            <Stack>
                                <Typography className={classes.itemprice}>Owners</Typography>
                                <Typography className={classes.itemamount}>6.3K</Typography>
                            </Stack>
                            <Stack>
                                <Typography className={classes.totalprice}>Total</Typography>
                                <Stack direction={"row"}>
                                    <Box component="img" src={getCoinIcons(collectionData.blockchain)} className={classes.nftcheck} ></Box>
                                    <Typography className={classes.totalamount}>{collectionData.sumOfNftPrice}</Typography>
                                </Stack>
                            </Stack>
                            <Stack>
                                <Typography className={classes.totalprice}>Best Offer</Typography>
                                <Stack direction={"row"}>
                                    <Box component="img" src={getCoinIcons(collectionData.blockchain)} className={classes.nftcheck} ></Box>
                                    <Typography className={classes.totalamount}>87</Typography>
                                </Stack>
                            </Stack>
                            {/* <Stack>
                                <Typography className={classes.totalprice}>Floor</Typography>
                                <Stack direction={"row"}>
                                    <Box component="img" src={Ethereum.src} className={classes.nftcheck} ></Box>
                                    <Typography className={classes.totalamount}>88</Typography>
                                </Stack>
                            </Stack> */}
                        </Stack>
                    </Grid>
                </Grid>
            </Grid >
            <Grid item lg={12} >
                {/* <Tabs value={value}> */}
                <TabContext value={value}>
                    <Box className={classes.tablist} >
                        <Grid container>
                            <Grid item xl={12} lg={12} md={12} xs={12} className={classes.tablistitem}  >
                                <TabList onChange={handleChange} aria-label="lab API tabs example" className={classes.tabindicator} >
                                    <Tab className={classes.tabitems} label="Collection" value="1" />
                                    <Tab className={classes.tabitems} label="Community" value="2" />
                                    <Tab className={classes.tabitems} label="Activity" value="3" />
                                </TabList>
                            </Grid>
                        </Grid>
                        <Divider />
                    </Box>
                    <TabPanel value="1">
                        <Collection />
                    </TabPanel>
                    <TabPanel value="2">
                        <Chat />
                    </TabPanel>
                    <TabPanel value="3">
                        <Activity />
                    </TabPanel>
                </TabContext>
                {/* </Tabs> */}
            </Grid>

        </React.Fragment >
    )
}

export default Profileaggregator