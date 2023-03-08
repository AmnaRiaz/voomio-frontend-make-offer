/* eslint-disable */
import React, {useEffect, useState} from "react";
import {io} from "socket.io-client";
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';
import {makeStyles, styled} from "@mui/styles";
import componentStyles from "../../../assets/theme/views/profile/aggregatorcommunity";
import {
    Accordion,
    IconButton,
    AccordionSummary,
    Typography,
    Avatar,
    Container,
    Box,
    Stack,
    Fab,
    TextField,
    Modal
} from "@mui/material";
import {useSelector} from "react-redux";
import Grid from "@mui/material/Grid";
import {useParams} from "react-router-dom";
import Button from "@mui/material/Button";
import { grey } from '@mui/material/colors';
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";


const ChatTextField = styled(TextField)({
    '& .MuiInputBase-root': {
        borderRadius: 35
    }
})

function ChatMessage({data, replyData, onEdit, onDelete, showActionButtons}) {
    return (
        <Grid container alignItems='center'>
            <Grid item xs container spacing={1}>
                <Grid item>
                    <Avatar alt={data?.username || ''} src={data?.profileImage}/>
                </Grid>

                <Grid item>
                    <Box sx={{flexGrow: 0}}>
                        {replyData && (
                            <Stack spacing={1} sx={{mb: 1}}>
                                <img alt="" src='/images/rply-arrow.svg' className="-ml-8 mt-2"/>
                                <Avatar alt={replyData?.username} src={replyData?.profileImage}/>

                                <p className="text-indigo-600 opacity-75">{replyData.username}</p>
                                <p className="text-gray-400 truncate opacity-75">{replyData.msg}</p>
                            </Stack>
                        )}

                        <Stack sx={{my: 1}} alignItems='center' direction='row' spacing={1}>
                            <Typography fontWeight='bold'>{data?.username || 'Unnamed'}</Typography>
                            <Typography variant='caption'>{data?.time}</Typography>
                        </Stack>

                        <Typography>{data?.msg ?? data?.text}</Typography>
                    </Box>
                </Grid>
            </Grid>

            {showActionButtons && <Grid item>
                <Stack direction='row' spacing={2}>
                    <Button variant='contained' color='error' onClick={() => onDelete(data.id, data.username)}
                            className='px-2 py-1 rounded-md text-sm border-2 border-rose-600'>delete
                    </Button>
                    <Button variant='contained' color='success' onClick={() => onEdit(data.id, data.msg)}
                            className='px-2 py-1 rounded-md text-sm border-2 border-gray-300'>edit
                    </Button>
                </Stack>
            </Grid>}
        </Grid>
    );
}

function ChatInput({socket, onSend, editData, className}) {
    const [message, setMessage] = useState('');
    const [file, setFile] = useState(null);
    const [showMessageWithImageModal, setShowMessageWithImageModal] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSend(message, file);
        setMessage('');
    };

    const handleInput = (e) => {
        setMessage(e.target.value);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            console.log(file);
            setFile(file);
            setShowMessageWithImageModal(true);
        }
    }

    const handleUploadFile = (e) => {
        e.preventDefault();
        if (file) {
            socket?.emit('upload', file, (status) => {
                console.log(status)
            });
        }
    }

    const handleCloseModal = () => {
        setShowMessageWithImageModal(false);
        setFile(null);
    }

    useEffect(() => {
        if (editData) {
            setMessage(editData.message)
        }
    }, [editData]);

    useEffect(() => {
        if (socket) {
            socket?.on('uploaded', (event) => {
                console.log(event)
            });
        }
    }, [socket])

    const field = (
        <ChatTextField
            variant='outlined'
            sx={{width: '100%'}}
            value={message}
            onChange={handleInput}
            placeholder="Message..."
        />
    )

    const sendButton = (
        <Fab
            color='info'
            type="submit"
            className="flex-shrink-0 rounded-full bg-indigo-600 w-10 h-10 flex items-center justify-center"
        >
            <ArrowDropUpIcon/>
        </Fab>
    )

    const messageWithImageModal = (
        <Modal
            sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
            open={showMessageWithImageModal}
        >
            <Card component={'form'} onSubmit={handleUploadFile} sx={{ width: 400 }}>
                <CardContent >
                    <Stack alignItems='end' spacing={2}>
                        <div>
                            <IconButton onClick={handleCloseModal}>
                                <CloseIcon/>
                            </IconButton>
                        </div>

                        <img width='100%' alt='' src={URL?.createObjectURL(new Blob([file], {type: "application/zip"}))}/>
                    </Stack>
                </CardContent>
                <CardActions>
                    <Grid container spacing={2}>
                        <Grid item xs>
                            {field}
                        </Grid>

                        <Grid item>
                            {sendButton}
                        </Grid>
                    </Grid>
                </CardActions>
            </Card>
        </Modal>
    )

    return (
        <>
            <Grid container component='form' spacing={1} onSubmit={handleSubmit}>
                <Grid item xs sx={{position: 'relative'}}>
                    {field}

                    {/*<IconButton component='label' sx={{*/}
                    {/*    position: 'absolute',*/}
                    {/*    right: 0,*/}
                    {/*    top: '25%',*/}
                    {/*    mx: 2*/}
                    {/*}}>*/}
                    {/*    <input onChange={handleFileChange} hidden type='file' accept='image/*'/>*/}
                    {/*    <ImageIcon sx={{color: grey[400]}}/>*/}
                    {/*</IconButton>*/}
                </Grid>

                <Grid item>
                    {sendButton}
                </Grid>
            </Grid>

            {messageWithImageModal}
        </>
    );
}

