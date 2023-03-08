import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import { CoinbaseWallet, Injected } from '/src/utils/connectors'
import { useWeb3React } from '@web3-react/core'
import { useWallet } from '@solana/wallet-adapter-react'
import { BrowserWallet } from "@meshsdk/core"

import { setUserData } from "/src/redux/actions/user"
import { setWalletData } from "/src/redux/actions/wallet"
import { networkInfo } from "/src/utils/utility"

const authContext = createContext();

function useAuth() {
    const dispatch = useDispatch()
    const [authed, setAuthed] = useState(false);
    const localStorageToken = localStorage.getItem('token');
    const [token, setToken] = useState(localStorageToken);

    const { select, publicKey, wallet, connected, disconnect } = useWallet()
    const { account, activate, deactivate, active, chainId, library } = useWeb3React()

    const base58 = useMemo(() => publicKey?.toBase58(), [publicKey])
    const content = useMemo(() => {
        if (!wallet || !base58) return null
        return base58.slice(0, 8) + '..' + base58.slice(-3)
    }, [wallet, base58])

    const handleNamiWallet = async () => {
        const namiWallet = await BrowserWallet.enable('nami');
        const changeAddress = await namiWallet.getChangeAddress()
        const networkId = await namiWallet.getNetworkId()
        const obj = {
            content: changeAddress.slice(0, 8) + '..' + changeAddress.slice(-3),
            address: changeAddress,
            name: "Nami",
            network: "CARDANO",
            index: 2
        }
        const result = {
            wallet: obj.name,
            address: obj.address,
            token: {
                address: changeAddress,
                chainId: networkId,
            },
            chainId: networkId,
            networkVersion: obj.network,
            network: obj.network,
            currencyName: "ADA"
        }
        dispatch(setWalletData(result))
        dispatch(setUserData(obj))
        setAuthed(true)
    }

    // useEffect(() => {
    //     window.localStorage.setItem("provider", '')
    // }, [])

    useEffect(() => {

        const provider = localStorage.getItem("provider")
        if (provider === "Coinbase") {
            if (active && account) {
                const obj = {
                    content: account.slice(0, 8) + '..' + account.slice(-3),
                    address: account,
                    name: provider,
                    network: "BINANCE",
                    index: 0
                }
                const result = {
                    wallet: obj.name,
                    address: obj.address,
                    token: {
                        address: obj.address,
                        chainId: chainId,
                    },
                    chainId: chainId,
                    networkVersion: obj.network,
                    network: obj.network,
                    currencyName: "BNB"
                }
                dispatch(setWalletData(result))
                dispatch(setUserData(obj))
                setAuthed(true)
            }
        } else if (provider === "Metamask") {
            if (active && account) {
                const obj = {
                    content: account.slice(0, 8) + '..' + account.slice(-3),
                    address: account,
                    name: provider,
                    network: networkInfo[chainId].name,
                    index: 0
                }
                const result = {
                    wallet: obj.name,
                    address: obj.address,
                    token: {
                        address: obj.address,
                        chainId: chainId,
                    },
                    chainId: chainId,
                    networkVersion: obj.network,
                    network: obj.network,
                    currencyName: networkInfo[chainId].symbol
                }
                dispatch(setWalletData(result))
                // dispatch(setUserData(obj))
                setAuthed(true)
            }
        }
    }, [account, chainId])

    useEffect(() => {
        const provider = localStorage.getItem("provider")
        if (publicKey && connected && provider === "Phantom") {
            const obj = {
                content: content,
                address: base58,
                name: "Phantom",
                network: "SOLANA",
                index: 1
            }
            const result = {
                wallet: obj.name,
                address: obj.address,
                token: {
                    address: obj.address,
                    chainId: chainId,
                },
                chainId: "",
                networkVersion: obj.network,
                network: obj.network,
                currencyName: "SOL"
            }
            dispatch(setWalletData(result))
            // dispatch(setUserData(obj))
            setAuthed(true)
        }
    }, [publicKey])

    useEffect(() => {
        async function fetchData() {
            setTimeout(async () => {
                const provider = localStorage.getItem("provider")
                if (provider) {
                    if (provider === "Metamask") {
                        await activate(Injected)
                    } else if (provider === "Coinbase") {
                        await activate(CoinbaseWallet)
                    } else if (provider === "Phantom") {
                        select(provider)
                    } else if (provider === "Nami") {
                        const wallet = await window.cardano.enable('nami')
                        if (wallet) {
                            handleNamiWallet()
                        }
                    }
                }
            }, 1000)
        }
        fetchData()
    }, [])

    return {
        token,
        authed,
        setAuthed,
        setLoginToken(token) {
            setAuthed(true);
            setToken(token);
            localStorage.setItem('token', token)
        },
        setLogoutToken() {
            setAuthed(false);
            setToken(false);
            localStorage.delete('token')
        }
    };
}

export function AuthProvider({ children }) {
    const auth = useAuth();
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setIsMounted(true)
        }, 2000);
    }, [])

    if (!isMounted) {
        return null
    }

    if (isMounted) {
        return (
            <authContext.Provider value={auth}>
                {children}
            </authContext.Provider>
        );
    }

}

export default function AuthConsumer() {
    return useContext(authContext);
}
