import React from 'react'
import styled from 'styled-components'
import { IoIosArrowDropupCircle } from 'react-icons/io'

const UpButton = () => {

    const handleClick = () => {
        window.scrollTo(0, 0);
    }




    return (
        <StyledUpContainer onClick={() => handleClick()}>
            <IoIosArrowDropupCircle />
        </StyledUpContainer>
    )
}

const StyledUpContainer = styled.div`
    position: fixed; 
    right: 3rem;
    bottom: 3rem;
    font-size: 3rem;
    cursor: pointer;
`



export default UpButton; 