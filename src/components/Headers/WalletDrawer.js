import React, { useEffect, useState } from "react"
import {
    Box, Drawer, Divider
} from "@mui/material"
import { styles } from "../../assets/theme/components/header"
import { AccountCircle } from "@mui/icons-material"
import { useDispatch } from "react-redux"

import { CoinbaseWallet, Injected, switchNetwork } from '../../utils/connectors'
import { useWeb3React } from '@web3-react/core'
import { BrowserWallet } from "@meshsdk/core"
import { useWallet } from '@solana/wallet-adapter-react'
import { useWallet as useCardanoWallet } from '@meshsdk/react';

import { setUserData } from "../../redux/actions/user"
import { setWalletData } from "../../redux/actions/wallet"
import { getSupportedChainIds, networkInfo, notification, removeLocalStorageItem } from "../../utils/utility"

import Meta from "../../assets/image/component/icon/meta.svg"
import Coinbase from "../../assets/image/component/icon/coinbase.svg"
import Iternl from "../../assets/image/component/icon/iternl.svg"
import Nami from "../../assets/image/component/icon/nami.svg"
import Phantom from "../../assets/image/component/icon/phantom.svg"
import Typhon from "../../assets/image/component/icon/typhon.svg"
import Filnt from "../../assets/image/component/icon/flint.svg"
import Gero from "../../assets/image/component/icon/gero.svg"
import AuthConsumer from "../../pages/authContext";

