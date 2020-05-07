import React, { useContext } from 'react';
import styled from 'styled-components';
import { lightTheme } from '../theme';
import ActionBar from '../ActionBar';
import RecommendedActions from './RecommendedActions'
import { LoginContext } from '../LoginContext';
import RecommendedMovieData from './RecommendedMovieData'

import { FaArrowAltCircleLeft } from 'react-icons/fa'
import { FaArrowAltCircleRight } from 'react-icons/fa'
import { StyledLink } from '../CONSTANTS';

const RenderRecommendations = ({
    overview,
    tagline,
    genre,
    voteAverage,
    runtime,
    posterPath,
    voteCount,
    revenue,
    backdropPath,
    imgSrc,
    title,
    releaseDate,
    ratings,
    altText,
    movieId,
    theme,
    triggerNextMovie,
    triggerPreviousMovie,
    genres

}) => {

    const { handleMovieLike, handleMovieDislike, updateUserData, appUser, signInWithGoogle, handleSignOut, message } = useContext(LoginContext);


    return (


        // If the movie is liked/disliked/upnext; 
        appUser.email && (appUser.data.dislikedMovies[movieId] === movieId || appUser.data.likedMovies[movieId] === movieId || appUser.data.upNextList[movieId] === movieId) ?
            <MainContainer>
                <StyledContainer>
                    <StyledLink to={`/movies/${movieId}`}>

                        {
                            imgSrc != "https://image.tmdb.org/t/p/w500/null" ? <MoviePoster style={{
                                opacity: ".1"
                            }} alt={altText} src={imgSrc} />
                                : <h4>No picture :(</h4>
                        }
                    </StyledLink>
                    <RecommendedActions disabled movieId={movieId} />
                    <RecommendedMovieData
                        title={title}
                        releaseDate={releaseDate}
                        ratings={ratings}
                        genre={genre}
                        genres={genres} />


                    <NextPrevButtons>
                        <LeftArrow onClick={triggerPreviousMovie} />
                        <RightArrow onClick={triggerNextMovie} />
                    </NextPrevButtons>
                </StyledContainer>

                <LikeStateContainer>
                    {appUser.data.dislikedMovies[movieId] === movieId ? <RatingResult>You rated this movie a <span>👎🏼</span> </RatingResult> :

                        appUser.data.upNextList[movieId] === movieId ? <RatingResult>You added this to your UpNext <span>🍿</span></RatingResult>
                            :

                            appUser.data.likedMovies[movieId] === movieId ?
                                <RatingResult>You rated this movie a <span>👍🏼</span></RatingResult>

                                :
                                ""
                    }
                </LikeStateContainer>
            </MainContainer>

            :

            <MainContainer>
                <StyledContainer>
                    <StyledLink to={`/movies/${movieId}`}>
                        <PosterContainer>
                            {
                                imgSrc != "https://image.tmdb.org/t/p/w500/null" ? <MoviePoster alt={altText} src={imgSrc} />
                                    : <MoviePoster style={{ boxShadow: "none" }} alt={altText} src="https://www.vuecinemas.nl/thumb?w=268&f=jpg&src=userfiles/file/KLER_Poster_World.jpg&alt=img/movie_placeholder.png" />
                            }
                        </PosterContainer>
                    </StyledLink>

                    <BelowContentContainer>
                        <RecommendedActions movieId={movieId} />
                        <RecommendedMovieData
                            title={title}
                            releaseDate={releaseDate}
                            ratings={ratings}
                            genre={genre}
                            genres={genres} />


                    </BelowContentContainer>



                    <NextPrevButtons>
                        <LeftArrow onClick={triggerPreviousMovie} />
                        <RightArrow onClick={triggerNextMovie} />
                    </NextPrevButtons>

                </StyledContainer>
            </MainContainer>


    )
}

const BelowContentContainer = styled.div`
    display: flex; 
    flex-direction: column; 
    align-items: center; 
`

const PosterContainer = styled.div`
    position: relative;
    /* border: 3px solid green;  */
    margin-bottom: 1rem;
`

const NextPrevButtons = styled.div`

    position: absolute;
    /* border: 1px solid red;  */
    width: 100%;
    /* height: 100%;  */
    top: 40%;

    font-size: 2rem;


`

const RightArrow = styled(FaArrowAltCircleRight)`
    position: absolute;
    right: -4rem;

`

const LeftArrow = styled(FaArrowAltCircleLeft)`
    left: -4rem;
    position: absolute;


`

const MainContainer = styled.div`
    position: relative;
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

const LikeStateContainer = styled.div`
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: fit-content;
`

const StyledContainer = styled.div`

    margin-bottom: 5rem;
    min-width: 20rem;
    max-width: 23rem;
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
    margin-bottom: 1rem;
    min-height: 24rem;
    min-width: 20rem;
    max-width: 23rem;
    box-shadow: ${({ theme }) => theme === lightTheme ? "0px 0px 72px -15px rgba(35,36,118,1)" : "0px 0px 52px -15px #F3F4FD"};
    

    
`

export default RenderRecommendations; 