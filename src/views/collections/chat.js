/* eslint-disable */
import React, { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import CloseIcon from '@mui/icons-material/Close';
import { makeStyles } from "@mui/styles";
import { styled } from '@mui/material/styles';
import componentStyles from "../../assets/theme/views/profile/aggregatorcommunity";
import {
    Accordion,
    AccordionSummary,
    Avatar,
    Badge,
    Box,
    Container,
    Fab,
    IconButton,
    Menu,
    MenuItem,
    Modal,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import { MoreHoriz } from "@mui/icons-material";
import DirectChatPage from "../../components/chat/DirectChatPage";
import { useChatSocket } from "../../components/chat/ChatProvider";
import { useRoomChat } from "../../components/chat/hooks/useRoomChat";
import { ChatWindow } from "../../components/chat/ChatWindow";
import { NewMessage } from "../../components/chat/NewMessage";

const CHAT_HEIGHT = 500;

const ChatTextField = styled(TextField)({
    '& .MuiInputBase-root': {
        borderRadius: 35
    }
})

const OnlineUser = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '1px solid currentColor',
            content: '""',
        },
    },
}));

function ChatMessageMenu({ onEdit, onDelete }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        onEdit();
        handleClose()
    }

    return (
        <>
            <IconButton size='small' id="basic-button" onClick={handleClick}>
                <MoreHoriz />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                <MenuItem onClick={onDelete}>Delete</MenuItem>
            </Menu>
        </>
    )
}

function ChatMessage({ data, replyData, onEdit, onDelete, isUser }) {
    return (
        <Grid container alignItems='center'>
            <Grid item xs container spacing={1}>
                <Grid item>
                    <DirectModal
                        disable={isUser}
                        chatData={data.user}
                        trigger={(handleOpen) => (
                            <Avatar
                                sx={{cursor: 'pointer'}}
                                onClick={handleOpen}
                                alt={data?.user?.name || ''}
                                src={data?.user?.profileUrl}
                            />
                        )}
                    />
                </Grid >

                <Grid item flexGrow={1}>
                    <Box sx={{ flexGrow: 0 }}>
                        {replyData && (
                            <Stack spacing={1} sx={{ mb: 1 }}>
                                <img alt="" src='/images/rply-arrow.svg' className="-ml-8 mt-2" />
                                <Avatar alt={data?.user?.name || ''} src={data?.user?.profileUrl} />

                                <p className="text-indigo-600 opacity-75">{data?.user?.name || 'Unnamed'}</p>
                                <p className="text-gray-400 truncate opacity-75">{replyData.text}</p>
                            </Stack>
                        )}

                        <Stack
                            sx={{ my: 1, width: '100%' }}
                            alignItems='center'
                            justifyContent='space-between'
                            direction='row'
                            spacing={1}
                        >
                            <Stack direction='row' alignItems='center' spacing={1}>
                                <Typography fontWeight='bold'>{data?.user?.name || 'Unnamed'}</Typography>
                                <Typography variant='caption'>{data?.time}</Typography>
                            </Stack>

                            {isUser &&
                                <ChatMessageMenu
                                    onEdit={() => onEdit(data.id, data.text)}
                                    onDelete={() => onDelete(data.id)}
                                />
                            }
                        </Stack>

                        <Typography>{data?.text}</Typography>
                    </Box>
                </Grid>
            </Grid >
        </Grid >
    );
}

const DirectModal = ({trigger, chatData, disable}) => {
    const [directIsOpen , setDirectIsOpen] = useState(false);

    const handleOpenDirect = () => {
        if (disable) return;

        setDirectIsOpen(true);
    }

    const handleCloseDirect = () => setDirectIsOpen(false)

    return (
        <>
            {trigger(handleOpenDirect)}
            <Modal
                open={directIsOpen}
                onClose={handleCloseDirect}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    borderRadius: 1
                }}>
                    <DirectChatPage height={430} chatData={chatData} onGoBack={handleCloseDirect}/>
                </Box>
            </Modal>
        </>
    )
}

const OnlineUserListItem = ({ user, userId }) => {
    return (
        <>
            <DirectModal
                chatData={user}
                disable={user._id === userId}
                trigger={(handleOpen) => (
                    <Stack
                        gap={2}
                        alignItems='center'
                        direction='row'
                        component='li'
                        key={user?._id}
                        mb={2}
                        onClick={handleOpen}
                        sx={{ cursor: 'pointer' }}
                    >
                        <OnlineUser
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar src={user?.profileUrl} />
                        </OnlineUser>
                        <Typography>{user?.name || 'Unnamed'}</Typography>
                    </Stack>
                )}
            />
        </>
    )
}

const useStyles = makeStyles(componentStyles)

const Chat = () => {
    const { id: collectionId } = useParams();

    const [chatOpen, setChatOpen] = useState(false);
    const [editData, setEditData] = useState(null);

    const { messages, onlineUsers } = useRoomChat(collectionId);

    const classes = useStyles();

    const userData = useSelector(state => state.user.user);

    const socket = useChatSocket();

    const handleSend = (msg, file) => {
        if (!msg && !file) return;

        if (editData) {
            socket?.emit('edit-message', {
                id: editData.id,
                text: msg,
                room: collectionId
            })
        } else {
            socket?.emit('message', {
                room: collectionId,
                text: msg,
            })
        }

        socket?.emit('get-onlines', {
            room: collectionId
        })

        // disable edit mode if enabled
        setEditData(null);
    };

    const handleEnableEdit = (id, prevMessage) => {
        setEditData({
            id,
            text: prevMessage
        })
    }

    const handleDelete = (id) => {
        socket?.emit('delete-message', {
            id,
            room: collectionId
        });
    }

    return (
        <Container maxWidth={'md'}>
            <Grid className={classes.header} container flexWrap='nowrap'>
                <Grid item xs={8}>
                    <Accordion className={classes.collectionhead}>
                        <AccordionSummary
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            onClick={() => setChatOpen(p => !p)}

                        >
                            <Stack
                                sx={{ px: 1, width: '100%' }}
                                component='div'
                                direction='row'
                                alignItems='center'
                                justifyContent='space-between'
                                className={classes.nabarhead}
                            >
                                <Typography className={classes.nfttraits}>Collection Chat</Typography>
                                {chatOpen ? <AddIcon className={classes.nftaddicon} /> :
                                    <RemoveIcon className={classes.nftaddicon} />}
                            </Stack>
                        </AccordionSummary>

                        <Stack px={4} spacing={3}>
                            <ChatWindow height={CHAT_HEIGHT}>
                                {messages &&
                                    messages.map((m,) => (
                                        <ChatMessage
                                            isUser={m?.user?._id === userData?._id}
                                            key={m.id}
                                            onEdit={handleEnableEdit}
                                            onDelete={handleDelete}
                                            data={m}
                                        />
                                    ))}
                            </ChatWindow>

                            <NewMessage editMode={editData} onSubmit={handleSend} />
                        </Stack>
                    </Accordion>
                </Grid>

                <Grid item xs={4}>
                    <ul className="w-full lg:w-48 mt-6 lg:mt-0 m-0 lg:ml-24">
                        <p className="font-bold mb-6">Users online</p>

                        {onlineUsers.map((user) => (
                            <OnlineUserListItem user={user} userId={userData._id} />
                        ))}
                    </ul>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Chat
