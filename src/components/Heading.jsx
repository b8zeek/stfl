import { createElement } from 'react'

function Heading({ size, children, ...props }) {
    const sizes = {
        big: 'h1',
        medium: 'h2',
        small: 'h3'
    }

    return createElement(
        sizes[size] || 'h1',
        props,
        children
    )
}

export default Heading