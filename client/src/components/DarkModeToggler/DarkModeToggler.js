import React, { useState } from 'react';
import styled from 'styled-components';




const DarkModeToggler = ({ toggleTheme, theme }) => {

    const isLight = theme === 'light';

    return (
        <>
            <StyledButton onClick={toggleTheme}>{theme == "light" ? "🌒" : "☀️"}</StyledButton>
        </>
    )

}

const StyledButton = styled.button`
    border: none; 
    background: none; 
    font-size: 2rem; 
`

export default DarkModeToggler; 