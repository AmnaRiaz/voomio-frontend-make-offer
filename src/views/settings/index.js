import React from "react"
// @mui/material components
import Grid from "@mui/material/Grid"
// core components
import {Box} from "@mui/material"
import {styles} from "../../assets/theme/views/settings"
import {
    AccountCircle,
    AttachMoney,
    Bookmark,
    Camera,
    Favorite,
    GridOn,
    LocalOffer,
    Notifications,
    Policy,
    ThumbUp
} from "@mui/icons-material"
import {NavLink, Outlet} from "react-router-dom";

const settingList = [
    {title: "Profile", path: "", icon: <AccountCircle/>},
    {title: "My Collections", path: "my-collections", index: 1, icon: <GridOn/>},
    {title: "My NFTs", path: "my-nfts", icon: <Camera/>},
    {title: "Activity", path: "activity", icon: <ThumbUp/>},
    {title: "Favortied", path: "favorited", icon: <Favorite/>},
    {title: "Featured items", path: "featured-items", icon: <Bookmark/>},
    {title: "Notofications", path: "notifications", icon: <Notifications/>},
    {title: "Offers", path: "offers", icon: <LocalOffer/>},
    {title: "Account support", path: "account-support", icon: <Policy/>},
    {title: "Earnings", path: "earnings", icon: <AttachMoney/>},
]

const SettingCmp = () => {
    return (
        <React.Fragment>
            <Box>
                <Grid container>
                    <Grid sx={styles.settingSidebar} item xl={3} lg={3} md={4} sm={12} xs={12}>
                        <Box position='sticky' top={90} pt={3}>
                            <Box component={"span"}>Settings</Box>
                            <Box mt={3}>
                                {settingList.map((item, index) => {
                                    return (
                                        <NavLink style={{textDecoration: 'none'}} to={'/settings/' + item.path}>
                                            {({isActive}) =>
                                                <Box
                                                    sx={isActive ? styles.activeSettingList : styles.settingList}
                                                    key={index}
                                                >
                                                    <Box mr={3} sx={styles.settingListIcon}
                                                         component={"span"}>{item.icon}</Box>
                                                    <Box component={"span"}>{item.title}</Box>
                                                </Box>
                                            }
                                        </NavLink>
                                    )
                                })}
                            </Box>
                        </Box>
                    </Grid>
                    {/* <Divider orientation="vertical" flexItem /> */}
                    <Grid item xl={9} lg={9} md={8} sm={12} xs={12}>
                        <Box p={6} height='100%'>
                            <Outlet/>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    )
}

export default SettingCmp