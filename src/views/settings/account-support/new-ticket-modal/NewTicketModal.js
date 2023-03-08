import React, {useState} from 'react';
import {useFormik} from 'formik'
import {Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useOpenNewTicket} from "../state";
import SelectCategory from "./SelectCategory";

const NewTicketModal = ({trigger}) => {
    const [showNewTicketModal, setShowNewTicketModal] = useState(false);

    const {mutate: openTicket} = useOpenNewTicket();

    const {handleChange, handleSubmit, values} = useFormik({
        initialValues: {
            title: '',
            category: '',
            text: ''
        },
        onSubmit: (values) => {
            openTicket(values, {
                onSuccess: () => {
                    handleCloseNewTicketModal();
                }
            });
        }
    })

    const handleCloseNewTicketModal = () => setShowNewTicketModal(false);

    const handleShowNewTicketModal = () => setShowNewTicketModal(true)

    return (
        <>
            {trigger(handleShowNewTicketModal)}

            <Dialog
                open={showNewTicketModal}
                onClose={handleCloseNewTicketModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <form onSubmit={handleSubmit}>
                    <DialogTitle style={{color: 'black'}}>
                        Open new ticket
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="normal"
                            id="title"
                            label="Title"
                            type="text"
                            fullWidth
                            variant="outlined"
                            required
                            name='title'
                            onChange={handleChange}
                            value={values.title}
                        />

                        <SelectCategory
                            value={values.category}
                            handleChange={handleChange}
                        />

                        <TextField
                            margin='normal'
                            id="text"
                            label="Text"
                            type="text"
                            fullWidth
                            variant="outlined"
                            required
                            multiline
                            rows={6}
                            name='text'
                            onChange={handleChange}
                            value={values.text}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button type='submit'>Create</Button>
                        <Button onClick={handleCloseNewTicketModal}>
                            Close
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>

    );
};

export default NewTicketModal;