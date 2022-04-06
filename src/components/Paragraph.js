import styled from 'styled-components'

const Paragraph = ({ size, children }) =>
    <StyledParagraph size={size}>{children}</StyledParagraph>

const StyledParagraph = styled.p`
    line-height: 24px;
    color: white;
    font-size: ${props => props.size === 'big' ? '24px' : '18px'};
    font-family: Inter, sans-serif;
    margin-bottom: 20px;
`

export default Paragraph