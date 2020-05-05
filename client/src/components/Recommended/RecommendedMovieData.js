import React from 'react';
import styled from 'styled-components';
import { genresList } from '../../data/genres';


const RecommendedMovieData = ({ genres, themes, title, releaseDate, genre, ratings }) => {


    console.log(genres)

    return (
        <MovieText>
            <h3>{title}</h3>

            <ReleaseAndGenres>


                <p style={{ fontWeight: "bold" }}>{releaseDate} </p> <p>|</p>
                {console.log(genres)}

                {
                    genres.map(genreID => {
                        return <p>{genreID.name}</p>
                    })
                }
            </ReleaseAndGenres>
            <Ratings>⭐️{ratings}</Ratings>
        </MovieText>
    )
}

const MovieText = styled.div`
    width: 15rem;
    margin-top: 1rem;

    h3 {
        margin-bottom: .5rem;
    }
    
`

const Ratings = styled.p`
    margin-bottom: .5rem;
`


const ReleaseAndGenres = styled.div`
    display: flex; 
    width: fit-content;
    width: 100%; 
    margin-bottom: .5rem;
    p {
        margin-right: .5rem;
    }
`


export default RecommendedMovieData; 