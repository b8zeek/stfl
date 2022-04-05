import styled from 'styled-components'

import Heading from './Heading'

function Header() {
    return (
        <Container>
            <StyledHeading type='big'>STFL</StyledHeading>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 80px;
    background-color: rgba(0, 0, 0, 0.2);
    padding: 0 10%;
`
const StyledHeading = styled(Heading)`
    line-height: 80px;
    color: white;
`

export default Header