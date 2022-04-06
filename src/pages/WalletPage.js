import { useEffect } from 'react'

import useStore from 'store'
import { useWalletActions } from 'services/useWalletActions'

function WalletPage() {
    const walletAddress = useStore(state => state.walletAddress)
    const phantomInstalled = useStore(state => state.phantomWalletInstalled)

    const { connectPhantomWallet } = useWalletActions()

    useEffect(() => { connectPhantomWallet() }, [])

    return (
        <div>
            <h1 className='heading'>WALLET PAGE</h1>
            {!phantomInstalled && <p>Please install Phantom Wallet Extension and try again. Thanks.</p>}
            {!walletAddress && <p>Please connect your Phantom Wallet. Thanks.</p>}
            {!walletAddress && <button onClick={connectPhantomWallet.bind(null, false)}>Connect Phantom Wallet</button>}
        </div>
    )
}

export default WalletPage