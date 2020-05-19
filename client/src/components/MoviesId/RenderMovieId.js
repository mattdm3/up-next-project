import React from 'react';
import styled from 'styled-components';
import ClipLoader from "react-spinners/ClipLoader";
import IdActions from './IdActions';
import { StyledLink, GenreP } from '../CONSTANTS'


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
    youtube,
    genres,
    movieId
}) => {

    const [youtubeLoaded, setyoutubeLoaded] = React.useState(false);

    return (
        <MovieContainer>
            <TitleAndGenre>
                <h2>{title}</h2>
                <Genres>
                    {
                        genres && genres.map(genre => {
                            return <StyledLink key={genre.name} to={`/genres/${genre.name.toLowerCase()}`}>
                                <GenreP>{genre.name}</GenreP>
                            </StyledLink>
                        })
                    }
                </Genres>

            </TitleAndGenre>

            <MovieInfoTop>
                <RatingInfo>
                    <h3>{voteAverage > 6 ? "🔥" : "❄️"}</h3>
                    <h3>{voteAverage}</h3>
                    <p>{voteCount}</p>
                    <IdActions movieId={movieId} />
                </RatingInfo>
                <DateRuntime>
                    <p style={{ fontWeight: "bold", marginRight: ".5rem" }}>{releaseDate.slice(0, 4)}</p>
                    <p>{runtime} min</p>
                </DateRuntime>


            </MovieInfoTop>

            <MovieHeader>
                <MoviePoster>
                    {posterPath !== "https://image.tmdb.org/t/p/w500/null" ?
                        <img src={posterPath} alt={title} />
                        :
                        <h3>No poster found</h3>
                    }

                </MoviePoster>

                {/* <TrailerAndBackdrop> */}
                {/* <BackdropImage src={backdropPath} alt={title} /> */}
                <TrailerContainer>

                    {youtube ?
                        <>
                            <iframe title={youtube} style={youtubeLoaded ? { display: "block" } : { display: "none" }} onLoad={() => setyoutubeLoaded(true)} id="player" type="text/html" //width="500" height="300"
                                src={`https://www.youtube.com/embed/${youtube}?enablejsapi=1`}
                                frameBorder="0"></iframe>

                            <SpinnerContainer style={youtubeLoaded ? { display: "none" } : { display: "block" }}>
                                <ClipLoader />
                                <p>Loading Trailer</p>
                            </SpinnerContainer>

                        </>

                        :

                        <h3>No videos found</h3>

                    }



                </TrailerContainer>

            </MovieHeader>



            <MovieDescription>{overview}</MovieDescription>

        </MovieContainer>
    )
}


const MovieHeader = styled.div`


    /* position:relative;  */
    /* display: flex; 
    justify-content: space-between;
    justify-content: center; 
    justify-content: space-evenly;  */

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 20px;

    margin-bottom: 2.5rem;

    @media screen and (max-width: 650px) {
        display:block; 
       height: fit-content;
    }


`



const MoviePoster = styled.div`

    grid-area: 1 / 1 / 3 / 2;


    /* display: flex;  */
    /* justify-content: space-between; */
    /* flex-wrap: wrap;  */


    img {
    border-radius: 10px; 
    width: 100%; 

    }

    @media screen and (max-width: 650px) {
        display: none;
    }
`

const TrailerContainer = styled.div`
    display: flex; 
    justify-content: center;
    align-items: center; 
    text-align: center;
    grid-area: 1 / 2 / 3 / 4;

    iframe {
    border-radius: 10px; 
    /* width: 40rem; */
    width: 100%; 
    height: 100%; 
    min-height: 266px; 
    }
`



const TitleAndGenre = styled.div`
    display: flex; 
    flex-direction: column;
    margin: 2.5rem 0;

    @media screen and (max-width: 500px) {
        font-size: 1rem;
    }
`

const DateRuntime = styled.div`
    display: flex; 

`

const Genres = styled.div`
    display: flex;
    p {
        margin-right: .5rem;
    }
`

const SpinnerContainer = styled.div`
    margin: auto; 
    
`

const MovieDescription = styled.p`
    font-weight: 400; 
    font-size: 1.1rem;
    line-height: 1.4; 
`

const MovieContainer = styled.div`
    /* margin: 5rem 0;  */
`

const MovieInfoTop = styled.div`
    display: flex; 
    justify-content: space-between;
    margin-bottom: 2rem;
    align-items: center;
`

const RatingInfo = styled.div`
    display: flex; 
    align-items: center;

    h3 {
       margin-right: 1rem;
    }

    @media screen and (max-width: 500px) {
        font-size: .9rem;

        h3 {
            font-size: .9rem;
            margin-right: .4rem;
        }
        p {
            font-size: .9rem;
        }
    }
`



export default RenderMovieId; 