import React, { useState } from 'react';
import { Message } from "@mui/icons-material";
import { SpeedDial, Box, Avatar, Typography, Divider, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import SelectChat from "./SelectChat";
import DirectChatPage from "./DirectChatPage";
import RoomChatPage from "./RoomChatPage";

const Chat = () => {
    const [open, setOpen] = useState(false);
    const [openedChat, setOpenedChat] = useState(null);

    const user = useSelector(state => state.user.user);

    const handleToggle = () => setOpen(p => !p);

    const handleGoBack = () => setOpenedChat(null);

    const handleClickAvatar = (chatData) => setOpenedChat(chatData)

    if (!user) return null;

    return (
        <Box position='fixed' bottom={10} right={10} zIndex={9999}>
            <SpeedDial
                onClick={handleToggle}
                ariaLabel={'chat-button'}
                icon={<Message />}
                sx={{ position: 'fixed', bottom: 10, right: 10 }}
            />

            {open &&
                <Stack
                    sx={{ background: 'white', borderRadius: 2 }}
                    width={400}
                    height={550}
                    position='fixed'
                    right={10}
                    bottom={75}
                    boxShadow={2}
                >
                    {!openedChat &&
                        <Stack alignItems='center' direction='row' p={1} spacing={2}>
                            <Avatar src={user?.profileUrl} />
                            <Typography sx={{ flexGrow: 1 }} fontWeight='bold'>{user?.firstName}</Typography>
                        </Stack>
                    }

                    <Divider />

                    {!openedChat && <SelectChat setChat={setOpenedChat} />}

                    {openedChat && openedChat.type === 'direct' &&
                        <DirectChatPage chatData={openedChat} onGoBack={handleGoBack} />
                    }

                    {openedChat && openedChat.type === 'room' &&
                        <RoomChatPage
                            chatData={openedChat}
                            onGoBack={handleGoBack}
                            onClickAvatar={handleClickAvatar}
                        />
                    }
                </Stack>
            }
        </Box>
    );
};

export default Chat;