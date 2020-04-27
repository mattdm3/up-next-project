import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import DarkModeToggler from './DarkModeToggler'

const Navbar = ({ theme, toggleTheme }) => {
    return (
        <StyledNav>
            <StyledUl>
                <li>
                    <Hamburger>
                    //
                    </Hamburger>
                </li>
                <NavigationLink exact to='/'>
                    <li>🍿Up Next</li>
                </NavigationLink>
                <NavigationLink to='/genres/action'>
                    <li>Browse</li>
                </NavigationLink>
                <NavigationLink exact to='/'>
                    <li>Login</li>
                </NavigationLink>
                <NavigationLink exact to='/'>
                    <li>See Recommended</li>
                </NavigationLink>
                <NavigationLink exact to='/'>
                    <li>🍿</li>
                </NavigationLink>

                <DarkModeToggler theme={theme} toggleTheme={toggleTheme} />

            </StyledUl>

        </StyledNav>
    )
}

const Hamburger = styled.div`

`

const StyledNav = styled.nav`
    width: 90%;
    margin-left: auto;
    margin-right: auto; 
    border: 1px solid red;  
`

const StyledUl = styled.ul`
    text-decoration: none;
    list-style: none; 
    display: flex; 
    width: fit-content;

    border: 1px solid green; 

    li {
        padding: 20px
    }
    
    li:first-of-type {
        padding-left: 0; 
    }
`

const NavigationLink = styled(NavLink)`
    text-decoration: none;
    color: inherit;
    font-weight: 600; 
    transition-duration: 400ms; 
`

export default Navbar; 