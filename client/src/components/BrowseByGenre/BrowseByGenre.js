import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { genres } from '../../data/genres'
import RenderMovie from './RenderMovie';

const BrowseByGenre = () => {

    const [genreData, setGenreData] = useState(null);
    const { genreName } = useParams();

    // check the id of the genre; 

    console.log(genreName)

    let selectedGenreId = null;

    for (let i = 0; i < genres.length; i++) {
        if (genres[i].name === genreName) {
            selectedGenreId = genres[i].id;
        }
    }

    console.log(genreData);






    React.useEffect(() => {

        if (selectedGenreId) {
            fetch(`/genres/${selectedGenreId}`)
                .then(res => res.json())
                .then(data => setGenreData(data))
        }



    }, [])





    return (
        <StyledMovieContainer>
            {genreData && genreData.results.map(movie => {
                return (

                    <RenderMovie
                        genre={genreName}
                        releaseDate={movie.release_date.slice(0, 4)}
                        title={movie.title}
                        imgSrc={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        ratings={movie.vote_average}
                    />

                )
            })
            }}
        </StyledMovieContainer>
    )
}

const StyledMovieContainer = styled.div`
    display: flex; 
    flex-wrap: wrap; 
    justify-content: space-between; 

`

export default BrowseByGenre;