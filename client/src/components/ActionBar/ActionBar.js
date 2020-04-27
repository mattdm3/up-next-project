import React from "react";
import styled from 'styled-components';

const ActionBar = () => {
    return (
        <StyleActionContainer>
            <p>👍🏼</p>
            <p>🍿</p>
            <p>👎🏼</p>
        </StyleActionContainer>
    )
}

const StyleActionContainer = styled.div`
    display: flex; 
    z-index: 50; 
`

export default ActionBar;