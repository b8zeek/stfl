import { useEffect } from 'react'

import useStore from 'store'

function WalletPage() {
    const walletAddress = useStore(state => state.walletAddress)
    const setWalletAddress = useStore(state => state.setWalletAddress)
    const phantomInstalled = useStore(state => state.phantomWalletInstalled)
    const setPhantomWalletInstalled = useStore(state => state.setPhantomWalletInstalled)

    const checkIfPhantomWalletConnected = async () => {
        try {
            const { solana } = window

            if (solana.isPhantom) {
                setPhantomWalletInstalled(true)

                const response = await solana.connect({ onlyIfTrusted: true })

                const walletAddress = response.publicKey.toString()

                setWalletAddress(walletAddress)
            } else {
                setPhantomWalletInstalled(false)
                window.open('https://phantom.app/', '_blank')
            }
        } catch (error) {
            console.error(error)
        }
    }

    const connectPhantomWallet = async () => {
        try {
            const { solana } = window

            if (solana?.isPhantom) {
                setPhantomWalletInstalled(true)

                const response = await solana.connect()

                const walletAddress = response.publicKey.toString()

                setWalletAddress(walletAddress)
            } else {
                setPhantomWalletInstalled(false)
                window.open('https://phantom.app/', '_blank')
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => { checkIfPhantomWalletConnected() }, [])

    return (
        <div>
            <h1 className='heading'>WALLET PAGE</h1>
            {!phantomInstalled && <p>Please install Phantom Wallet Extension and try again. Thanks.</p>}
            {!walletAddress && <p>Please connect your Phantom Wallet. Thanks.</p>}
            {!walletAddress && <button onClick={connectPhantomWallet}>Connect Phantom Wallet</button>}
        </div>
    )
}

export default WalletPage