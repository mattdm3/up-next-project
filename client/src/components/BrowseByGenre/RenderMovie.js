import React, { useContext } from 'react';
import styled from 'styled-components';
import { lightTheme } from '../theme';
import ActionBar from '../ActionBar';
import { LoginContext } from '../LoginContext';


const RenderMovie = ({
    imgSrc,
    title,
    releaseDate,
    genre,
    ratings,
    altText,
    movieId,
    theme }) => {


    const { handleMovieLike, handleMovieDislike, updateUserData, appUser, signInWithGoogle, handleSignOut, message } = useContext(LoginContext);

    // appUser.data && console.log(appUser.data.likedMovies["38700"])

    // appUser.data && console.log(appUser.data.dislikedMovies)



    return (

        appUser.data && appUser.data.likedMovies && appUser.data.dislikedMovies && (appUser.data.dislikedMovies[movieId] || appUser.data.likedMovies[movieId]) ?
            <MainContainer>
                <StyledContainer style={appUser.data.dislikedMovies[movieId] && {
                    opacity: ".6",



                }}>
                    <MoviePoster style={appUser.data.dislikedMovies[movieId] && { filter: "grayscale(90%)" }} alt={altText} src={imgSrc} />
                    <h2>{title}</h2>
                    <p>{releaseDate} | {genre}</p>
                    <p>⭐️{ratings}</p>
                    {/* <ActionBar movieId={movieId} /> */}
                </StyledContainer>
                <LikeStateContainer>
                    {appUser.data.dislikedMovies[movieId] ? <h1>👎🏼</h1> : <h1>👍🏼</h1>}
                </LikeStateContainer>

            </MainContainer>

            :

            <StyledContainer>
                <MoviePoster alt={altText} src={imgSrc} />
                <h2>{title}</h2>
                <p>{releaseDate} | {genre}</p>
                <p>⭐️{ratings}</p>
                <ActionBar movieId={movieId} />
            </StyledContainer>
    )
}

const MainContainer = styled.div`
    position: relative; 
`

const StyledContainer = styled.div`

    margin-bottom: 5rem; 
    min-width: 20rem; 
    max-width: 20rem; 
    /* border: 1px solid red;  */
    cursor: pointer;
    position: relative; 



    h2 {
        max-width: 280px; 
    }

    p{
        color:  ${({ theme }) => theme === lightTheme ? "#8D89C8" : "#C7C7FD"};
    }
`


const MoviePoster = styled.img`
    border-radius: 10px; 
    min-height: 24rem; 
    min-width: 20rem; 
    max-width: 20rem; 
    
`

const LikeStateContainer = styled.div`
    position: absolute; 
    top: 50%; 
    left: 50%; 
    transform: translate(-50%, -50%);

    h1 {
        font-size: 8rem;
    }
`

export default RenderMovie; 