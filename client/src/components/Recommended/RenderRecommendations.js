import React from 'react';
import styled from 'styled-components';
import { lightTheme } from '../theme';
import ActionBar from '../ActionBar';

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

}) => {
    return (

        <StyledContainer>
            <MoviePoster alt={altText} src={imgSrc} />
            <h3>{title}</h3>
            <p>{releaseDate}</p>
            <p>⭐️{ratings}</p>
            <ActionBar movieId={movieId} />
            <button onClick={triggerPreviousMovie}> PREVIOUS MOVIE</button>
            <button onClick={triggerNextMovie}> NEXT MOVIE</button>
        </StyledContainer>

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

const MoviePoster = styled.img`
    border-radius: 10px; 
    min-height: 24rem; 
    min-width: 20rem; 
    max-width: 20rem; 
    
`

export default RenderRecommendations; 