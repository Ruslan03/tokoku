import React from 'react'
import Styled from 'styled-components'

const StyledBlockUI = Styled.div`
    position: fixed;
    right: 0;
    left:0;
    height: 100vh;
    display: flex;
    align-items:center;
    justify-content: center;
    background: #fff;

`
const BlockUI = () => {
    return (
        <StyledBlockUI>
            <h1>Loading tokoku...</h1>
        </StyledBlockUI>
    )
}

export default BlockUI
