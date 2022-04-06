import { useEffect } from 'react'

import Heading from 'components/Heading'
import Paragraph from 'components/Paragraph'
import Button from 'components/Button'

import useStore from 'store'
import { useWalletActions } from 'services/useWalletActions'

function WalletPage() {
    const walletAddress = useStore(state => state.walletAddress)
    const phantomInstalled = useStore(state => state.phantomWalletInstalled)

    const {
        loading,
        visitPhantomWallet,
        connectPhantomWallet
    } = useWalletActions()

    useEffect(() => { connectPhantomWallet() }, [])

    return (
        <div>
            <h1 className='heading'>Wallet Page</h1>
            <Paragraph>STFL currently supports only Phantom Wallet so in order to use the application you'll have to create one if you don't have it already. We are looking to add support for other providers in the future</Paragraph>

            {loading ?
                <Heading size='medium'>Loading...</Heading> :
                <>
                    {!phantomInstalled && <Paragraph size='big'>Please install Phantom Wallet. Thanks.</Paragraph>}
                    {!phantomInstalled && <Button onClick={visitPhantomWallet}>Visit Phantom Wallet</Button>}

                    {!walletAddress && <Paragraph size='big'>Please connect your Phantom Wallet. Thanks.</Paragraph>}
                    {!walletAddress && <Button onClick={connectPhantomWallet.bind(null, false)}>Connect Phantom Wallet</Button>}

                    {walletAddress && <Heading size='medium'>Wallet connected.</Heading>}
                    {walletAddress && <Heading size='medium'>Address: {walletAddress}</Heading>}
                </>
            }
        </div>
    )
}

export default WalletPage