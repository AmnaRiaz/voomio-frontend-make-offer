import axios from 'axios';
import { getAxiosInstance, getHeaders } from '..';
import { baseURL } from "../../config";

export const api = axios.create({
    baseURL,
    timeout: 500000,
    headers: {
        "Content-Type": "application/json",
        "user-device": "web",
    }
});

api.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token') || '';

    if (config && config.headers) {
        config.headers.authorization = `header ${encodeURIComponent(token)}`;
    }

    return config;
});

export const getCardanoNftPolicy = async (policyName) => {
    const axiosInstance = getAxiosInstance();
    const url = '/collection/policy/' + policyName;
    const result = await axiosInstance
        .get(url, getHeaders)
        .catch((error) => {
            Promise.reject(error);
        });
    return result
}

export const buildListingTransaction = async (sellerAddr, price, nftId) => {
    const axiosInstance = getAxiosInstance();
    const url = "/transaction/build-listing"
    const body = {
        sellerAddr,
        price,
        nftId
    }
    const response = await axiosInstance.
        post(url, body, getHeaders)
        .then(({ data }) => data)
        .catch((error) => {
            console.log(error)
            return false
        });
    console.log(response)
    return response
}

export const buildBuyTransaction = async (buyerAddr, nftId, collateralUtxos) => {
    const axiosInstance = getAxiosInstance();
    const url = "/transaction/build-buy"
    const body = {
        buyerAddr,
        nftId,
        collateralUtxos
    }
    const response = await axiosInstance.
        post(url, body, getHeaders)
        .then(({ data }) => data)
        .catch((error) => {
            console.log(error)
            return false
        });
    console.log(response)
    return response
}
