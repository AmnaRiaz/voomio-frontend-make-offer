import React from "react"
import {Link} from "react-router-dom";

// @mui/material components
import { makeStyles } from "@mui/styles"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Stack from '@mui/material/Stack'
import { Button, TextField, Typography } from "@mui/material"
// core components
import FacebookIcon from '@mui/icons-material/Facebook'
import GitHubIcon from '@mui/icons-material/GitHub'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import Divider from '@mui/material/Divider'

import componentStyles from "/src/assets/theme/components/admin-footer.js"

/// button navigation
import BottonBar from "../bottom"
import Logo from "/src/assets/image/component/headers/logo.svg"
import Dribble from "/src/assets/image/component/footer/dribble.svg"

const useStyles = makeStyles(componentStyles)

const Footer = () => {
  const classes = useStyles();
  return (
    <Box component="footer" width="100%" maxWidth='1200px' m={'auto'} pt={'100px'}>
      <Stack className={classes.bannerfooter} spacing={2} >
        <Typography className={classes.stayloop} >
          Stay in the loop
        </Typography>
        <Typography className={classes.footertext}>
          Join our mailing list to stay in the loop with our newest feature releases, NFT drops and tips and tricks for navigating Voomio.
        </Typography>


        <Grid container spacing={2} gap={3}>
          <Grid item xl={10} lg={12} md={12} xs={12} className={classes.footerbuttongroup}>
            <TextField variant="outlined" className={classes.footerinput} id="input-with-icon-adornment" placeholder="Your email address" />
          </Grid>
          <Grid item xl={2} lg={12} md={12} xs={12} className={classes.footerbuttongroup}>
            <Button variant="contained" className={classes.followbutton} >SignUp</Button>
          </Grid>
        </Grid>
      </Stack>

      <Stack className={classes.footerheaditem} alignItems={"center"}>
        <Divider className={classes.dividerwidth} />
        <Stack direction={"row"} flexWrap={"wrap"} gap={3} paddingTop={3} paddingBottom={3} justifyContent={"space-between"} className={classes.itemspace} >
          <Stack gap={1} className={classes.logoitem}>
            <Box component="img" className={classes.footerlogo} src={Logo.src} ></Box>
            <Typography className={classes.voomiotext} >Voomio is an omni-friendly shop for buying and selling NFTs.</Typography>
            <Stack direction={"row"} gap={1}>
              <FacebookIcon className={classes.dribbleicon} />
              <InstagramIcon className={classes.dribbleicon} />
              <TwitterIcon className={classes.dribbleicon} />
              <GitHubIcon className={classes.dribbleicon} />
              <Box component="img" src={Dribble.src} className={classes.dribbleicon} ></Box>
            </Stack>
          </Stack>
          <Stack gap={1} >
            <Typography className={classes.footerhead} >Solutions</Typography>
              <Link to='/pricing'>
                  <Typography className={classes.textfooter}>Pricing</Typography>
              </Link>
              <Link to='/documentation'>
                  <Typography className={classes.textfooter}>Documentation</Typography>
              </Link>
              <Link to='/guides'>
                  <Typography className={classes.textfooter}>Guides</Typography>
              </Link>
              <Link to='/api'>
                  <Typography className={classes.textfooter}>API Status</Typography>
              </Link>
          </Stack>
          <Stack gap={1} >
            <Typography className={classes.footerhead} >Support</Typography>
            <Link to='/pricing'>
              <Typography className={classes.textfooter}>Pricing</Typography>
            </Link>
            <Link to='/documentation'>
              <Typography className={classes.textfooter}>Documentation</Typography>
            </Link>
              <Link to='/guides'>
                <Typography className={classes.textfooter}>Guides</Typography>
              </Link>
              <Link to='/api'>
                <Typography className={classes.textfooter}>API Status</Typography>
              </Link>
          </Stack>
          <Stack gap={1} >
            <Typography className={classes.footerhead} >Company</Typography>
            <Link to='/about'>
              <Typography className={classes.textfooter}>About</Typography>
            </Link>
            <Link to='/blog'>
              <Typography className={classes.textfooter}>Blog</Typography>
            </Link>
            <Link to='/jobs'>
              <Typography className={classes.textfooter}>Jobs</Typography>
            </Link>
            <Link to='/press'>
              <Typography className={classes.textfooter}>Press</Typography>
            </Link>
            <Link to='/partners'>
              <Typography className={classes.textfooter}>Partners</Typography>
            </Link>
          </Stack>
          <Stack gap={1} >
            <Typography className={classes.footerhead} >Legal</Typography>
            <Link to='/claim'>
              <Typography className={classes.textfooter}>Claim</Typography>
            </Link>
            <Link to='/privacy'>
              <Typography className={classes.textfooter}>Privacy</Typography>
            </Link>
            <Link to='terms'>
              <Typography className={classes.textfooter}>
                Terms
              </Typography>
            </Link>
          </Stack>
        </Stack>
        <Divider className={classes.dividerwidth} />
      </Stack >
      <Stack alignItems={"center"}>
        <Typography className={classes.athertext}>© 2022 Voomio, LLC. All rights reserved.</Typography>
      </Stack>
      <BottonBar />
    </Box >
  )
}

export default Footer
