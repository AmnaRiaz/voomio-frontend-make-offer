import {useEffect, useState} from "react";
import {sendVerificationCode, verifyEmail} from "./data";
import {notification} from "../../utils/utility";
import {updateUserData} from "../../redux/actions/user";
import {useDispatch, useSelector} from "react-redux";
import {useMutation} from "@tanstack/react-query";

export const useSendVerificationCode = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user)
    const [status, setStatus] = useState('idle');

    const sendCode = (email) => {
        setStatus('loading')
        dispatch(updateUserData({email, userId: user?._id})).then((res) => {
            if (res.status) {
                sendVerificationCode().then(() => {
                    setStatus('success');
                }).catch(() => {
                    setStatus('error')
                    notification("Send verification code failed", "error");
                })
            } else {
                setStatus('error')
                notification(res?.error?.response?.data.message, "error");
            }
        })
    }

    useEffect(() => {
        return () => {
            setStatus('idle')
        }
    }, [])

    return {
        sendCode,
        status
    }
}

export const useVerifyEmail = () => {
    const dispatch = useDispatch();

    return useMutation(verifyEmail, {
        onSuccess: (res) => {
            dispatch({type: 'EMAIL_VERIFIED'});
            notification(res?.data?.message ?? 'Email verified successfully', 'success')
        },
        onError: (e) => {
            notification(e?.error?.response?.data?.message, 'error')
        }
    })
}