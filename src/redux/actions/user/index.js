// import { SESSION, LOGOUT } from "../../constants"

import { axiosServices, getAxiosInstance, getHeaders } from "../../../services"
import { setLocalStorageItem, getLocalStorageItem } from "../../../utils/utility"

export const uploadLogo = async (image) => {
    const axiosInstance = getAxiosInstance();
    const formData = new FormData()
    formData.append('image', image[0])
    const url = 'file/bucket'
    const uploadLogoResponse = await axiosInstance
        .post(url, formData, getHeaders)
        .then((response) => Promise.resolve(response.data))
        .catch((error) => Promise.reject(error));
    return uploadLogoResponse;
}

export const getUserData = async (id) => {
    const axiosInstance = getAxiosInstance();
    const url = 'user/' + id;
    const response = await axiosInstance
        .get(url, getHeaders)
        .then((response) => Promise.resolve(response.data))
        .catch((error) => Promise.reject(error));
    return response;
}

export const addFollower = async (params) => {
    const axiosInstance = getAxiosInstance();
    const url = 'user/follow/' + params.id;
    const response = await axiosInstance
        .post(url, getHeaders)
        .then((response) => Promise.resolve(response.data))
        .catch((error) => Promise.reject(error));
    return response;
}
export const removeFollower = async (params) => {
    const axiosInstance = getAxiosInstance();
    const url = 'user/unfollow/' + params.id;
    const response = await axiosInstance
        .post(url, getHeaders)
        .then((response) => Promise.resolve(response.data))
        .catch((error) => Promise.reject(error));
    return response;
}

export const setUserData = (params) => {
    const token = getLocalStorageItem("token")
    const url = "user/signin"
    return async (dispatch) => {
        const request = {
            address: params.address,
            walletName: params.name,
            blockchain: params.network,
            token
        }
        const response = await axiosServices(url, request)
        if (response.status && response.data) {
            setLocalStorageItem("token", response.data.data?.token)
            dispatch({
                type: "SET_USER",
                data: response.data.data,
            })
        } else {
            return false
        }
    }
}

export const updateUserData = (params) => {
    const url = 'user'
    return async (dispatch) => {
        const response = await axiosServices(url, params, 'PUT')
        if (response.status && response.data.success) {
            dispatch({
                type: "UPDATE_USER",
                data: params,
            })
        }
        return response
    }
}