import React from 'react';
import styled from 'styled-components';


const RenderMovie = ({
    imgSrc,
    title,
    releaseDate,
    genre,
    ratings }) => {

    return (
        <StyledContainer>
            <MoviePoster src={imgSrc} />
            <h2>{title}</h2>
            <p>{releaseDate} | {genre}</p>
            <p>⭐️{ratings}</p>
            <p>Actions</p>

        </StyledContainer>
    )
}

const MoviePoster = styled.img`
    border-radius: 10px; 
    height: 24rem; 
    
`


const StyledContainer = styled.div`
    h2 {
        max-width: 280px; 
    }
`

export default RenderMovie; 