import React, { useContext, useState } from "react";
import styled from 'styled-components';
import { LoginContext } from '../LoginContext';

const RecommendedActions = ({ movieId }) => {

    const { movieCounter, setMovieCounter, handleMovieLike, handleMovieDislike, updateUserData, appUser, signInWithGoogle, handleSignOut, message, handleAddUpNext, recommendedAPI, theme } = useContext(LoginContext);

    console.log(theme);

    const StyleActionContainer = styled.div`
    display: flex; 
    z-index: 50; 
    justify-content: space-evenly;
    p {
        font-size: 1.8rem;
        padding: 15px; 
        background: ${theme === "light" ? "#232476" : "#F3F4FD"}; 
        border-radius: 50%; 
        margin-right: 1rem;
        box-shadow: ${ theme === "light" ? "0px 0px 15px -5px rgba(35,36,118,1)" : "0px 0px 15px -5px rgba(100,100,100,1)"};
    }
`
    const StyleActionContainerDisabled = styled.div`
    display: flex; 
    z-index: 50; 
    opacity: .3; 
    justify-content: space-evenly;
    p {
        font-size: 1.8rem;
        padding: 15px; 
        background: ${theme === "light" ? "#232476" : "#F3F4FD"}; 
        border-radius: 50%; 
        margin-right: 1rem;

    }
`


    const handleLike = (e) => {
        e.preventDefault();

        console.log(movieId);
        console.log(appUser.email)
        if (appUser.email) {
            handleMovieLike(movieId);
            // setMovieCounter(movieCounter + 1)
            //TEMPORARILY INCREMENT THE MOVIE COUNTER? FIGURE OUT WHAT TO DO WITH RATED RECOMMENDATIONS
        }
        else {
            alert("Please make an account or login first.")
        }


    }

    const handleDislike = (e) => {
        e.preventDefault();
        console.log(movieId)
        console.log(recommendedAPI)
        console.log(appUser.data.recommendations);

        if (appUser.email) {
            handleMovieDislike(movieId);
            // setMovieCounter(movieCounter + 1);
        } else {
            alert("Please make an account or login first.")
        }


    }

    const handleUpNext = (e) => {
        e.preventDefault();

        if (appUser.email) {
            handleAddUpNext(movieId)
            // setMovieCounter(movieCounter + 1);
        } else {
            alert("Please make an account or login first.")
        }

    }



    return (

        (appUser.data.dislikedMovies[movieId] === movieId || appUser.data.likedMovies[movieId] === movieId || appUser.data.upNextList[movieId] === movieId) ?
            <StyleActionContainerDisabled>
                <p>👍🏼</p>
                <p>🍿</p>
                <p>👎🏼</p>
            </StyleActionContainerDisabled>
            :
            <StyleActionContainer>
                <p onClick={(e) => handleLike(e)}>👍🏼</p>
                <p onClick={(e) => handleUpNext(e)}>🍿</p>
                <p onClick={(e) => handleDislike(e)}>👎🏼</p>
            </StyleActionContainer>
    )
}



export default RecommendedActions;