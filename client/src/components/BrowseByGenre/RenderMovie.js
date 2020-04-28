import React from 'react';
import styled from 'styled-components';
import { lightTheme } from '../theme';
import ActionBar from '../ActionBar';


const RenderMovie = ({
    imgSrc,
    title,
    releaseDate,
    genre,
    ratings,
    altText,
    movieId,
    theme }) => {


    return (
        <StyledContainer>
            <MoviePoster alt={altText} src={imgSrc} />
            <h2>{title}</h2>
            <p>{releaseDate} | {genre}</p>
            <p>⭐️{ratings}</p>
            <ActionBar movieId={movieId} />

        </StyledContainer>
    )
}



const StyledContainer = styled.div`

    margin-bottom: 5rem; 
    min-width: 20rem; 
    max-width: 20rem; 
    /* border: 1px solid red;  */
    cursor: pointer;



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

export default RenderMovie; 