import React from "react"
import { makeStyles } from '@mui/styles'
import Grid from "@mui/material/Grid"
import { Box, Typography } from "@mui/material"
import componentStyles from "/src/assets/theme/views/main/intro"
import Button from '@mui/material/Button'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { notification } from "/src/utils/utility"

import bg from "/src/assets/image/component/main/home/intro/bg-img-1.jpg"
// core components
const useStyles = makeStyles(componentStyles)

const Intro = () => {

    const classes = useStyles()
    const navigate = useNavigate()
    const userData = useSelector((state) => state.user)
    const goToCreate = () => {
        if (userData?.user?.wallets[0]) {
            navigate("/create")
        } else {
            notification("please connect wallet!", "error")
            return false
        }
    }

    return (
        <Grid item className={classes.pageroot} lg={12} >
            <Box className="bg-img-1" sx={{ background: `#110F1D url(${bg}) repeat-y center center / 1920px` }}>
                <Box className="hero-holder clearfix">
                    <Box className="hero-img-holder clearfix">
                        <Box className="hero-img-holder-c hero-img-holder-1"></Box>
                        <Box className="hero-img-holder-c hero-img-holder-2"></Box>
                        <Box className="hero-img-holder-c hero-img-holder-3"></Box>
                    </Box>
                    <Box className="hero-caption-holder clearfix">
                        <Box className="container-1150 clearfix" >
                            <h1 className="title-1 text-white">A <span className="text-gradient-1">NEW ERA</span> FOR NTFs.</h1>
                            <h2 className="title-2 text-white">Will you be <span className="text-gradient-1">the first?</span></h2>
                        </Box>
                        <Box className={classes.buttons} >
                            <Button onClick={() => { navigate("/explore") }} variant='contained' classes={{ root: classes.explorebtn }}>
                                <Box component={"span"}>
                                    Explore
                                </Box>
                            </Button>
                            <Button onClick={() => { goToCreate() }} variant="outlined" classes={{ root: classes.createbtn }}>
                                <Box component={"span"}>
                                    Create
                                </Box>
                            </Button>
                        </Box>
                    </Box>
                </Box>
                {/* </Box>
                </Box> */}

            </Box>

        </Grid >
    )
}

export default Intro