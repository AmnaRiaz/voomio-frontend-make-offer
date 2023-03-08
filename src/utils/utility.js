import { useSelector } from 'react-redux'
import { toast, cssTransition } from 'react-toastify'
import { isDevMode } from '../config'
import { getAxiosInstance } from '../services'
import EtherumIcon from "/src/assets/image/coin/ethereum.svg"
import PolygonIcon from "/src/assets/image/coin/polygon.svg"
import BinanceIcon from "/src/assets/image/coin/binance.svg"
import CardanoIcon from "/src/assets/image/coin/cardano.svg"
import SolanaIcon from "/src/assets/image/coin/solana.svg"

export const chainList = {
    "ethereum": "ETHEREUM",
    "cardano": "CARDANO",
    "solana": "SOLANA",
    "binance": "BINANCE",
    "polygon": "POLYGON"
}

const monthsKey = {
    0: "Jan",
    1: "Fab",
    2: "March",
    3: "April",
    4: "May",
    5: "Jun",
    6: "July",
    7: "Aug",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec"
}

export const getWalletName = (blockchain) => {
    return ({
        "ethereum": "Metamask",
        "cardano": "Nami",
        "solana": "Phantom",
        "binance": "Metamask",
        "polygon": "Metamask"
    })[blockchain]
}

export const timeFomat = (value) => {
    const date = new Date(value)
    return monthsKey[date.getMonth()] + " " + date.getFullYear()
}

export const removeLocalStorageItem = (key) => {
    return localStorage.removeItem(key)
}

export const setLocalStorageItem = (key, data) => {
    return localStorage.setItem(key, data)
}

export const getLocalStorageItem = (key) => {
    return localStorage.getItem(key)
}

export const notification = (message, type) => {
    toast(message, {
        type,
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
    })
    return true
}
export const aboutHours = (data) => {
    const diff = (new Date(data * 1000).getTime() - new Date().getTime()) / 1000 / 3600
    return Math.round(diff)
}

export const replaceIpfsUrl = (data) => {
    if (data) {
        return data.replace("ipfs://", "https://ipfs.io/ipfs/")
    } else {
        return data
    }
}

export const sliceLongString = (data, length = 3) => {
    if (!data) return;
    data = data.toString();
    if (data.length > 7) {
        return data.slice(0, length) + "..." + data.slice((length * -1))
    } else {
        return data
    }
}
export const sliceLongString1 = (data, length = 15) => {
    if (!data) return;
    data = data.toString();
    if (data.length > 20) {
        return data.slice(0, length) + "..."
    } else {
        return data
    }
}
export const getDate = (time) => {
    const date = new Date(time).valueOf()
    const current = new Date().valueOf()
    if ((current - date) < 1000 * 60 * 5) {
        return "5 minutes ago"
    } else if (current - date < 1000 * 60 * 15) {
        return "15 minutes ago"
    } else if (current - date < 1000 * 60 * 30) {
        return "30 minutes ago"
    } else if (current - date < 1000 * 60 * 60) {
        return "an hour ago"
    } else if (current - date < 1000 * 3600 * 24) {
        return "a few hours ago"
    } else if (current - date > 1000 * 3600 * 24) {
        return "a few days ago"
    }
}

export const coinIcons = {
    "cardano": CardanoIcon.src,
    "ethereum": EtherumIcon.src,
    "solana": SolanaIcon.src,
    "polygon": PolygonIcon.src,
    "bianace": BinanceIcon.src
}

export const getCoinIcons = (data) => {
    if (data) {
        if (coinIcons[data.toLowerCase()]) {
            return coinIcons[data.toLowerCase()]
        } else {
            return coinIcons["cardano"]
        }
    } else {
        return coinIcons["cardano"]
    }
}

export const smallestDenomi = {
    "cardano": Math.pow(10, 6),
    "ethereum": Math.pow(10, 18),
    "solana": Math.pow(10, 9),
    "polygon": Math.pow(1, 1),
    "bianace": Math.pow(10, 8)
}
export const unit = {
    "cardano": "ADA",
    "ethereum": "ETH",
    "solana": "SOL",
    "polygon": "MAT",
    "bianace": "BNB",
}
export const getUnit = (data) => {
    return unit[data]
}

