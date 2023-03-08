import React, { Fragment, useEffect } from "react"
// @mui/material components
import { makeStyles } from "@mui/styles"
import Grid from "@mui/material/Grid"
import { Box, Typography } from "@mui/material"
import componentStyles from "/src/assets/theme/views/main/alpha"
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Swiper from 'react-id-swiper'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import Media from "react-media"
import AOS from "aos"
import "swiper/swiper.scss"

import alpha from "/src/assets/image/component/main/home/alpha/image1.svg"
import alpha1 from "/src/assets/image/component/main/home/alpha/image2.svg"
import alpha2 from "/src/assets/image/component/main/home/alpha/image3.svg"
// core components
const useStyles = makeStyles(componentStyles)

const Slideritem = ({ item }) => {
    const classes = useStyles()

    return <Card classes={{ root: classes.card }} >
        <CardMedia
            component="img"
            height="100%"
            image={item.src}
            alt="green iguana"
        />
        <CardContent>
            <Typography classes={{ root: classes.title }} gutterBottom variant="h3" component="div">
                These upcoming NFTS will 10x!
            </Typography>
            <Typography classes={{ root: classes.title }} gutterBottom variant="h4" component="div">
                CryptoGuruTV
            </Typography>
            <Typography classes={{ root: classes.title1 }} gutterBottom variant="h5" component="div">
                1M views - 8 hours ago
            </Typography>
        </CardContent>
    </Card>
}

const Alpha = () => {
    const cardArr = [alpha1, alpha2, alpha, alpha1, alpha1, alpha1]
    const classes = useStyles()

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

    // return focus to the button when we transitioned from !open -> open
    //useEffect
    useEffect(() => {
        AOS.init()
        AOS.refresh()
    }, [])

    return (
        <Grid container classes={{ root: classes.trend }}>
            <Grid item lg={12} xs={12} >
                <Grid container classes={{ root: classes.select }}>
                    <Grid item lg={6}>
                        <Typography variant="h1">Alpha</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item lg={12} xs={12} md={12} className={classes.items} padding={{ sm: "3rem", md: "1rem", lg: "1rem" }}>
                <Grid container
                    data-aos="fade-left"
                    data-aos-offset="300"
                    data-aos-easing="ease-in-sine"
                    width={'100%'}

                >
                    <Media queries={{
                        small: "(max-width: 768px)",
                        medium: "(min-width: 769px) and (max-width: 1199px)",
                        large: "(min-width: 1200px)"
                    }}>
                        {matches => (
                            <Fragment>
                                {matches.small &&
                                    <>
                                        <Swiper {...getparams(1)}>
                                            {
                                                cardArr.map((item, index) => (
                                                    <Grid md={2} lg={2} xs={12} item className={classes.trending} key={index}>
                                                        <Slideritem item={item} />
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
                                                cardArr.map((item, index) => (
                                                    <Grid item className={classes.trending} key={index}>
                                                        <Slideritem item={item} />
                                                    </Grid>
                                                ))
                                            }
                                        </Swiper>
                                    </>
                                }
                                {matches.large &&
                                    <>
                                        <Swiper {...getparams(5)}>
                                            {
                                                cardArr.map((item, index) => (
                                                    <Grid item className={classes.trending} key={index}>
                                                        <Slideritem item={item} />
                                                    </Grid>
                                                ))
                                            }
                                        </Swiper>
                                    </>
                                }
                            </Fragment>
                        )}
                    </Media>
                </Grid>
            </Grid>
        </Grid >
    )
}

export default Alpha