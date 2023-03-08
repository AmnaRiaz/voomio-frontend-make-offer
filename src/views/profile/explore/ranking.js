import React from "react"
// @mui/material components
import { makeStyles } from "@mui/styles"
import Grid from "@mui/material/Grid"
// core components
import componentStyles from "/src/assets/theme/views/profile/profileexplore"
import { Box, Divider, Tab, Typography } from "@mui/material"
import TabPanel from '@mui/lab/TabPanel'

import { TabContext, TabList } from "@mui/lab"

import { useSelector } from "react-redux";
import Top from "./top"
import Trend from "./trend"

const useStyles = makeStyles(componentStyles)

const Profile = () => {
    const classes = useStyles()
    const tabkey = useSelector(state => state.nfts.tab)

    const [tabval, setValue] = React.useState(tabkey)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <React.Fragment>
            <Grid item lg={12} md={12} sm={12} xs={12} className={classes.collectionexplore}>
                <Typography className={classes.exploretitle}>Collection stats</Typography>
                <TabContext value={tabval}>

                    <Box className={classes.tablist} >
                        <Grid container>
                            <Grid item xl={12} lg={12} md={12} xs={12} >
                                <TabList aria-label="lab API tabs example" onChange={handleChange} className={classes.tabindicator} >
                                    <Tab className={classes.tabitems} label="Top" value="1" />
                                    <Tab className={classes.tabitems} label="Trending" value="2" />
                                </TabList>
                            </Grid>
                        </Grid>
                        <Divider />
                    </Box>
                    <TabPanel value="1" sx={{ padding: "0px !important" }}>
                        <Top></Top>
                    </TabPanel>
                    <TabPanel value="2" sx={{ padding: "0px !important" }}>
                        <Trend></Trend>
                    </TabPanel>
                </TabContext>
            </Grid>

        </React.Fragment >
    )
}

export default Profile