export const randomColor = () => {
    return "#" + Math.random().toString(16).substr(-6)
}
export const compare = (a, b) => {
    if (a.amount > b.amount) {
        return -1;
    }
    if (a.amount < b.amount) {
        return 1;
    }
    return 0;
}
export const getRealPrice = (price, type) => {
    let intprice = Number(price)
    let result = 0
    if (!type) {
        return "no certain"
    }
    if (!intprice) {
        return 0
    }
    const divider = smallestDenomi[type.toLowerCase()];
    if (divider) {
        result = (intprice / divider).toFixed(intprice > divider ? 1 : 4)
    }
    return result
}

export const generateId = () => {
    return Math.random().toString(16).slice(2)
}

export const socialBaseUrls = {
    discord: "https://discord.com/",
    instagram: "https://instagram.com/",
    twitter: "https://twitter.com/"
}

export const getEvmContract = (chainId) => {
    if (isDevMode) {

    }
}
//contracts
export const networkInfo = {
    1: {
        name: "ETHEREUM",
        symbol: "ETH",
        marketplaceContract: "",
        collectionManagerContract: ""
    },
    5: {
        name: "ETHEREUM",
        symbol: "ETH",
        marketplaceContract: "0xb5b60C3A67095A435D2935BC15092EF26872cc30",
        collectionManagerContract: "0xE57EC5720e820B1DD15EE637Dae65e76e5A6C998"
    },
    56: {
        name: "BINANCE",
        symbol: "BNB",
        mintContract: "",
        marketplaceContract: ""
    },
    97: {
        name: "BINANCE",
        symbol: "BNB",
        marketplaceContract: "0xc6333E0e6D1782096E5B10691C0B31B47C4Dd9ca",
        collectionManagerContract: ""
    },
    137: {
        name: "POLYGON",
        symbol: "MATIC",
        marketplaceContract: "",
        collectionManagerContract: ""
    },
    80001: {
        name: "POLYGON",
        symbol: "MATIC",
        marketplaceContract: "0x4aa4743f4bbb5007968866991e8f09f7c74dfed3",
        collectionManagerContract: ""
    }
}

const supportMainChainIds = {
    metamask: [1, 56, 137],
    coinbase: [1, 56, 137],
}
const supportTestChainIds = {
    metamask: [5, 97, 80001],
    coinbase: [5, 97, 80001],
}
export const getSupportedChainIds = (wallet) => {
    wallet = wallet.toLowerCase();
    if (isDevMode) {
        return supportTestChainIds[wallet];
    } else {
        return supportMainChainIds[wallet];
    }
}

export const getChainId = (chainName) => {
    if (isDevMode) {
        switch (chainName) {
            case 'ethereum':
                return 5;
            case 'polygon':
                return 80001;
            case 'binance':
                return 97;
            case 'cardano':
                return 0;
        }
    } else {
        switch (chainName) {
            case 'ethereum':
                return 1;
            case 'polygon':
                return 137;
            case 'binance':
                return 56
            case 'cardano':
                return 1;
        }
    }
}

export const getUSDPrice = async (network) => {
    network = network.toLowerCase();
    const axiosInstance = getAxiosInstance();
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${network}&vs_currencies=usd`;
    const result = await axiosInstance
        .get(url)
        .then((response) => Promise.resolve(response.data))
        .catch((error) => {
            Promise.reject(error);
        });

    if (!result) return 0;
    return result[network]?.usd || 0;
}

export const getBlockchainTxScanUrl = (network) => {
    switch (network.toLowerCase()) {
        case 'cardano':
            return 'https://cardanoscan.io/transaction/';
        case 'ethereum':
            return 'https://etherscan.io/tx/';
        case 'polygon':
            return 'https://polygonscan.com/tx/';
        case 'binance':
            return 'https://bscscan.com/tx/';
        case 'solana':
            return 'https://solscan.io/tx/';
    }
}

export const getFormatedDate = (strDate) => {
    const date = new Date(strDate);
}

export const getBlockchainDecimalNumber = (blockchain, number) => {
    return (smallestDenomi[blockchain] || 1) * number;
}