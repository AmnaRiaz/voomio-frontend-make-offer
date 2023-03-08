import React, { useEffect, useState } from "react"
// @mui/material components
import { makeStyles } from "@mui/styles"
import Grid from "@mui/material/Grid"
// core components
import Stack from '@mui/material/Stack'
import componentStyles from "../../assets/theme/views/profile/collection"
import {
    Box,
    Button,
    Divider,
    Menu,
    MenuItem,
    Tab,
    Typography
} from "@mui/material"
import TabPanel from '@mui/lab/TabPanel'
import { TabContext, TabList } from "@mui/lab"
import { useSelector } from "react-redux"

import AddIcon from '@mui/icons-material/Add'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import Collected from './collected'
import CreatedCmp from './created'
import Activity from './activity'
import Favorite from './favorite'

import BannerBackground from "/src/assets/image/views/profile/collection/bannerbackground.svg"

import { sliceLongString, timeFomat } from "/src/utils/utility"
import { useParams } from "react-router-dom"
import { getUserData } from "../../redux/actions/user"

const useStyles = makeStyles(componentStyles)

const Profile = () => {
    const classes = useStyles()
    const params = useParams()

    const userData = useSelector(state => state.user)
    const walletData = useSelector(state => state.wallet)
    const [profile, setProfile] = useState({
        _id: '',
        bio: '',
        country: '',
        dateOfBirth: '',
        displayName: '',
        firstName: '',
        lastName: '',
        gender: '',
        phone: '',
        profileUrl: '',
        website: '',
        wallets: '',
        favoriteNfts: [],
        followers: [],
        followings: [],
    })
    const [isOwner, setIsOwner] = useState(userData?.user?._id === params.id ? true : false)
    const [value, setValue] = useState('1')
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const init = async () => {
        const result = await getUserData(params.id)
        if (result) {
            setProfile(result.data)
        }
        setIsOwner(userData?.user?._id === params.id ? true : false)
    }

    useEffect(() => {
        async function fetchData() {
            await init()
        }
        fetchData()
    }, [])

    return (
        <React.Fragment>
            <Grid item classes={{ root: classes.pageroot }} lg={12} >
                <Box component="img" className={classes.bannerbackgroundimg} src={BannerBackground.src} ></Box>
            </Grid >

            <Grid item classes={{ root: classes.pagecontaner }} lg={12} >
                <Stack
                    direction={"row"}
                    justifyContent={"left"}
                    alignItems={"center"}
                    position={'absolute'}
                    style={{ transform: 'translateY(-50%)' }}
                >
                    <Box className={classes.bannericon} >
                        <Box className={classes.bannerbackground} >
                            <Box component="img" className={classes.ellipseImg} src={profile.profileUrl} ></Box>
                        </Box>
                    </Box>
                    <Box display={'flex'} flexDirection="column">
                        <Stack direction={"row"} >
                            <Grid container spacing={3} alignItems={"center"} >
                                <Grid marginRight={2}>
                                    <Stack>
                                        <Typography className={classes.extrasoho} >{`${profile.firstName || ''} ${profile.lastName || ''}`}</Typography>
                                        <Stack spacing={2} direction={"row"} alignItems={"center"}>
                                            <Typography className={classes.extrasohoemail} >{profile.displayName || 'Unnamed'}</Typography>
                                            {/* <Box className={classes.extrasohodate} >JOINED {timeFomat(profile.addedOn)}</Box> */}
                                        </Stack>
                                    </Stack>
                                </Grid>
                                <Grid>
                                    <Stack spacing={2.5} direction={"row"}>
                                        <Stack spacing={2} direction={"row"}>
                                            <Button variant="contained" className={classes.addressbutton}  >{sliceLongString(walletData.address, 5)}</Button>
                                            {
                                                isOwner ? null :
                                                    <Button variant="contained" startIcon={<AddIcon className={classes.addicon} />} className={classes.followbutton} >Follow</Button>
                                            }
                                        </Stack>
                                        <Stack spacing={2} direction={"row"} className={classes.displayicon}>
                                            {profile.email ? <Box className={classes.radiusbutton}><MailOutlineIcon /></Box> : null}
                                            {profile.twitter ? <Box className={classes.radiusbutton}><TwitterIcon /></Box> : null}
                                            {profile.instagram ? <Box className={classes.radiusbutton}><InstagramIcon /></Box> : null}
                                            {profile.facebook ? <Box className={classes.radiusbutton}><MoreVertIcon /></Box> : null}
                                        </Stack>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Stack>

                        <Stack direction={"row"} paddingTop={2}>
                            <Grid container spacing={2} className={classes.extrasohotext} direction={'column'}>
                                <Grid item>
                                    <Typography className={classes.fontformat}>{profile.bio}</Typography>
                                </Grid>
                                <Grid item className={classes.griditems}>
                                    <Stack direction={'row'}>
                                        <Typography className={classes.fontformat} marginRight={1} >Followers</Typography>
                                        <Typography className={classes.fontbold} >{profile.followers?.length}</Typography>
                                    </Stack>
                                    <Stack paddingLeft={5} direction={'row'}>
                                        <Typography className={classes.fontformat} marginRight={1} >Following</Typography>
                                        <Typography className={classes.fontbold} >{profile.followings?.length}</Typography>
                                    </Stack>

                                </Grid>
                            </Grid>
                        </Stack>
                    </Box>
                </Stack>
            </Grid >
            <Grid item lg={12} >
                {/* <Tabs value={value}> */}
                <TabContext value={value}>
                    <Box className={classes.tablist} >
                        <Grid container>
                            <Grid item xl={12} lg={12} md={12} xs={12} className={classes.tablistitem}  >
                                <TabList onChange={handleChange} aria-label="lab API tabs example" className={classes.tabindicator} >
                                    <Tab className={classes.tabitems} label="Collected" value="1" />
                                    <Tab className={classes.tabitems} label="Created" value="2" />
                                    <Tab className={classes.tabitems} label="Activity" value="3" />
                                    <Tab className={classes.tabitems} label="Favorited" value="4" />
                                    {/* <Stack direction={"row"} className={classes.moredetail} >
                                        <Button
                                            className={classes.tabitems}
                                            id="basic-button"
                                            aria-controls={open ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={handleClick}
                                            endIcon={<ExpandMoreIcon />}
                                        >
                                            More
                                        </Button>
                                    </Stack> */}
                                </TabList>
                            </Grid>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Offers made</MenuItem>
                                <MenuItem onClick={handleClose}>Offers received</MenuItem>
                                <MenuItem onClick={handleClose}>Active listings</MenuItem>
                                <MenuItem onClick={handleClose}>Inactive listings</MenuItem>
                                <MenuItem onClick={handleClose}>Hidden</MenuItem>
                            </Menu>
                        </Grid>
                        <Divider />
                    </Box>
                    <TabPanel value="1">
                        <Collected />
                    </TabPanel>
                    <TabPanel value="2">
                        <CreatedCmp />
                    </TabPanel>
                    <TabPanel value="3">
                        <Activity />
                    </TabPanel>
                    <TabPanel value="4">
                        <Favorite />
                    </TabPanel>
                </TabContext>
                {/* </Tabs> */}
            </Grid>

        </React.Fragment >
    )
}

export default Profile