import {api} from "../../services/api/api";

export const verifyEmail = (code) => {
    return api.get('user/verify-email?otp=' + code)
}

export const sendVerificationCode = () => {
    return api.get('user/otp')
}