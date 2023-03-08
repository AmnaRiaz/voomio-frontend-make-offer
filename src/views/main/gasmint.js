import React from "react"
import { makeStyles } from '@mui/styles'
import Grid from "@mui/material/Grid"
import { Box, Typography } from "@mui/material"
import componentStyles from "/src/assets/theme/views/main/gasmint"
import Button from '@mui/material/Button'
import { AnimateKeyframes } from 'react-simple-animate'
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { notification } from "/src/utils/utility"

import intro1 from "/src/assets/image/component/main/home/intro/image1.svg"
import intro2 from "/src/assets/image/component/main/home/intro/image2.svg"
import intro3 from "/src/assets/image/component/main/home/intro/image3.svg"
import intro4 from "/src/assets/image/component/main/home/intro/image4.svg"
import vector from "/src/assets/image/component/icon/vector.svg"
import vector1 from "/src/assets/image/component/icon/vector1.svg"
import vector2 from "/src/assets/image/component/icon/vector2.svg"
// core components
const useStyles = makeStyles(componentStyles)

const GasMint = () => {
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
            <Box className={classes.page}>
                <AnimateKeyframes
                    play
                    delay={1}
                    iterationCount={3}
                    direction="alternate"
                    keyframes={[
                        { 0: 'opacity: 0' }, // 0%
                        { 50: 'opacity: 0.5' }, // 50%
                        { 100: 'opacity: 1' } // 100%
                    ]}
                >
                </AnimateKeyframes>
                <Box className={classes.intro1} component='img' src={intro1.src} >
                </Box>
                <Box className={classes.intro3} component='img' src={intro3.src} >
                </Box>
                <Box className={classes.intro4} component='img' src={intro4.src} >
                </Box>
                <Box className={classes.intro2} component='img' src={intro2.src} >
                </Box>
                <Box className={classes.introA} component='img' src={intro1.src} >
                </Box>
                <Box className={classes.introC} component='img' src={intro3.src} >
                </Box>
                <Box className={classes.introD} component='img' src={intro4.src} >
                </Box>
                <Box className={classes.introB} component='img' src={intro2.src} >
                </Box>
                <Box sx={{ width: "100%", height: "100%" }} >
                    <Box className={classes.content} >
                        <Typography className={classes.title1}>Gassless</Typography>
                        <Typography className={classes.title1}>Minting</Typography>
                        <Box className={classes.vector}>
                            <Box component='img' src={vector.src} />
                            <Box className={classes.textbox}>
                                <Typography variant='h1'>
                                    Set up Your Wallet
                                </Typography>
                                <Typography variant='h3'>
                                    Once you’ve set up your wallet of choice, connect it by clicking the wallet icon in the top right corner.
                                </Typography>
                            </Box>
                        </Box>
                        <Box className={classes.vector}>
                            <Box component='img' src={vector1.src} />
                            <Box className={classes.textbox}>
                                <Typography variant='h1'>
                                    Create Your Collection
                                </Typography>
                                <Typography variant='h3'>
                                    Upload your work (image, video, audio, or 3D art), add a title and description.
                                </Typography>
                            </Box>
                        </Box>
                        <Box className={classes.vector}>
                            <Box component='img' src={vector2.src} />
                            <Box className={classes.textbox}>
                                <Typography variant='h1'>
                                    List them for sale
                                </Typography>
                                <Typography variant='h3'>
                                    You choose how you want to sell your NFTs, and we help you sell them!
                                </Typography>
                            </Box>
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

            </Box>

        </Grid >
    )
}

export default GasMint