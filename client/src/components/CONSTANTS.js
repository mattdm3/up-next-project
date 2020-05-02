import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import { lightTheme } from './theme'


export const PageContainer = styled.div`
    /* padding: 0 8rem;  */
    width: 80%; 
    margin-left: auto; 
    margin-right: auto; 
    position: relative; 
`

export const StyledLink = styled(Link)`
    color: inherit; 
    text-decoration: inherit;
    
    
`

export const MutedText = styled.p`
    
`

export const StyledNavLink = styled(NavLink)`
    
`

export const BackgroundContainer = styled.div`
    width: 100%;
    height: 100%; 
    background: ${({ theme }) => theme === lightTheme ? "#1F209A" : "#1F209A"};
    z-index: -100;

`