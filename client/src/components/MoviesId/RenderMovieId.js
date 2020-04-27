import React from 'react';
import styled from 'styled-components';
import RenderMovie from '../BrowseByGenre/RenderMovie';

const RenderMovieId = ({
    title,
    overview,
    tagline,
    genre,
    voteAverage,
    releaseDate,
    runtime,
    posterPath,
    voteCount,
    revenue,
    backdropPath,
}) => {
    return (
        <div>
            <h1>{title}</h1>
            <p>{genre}</p>
            <div>
                <div>
                    <p>{voteAverage > 6 ? "🔥" : "❄️"}</p>
                    <h2>{voteAverage}</h2>
                    <p>{voteCount}</p>
                </div>
                <div>
                    <p>{releaseDate}</p>
                    <p>{runtime} minutes</p>
                </div>


            </div>


            <div>
                <img src={posterPath} alt={title} />

            </div>


            <p>{overview}</p>

        </div>
    )
}


export default RenderMovieId; 