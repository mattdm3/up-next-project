import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import RenderMovieId from './RenderMovieId'


const MoviesId = () => {

    const { movieId } = useParams()

    const [selectedMovieData, setSelectedMovieData] = useState(null)

    selectedMovieData && console.log(selectedMovieData, "MOVIE ID PAGE")

    React.useEffect(() => {

        fetch(`/movies/${movieId}`)
            .then(res => res.json())
            .then(data => setSelectedMovieData(data))

    }, [])

    return (

        selectedMovieData ?
            <>
                <RenderMovieId
                    title={selectedMovieData.title}
                    overview={selectedMovieData.overview}
                    voteAverage={selectedMovieData.vote_average}
                    posterPath={`https://image.tmdb.org/t/p/w500/${selectedMovieData.poster_path}`}
                    releaseDate={selectedMovieData.release_date}
                    runtime={selectedMovieData.runtime}
                    youtube={selectedMovieData.videos.results[0].key}
                    backdropPath={`https://image.tmdb.org/t/p/original/${selectedMovieData.backdrop_path}`}



                />

            </>
            : <p>loading</p>
    )
}

export default MoviesId; 