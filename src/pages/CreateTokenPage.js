import Heading from 'components/Heading'
import Paragraph from 'components/Paragraph'
import Button from 'components/Button'

import useStore from 'store'
import { useWalletActions } from 'services/useWalletActions'

function CreateTokenPage() {

    return (
        <div>
            <Heading className='heading'>Create Token Page</Heading>
            <Paragraph>Welcome to Create Token Page, this is the place where you can create your own Solana token.</Paragraph>
        </div>
    )
}

export default CreateTokenPage