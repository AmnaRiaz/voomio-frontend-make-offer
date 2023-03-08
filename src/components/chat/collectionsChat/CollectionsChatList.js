import React, {useEffect} from 'react';
import CollectionsChatListItem from "./CollectionsChatListItem";
import {Divider, Stack} from "@mui/material";
import {useChatSocket, useRoomsList} from "../ChatProvider";

const CollectionsChatList = ({onSelect}) => {
    const rooms = useRoomsList();
console.log(rooms)
    const socket = useChatSocket();

    useEffect(() => {
        socket?.emit('get-rooms');
    }, [])

    return (
        <Stack mt={1} height='100%' overflow='auto'>
            {rooms?.map(data => (
                <>
                    <CollectionsChatListItem onSelect={onSelect} data={data}/>
                    <Divider/>
                </>
            ))}
        </Stack>
    );
};

export default CollectionsChatList;