const useStyles = makeStyles(componentStyles)

const Chat = () => {
    const { id: collectionId } = useParams();

    const [chatOpen, setChatOpen] = useState(false);
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [editData, setEditData] = useState(null);

    const classes = useStyles();

    const userData = useSelector(state => state.user);

    useEffect(() => {
        const s = io('ws://103.130.145.229:9006');

        setSocket(s);

        s.emit('joinRoom', {
            username: userData?.displayName,
            room: collectionId,
            id: userData._id
        });

        const newMessageHandler = (newMessage) => {
            setMessages((p) => [...p, newMessage]);
        };

        const roomUsersHandler = (event) => {
            setOnlineUsers(event.users);
        };

        const removeMessageHandler = (deletedMessageData) => {
            setMessages(p => p.filter(msg => msg.id !== deletedMessageData.id))
        }

        const updateMessageHandler = (editedMessageData) => {
            setMessages(p => p.map(msg => {
                if (msg.id !== editedMessageData.id) return msg;

                return {
                    ...msg,
                    msg: editedMessageData.message
                }
            }))
        }

        s.on('message', newMessageHandler);
        s.on('err-message', newMessageHandler);
        s.on('roomUsers', roomUsersHandler);
        s.on('updated', updateMessageHandler);
        s.on('deleted', removeMessageHandler);

        return () => {
            s.off('message', newMessageHandler);
            s.off('err-message', newMessageHandler);
            s.off('roomUsers', roomUsersHandler);
            s.off('updated', updateMessageHandler);
            s.off('deleted', removeMessageHandler);
            s.close();
        };
    }, []);

    const handleSend = (msg, file) => {
        if (!msg && !file) return;

        if (editData) {
            socket?.emit('updateChat', {
                id: editData.id,
                newMessage: msg
            })
        } else {
            socket?.emit('chatMessage', {
                msg,

                id: userData._id
            });
        }

        // disable edit mode if enabled
        setEditData(null);
    };

    const handleEnableEdit = (id, prevMessage) => {
        setEditData({
            id,
            message: prevMessage
        })
    }

    const handleDelete = (id) => {
        socket?.emit('deleteChat', id);
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
                                sx={{px: 1, width: '100%'}}
                                component='div'
                                direction='row'
                                alignItems='center'
                                justifyContent='space-between'
                                className={classes.nabarhead}
                            >
                                <Typography className={classes.nfttraits}>Collection Chat</Typography>
                                {chatOpen ? <AddIcon className={classes.nftaddicon}/> :
                                    <RemoveIcon className={classes.nftaddicon}/>}
                            </Stack>
                        </AccordionSummary>

                        <Stack px={4} spacing={3}>
                            {messages &&
                                messages.map((m, index) => (
                                    <ChatMessage
                                        key={index}
                                        showActionButtons={m?.user?._id === userData._id}
                                        onEdit={handleEnableEdit}
                                        onDelete={handleDelete}
                                        data={m}
                                    />
                                ))}

                            <ChatInput editData={editData} onSend={handleSend} socket={socket}/>
                        </Stack>
                    </Accordion>
                </Grid>

                <Grid item xs={4}>
                    <ul className="w-full lg:w-48 mt-6 lg:mt-0 m-0 lg:ml-24">
                        <p className="font-bold mb-6">Users online</p>

                        {onlineUsers.map((user) => (
                            <Stack gap={2} alignItems='center' direction='row' component='li' key={user.id}>
                                <Avatar src={''}/>
                                <Typography>{user?.username || 'Unnamed'}</Typography>
                            </Stack>
                        ))}
                    </ul>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Chat