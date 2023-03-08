import React, {useEffect} from 'react';
import {useSendNewMessage, useTicketData} from "./state";
import {useParams} from "react-router-dom";
import Grid from "@mui/material/Grid";
import {Avatar, Box, Stack, TextField, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {Done, DoneAll, Send} from "@mui/icons-material";
import {useFormik} from "formik";
import Button from "@mui/material/Button";
import logo from "../../../assets/image/component/headers/logo.svg"
import Image from "next/image";


const TicketMessage = ({message}) => {
    const user = useSelector(state => state.user.user);

    return (
        <Stack
            sx={{maxWidth: '65%', marginLeft: message?.isUser ? 0 : 'auto'}}
            direction='row'
            spacing={1}
        >
            {message?.isUser && <Avatar src={user.profileUrl}/>}

            <Stack
                sx={{backgroundColor: '#9f8dff17', px: 2, py: 1, borderRadius: 3}}
                spacing={1}
            >
                <Stack
                    direction={message?.isUser ? 'row' : 'row-reverse'}
                    spacing={2}>
                    <Typography sx={{color: '#6549F6'}}
                    >
                        {message?.isUser ? 'You' : 'Voomio'}
                    </Typography>

                    <Typography sx={{color: '#B4BBC6'}}>
                        {message?.sentAt}
                    </Typography>

                    {message?.seen ?
                        <DoneAll sx={{color: '#B4BBC6'}} fontSize='small'/> :
                        <Done sx={{color: '#B4BBC6'}} fontSize='small'/>
                    }
                </Stack>

                <Typography sx={{whiteSpace: 'pre-line'}}>{message.text}</Typography>
            </Stack>

            {!message?.isUser &&
                <Image
                    alt='voomio'
                    width={40}
                    height={40}
                    style={{borderRadius: '9999', objectFit: 'contain'}}
                    src={logo}
                />
            }
        </Stack>
    )
}

const NewMessage = ({ticketId}) => {
    const {mutate: sendMessage, isLoading} = useSendNewMessage();

    const {handleSubmit, handleChange, values} = useFormik({
        initialValues: {
            text: '',
            ticketId
        },
        onSubmit: (values) => {
            sendMessage(values);
        }
    });

    return (
        <form onSubmit={handleSubmit}>
            <Stack alignItems='center' direction='row' spacing={2}>
                <TextField
                    multiline
                    rows={3}
                    fullWidth
                    label='New message'
                    required
                    name='text'
                    value={values.text}
                    onChange={handleChange}
                />

                <Button
                    color='info'
                    disabled={isLoading}
                    type='submit'
                    variant='contained'
                    sx={{borderRadius: '50%', width: 50, height: 50, minWidth: 'auto'}}
                >
                    <Send color='white'/>
                </Button>
            </Stack>
        </form>
    )
}

const Ticket = () => {
    const {id} = useParams();

    const {data, isSuccess} = useTicketData(id);

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <Grid
            sx={{height: '100%', position: 'relative', maxWidth: '600px', m: 'auto', overflow: 'hidden'}}
            container
            direction='column'
        >
            <Grid item sx={{mb: 4}}>
                <Typography fontSize='28px' fontWeight='bold' component='h1'>{data?.data?.title}</Typography>
            </Grid>

            <Grid
                item
                container
                spacing={3}
                direction='column'
                flexGrow={1}
                flexWrap='nowrap'
                sx={{pb: 20, height: 500, overflow: 'auto', position: 'relative'}}
            >
                {isSuccess && data?.data?.messages.reverse().map(message => (
                    <Grid item>
                        <TicketMessage message={message}/>
                    </Grid>
                ))}
            </Grid>

            <Box
                boxShadow={3}
                py={2}
                position='absolute'
                bottom={0}
                width='100%'
                backgroundColor='#fff'
            >
                <NewMessage ticketId={id}/>
            </Box>
        </Grid>
    );
};

export default Ticket;