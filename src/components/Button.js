import styled from 'styled-components'

const Button = ({ size, onClick, children }) =>
    <StyledButton
        size={size}
        onClick={onClick}
    >
        {children}
    </StyledButton>

const StyledButton = styled.button`
    height: 40px;
    color: white;
    background-color: rgba(220, 31, 255, 0.2);
    border: 1px solid rgba(220, 31, 255, 0);
    border-radius: 20px;
    padding: 0 20px;
    font-size: 16px;
    font-family: Inter, sans-serif;
    font-weight: 500;
    cursor: pointer;

    &:hover {
        background-color: rgba(220, 31, 255, 0.4);
        border: 1px solid rgba(255, 255, 255, 0.4);
    }
`

export default Button