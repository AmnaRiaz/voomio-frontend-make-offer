import React, { useEffect, useState } from "react"
// @mui/material components
// import { makeStyles } from "@mui/styles"
import { makeStyles } from '@mui/styles'
import Grid from "@mui/material/Grid"
// core components
import componentStyles from "/src/assets/theme/views/main/home"
import Intro from "./intro"
import Trending from "./trending"
import TopCreator from "./top-creator/TopCreator"
import NftTable from "./nftTable"
import GasMint from "./gasmint"
import Alpha from "./alpha"

const useStyles = makeStyles(componentStyles)
const Home = () => {
    const classes = useStyles()

    return (
        <Grid item classes={{ root: classes.pageroot }} lg={12} sx={{
            display: "flex !important",
            flexFlow: "column !important",
            rowGap: "50px !important"
        }}>
            <Intro />
            <NftTable />
            <TopCreator />
            <Trending />
            <GasMint />
            <Alpha />
        </Grid>
    )
}

export default Home