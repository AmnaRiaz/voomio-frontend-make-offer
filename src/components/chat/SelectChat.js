import React, { useState } from 'react';
import { Box, Tab, Tabs } from "@mui/material";
import DirectList from "./direct/DirectList";
import CollectionsChatList from "./collectionsChat/CollectionsChatList";

const SelectChat = ({ setChat }) => {
    const [tab, setTab] = useState('direct');

    const handleChange = (_, newTab) => setTab(newTab);

    const handleSelect = (selectedChatData) => setChat(selectedChatData);

    return (
        <>
            <Tabs variant='fullWidth' value={tab} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Direct" value='direct' />
                <Tab label="Collections" value='collections' />
            </Tabs>

            <Box flexGrow={1} overflow='hidden'>
                {tab === 'direct' && <DirectList onSelect={handleSelect} />}

                {tab === 'collections' && <CollectionsChatList onSelect={handleSelect} />}
            </Box>
        </>
    );
};

export default SelectChat;