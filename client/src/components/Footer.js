import React from 'react'
import styled from 'styled-components'
import { lightTheme } from './theme';

const Footer = () => {
    return (
        <StyledFooter>
            <Logo>🍿 Up <span>Next</span></Logo>
            <div>
                <Muted>Copyright &#169; 2020 | <span>upnext.com</span></Muted>
            </div>

        </StyledFooter>
    )
}

const StyledFooter = styled.footer`
    height: 150px; 
    font-size: .9rem;
    padding: 60px 100px; 
    margin-top: 100px; 
    /* border-top: 1px solid #D4D5D9; */
    display: flex;
    align-items: center; 
    justify-content: space-between;

    background:  ${({ theme }) => theme === lightTheme ? "#999BFB" : "#03033D"};
  

`

const Muted = styled.p`
    padding: 0 1rem; 
    font-size: .8rem;
    font-weight: 400; 
    color: ${({ theme }) => theme === lightTheme ? "#BBBBBB" : "#BBBBBB"};

    span {
        font-weight: 700; 
        
    }
`


const Logo = styled.p`

    padding:0; 
    margin: 0; 
    margin-right: 1rem;
    font-size: 1.8rem; 
    font-weight: 400; 
    font-family: "Raleway";
    color: #999BFB;
    color:  ${({ theme }) => theme === lightTheme ? "#999BFB" : "#7879B7"};

    span {
        font-weight: 700; 
        color:  ${({ theme }) => theme === lightTheme ? "#1E209A" : "white"};
    }

`

export default Footer; 