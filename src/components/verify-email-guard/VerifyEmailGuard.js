import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {Dialog} from "@mui/material";
import {useSendVerificationCode, useVerifyEmail} from "./state";
import VerifyCodeForm from "./VerifyCodeForm";
import GetEmailForm from "./GetEmailForm";

const VerifyEmailGuard = ({onVerified, children}) => {
    const user = useSelector(state => state.user.user);
    const {sendCode, status: sendCodeStatus} = useSendVerificationCode();
    const {mutate: verify} = useVerifyEmail();
    const [openVerifyDialog, setOpenVerifyDialog] = useState(false);

    const handleCloseVerifyDialog = () => setOpenVerifyDialog(false)

    const handleOpenVerifyDialog = () => setOpenVerifyDialog(true)

    const handleCheckVerify = () => {
        if (user) {
            if (user.emailVerified === 'true') {
                onVerified();
            } else {
                handleOpenVerifyDialog();
            }
        }
    }

    const handleVerifyEmail = (code) => {
        if (code) {
            verify(code, {
                onSuccess: () => {
                    setOpenVerifyDialog(false);
                    onVerified();
                }
            })
        }
    }

    return (
        <>
           <span onClick={handleCheckVerify}>
               {children}
           </span>

            {openVerifyDialog &&
                <Dialog
                    open={openVerifyDialog}
                    onClose={handleCloseVerifyDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    {sendCodeStatus === 'success' ?
                        <VerifyCodeForm onSubmit={handleVerifyEmail} onClose={handleCloseVerifyDialog}/>
                        : <GetEmailForm onSubmit={sendCode} onClose={handleCloseVerifyDialog} initialValue={user?.email}/>
                    }
                </Dialog>
            }
        </>
    );
};

export default VerifyEmailGuard;