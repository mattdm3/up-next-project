import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { lightTheme } from '../theme';
import ActionBar from '../ActionBar';
import { LoginContext } from '../LoginContext';

const UpNextMovies = ({
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

    // console.log(message);


    return (

        appUser.email && isUserDataLoaded && (appUser.data.dislikedMovies[movieId] || appUser.data.likedMovies[movieId] || appUser.data.upNextList[movieId]) ?
            <MainContainer>
                <StyledContainer
                >

                    <MoviePoster alt={altText} src={imgSrc} />


                    <MovieText>

                        <h3>{title}</h3>
                        <p>{releaseDate} | {genre}</p>
                        <p>⭐️{ratings}</p>
                    </MovieText>

                    {/* <ActionBar movieId={movieId} /> */}
                </StyledContainer>
                {/* <LikeStateContainer>
                    {appUser.data.dislikedMovies[movieId] ? <RatingResult>You rated this movie a <span></span> 👎🏼</RatingResult> :

                        appUser.data.upNextList[movieId] ? <RatingResult>You added this to your UpNext <span>🍿</span></RatingResult>
                            :
                            <RatingResult>You rated this movie a <span>👍🏼</span></RatingResult>}
                </LikeStateContainer> */}

            </MainContainer>

            :
            <MainContainer>
                <StyledContainer>
                    <MoviePoster alt={altText} src={imgSrc} />
                    <MovieText>
                        <h3>{title}</h3>
                        <p>{releaseDate} | {genre}</p>
                        <p>⭐️{ratings}</p>
                    </MovieText>

                    <ActionBar movieId={movieId} />
                </StyledContainer>
            </MainContainer>
    )
}

const MainContainer = styled.div`
    position: relative; 
    margin-bottom: 5rem;
    flex-grow: 1; 
    /* min-width: 23rem;
    max-width: 70vw; */
    flex-shrink:1;
    flex-basis: 5rem;
    /* flex: 1 1 auto;  */
    
`

const StyledContainer = styled.div`

    /* margin-bottom: 5rem;  */
    /* min-width: 10rem; 
    max-width: 24rem;  */
    /* border: 1px solid red;  */
    cursor: pointer;
    position: relative; 
    /* flex-shrink:0; */
    /* flex-grow: 1;  */
    /* max-width: 20rem; */
    /* min-width: 20rem; */
    /* width: 25rem; */
    /* margin: 1rem; */




    h2 {
        max-width: 280px; 
    }

    p{
        color:  ${({ theme }) => theme === lightTheme ? "#8D89C8" : "#C7C7FD"};
    }
`



const MoviePoster = styled.img`
    border-radius: 10px; 
    /* max-height: 12rem;  */
    min-width: 15rem;
    max-width: 18rem;
    /* max-width: 100%;   */
     @media screen and (max-width: 740px) {
        max-width: 100%;
    }
    
`

const MovieText = styled.div`
width: 15rem;
`

const LikeStateContainer = styled.div`
    position: absolute; 
    top: 50%; 
    left: 50%; 
    transform: translate(-50%, -50%);
    width: fit-content; 
`

const RatingResult = styled.p`
    font-size: 1.1rem;
    margin: 0; 
    padding: 0; 
    font-weight: 600; 

    span {
        font-size: 2.2rem;
    }

`

export default UpNextMovies; 