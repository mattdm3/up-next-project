import React from 'react';
import styled from 'styled-components';
import { StyledLink, GenreP } from '../CONSTANTS'


const RecommendedMovieData = ({ genres, themes, title, releaseDate, genre, ratings }) => {


    return (
        <MovieText>
            {/* <h3>{title}</h3> */}

            <ReleaseAndGenres>


                <h4 style={{ fontWeight: "bold" }}>{releaseDate} </h4> <p>|</p>

                {
                    genres.slice(0, 3).map(genreName => {
                        return <StyledLink key={genreName + Math.random()} to={`/genres/${genreName.name.toLowerCase()}`}>
                            <GenreP key={genreName}>{genreName.name.toLowerCase()}</GenreP>
                        </StyledLink>
                    })
                }

            </ReleaseAndGenres>
            {/* <Ratings>⭐️{ratings}</Ratings> */}
        </MovieText>
    )
}

const MovieText = styled.div`
    /* width: 15rem; */
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    
    

    h3 {
        margin-bottom: .5rem;
        text-align: center;
    }
    
`




const ReleaseAndGenres = styled.div`
    display: flex; 
    width: fit-content;
    overflow: hidden;
    width: 100%; 
    margin-bottom: .5rem;
    h4 {
        margin-right: .5rem;

    }
    p {
        margin-right: .5rem;
    }
`


export default RecommendedMovieData; 