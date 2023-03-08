import axios from 'axios'
import { getLocalStorageItem } from '/src/utils/utility'
import { baseURL } from '../config'

export function getHeaders() {
    const token = getLocalStorageItem("token")
    return {
        'Content-Type': 'application/json',
        method: 'cors',
        'Access-Control-Allow-Origin': '*',
        authorization: 'header ' + encodeURIComponent(token),
        skip: true,
    };
}

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 500000,
    headers: {
        "Content-Type": "application/json",
        "user-device": "web"
    }
})

export const axiosServices = async (url, request, type = "post") => {
    const token = getLocalStorageItem("token")
    // if (type === "post") {
    try {
        return await axiosInstance({
            method: type,
            url,
            data: request,
            headers: {
                authorization: 'header ' + encodeURIComponent(token),
            }
        })
    } catch (e) {
        return { status: false, error: e }
    }
}

export const getAxiosInstance = () => {
    const token = getLocalStorageItem("token")
    return axios.create({
        baseURL: baseURL,
        headers: {
            authorization: 'header ' + encodeURIComponent(token),
        }
    })
}