export default function WalletDrawerCmp(props) {

    const { toggleDrawer, open } = props

    const dispatch = useDispatch()

    const { select, publicKey } = useWallet()
    const { activate, chainId, account } = useWeb3React()
    const { wallet, connected, name: cardanoWalletName, connecting, connect, disconnect, error } = useCardanoWallet();
    const [selectedWalletName, setWalletName] = useState('');
    const { setAuthed } = AuthConsumer()

    const setProvider = (type) => {
        window.localStorage.setItem("provider", type)
        setWalletName(type)
    }

    const handleClick = async (type) => {
        removeLocalStorageItem("token")
        if (type === "Metamask") {
            if (!window.ethereum) {
                toggleDrawer(false)
                notification('Please install Metamask wallet', 'error')
                return
            }
            if (getSupportedChainIds(type).indexOf(chainId) == -1) {
                await switchNetwork(getSupportedChainIds(type)[0]);
            }
            setProvider("Metamask")
            activate(Injected)
            toggleDrawer(false)
        } else if (type === "Coinbase") {
            setProvider("Coinbase")
            activate(CoinbaseWallet)
            toggleDrawer(false)
        } else if (type === "Nami") {
            setProvider("Nami")
            toggleDrawer(false)
            if (!window.cardano || !window.cardano.nami) {
                notification('Please install Nami wallet', 'error')
                return
            }
        } else if (type === "Phantom") {
            if (!window.phantom) {
                toggleDrawer(false)
                notification('Please install Phantom wallet', 'error')
                return
            }

            setProvider("Phantom")
            select(type)
            toggleDrawer(false)
        } else {
            console.log(type)
        }
    }


    useEffect(() => {
        if (selectedWalletName) {
            (async function (wn) {
                let address, network, currency, networkId, balance = 0;
                if (wn === 'Nami') {
                    const namiWallet = await BrowserWallet.enable('nami');
                    address = await namiWallet.getChangeAddress()
                    networkId = await namiWallet.getNetworkId()
                    balance = await namiWallet.getBalance();
                    network = 'CARDANO';
                    currency = 'ADA';
                } else if (wn === 'Phantom') {
                    if (publicKey) {
                        address = publicKey ? publicKey.toBase58() : '';
                        networkId = -1
                        network = 'SOLANA';
                        currency = 'SOL';
                    }
                } else {
                    if (chainId && account) {
                        address = account;
                        networkId = chainId;
                        network = networkInfo[chainId]?.name;
                        currency = networkInfo[chainId]?.symbol;
                    }
                }

                if (address) {
                    const obj = {
                        content: address.slice(0, 8) + '..' + address.slice(-3),
                        address: address,
                        name: wn,
                        network: network,
                        index: 2
                    }
                    const result = {
                        wallet: obj.name,
                        address: obj.address,
                        token: {
                            address: obj.address,
                            chainId: networkId,
                        },
                        chainId: networkId,
                        balance: balance,
                        networkVersion: obj.network,
                        network: obj.network,
                        currencyName: currency
                    }
                    dispatch(setWalletData(result))
                    dispatch(setUserData(obj))
                    setAuthed(true)
                }
            })(selectedWalletName)
        }
    }, [selectedWalletName, chainId, account, publicKey])

    return (
        <React.Fragment>
            <Drawer
                sx={styles.walletDrawer}
                anchor={"right"}
                open={open}
                onClose={() => { toggleDrawer(false) }}
            >
                <Box>
                    <Box sx={styles.walletDrawerHeader}>
                        <AccountCircle />
                        <Box ml={1} component={"span"}>My Wallet</Box>
                    </Box>
                    <Divider />
                    <Box sx={styles.walletDrawerContent}>
                        <Box component={"span"}>If you don't have a wallet yet, you can select a provider and create one now.</Box>
                        <Box my={4} sx={styles.walletDrawerContentList}>
                            <Box sx={styles.walletDrawerList} onClick={() => { handleClick("Metamask") }}>
                                <Box sx={styles.walletDrawerListItem}>
                                    <Box mr={1} component='img' src={Meta.src}></Box>
                                    <Box>MataMask</Box>
                                </Box>
                                <Box>
                                    <Box sx={styles.popularBadge} >Popular</Box>
                                </Box>
                            </Box>
                            <Box sx={styles.walletDrawerList} onClick={() => { handleClick("Coinbase") }}>
                                <Box sx={styles.walletDrawerListItem}>
                                    <Box mr={1} component='img' src={Coinbase.src}></Box>
                                    <Box>Coinbase Wallet</Box>
                                </Box>
                            </Box>
                            <Box sx={styles.walletDrawerList} onClick={() => { handleClick("Nami") }}>
                                <Box sx={styles.walletDrawerListItem}>
                                    <Box mr={1} component='img' src={Nami.src}></Box>
                                    <Box>Nami</Box>
                                </Box>
                            </Box>
                            <Box sx={styles.walletDrawerList} onClick={() => { handleClick("Phantom") }}>
                                <Box sx={styles.walletDrawerListItem}>
                                    <Box mr={1} component='img' src={Phantom.src}></Box>
                                    <Box>Phantom</Box>
                                </Box>
                            </Box>
                            <Box sx={styles.walletDrawerList} onClick={() => { handleClick("Eternl") }}>
                                <Box sx={styles.walletDrawerListItem}>
                                    <Box mr={1} component='img' src={Iternl.src}></Box>
                                    <Box>Eternl</Box>
                                </Box>
                            </Box>
                            <Box sx={styles.walletDrawerList} onClick={() => { handleClick("Flint") }}>
                                <Box sx={styles.walletDrawerListItem}>
                                    <Box mr={1} component='img' src={Filnt.src}></Box>
                                    <Box>Flint Wallet</Box>
                                </Box>
                            </Box>
                            <Box sx={styles.walletDrawerList} onClick={() => { handleClick("Gero") }}>
                                <Box sx={styles.walletDrawerListItem}>
                                    <Box mr={1} component='img' src={Gero.src}></Box>
                                    <Box>Gero Wallet</Box>
                                </Box>
                            </Box>
                            <Box sx={styles.walletDrawerList} onClick={() => { handleClick("Typhon") }}>
                                <Box sx={styles.walletDrawerListItem}>
                                    <Box mr={1} component='img' src={Typhon.src}></Box>
                                    <Box>Typhon Wallet</Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Drawer>
        </React.Fragment>
    )
}