import Heading from '@components/Heading'
import Paragraph from '@components/Paragraph'

function HomePage() {
    return (
        <div>
            <Heading className='heading'>Home Page</Heading>
            <Paragraph>Welcome to STFL, it is good to have you here!</Paragraph>
            <Paragraph>This application is created for learning and testing purposes of Solana blockchain. It uses solana-labs libraries for interaction with the blockchain. Primary purpose of the application is usage of Solana's token program to create and mint new tokens but it can connect to Phantom Wallet and airdrop SOL tokens.</Paragraph>
            <Paragraph>P.S. Application currently uses only devnet.</Paragraph>
        </div>
    )
}

export default HomePage