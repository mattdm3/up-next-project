import React, { useContext, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { lightTheme } from '../theme';
import ActionBar from '../ActionBar';
import { LoginContext } from '../LoginContext';
import MovieTextData from './MovieTextData';
import posterplaceholder from '../poster-placeholder.png'
import { StyledLink } from '../CONSTANTS'
import UndoButton from './UndoButton';

const RenderMovie = ({
    imgSrc,
    title,
    releaseDate,
    genre,
    ratings,
    altText,
    movieId,
    genres,
    resultID,
    genreData,
    setGenreData }) => {


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


    // const handleUndoRating = (e, movieId) => {
    //     e.preventDefault();
    //     console.log("UNDO")
    //     console.log(movieId)
    // }




    return (

        appUser.email && isUserDataLoaded && (appUser.data.dislikedMovies[movieId] || appUser.data.likedMovies[movieId] || appUser.data.upNextList[movieId]) ?

            <MainContainer>
                <StyledContainer style={{
                    opacity: ".3"
                }}>

                    {

                        imgSrc != "https://image.tmdb.org/t/p/w500/null"
                            ?
                            <StyledLink to={`/movies/${movieId}`} >
                                <MoviePoster style={appUser.data.dislikedMovies[movieId] && { filter: "grayscale(90%)" }} alt={altText} src={imgSrc} />
                            </StyledLink>
                            :
                            <StyledLink to={`/movies/${movieId}`} >
                                <MoviePoster style={appUser.data.dislikedMovies[movieId] && { filter: "grayscale(90%)" }} alt={altText} src={posterplaceholder} />
                                <h4 style={{ transform: "translate(-50%, -50%)", textAlign: "center", color: "white", position: "absolute", top: "50%", left: "50%" }}>{title}</h4>
                            </StyledLink>

                    }




                    <MovieTextData
                        title={title}
                        releaseDate={releaseDate}
                        ratings={ratings}
                        genre={genre}
                        genres={genres}
                        genreData={genreData} />


                    {/* <ActionBar movieId={movieId} /> */}
                </StyledContainer>
                <LikeStateContainer>
                    {appUser.data.dislikedMovies[movieId] ? <RatingResult>You rated this movie a <span>👎🏼</span> </RatingResult> :

                        appUser.data.upNextList[movieId] ? <RatingResult>You added this to your UpNext <span>🍿</span></RatingResult>
                            :
                            <RatingResult>You rated this movie a <span>👍🏼</span></RatingResult>}

                    {/* <UndoButton onClick={(e) => handleUndoRating(e, movieId)} style={{ padding: "1rem" }}>Undo</UndoButton> */}

                    <UndoButton movieId={movieId} />
                </LikeStateContainer>


            </MainContainer>


            :

            <MainContainer>

                <PosterContainer>

                    {
                        imgSrc === "https://image.tmdb.org/t/p/w500/null"
                            ?
                            <StyledLink to={`/movies/${movieId}`}>
                                <MoviePoster alt={altText} src={posterplaceholder} />
                                <h4 style={{ transform: "translate(-50%, -50%)", textAlign: "center", color: "white", position: "absolute", top: "50%", left: "50%" }}>{title}</h4>
                            </StyledLink>
                            :
                            <>
                                <StyledLink to={`/movies/${movieId}`}>
                                    <MoviePoster alt={altText} src={imgSrc} />
                                    <RatingStar>⭐{ratings}</RatingStar>
                                </StyledLink>
                            </>


                    }

                </PosterContainer>

                <BelowContentContainer>
                    <ActionBar genreData={genreData} setGenreData={setGenreData} resultID={resultID} movieId={movieId} />

                    <MovieTextData
                        title={title}
                        releaseDate={releaseDate}
                        ratings={ratings}
                        genre={genre}
                        genres={genres} />
                </BelowContentContainer>

            </MainContainer>

    )
}

// const UndoButton = styled.p`

//     &:hover {
//         color: red;
//     }
// `

const RatingStar = styled.h3`
    color: #FFD93B; 
    position: absolute; 
    bottom: 1rem;
    left: .5rem; 
    -webkit-text-stroke: 1px #1F209A; 

`

const PosterContainer = styled.div`
    position: relative;
    /* border: 3px solid green;  */
    margin-bottom: 1rem;
`

const BelowContentContainer = styled.div`
    display: flex; 
    flex-direction: column; 
    align-items: center; 
`

//THIS CONTAINER HOLDS ENTIRE MOVIE ITEM INCL POSTER DESC & ACTIONS
const MainContainer = styled.div`
    position: relative; 
    margin-bottom: 5rem;
    /* flex-grow: 1;  */
    /* min-width: 23rem;
    max-width: 70vw; */
    flex-shrink:1;
    /* flex-basis: 5rem; */
    /* flex: 1 1 auto;  */
    /* border: 1px solid red;  */
    
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
    /* max-height: 31rem;  */
    min-width: 18rem;
    max-width: 22rem;
    
    /* max-width: 100%;   */
     @media screen and (max-width: 740px) {
        max-width: 100%;
    }
    
`

const scaleUp = keyframes`
    0 {
        transform: scale(1);
    }
    50% {
        transform: scale(1.3);
    }
    100% {
        transform: scale(1);
    }
`

const ScaledButton = styled.div`
    animation: ${scaleUp} 750ms ease forwards; 
`


const LikeStateContainer = styled.div`
    position: absolute; 
    top: 50%; 
    left: 50%; 
    transform: translate(-50%, -50%);
    width: fit-content; 
   
    display: flex; 
    flex-direction: column;
    align-items: center;

    
`

const RatingResult = styled.p`
    font-size: 1.1rem;
    margin: 0; 
    padding: 0; 
    font-weight: 600; 
    animation: ${scaleUp} 700ms ease forwards; 

    span {
        font-size: 2.2rem;
    }

`



export default RenderMovie; 