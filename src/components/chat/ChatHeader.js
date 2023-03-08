import React from 'react';
import {Avatar, Divider, IconButton, Stack, Typography} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";

const ChatHeader = ({name,avatar, image, onGoBack}) => {
    return (
        <>
            <Stack alignItems='center' direction='row' p={1} spacing={2}>
                {avatar && <Avatar src={avatar}/>}
                {image &&
                    <img
                        style={{borderRadius: 5}}
                        width={45}
                        height={45}
                        alt={name}
                        src={image}
                    />
                }
                <Typography sx={{flexGrow: 1}} fontWeight='bold'>{name}</Typography>

                <IconButton onClick={onGoBack}>
                    <ArrowBack/>
                </IconButton>
            </Stack>
            <Divider/>
        </>
    );
};

export default ChatHeader;