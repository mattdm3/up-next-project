import React from 'react';
import styled from 'styled-components';

import { FaMoon } from 'react-icons/fa'
import { FiSun } from 'react-icons/fi'


const DarkModeToggler = ({ toggleTheme, theme }) => {

    // const isLight = theme === 'light';

    return (
        <>
            <StyledButton onClick={toggleTheme}>{theme === "light" ? <StyledMoon /> : <StyledSun />}</StyledButton>
        </>
    )

}

const StyledButton = styled.button`
    border: none; 
    background: none; 
    font-size: 1rem; 
    cursor: pointer; 
`

const StyledMoon = styled(FaMoon)`
    color: #1F209A; 
`
const StyledSun = styled(FiSun)`
    color: #FFD93B; 
`


export default DarkModeToggler; 