import React, {useEffect, useState} from 'react';
import {Avatar, Box, CircularProgress, Stack, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import ContextMenu from "../context-menu/ContextMenu";
import {useChatSocket} from "./ChatProvider";
import {ChatWindow} from "./ChatWindow";
import ChatHeader from "./ChatHeader";
import {NewMessage} from "./NewMessage";

const ChatMessage = ({message, onDelete, onEdit}) => {
    const user = useSelector(state => state.user.user);

    const content = (<Stack
        mb={1}
        sx={{justifyContent: message?.isSender ? 'start' : 'end'}}
        direction='row'
        spacing={1}
    >
        {message?.isSender && <Avatar src={user.profileUrl}/>}

        <Stack
            sx={{backgroundColor: '#9f8dff17', px: 2, py: 1, borderRadius: 3}}
            spacing={1}
        >
            <Stack
                direction={message?.isSender ? 'row' : 'row-reverse'}
                spacing={2}>
                <Typography sx={{color: '#6549F6'}}
                >
                    {message?.isSender ? 'You' : message?.sender?.name}
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

        {!message?.isSender &&
            <Avatar src={message?.sender?.profileUrl}/>
        }
    </Stack>)

    return (
        message?.isSender ?
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


const DirectChatPage = ({chatData, height, onGoBack}) => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [editMode, setEditMode] = useState(null);

    const socket = useChatSocket();

    const handleSendNewMessage = (text) => {
        if (editMode) {
            socket?.emit('pv-edit-message', {
                id: editMode.messageId,
                text
            })
        } else {
            socket?.emit('pv-message', {
                receiver: chatData._id,
                text
            })
        }
    }

    useEffect(() => {
        if (socket && chatData._id) {
            socket.emit('pv-get-messages', {
                other: chatData._id,
            })
            setIsLoading(true);

            const handleGetDirectMessages = (prevMessages) => {
                console.log('direct messages', prevMessages);
                setMessages(p => [...prevMessages.reverse(), ...p])
                setIsLoading(false);
            }

            const handleAddNewMessage = (newMessage) => {
                console.log('new pv message', newMessage);
                setMessages(p => ([...p, newMessage]))
            }

            const handleDeleteMessage = (deletedMessage) => {
                setMessages(p => p.filter(msg => msg.id !== deletedMessage.id))
            }

            const handleEditMessage = (editedMessage) => {
                setMessages(p => p.map(msg => {
                    if (msg.id !== editedMessage.id) return msg;

                    return editedMessage;
                }))
                setEditMode(null);
            }

            socket.on('pv-get-messages-resp', handleGetDirectMessages);
            socket.on('pv-message', handleAddNewMessage);
            socket.on('pv-delete-message', handleDeleteMessage);
            socket.on('pv-edit-message', handleEditMessage);

            return () => {
                socket.off('pv-get-messages-resp', handleGetDirectMessages)
                socket.off('pv-message', handleAddNewMessage);
                socket.off('pv-delete-message', handleDeleteMessage)
                socket.off('pv-edit-message', handleEditMessage);
            }
        }
    }, [socket, chatData._id]);

    const handleDelete = (messageId) => {
        socket?.emit('pv-delete-message', {
            id: messageId
        })
    }

    const handleEnableEdit = (message) => {
        setEditMode({
            text: message.text,
            messageId: message.id
        })
    }

    const handleLoadMore = () => {
        const lastMessage = messages[0];

        if (isLoading) return;

        socket?.emit('pv-get-messages', {
            other: chatData._id,
            from: lastMessage.id,
        })
        setIsLoading(true);
    }

    return (
        <>
            <ChatHeader
                avatar={chatData.profileUrl ?? 'default'}
                name={chatData.name}
                onGoBack={onGoBack}
            />
            <Box width='100%' height={height} pt={1} px={1} pb={2} mb={8} overflow='auto'>
                {!isLoading && messages.length === 0 &&
                    <Typography textAlign='center'>There is no message yet</Typography>
                }

                <ChatWindow onLoadMore={handleLoadMore} height={400}>
                    {isLoading &&
                        <Box sx={{m: 'auto', p: 2}}>
                            <CircularProgress color='primary' size={20}/>
                        </Box>
                    }

                    {messages.map(m => (
                        <ChatMessage onEdit={() => handleEnableEdit(m)} onDelete={() => handleDelete(m.id)} message={m}/>
                    ))}
                </ChatWindow>

                <Box p={1} sx={{background: 'white'}} position='absolute' bottom={0} left={0} width='100%'>
                    <NewMessage editMode={editMode} onSubmit={handleSendNewMessage}/>
                </Box>
            </Box>
        </>
    );
};

export default DirectChatPage;