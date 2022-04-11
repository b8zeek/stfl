import Heading from '@components/Heading'
import Paragraph from '@components/Paragraph'
import Button from '@components/Button'

import useStore from '@store'
import { useWalletActions } from '@services/useWalletActions'

function AirdropPage() {
    const walletAddress = useStore(state => state.walletAddress)
    const walletBalance = useStore(state => state.walletBalance)

    const { getWalletBalance, airdropSol } = useWalletActions()

    return (
        <div>
            <Heading className='heading'>Airdrop Page</Heading>
            <Paragraph>Welcome to Airdrop Page, this is the place where you can airdrop some SOL coins to your connected Phantom Wallet's SOL account.</Paragraph>

            {walletAddress && walletBalance===null && <Button onClick={getWalletBalance}>Get Wallet Balance</Button>}
            {walletAddress && walletBalance!==null && <Heading size='medium'>Wallet Balance: {walletBalance} Lamports</Heading>}

            {walletAddress && walletBalance!==null && <Button onClick={airdropSol}>Airdrop 1 SOL</Button>}
        </div>
    )
}

export default AirdropPage