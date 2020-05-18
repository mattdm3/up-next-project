import React, { useContext, useState } from "react";
import styled, { keyframes } from 'styled-components';
import { LoginContext } from '../LoginContext';
import { lightTheme } from '../theme';
import UndoButton from "../BrowseByGenre/UndoButton";


const IdActions = ({ movieId }) => {

    const { dataObject, handleMovieLike, isUserDataLoaded, handleMovieDislike, appUser, signInWithGoogle, handleAddUpNext } = useContext(LoginContext);

    const [movieIsLiked, setMovieIsLiked] = useState(false)
    const [movieIsDisliked, setMovieIsDisliked] = useState(false)

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

    React.useEffect(() => {

        if (appUser.email) {
            if (appUser.data.likedMovies[movieId]) {
                setMovieIsLiked(true)
            }
            else if (appUser.data.dislikedMovies[movieId]) {
                setMovieIsDisliked(true)
            }
        }



    }, [appUser, dataObject])

    // console.log(isUserDataLoaded)

    return (

        appUser.email && (appUser.data.dislikedMovies[movieId] || appUser.data.likedMovies[movieId]) ?

            <MovieLikeStatus>
                <p>You {movieIsLiked ? "like" : "dislike"} this movie {movieIsLiked ? "👍🏼" : "👎🏼"} </p>
                <UndoButton movieId={movieId} />
            </MovieLikeStatus>
            :

            <StyleActionContainer>
                <p onClick={(e) => handleLike(e)}>👍🏼</p>
                <p style={appUser.email && appUser.data.upNextList[movieId] && { display: "none" }} onClick={(e) => handleUpNext(e)}>🍿</p>
                <p onClick={(e) => handleDislike(e)}>👎🏼</p>
            </StyleActionContainer>
    )
}

const MovieLikeStatus = styled.div`
    margin-left: 1rem;
    display: flex; 
    align-items: center; 

    p:first-of-type {
        font-weight: 700; 
    }
    p:last-of-type {
        font-weight: 400; 
    }
    
`

const StyleActionContainer = styled.div`
    display: flex; 
    z-index: 50;
    margin-left: 1rem;



    p {
        font-size: 1.1rem;
        width: 2.8rem;
        height: 2.8rem;
        margin-right: .5rem;
        padding: 1rem; 
        background:   ${({ theme }) => theme === lightTheme ? "#232476" : "#F3F4FD"};
        border-radius: 50%; 
        margin-right: 1rem;
        cursor: pointer;
        padding-left: 1.1rem;
        padding-top: 1.1rem;
     
        display: flex; 
        justify-content: center;
        align-items: center;
        

        &:hover {
            background: grey; 
        }
    }

    @media screen and (max-width: 500px) {

        p{
            font-size: .8rem;
            width: 2rem;
            height: 2rem;
        }
     
    }

`

export default IdActions; 