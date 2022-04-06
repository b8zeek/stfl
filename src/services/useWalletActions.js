import useStore from 'store'

import { useState } from 'react'

export function useWalletActions() {
    const setWalletAddress = useStore(state => state.setWalletAddress)
    const setPhantomWalletInstalled = useStore(state => state.setPhantomWalletInstalled)

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

    return {
        loading,
        visitPhantomWallet,
        connectPhantomWallet
    }
}