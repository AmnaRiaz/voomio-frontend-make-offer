import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { getSupportedChainIds } from './utility'

import { Web3Provider } from '@ethersproject/providers'

export const getLibrary = (provider) => {
    const library = new Web3Provider(provider, 'any')
    library.pollingInterval = 15000
    return library
}

export const Injected = new InjectedConnector({
    supportedChainIds: getSupportedChainIds('metamask')
});

export const CoinbaseWallet = new WalletLinkConnector({
    url: `https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161`,
    appName: 'voomio',
    supportedChainIds: getSupportedChainIds('coinbase')
})

export const WalletConnect = new WalletConnectConnector(
    {
        rpc: { 43114: "https://api.avax.network/ext/bc/C/rpc" },
        bridge: "https://bridge.walletconnect.org",
        qrcode: true,
        pollingInterval: 12000
    },
    {
        rpc: { 97: "https://data-seed-prebsc-1-s1.binance.org:8545" },
        qrcode: true,
        pollingInterval: 12000
    },
)

export const switchNetwork = async (chainId, status = false) => {
    chainId = '0x' + chainId.toString(16);
    try {
        const provider = window
        if (provider.ethereum) {
            const currentChainId = await provider.ethereum.request({ method: 'eth_chainId' })
            console.log(currentChainId);
            if (currentChainId === chainId) return
            try {
                await provider.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId }]
                })
            } catch (switchError) {
                console.log(switchError)
            }
        } else if (!status) {
            window.open('https://metamask.io/download/')
        }
    } catch (error) {
        console.log(error)
    }
}
