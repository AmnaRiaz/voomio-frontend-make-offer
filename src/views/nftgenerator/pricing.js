import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
// @material-ui/core components
// core components
import {
    Box,
    Chip,
    Grid,
    Button,
    Container,
    Typography
} from "@mui/material"
import { Check } from "@mui/icons-material"
import { makeStyles } from '@mui/styles'
import PricingFooterItemIcon1 from "/src/assets/image/component/nftGenerator/pricingFooterItemIcon1.svg"
import PricingFooterItemIcon2 from "/src/assets/image/component/nftGenerator/pricingFooterItemIcon2.svg"
import componentStyles from "/src/assets/theme/views/nftgenerator/pricing"
import { useDispatch, useSelector } from "react-redux"
import { updateUserData } from "../../redux/actions/user"
const useStyles = makeStyles(componentStyles)

const pricingList = [
    { key: 2, badge: "A GREAT DEAL", price: "$50", during: "/mo", selected: false, support: "Billed biannualy ($300)" },
    { key: 3, badge: "POPULAR", price: "$75", during: "/mo", selected: false, support: "This is the best plan." },
    { key: 4, badge: "A GREAT DEAL", price: "$500", during: "/yr", selected: false, support: "Annual payments of $500." }
]

const PricingCmp = () => {
    const navigate = useNavigate()
    const userData = useSelector(state => state.user)
    const classes = useStyles()
    const dispatch = useDispatch();

    const [pricing, setPricing] = useState(userData?.user?.memberShip)

    const handleSubscription = (key) => {
        setPricing(key)
    }

    useEffect(() => {
        console.log(pricing)
        if (pricing !== userData?.user?.memberShip) {
            dispatch(updateUserData({
                memberShip: pricing
            }))
        }
    }, [pricing])

    return (
        <Container maxWidth="xl" className={classes.container}>
            <Box className={classes.header}>
                <Typography variant="h1" component="h1">NFT Generator</Typography >
            </Box>
            <Box className={classes.content}>
                <Box className={classes.contentHeader}>
                    <Typography variant="h2" component="h2">Pricing</Typography>
                    <Box component="p">Select a subscription for the PFP & Collection Generator.</Box>
                </Box>
                <Box mt={5}>
                    <Grid container alignItems="flex-end" spacing={5}>
                        {pricingList.map((item, index) => {
                            return (
                                <Grid key={index} item lg={4} md={4} sm={6} xs={12} >
                                    <Box className={classes.contentItem}>
                                        <Box className={pricing === item.key ? classes.sContentItemHeader : classes.contentItemHeader}>
                                            <Box className={pricing === item.key ? classes.selectedContentItemHeader : classes.contentItemHeaderPricingBadge}>
                                                <Chip classes={{ label: classes.contentItemHeaderBadge }} label={item.badge} />
                                                <Box className={classes.contentItemHeaderPricing}>
                                                    <span className={classes.contentItemHeaderPricingPrice}>{item.price}</span>
                                                    <span className={classes.contentItemHeaderPricingFrequency}>{item.during}</span>
                                                </Box>
                                            </Box>
                                            <Box component="span" className={classes.contentItemHeaderSupport}>{item.support}</Box>
                                        </Box>
                                        <Box className={pricing === item.key ? classes.selectedContentItemContent : classes.contentItemContent} >
                                            <Box className={classes.contentItemContentFeatures}>
                                                <Box className={classes.contentItemContentFeature}>
                                                    <Check className={classes.contentItemContentFeatureIcon} />
                                                    <span className={classes.contentItemContentFeatureText}>Pariatur quod similique</span>
                                                </Box>
                                                <Box className={classes.contentItemContentFeature}>
                                                    <Check className={classes.contentItemContentFeatureIcon} />
                                                    <span className={classes.contentItemContentFeatureText}>Sapiente libero doloribus modi nostrum</span>
                                                </Box>
                                                <Box className={classes.contentItemContentFeature}>
                                                    <Check className={classes.contentItemContentFeatureIcon} />
                                                    <span className={classes.contentItemContentFeatureText}>Vel ipsa esse repudiandae excepturi</span>
                                                </Box>
                                                <Box className={classes.contentItemContentFeature}>
                                                    <Check className={classes.contentItemContentFeatureIcon} />
                                                    <span className={classes.contentItemContentFeatureText}>Itaque cupiditate adipisci quibusdam</span>
                                                </Box>
                                            </Box>
                                            <Button onClick={() => { handleSubscription(item.key) }} className={pricing === item.key ? classes.selectedContentItemContentButton : classes.contentItemContentButton} variant="outlined" color="primary">Select</Button>
                                        </Box>
                                    </Box>
                                </Grid>
                            )
                        })}
                        {/* <Grid item lg={4} md={4} sm={6} xs={12} >
                            <Box className={classes.contentItem}>
                                <Box className={classes.sContentItemHeader}>
                                    <Box className={classes.selectedContentItemHeader}>
                                        <Chip classes={{ label: classes.contentItemHeaderBadge }} label="POPULAR" />
                                        <Box className={classes.contentItemHeaderPricing}>
                                            <span className={classes.contentItemHeaderPricingPrice}>$75</span>
                                            <span className={classes.contentItemHeaderPricingFrequency}>/mo</span>
                                        </Box>
                                        <span className={classes.contentItemHeaderSupport}>This is best plan</span>
                                    </Box>
                                </Box>
                                <Box className={classes.selectedContentItemContent} mt={6}>
                                    <Box className={classes.contentItemContentFeatures}>
                                        <Box className={classes.contentItemContentFeature}>
                                            <Check className={classes.contentItemContentFeatureIcon} />
                                            <span className={classes.contentItemContentFeatureText}>Pariatur quod similique</span>
                                        </Box>
                                        <Box className={classes.contentItemContentFeature}>
                                            <Check className={classes.contentItemContentFeatureIcon} />
                                            <span className={classes.contentItemContentFeatureText}>Sapiente libero doloribus modi nostrum</span>
                                        </Box>
                                        <Box className={classes.contentItemContentFeature}>
                                            <Check className={classes.contentItemContentFeatureIcon} />
                                            <span className={classes.contentItemContentFeatureText}>Vel ipsa esse repudiandae excepturi</span>
                                        </Box>
                                        <Box className={classes.contentItemContentFeature}>
                                            <Check className={classes.contentItemContentFeatureIcon} />
                                            <span className={classes.contentItemContentFeatureText}>Itaque cupiditate adipisci quibusdam</span>
                                        </Box>
                                    </Box>
                                    <Button onClick={() => navigate("/create")} className={classes.selectedContentItemContentButton} variant="contained" color="primary">Selected</Button>
                                </Box>
                            </Box>
                        </Grid> */}
                    </Grid>
                </Box>
                <Box mt={10}>
                    <Grid container alignItems="flex-start" spacing={5}>
                        <Grid item lg={4} md={4} sm={6} xs={12} >
                            <Button onClick={() => { handleSubscription(1) }} className={pricing === 1 ? classes.selectedContentItemContentButton : classes.contentItemContentButton} variant="outlined" color="primary">Select</Button>
                        </Grid>
                        <Grid item lg={4} md={4} sm={6} xs={12} >
                            <Box>
                                <span className={classes.contentItemContentBasicText}>Basic</span>
                                <span className={classes.contentItemContentFreeText}>FREE</span>
                            </Box>
                            <Box>
                                <span className={classes.contentItemContentText}>Only single NFTs can be generated with Basic plan.</span>
                            </Box>
                        </Grid>
                        <Grid item lg={4} md={4} sm={6} xs={12} >
                        </Grid>
                    </Grid>
                </Box>
                <Box mt={15}>
                    <Box className={classes.contentHeader}>
                        <Typography variant="h2" component="h2">NFT Type</Typography >
                        <Box component="p">Select a subscription for the PFP & Collection Generator.</Box>
                    </Box>
                    <Box mt={5}>
                        <Grid container spacing={5}>
                            <Grid item lg={6} md={6} sm={6} xs={12} display="flex">
                                <Box className={pricing > 0 ? classes.footerItem : classes.disabledFooterItem}>
                                    <Box component={"img"} src={PricingFooterItemIcon1.src} className={classes.footerItemIcon}></Box>
                                    <Box mt={5} className={classes.footerItemContent}>
                                        <Box className={classes.footerItemContentHeader} component="span">Create a Single NFT</Box >
                                        <Box component="p" className={classes.footerItemContentText}>This will generate a tokenset based on the preview you have seen in the gallery. What you've seen is what you get. Voomio adds randomization to the token number.</Box>
                                    </Box>
                                    <Button onClick={() => { navigate("/create") }} className={classes.footerItemButton} variant="contained" color="primary">Get Started</Button>
                                </Box>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={12} display="flex">
                                <Box className={pricing > 1 ? classes.footerItem : classes.disabledFooterItem}>
                                    <Box component={"img"} src={PricingFooterItemIcon2.src} className={classes.footerItemIcon}></Box>
                                    <Box mt={5} className={classes.footerItemContent}>
                                        <Box className={classes.footerItemContentHeader} component="span">Create an NFT Set</Box >
                                        <Box component="p" className={classes.footerItemContentText}>This will create a set based on your rules and rarity settings, but isn’t what you saw in the gallery. This will guarantee higher randomization and less bias.</Box>
                                    </Box>
                                    <Button onClick={() => { navigate("/create") }} className={classes.footerItemButton} variant="contained" color="primary">Get Started</Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </Container >
    )
}

export default PricingCmp