import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import RenderMovieId from './RenderMovieId'
import SimilarMovies from './SimilarMovies';
import { serverUrl } from '../LoginContext'


const MoviesId = () => {

    const { movieId } = useParams()

    const [selectedMovieData, setSelectedMovieData] = useState(null)


    React.useEffect(() => {

        fetch(`${serverUrl}/movies/${movieId}`)
            .then(res => res.json())
            .then(data => setSelectedMovieData(data))

    }, [movieId])

    return (

        selectedMovieData ?
            <>
                <RenderMovieId
                    genres={selectedMovieData.genres}
                    title={selectedMovieData.title}
                    overview={selectedMovieData.overview}
                    voteAverage={selectedMovieData.vote_average}
                    posterPath={`https://image.tmdb.org/t/p/w500/${selectedMovieData.poster_path}`}
                    releaseDate={selectedMovieData.release_date}
                    runtime={selectedMovieData.runtime}

                    youtube={selectedMovieData.videos && selectedMovieData.videos.results[0] ? selectedMovieData.videos.results[0].key : null}

                    backdropPath={`https://image.tmdb.org/t/p/original/${selectedMovieData.backdrop_path}`}
                    movieId={movieId}



                />

                <SimilarMovies
                    movieId={movieId}
                />

            </>
            : <p>loading</p>
    )
}

export default MoviesId; 