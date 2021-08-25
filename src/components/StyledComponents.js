import React from 'react'
import Styled from 'styled-components'


const StyledTitle = Styled.div`
    font-weight: bold;
    font-size: 3em;
`;

export const Title = ({ children }) => {
    return (
        <StyledTitle>{ children }</StyledTitle>
    )
}