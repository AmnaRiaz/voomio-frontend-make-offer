import React, { useEffect } from "react"
import { makeStyles } from "@mui/styles"
import Box from "@mui/material/Box"
import componentStyles from "../assets/theme/layouts/home"
import Header from "../components/Headers/Header"
import Footer from "../components/Footers/Footer"
import { Outlet, useLocation } from 'react-router-dom'
import Chat from "../components/chat/Chat";

const useStyles = makeStyles(componentStyles)

const HomeLayout = ({ children }) => {
    const classes = useStyles()

    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <Box className={classes.pageroot}>
            <Header />
            <Box className={classes.mainContent}>
                <Outlet />
            </Box>
            <Chat />
            <Footer />
        </Box>
    )
}

export default HomeLayout
