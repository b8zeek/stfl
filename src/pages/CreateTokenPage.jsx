import { useState } from 'react'
import styled from 'styled-components'

import Heading from '@components/Heading'
import Paragraph from '@components/Paragraph'
import Button from '@components/Button'

import useStore from '@store'
import { useWalletActions } from '@services/useWalletActions'

const WalletAccount = ({ name, publicKey }) =>
    <WalletAccountContainer>
        <Heading size='small'>Name: {name}</Heading>
        <Heading size='small'>Public address: {publicKey}</Heading>
    </WalletAccountContainer>

function CreateTokenPage() {
    const walletAccounts = useStore(state => state.walletAccounts)
    const { createNewWalletAccount, createNewToken, mintToken } = useWalletActions()

    const [walletName, setWalletName] = useState('')

    return (
        <div>
            <Heading className='heading'>Create Token Page</Heading>

            <Paragraph>Welcome to Create Token Page, this is the place where you can create your own Solana token.</Paragraph>

            <Paragraph>In order to create a token, first you need to create a wallet which will have mint authority. Give it a name so you can remember it easy.</Paragraph>

            <CreateWalletSection>
                <input value={walletName} onChange={e => setWalletName(e.target.value)} />
                <Button onClick={createNewWalletAccount.bind(null, walletName)}>Create New Wallet Account</Button>
            </CreateWalletSection>

            {walletAccounts.map(account =>
                <WalletAccount key={account.publicKey} publicKey={account.publicKey} name={account.name} />
            )}

            <br></br>
            <Button onClick={mintToken}>Mint Test</Button>
        </div>
    )
}

const WalletAccountContainer = styled.div`
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 20px;
    padding: 20px;
    cursor: pointer;
    margin-bottom: 10px;
`

const CreateWalletSection = styled.div`
    margin-bottom: 20px;
`

export default CreateTokenPage