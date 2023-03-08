import React, {useState} from 'react';
import {Button, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";

const VerifyCodeForm = ({onSubmit, onClose}) => {
    const [verificationCode, setVerificationCode] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(verificationCode)
    }

    return (
        <form onSubmit={handleSubmit}>
            <DialogTitle style={{color: 'black'}}>
                Confirm Email
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Please check your email for verification code
                </DialogContentText>

                <TextField
                    autoFocus
                    margin="dense"
                    id="verify-code"
                    label="Verification code"
                    type="text"
                    fullWidth
                    variant="standard"
                    required
                    onChange={(e) => setVerificationCode(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button type='submit'>Verify</Button>
                <Button onClick={() => onClose()}>
                    Close
                </Button>
            </DialogActions>
        </form>
    );
};

export default VerifyCodeForm;