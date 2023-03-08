import React from 'react';
import { CircularProgress, Stack } from "@mui/material";

const Loading = () => {
    return (
        <Stack sx={{ position: "fixed", top: "0", left: "0", background: "#565", opacity: "0.7", zIndex: "10000000000", width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CircularProgress />
        </Stack>
    );
};

export default Loading;