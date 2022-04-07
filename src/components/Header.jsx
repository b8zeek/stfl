import styled from 'styled-components'

import Heading from '@components/Heading'
import { Link } from 'react-router-dom'

import useStore from '@store'

function Header() {
    const walletAddress = useStore(state => state.walletAddress)

    return (
        <Container>
            <StyledHeading size='big'>STFL</StyledHeading>
            <StyledLink to='/'>Home</StyledLink>
            <StyledLink to='/wallet'>Wallet</StyledLink>
            {walletAddress && <>
                <StyledLink to='/airdrop'>Airdrop</StyledLink>
                <StyledLink to='/create-token'>Create Token</StyledLink>
            </>}
            <StyledLink to='/about'>About</StyledLink>
        </Container>
    )
}

const Container = styled.div`
    width: 80%;
    height: 80px;
    background-color: rgba(0, 0, 0, 0.2);
    padding: 0 10%;
`
const StyledHeading = styled(Heading)`
    display: inline-block;
    vertical-align: top;
    line-height: 80px;
    font-weight: 900;
    margin-right: 10px;
    background: -webkit-linear-gradient(#00FFA3, #03E1FF, #DC1FFF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`
const StyledLink = styled(Link)`
    display: inline-block;
    vertical-align: top;
    line-height: 80px;
    font-size: 16px;
    font-family: 'Inter', sans-serif;
    color: white;
    text-decoration: none;
    padding: 0 10px;
`

export default Header