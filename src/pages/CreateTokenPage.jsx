import { useState } from 'react'
import styled from 'styled-components'

import Heading from '@components/Heading'
import Paragraph from '@components/Paragraph'
import Button from '@components/Button'

import useStore from '@store'
import { useWalletActions } from '@services/useWalletActions'

const WalletAccount = ({ account: { name, publicKey }, onClick }) =>
    <ItemContainer onClick={onClick}>
        <Heading size='small'>Name: {name}</Heading>
        <Heading size='small'>Public address: {publicKey}</Heading>
    </ItemContainer>

const TokenItem = ({ token: { tokenAddress, mintAuthorityPublicKey }, onClick }) =>
    <ItemContainer onClick={onClick}>
        <Heading size='small'>Token Address: {tokenAddress}</Heading>
        <Heading size='small'>Mint Authority: {mintAuthorityPublicKey}</Heading>
    </ItemContainer>

function CreateTokenPage() {
    const walletAccounts = useStore(state => state.walletAccounts)
    const selectedAccount = useStore(state => state.selectedAccount)
    const setSelectedAccount = useStore(state => state.setSelectedAccount)
    const createdTokens = useStore(state => state.createdTokens)
    const selectedToken = useStore(state => state.selectedToken)
    const setSelectedToken = useStore(state => state.setSelectedToken)

    const { createNewWalletAccount, createNewToken, mintToken } = useWalletActions()

    const [walletName, setWalletName] = useState('')
    const [destination, setDestination] = useState('')

    return (
        <div>
            <Heading className='heading'>Create Token Page</Heading>
            <Paragraph>Welcome to Create Token Page, this is the place where you can create your own Solana token.</Paragraph>

            <Section>
                <Heading size='medium' style={{ marginBottom: '20px' }}>Create New Wallet</Heading>
                <Paragraph>In order to create a token, first you need to create a wallet which will have mint authority. Give it a name so you can remember it easy.</Paragraph>

                <input value={walletName} onChange={e => setWalletName(e.target.value)} />
                <Button onClick={createNewWalletAccount.bind(null, walletName)}>Generate New Wallet Account</Button>
            </Section>

            {walletAccounts.length !== 0 &&
                <Section>
                    <Heading size='medium' style={{ marginBottom: '20px' }}>Your Wallet Accounts</Heading>
                    {walletAccounts.map(account =>
                        <WalletAccount
                            key={account.publicKey}
                            account={account}
                            onClick={setSelectedAccount.bind(null, account)}
                        />
                    )}
                </Section>
            }

            <Section>
                <Heading size='medium' style={{ marginBottom: '20px' }}>Create New Token</Heading>
                <Paragraph>Please click on one of your wallets which you want to assign minting authority of the new token.</Paragraph>
                {selectedAccount &&
                    <>
                        <Heading size='small'>Selected Wallet</Heading>
                        <WalletAccount account={selectedAccount} />
                    </>
                }
                <Button onClick={createNewToken}>Create Token</Button>
            </Section>

            {createdTokens.length !== 0 &&
                <Section>
                    <Heading size='medium' style={{ marginBottom: '20px' }}>Created Tokens</Heading>
                    {createdTokens.map(token =>
                        <TokenItem
                            key={token.tokenAddress}
                            token={token}
                            onClick={setSelectedToken.bind(null, token)}
                        />
                    )}
                </Section>
            }

            <Section>
                <Heading size='medium' style={{ marginBottom: '20px' }}>Mint Token</Heading>
                <Paragraph>Select a token which you want to mint. After that enter the address of a wallet you want to send minted tokens to.</Paragraph>

                {selectedToken &&
                    <>
                        <Heading size='small'>Selected Token</Heading>
                        <TokenItem token={selectedToken} />
                    </>
                }

                <input value={destination} onChange={e => setDestination(e.target.value)} />
                <Button onClick={mintToken.bind(null, destination)}>Mint Selected Token</Button>
            </Section>
        </div>
    )
}

const ItemContainer = styled.div`
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 20px;
    padding: 20px;
    cursor: pointer;
    margin-bottom: 10px;
`

const Section = styled.div`
    margin-bottom: 20px;
`

export default CreateTokenPage