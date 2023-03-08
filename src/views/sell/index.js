import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
// @material-ui/core components
// core components
import {
    Box,
    Grid,
    Button,
    Container,
    Typography,
} from "@mui/material"
import { makeStyles } from '@mui/styles'
import componentStyles from "/src/assets/theme/views/nftgenerator/pricing"
// import profileStyles from "/src/assets/theme/views/profile/profileexplore"
import NFTCreated from "./created"
import Listing from "./listing"

const useStyles = makeStyles(componentStyles)

const Sell = () => {
    const classes = useStyles()
    const [tabval, setValue] = useState(true)

    const handleChange = () => {
        setValue(!tabval)
    }

    return (
        <Container sx={{ maxWidth: "1500px !important" }} className={classes.container}>
            <Box className={classes.header}>
                <Typography variant="h1" component="h1">List Your Items for Sale 🏷️</Typography >
            </Box>
            <Box className={classes.content}>
                <Box className={classes.contentHeader}>
                    <Box component="p">Sell NFTs you own across multiple marketplaces - individually or in batches.</Box>
                </Box>
                <Box mt={5}>
                    <Grid container md={12} xs={12} spacing={2} alignItems="flex-end">
                        <Grid item lg={2} md={3} sm={12} xs={12}>
                            <Box className={tabval ? classes.tabselbtn : classes.tabbtn}>
                                <Button onClick={handleChange}>
                                    <Typography>
                                        My Items
                                    </Typography>
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item lg={2} md={3} sx={12} xs={12}>
                            <Box className={!tabval ? classes.tabselbtn : classes.tabbtn}>
                                <Button onClick={handleChange}>
                                    <Typography>
                                        My Listings
                                    </Typography>
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container alignItems="flex-end">
                        {
                            tabval ?
                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <NFTCreated></NFTCreated>
                                </Grid>
                                :
                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <Listing></Listing>
                                </Grid>
                        }
                    </Grid>
                </Box>

            </Box>
        </Container >
    )
}

export default Sell