import React, { Fragment, useEffect } from "react"
import { makeStyles } from "@mui/styles"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"

import Typography from "@mui/material/Typography"

import componentStyles from "/src/assets/theme/views/main/tcreator"
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Swiper from 'react-id-swiper'
import StarPurple500Icon from '@mui/icons-material/StarPurple500';
import StarRateIcon from '@mui/icons-material/StarRate';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import Media from "react-media"
import AOS from "aos"
import "swiper/swiper.scss"

import { useTopCreators } from "./state";
import { sliceLongString } from "../../../utils/utility"
import { Stack } from "@mui/material"
import { toast } from "react-toastify"
import { addFollower, removeFollower } from "../../../redux/actions/user"
import { useSelector } from "react-redux"

const useStyles = makeStyles(componentStyles)

const Slideritem = (props) => {
    const classes = useStyles()
    const userData = useSelector(state => state.user)
    const [followState, setFollowState] = React.useState(false)
    const copyText = async (index) => {
        await navigator.clipboard.writeText(window.document.querySelector(`#${"walletid"}${index}`).dataset.wallet)
        toast.success("Copy Text!")
    }

    const setFollow = async (index) => {
        const addFollow = await addFollower({ id: props.item._id })
        if (addFollow.state) {
            setFollowState(true)
            toast.success("Followed successfully.")
        } else {
            setFollowState(false)
        }
    }
    const setUnFollow = async (index) => {
        const addFollow = await removeFollower({ id: props.item._id })
        if (addFollow.state) {
            setFollowState(false)
            toast.success("Unfollowed successfully.")
        } else {
            setFollowState(true)
        }
    }

    useEffect(() => {
        if (userData && userData.user) {
            if (props.item.followersid && props.item.followersid.indexOf(userData.user._id) > -1) {
                setFollowState(true)
            }
        }
    }, [userData])

    return <Card className={classes.card}>
        <Box className={classes.cardimg}>
            <CardMedia
                component="img"
                height="200"
                image={props.item.profileUrl}
                alt="green iguana"
            />
        </Box>
        <Stack className={classes.cardbtn} justifyContent="center" alignItems="center">
            <Typography variant="h2" fontWeight={"bold"} whiteSpace="nowrap">{props.item.displayName}</Typography>
        </Stack>
        {/* <Box className={classes.cardbtn}>
            <Button >@gordongonner</Button>
        </Box> */}
        <CardContent className={classes.tcreatorcontent}>
            <Box className={classes.list}>
                <Box className={classes.clist}>
                    <Typography variant="h2" fontWeight={"bold"} textAlign="center">{props.item.nftCreated}</Typography>
                    <Typography variant="h5" textAlign="center">Created</Typography>
                </Box>
                <Box className={classes.clist}>
                    <Typography variant="h2" fontWeight={"bold"} textAlign="center">{props.item.volume}</Typography>
                    <Typography variant="h5" textAlign="center">Volume</Typography>
                </Box>
                <Box className={classes.clist}>
                    <Typography variant="h2" fontWeight={"bold"} textAlign="center">{props.item.followers}</Typography>
                    <Typography variant="h5" textAlign="center">Followers</Typography>
                </Box>
            </Box>
            <Box className={classes.plusbtn}>
                {
                    !followState ? <Button onClick={() => setFollow(props.index)}><StarPurple500Icon className={classes.plusico} />Follow</Button> : <Button onClick={() => setUnFollow(props.index)}><StarRateIcon className={classes.plusico} />UnFollow</Button>
                }
            </Box>
            <Box className={classes.cryptobtn}>
                <Button onClick={() => copyText(props.index)}>
                    <Typography id={"walletid" + props.index} data-wallet={props.item.wallets[0].address}>
                        {sliceLongString(props.item.wallets[0].address, 5)}
                    </Typography>
                </Button>
            </Box>
        </CardContent>
    </Card>
}

const Tcreators = () => {
    const classes = useStyles()

    const { data, isSuccess } = useTopCreators();

    const getparams = (index) => {
        return {
            slidesPerView: index,
            spaceBetween: 10,
            slidesPerGroup: index,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            renderPrevButton: () => <Box className="swiper-button-prev"><ArrowForwardIosIcon /></Box>,
            renderNextButton: () => <Box className="swiper-button-next"><ArrowBackIosIcon /></Box>
        }
    }

    //useEffect
    useEffect(() => {
        AOS.init()
        AOS.refresh()
    }, [])

    return (
        <Grid container className={classes.tcreator}>
            <Grid item lg={12} paddingLeft="8%" paddingRight="8%">
                <Grid container>
                    <Typography variant="h1">Top Creators</Typography>
                </Grid>
            </Grid>
            <Grid
                item lg={12} xs={12} md={12}
                className={classes.items}
                paddingLeft="8%"
                paddingRight="8%"
                paddingTop={{ sm: "3rem", md: "1rem", lg: "1rem" }}
                paddingBottom={{ sm: "3rem", md: "1rem", lg: "1rem" }}
            >
                <Grid container
                    data-aos="fade-left"
                    data-aos-offset="300"
                    data-aos-easing="ease-in-sine"
                    width={'100%'}
                >
                    {isSuccess && (
                        <Media queries={{
                            small: "(max-width: 768px)",
                            medium: "(min-width: 769px) and (max-width: 1199px)",
                            large: "(min-width: 1200px)"
                        }}>
                            {matches => (
                                <Fragment>
                                    {matches.small &&
                                        <>
                                            <Swiper {...getparams(1)} >
                                                {
                                                    data.map((item, index) => (
                                                        <Grid item className={classes.trending} key={index}>
                                                            <Slideritem item={item} index={index} />
                                                        </Grid>
                                                    ))
                                                }
                                            </Swiper>
                                        </>
                                    }
                                    {matches.medium &&
                                        <>
                                            <Swiper {...getparams(2)}>
                                                {
                                                    data.map((item, index) => (
                                                        <Grid item className={classes.trending} key={index}>
                                                            <Slideritem item={item} index={index} />
                                                        </Grid>
                                                    ))
                                                }
                                            </Swiper>
                                        </>
                                    }
                                    {matches.large &&
                                        <>
                                            <Swiper {...getparams(4)}>
                                                {
                                                    data.map((item, index) => (
                                                        <Grid item className={classes.trending} key={index}>
                                                            <Slideritem item={item} index={index} />
                                                        </Grid>
                                                    ))
                                                }
                                            </Swiper>
                                        </>
                                    }
                                </Fragment>
                            )}
                        </Media>
                    )}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Tcreators

