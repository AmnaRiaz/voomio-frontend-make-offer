import React from 'react';
import { Avatar, Stack, Typography } from "@mui/material";

const DirectListItem = ({ data, onSelect }) => {
    return (
        <Stack
            onClick={() => onSelect({ ...data, type: 'direct' })}
            alignItems='center'
            width='100%'
            p={1}
            spacing={1}
            direction='row'
            sx={{ cursor: 'pointer' }}
        >
            <Avatar src={data.profileUrl} />
            <Stack>
                <Typography fontWeight='bold'>{data.name}</Typography>
                <Typography variant='caption'>{data?.message?.text}</Typography>
            </Stack>
        </Stack>
    );
};

export default DirectListItem;