import React, { useContext, useState } from "react";
import styled from 'styled-components';
import { LoginContext } from '../LoginContext';

const RecommendedActions = ({ movieId }) => {

    const { movieCounter, setMovieCounter, handleMovieLike, handleMovieDislike, updateUserData, appUser, signInWithGoogle, handleSignOut, message, handleAddUpNext } = useContext(LoginContext);


    const handleLike = (e) => {
        e.preventDefault();

        console.log(movieId);
        console.log(appUser.email)
        if (appUser.email) {
            handleMovieLike(movieId);
            setMovieCounter(movieCounter + 1)
            //TEMPORARILY INCREMENT THE MOVIE COUNTER? FIGURE OUT WHAT TO DO WITH RATED RECOMMENDATIONS
        }
        else {
            alert("Please make an account or login first.")
        }


    }

    const handleDislike = (e) => {
        e.preventDefault();

        if (appUser.email) {
            handleMovieDislike(movieId);
            setMovieCounter(movieCounter + 1);
        } else {
            alert("Please make an account or login first.")
        }


    }

    const handleUpNext = (e) => {
        e.preventDefault();

        if (appUser.email) {
            handleAddUpNext(movieId)
            setMovieCounter(movieCounter + 1);
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
    justify-content: space-between;

    

    p {
        font-size: 2.4rem;
    }
`

export default RecommendedActions;