import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';



export const StyledLink = styled(Link)`
    margin: 0 2.3rem; 
    position: relative; 
`

export const StyledPoster = styled.img`
    border-radius: 10px; 
`

export const Container = styled.div`
    position: relative;
    height: 100%; 
    width: 100%; 
    margin-left: auto;
    margin-right: auto; 
    margin: 6rem 0; 
`

export const StyledScrollLeft = styled.div`
    position: absolute; 
    left: -4rem;
    top: 50%;  
    z-index: 10; 
    font-size:4rem; 
    cursor: pointer;

`
export const StyledScrollRight = styled.div`
    position: absolute; 
    right: -4rem;
    top: 50%;  
    z-index: 10; 
    font-size:4rem; 
    cursor: pointer;

`


export const Wrapper = styled.div`
    overflow: auto;
    white-space: nowrap;
    width: 100%;
    display: flex;
    overflow: hidden; 

    a {
        text-decoration: none;
    }



/* @media only screen and (max-width: 600px) {
    overflow-y: hidden;
    
} */
`
export const SubHeading = styled.h3`
    margin: 4rem 0; 
    font-weight: 700; 
`


export const StyledMovieContainer = styled.div`
    display: flex; 
    /* flex-wrap: wrap;  */
    overflow-x: scroll;
    justify-content: space-between; 

`