import { useState } from 'react'
import {
    PublicKey,
    Connection,
    clusterApiUrl
} from '@solana/web3.js'

import useStore from 'store'

export function useWalletActions() {
    const walletAddress = useStore(state => state.walletAddress)
    const setWalletAddress = useStore(state => state.setWalletAddress)
    const setPhantomWalletInstalled = useStore(state => state.setPhantomWalletInstalled)
    const setWalletBalance = useStore(state => state.setWalletBalance)

    const [loading, setLoading] = useState(true)

    const visitPhantomWallet = () => window.open('https://phantom.app/', '_blank')

    const connectPhantomWallet = async (onlyIfTrusted = true) => {
        setLoading(true)

        try {
            const { solana } = window

            if (solana?.isPhantom) {
                setPhantomWalletInstalled(true)

                const response = onlyIfTrusted ?
                await solana.connect({ onlyIfTrusted: true }) :
                await solana.connect()

                const walletAddress = response.publicKey.toString()

                setWalletAddress(walletAddress)
            } else {
                setPhantomWalletInstalled(false)
                if (!onlyIfTrusted) visitPhantomWallet()
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const getWalletBalance = async () => {
        try {
            const publicKey = new PublicKey(walletAddress)
            const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
            const walletBalace = await connection.getBalance(publicKey)

            setWalletBalance(walletBalace)
        } catch (error) {
            console.error(error)
        }
    }

    return {
        loading,
        visitPhantomWallet,
        connectPhantomWallet,
        getWalletBalance
    }
}