import React, { useContext, useState } from 'react';
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

    const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);

    // USING THIS AS A CONDITION BEFORE LOADING USER DATA
    React.useEffect(() => {

        //checking if ALL data is loaded (liked, disliked and upNext)
        if (appUser.email && appUser.data && (appUser.data.likedMovies && appUser.data.dislikedMovies && appUser.data.upNextList)) {
            setIsUserDataLoaded(true);
        } else setIsUserDataLoaded(false);


    }, [appUser])

    console.log(message);


    return (

        appUser.email && isUserDataLoaded && (appUser.data.dislikedMovies[movieId] || appUser.data.likedMovies[movieId] || appUser.data.upNextList[movieId]) ?
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
                    {appUser.data.dislikedMovies[movieId] ? <RatingResult>👎🏼</RatingResult> :

                        appUser.data.upNextList[movieId] ? <RatingResult>🍿</RatingResult>
                            :
                            <RatingResult>👍🏼</RatingResult>}
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
`

const RatingResult = styled.h1`
    font-size: 8rem;

`

export default RenderMovie; 