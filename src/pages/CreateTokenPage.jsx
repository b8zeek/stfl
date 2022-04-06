import Heading from '../components/Heading'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'

import { useWalletActions } from '../services/useWalletActions'

function CreateTokenPage() {
    const { createNewToken, mintToken } = useWalletActions()

    return (
        <div>
            <Heading className='heading'>Create Token Page</Heading>
            <Paragraph>Welcome to Create Token Page, this is the place where you can create your own Solana token.</Paragraph>
            <Button onClick={createNewToken}>Create New Token</Button>
            <br></br>
            <Button onClick={mintToken}>Mint Test</Button>
        </div>
    )
}

export default CreateTokenPage