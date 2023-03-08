import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import EmojiPicker from "emoji-picker-react";
import { IconButton, Stack, TextField, Box } from "@mui/material";
import Button from "@mui/material/Button";
import { EmojiEmotions, Send } from "@mui/icons-material";

export const NewMessage = ({ onSubmit, editMode }) => {
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

    const { handleSubmit, handleChange, values, setFieldValue } = useFormik({
        initialValues: {
            text: ''
        },
        onSubmit: (values, formikHelpers) => {
            onSubmit(values.text);
            formikHelpers.resetForm()
        }
    });

    const handleToggleEmojiPicker = () => {
        setOpenEmojiPicker(p => !p);
    }

    const handleAddEmoji = (emojiObject) => {
        setFieldValue('text', values.text + emojiObject.emoji);
    }

    useEffect(() => {
        setFieldValue('text', editMode ? editMode.text : '')
    }, [editMode])

    return (
        <form onSubmit={handleSubmit}>
            <Stack position='relative' alignItems='center' direction='row' spacing={2}>
                <TextField
                    multiline
                    fullWidth
                    label={editMode ? 'Edit message' : 'New message'}
                    required
                    name='text'
                    value={values.text}
                    onChange={handleChange}
                    sx={{ flexShrink: 1 }}
                />

                <Button
                    color='info'
                    type='submit'
                    variant='contained'
                    sx={{ borderRadius: '50%', width: 50, height: 50, minWidth: 'auto' }}
                >
                    <Send color='white' />
                </Button>

                <Box zIndex={1} position='absolute' right='5rem'>
                    {openEmojiPicker &&
                        <Box position='absolute' bottom='130%' right={0}>
                            <EmojiPicker onEmojiClick={handleAddEmoji} />
                        </Box>
                    }
                    <IconButton onClick={handleToggleEmojiPicker}>
                        <EmojiEmotions />
                    </IconButton>
                </Box>
            </Stack>
        </form>
    )
}