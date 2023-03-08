import React, {useState} from 'react';
import {Button, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";

const GetEmailForm = ({initialValue, onSubmit, onClose}) => {
    const [email, setEmail] = useState(initialValue);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(email)
    }

    return (
        <form onSubmit={handleSubmit}>
            <DialogTitle style={{color: 'black'}}>
                Confirm Email
            </DialogTitle>
            <DialogContent sx={{minWidth: 400}}>
                <DialogContentText>
                    You must confirm your email to continue
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Email"
                    type="text"
                    fullWidth
                    variant="standard"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button type='submit'>Send code</Button>
                <Button onClick={() => onClose()}>
                    Close
                </Button>
            </DialogActions>
        </form>
    );
};

export default GetEmailForm;