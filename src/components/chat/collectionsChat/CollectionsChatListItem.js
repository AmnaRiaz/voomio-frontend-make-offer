import React from 'react';
import { Stack, Typography } from "@mui/material";

const CollectionsChatListItem = ({ data, onSelect }) => {
    return (
        <Stack
            onClick={() => onSelect({ ...data, type: 'room' })}
            alignItems='center'
            width='100%'
            p={1}
            spacing={1}
            direction='row'
            sx={{ cursor: 'pointer' }}
        >
            <img
                style={{ borderRadius: 5 }}
                width={55}
                height={55}
                alt={data.name}
                src={data.coverUrl}
            />
            <Stack>
                <Typography fontWeight='bold'>{data.name}</Typography>
            </Stack>
        </Stack>
    );
};

export default CollectionsChatListItem;