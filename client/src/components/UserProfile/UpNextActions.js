import React, { useContext, useState } from "react";
import styled, { keyframes } from 'styled-components';
import { LoginContext } from '../LoginContext';
import { lightTheme } from '../theme';

const UpNextActions = ({ movieId }) => {

    const { handleMovieLike, handleMovieDislike, appUser, handleAddUpNext } = useContext(LoginContext);

    const handleLike = (e) => {
        e.preventDefault();



        if (appUser.email) {
            handleMovieLike(movieId);
        }
        else {
            alert("Please make an account or login first.")
        }


    }

    const handleDislike = (e) => {
        e.preventDefault();

        if (appUser.email) {
            handleMovieDislike(movieId);
        } else {
            alert("Please make an account or login first.")
        }


    }



    return (

        <StyleActionContainer>
            <p onClick={(e) => handleLike(e)}>👍🏼</p>
            <p onClick={(e) => handleDislike(e)}>👎🏼</p>
        </StyleActionContainer>
    )
}


const StyleActionContainer = styled.div`
    display: flex; 
    z-index: 50;
    justify-content: space-evenly;
    width: 60%; 
    margin-top: 1.5rem;

    /* p:first-of-type {
        background: green;
    } */



    p {
        font-size: 1.4rem;
        margin-right: .5rem;
        padding: 15px; 
        background:   ${({ theme }) => theme === lightTheme ? "#232476" : "#F65F2D"};
        border-radius: 50%; 
        margin-right: 1rem;
        cursor: pointer; 

        &:hover {
            background: grey; 
        }
    }

`


const scaleUp = keyframes`
    0 {
        transform: scale(0);
    }
    50% {
        transform: scale(2);
    }
    100% {
        transform: scale(1);
    }
`

const ScaledButton = styled.div`
    animation: ${scaleUp} 700ms ease forwards; 
`

export default UpNextActions;