import { useState } from 'react'

import Heading from '@components/Heading'
import Paragraph from '@components/Paragraph'
import Button from '@components/Button'

import useStore from '@store'
import { useWalletActions } from '@services/useWalletActions'

function CreateTokenPage() {
    const walletAccounts = useStore(state => state.walletAccounts)
    const { createNewWalletAccount, createNewToken, mintToken } = useWalletActions()

    const [walletName, setWalletName] = useState('')

    return (
        <div>
            <Heading className='heading'>Create Token Page</Heading>

            <Paragraph>Welcome to Create Token Page, this is the place where you can create your own Solana token.</Paragraph>
            <Paragraph>In order to create a token, first you need to create a wallet which will have mint authority. Give it a name so you can remember it easy.</Paragraph>
            <input value={walletName} onChange={e => setWalletName(e.target.value)} />
            <Button onClick={createNewWalletAccount.bind(null, walletName)}>Create New Wallet Account</Button>

            {walletAccounts.map(wallet => <div key={wallet.publicKey}>
                <Heading size='small'>Name: {wallet.name}</Heading>
                <Heading size='small'>Public address: {wallet.publicKey}</Heading>
            </div>)}

            <br></br>
            <Button onClick={mintToken}>Mint Test</Button>
        </div>
    )
}

export default CreateTokenPage