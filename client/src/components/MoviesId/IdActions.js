import React, { useContext, useState } from "react";
import styled, { keyframes } from 'styled-components';
import { LoginContext } from '../LoginContext';
import { lightTheme } from '../theme';


const IdActions = ({ movieId }) => {

    const { handleMovieLike, handleMovieDislike, appUser, signInWithGoogle, handleAddUpNext } = useContext(LoginContext);

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

    const handleUpNext = (e) => {
        e.preventDefault();

        if (appUser.email) {
            handleAddUpNext(movieId)
        } else {
            alert("Please make an account or login first.")
        }

    }


    return (
        <StyleActionContainer>
            <p onClick={(e) => handleLike(e)}>👍🏼</p>
            <p onClick={(e) => handleUpNext(e)}>🍿</p>
            <p onClick={(e) => handleDislike(e)}>👎🏼</p>
        </StyleActionContainer>
    )
}

const StyleActionContainer = styled.div`
    display: flex; 
    z-index: 50;
    margin-left: 1rem;



    p {
        font-size: 1.2rem;
        margin-right: .5rem;
        padding: 12px; 
        background:   ${({ theme }) => theme === lightTheme ? "#232476" : "#F3F4FD"};
        border-radius: 50%; 
        margin-right: 1rem;
        cursor: pointer;

        &:hover {
            background: grey; 
        }
    }

`

export default IdActions; 