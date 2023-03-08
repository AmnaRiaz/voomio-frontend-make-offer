import React, { useContext } from 'react'
import { LoadingContext } from '../loading'
import ReactLoading from "react-loading"
import { Box } from '@mui/material'

const ContextLoading = () => {
    const { loadingCount } = useContext(LoadingContext)
    return (
        <>
            {
                loadingCount > 0 &&
                <Box sx={{
                    position: "fixed", width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", zIndex: "1000000", background: "linear-gradient(174.39deg, #101222 -10.27%, #172142 105.47%)", opacity: "0.9", flexFlow: "column", rowGap: "100px"
                }}>
                    <ReactLoading type="spokes" color="#fff" />
                </Box>
            }
            {
                loadingCount <= 0 &&
                null
            }
        </>
    )
}

export default ContextLoading
