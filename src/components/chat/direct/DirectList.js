import React, { useEffect } from 'react';
import { Divider, Stack } from "@mui/material";
import DirectListItem from "./DirectListItem";
import { useChatSocket, useDirectsList } from "../ChatProvider";

const DirectList = ({ onSelect }) => {
    const directs = useDirectsList();

    const socket = useChatSocket();

    useEffect(() => {
        socket?.emit('pv-get-list');
    }, [])

    return (
        <Stack mt={1} height='100%' overflow='auto'>
            {directs.map(data => (
                <>
                    <DirectListItem onSelect={onSelect} data={data} />
                    <Divider />
                </>
            ))}
        </Stack>
    );
};

export default DirectList;