import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { LoginContext } from '../LoginContext';
import RenderMovie from '../BrowseByGenre/RenderMovie';
import RenderRecommendations from './RenderRecommendations';
import RecommendedActions from '../Recommended/RecommendedActions'
import { lightTheme } from '../theme';
import { useHistory } from 'react-router-dom'




const Recommended = () => {

    const { movieCounter, setMovieCounter, handleRecomendationRequest, recommendedAPI, recommendedMovies, setRecommendedMovies, dataObject, updateUserData, appUser, signInWithGoogle, handleSignOut, message } = useContext(LoginContext);

    let history = useHistory();

    // RAW RECOMMENDATIONS FROM BACK END 
    const getRecommendations = () => {

        //  CREATE CONDITIONS SO USER CAN"T KEEP ASKING FOR A REFRESH! 

        // CONDITION: 

        if (appUser.data.likedMovies.length < 5) {
            alert("please rate more movies first")
            history.push("/genres/action")
        } else {
            handleRecomendationRequest();
        }

    }

    // recommendedAPI && console.log(recommendedAPI[0])
    // console.log(recommendedMovies)



    const triggerNextMovie = () => {

        let maximumCount = recommendedAPI.length - 1;

        if (movieCounter < maximumCount) {
            setMovieCounter(movieCounter + 1);
            console.log(movieCounter, "MOVIE COUNTER");
            console.log(recommendedAPI[movieCounter]);
            console.log(recommendedAPI[movieCounter].id)
        }

    }

    const triggerPreviousMovie = () => {

        let maximumCount = recommendedAPI.length;

        if (movieCounter >= 1) {
            setMovieCounter(movieCounter - 1);
            console.log(movieCounter, "MOVIE COUNTER");

        }

    }

    console.log(recommendedAPI[movieCounter]);

    console.log(movieCounter)

    return (

        appUser.email ?
            <div>
                <button onClick={getRecommendations}>Get Recommended</button>

                {/* <div>

                {recommendedAPI && recommendedAPI.map(movie => {
                    return <p>{movie.title}</p>
                })}
            </div> */}

                <div>
                    <FullViewContainer>

                        {
                            recommendedAPI.length > 0 && recommendedAPI[movieCounter] && <RenderRecommendations
                                title={recommendedAPI[movieCounter].title}
                                altText={recommendedAPI[movieCounter].title}
                                imgSrc={`https://image.tmdb.org/t/p/w500/${recommendedAPI[movieCounter].poster_path}`}
                                ratings={recommendedAPI[movieCounter].vote_average}
                                movieId={recommendedAPI[movieCounter].id}
                                triggerNextMovie={triggerNextMovie}
                                triggerPreviousMovie={triggerPreviousMovie}

                            />


                        }

                    </FullViewContainer>
                </div>

            </div>
            :
            <div>Create an account</div>


    )
}

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

const FullViewContainer = styled.div`
    position: absolute;
    width: 100%; 
    height: 100vh;  
    left: 0; 

`

const MoviePoster = styled.img`
    border-radius: 10px; 
    min-height: 24rem; 
    min-width: 20rem; 
    max-width: 20rem; 
    
`

export default Recommended; 