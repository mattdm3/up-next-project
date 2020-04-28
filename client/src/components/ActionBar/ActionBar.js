import React, { useContext, useState } from "react";
import styled from 'styled-components';
import { LoginContext } from '../LoginContext';

const ActionBar = ({ movieId }) => {

    const { handleMovieLike, handleMovieDislike, updateUserData, appUser, signInWithGoogle, handleSignOut, message } = useContext(LoginContext);


    const handleLike = (e) => {
        e.preventDefault();
        handleMovieLike(movieId);

        console.log("LIKED")
    }

    const handleDislike = (e) => {
        e.preventDefault();
        handleMovieDislike(movieId)

        console.log("DISLIKED")
    }



    return (

        <StyleActionContainer>
            <p onClick={(e) => handleLike(e)}>👍🏼</p>
            <p>🍿</p>
            <p onClick={(e) => handleDislike(e)}>👎🏼</p>
        </StyleActionContainer>
    )
}

const StyleActionContainer = styled.div`
    display: flex; 
    z-index: 50; 
    justify-content: space-between;

    

    p {
        font-size: 2.4rem;
    }
`

export default ActionBar;