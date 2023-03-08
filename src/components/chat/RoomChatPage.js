import React, {useState} from 'react';
import {Avatar, Box, Stack, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import ContextMenu from "../context-menu/ContextMenu";
import {useChatSocket} from "./ChatProvider";
import {useRoomChat} from "./hooks/useRoomChat";
import {ChatWindow} from "./ChatWindow";
import ChatHeader from "./ChatHeader";
import {NewMessage} from "./NewMessage";

const ChatMessage = ({message, onDelete, onEdit, onClickAvatar}) => {
    const user = useSelector(state => state.user.user);

    const isUser = message?.user?._id === user?._id;

    const content = (<Stack
        mb={1}
        sx={{justifyContent: isUser ? 'start' : 'end'}}
        direction='row'
        spacing={1}
    >
        {isUser && <Avatar src={user.profileUrl}/>}

        <Stack
            sx={{backgroundColor: '#9f8dff17', px: 2, py: 1, borderRadius: 3}}
            spacing={1}
        >
            <Stack
                direction={isUser ? 'row' : 'row-reverse'}
                spacing={2}>
                <Typography sx={{color: '#6549F6'}}
                >
                    {isUser ? 'You' : message?.user?.name}
                </Typography>

                <Typography sx={{color: '#B4BBC6'}}>
                    {message?.time}
                </Typography>

                {/*{message?.seen ?*/}
                {/*    <DoneAll sx={{color: '#B4BBC6'}} fontSize='small'/> :*/}
                {/*    <Done sx={{color: '#B4BBC6'}} fontSize='small'/>*/}
                {/*}*/}
            </Stack>

            <Typography sx={{whiteSpace: 'pre-line'}}>{message.text}</Typography>
        </Stack>

        {!isUser &&
            <Avatar
                sx={{cursor: 'pointer'}}
                src={message?.user?.profileUrl}
                onClick={onClickAvatar}
            />
        }
    </Stack>)

    return (
        isUser ?
            <ContextMenu
                menuItems={[
                    {
                        label: 'Edit',
                        action: onEdit
                    },{
                        label: 'Delete',
                        action: onDelete
                    }
                ]}
            >
                {content}
            </ContextMenu> :
            content
    )
}

const RoomChatPage = ({onClickAvatar, chatData, height, onGoBack}) => {
    const [editMode, setEditMode] = useState(null);

    const {messages} = useRoomChat(chatData._id);

    const socket = useChatSocket();

    const handleSendNewMessage = (text) => {
        if (editMode) {
            socket?.emit('edit-message', {
                id: editMode.messageId,
                text,
                room: chatData._id
            })
            setEditMode(null)
        } else {
            socket?.emit('message', {
                room: chatData._id,
                text,
            })
        }
    }

    const handleDelete = (messageId) => {
        socket?.emit('delete-message', {
            id: messageId,
            room: chatData._id
        });
    }

    const handleEnableEdit = (message) => {
        setEditMode({
            text: message.text,
            messageId: message.id
        })
    }

    return (
        <>
            <ChatHeader image={chatData.coverUrl} name={chatData.name} onGoBack={onGoBack}/>
            <Box width='100%' height={height} pt={1} px={1} pb={2} mb={8} overflow='auto'>
                {messages.length === 0 &&
                    <Typography textAlign='center'>There is no message yet</Typography>
                }

                <ChatWindow height={400}>
                    {messages.map(m => (
                        <ChatMessage
                            onEdit={() => handleEnableEdit(m)}
                            onDelete={() => handleDelete(m.id)}
                            onClickAvatar={() => onClickAvatar({...m.user, type: 'direct'})}
                            message={m}
                        />
                    ))}
                </ChatWindow>

                <Box p={1} sx={{background: 'white'}} position='absolute' bottom={0} left={0} width='100%'>
                    <NewMessage editMode={editMode} onSubmit={handleSendNewMessage}/>
                </Box>
            </Box>
        </>
    );
};

export default RoomChatPage;