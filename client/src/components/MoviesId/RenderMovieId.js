import React from 'react';
import styled from 'styled-components';
import RenderMovie from '../BrowseByGenre/RenderMovie';
import ClipLoader from "react-spinners/ClipLoader";


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
    youtube
}) => {

    const [youtubeLoaded, setyoutubeLoaded] = React.useState(false);





    const MovieHeader = styled.div`
        /* background: url(${backdropPath}); */
        
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
    }
`

    const BackdropImage = styled.img`
    
            /* width: 300px; 
            z-index: -10;  */
            
            grid-area: 1 / 2 / 2 / 4;
            width: 500px; 
            width: 100%; 
            border-radius: 10px;

        
    `
    const TrailerAndBackdrop = styled.div`
        display: flex; 
        flex-direction: column;
        justify-content: space-between;
        

    `

    const TitleAndGenre = styled.div`
        display: flex; 
        flex-direction: column;
        margin: 2.5rem 0;
    `

    const DateRuntime = styled.div`
        display: flex; 
        
    `


    return (
        <MovieContainer>
            <TitleAndGenre>
                <h2>{title}</h2>
                <p>genre</p>
            </TitleAndGenre>

            <MovieInfoTop>
                <RatingInfo>
                    <h3 style={{ marginRight: "1rem" }}>{voteAverage > 6 ? "🔥" : "❄️"}</h3>
                    <h3>{voteAverage}</h3>
                    <p>{voteCount}</p>
                </RatingInfo>
                <DateRuntime>
                    <p style={{ fontWeight: "bold", marginRight: ".5rem" }}>{releaseDate}</p>
                    <p>{runtime} min</p>
                </DateRuntime>


            </MovieInfoTop>

            <MovieHeader>
                <MoviePoster>
                    <img src={posterPath} alt={title} />
                </MoviePoster>

                {/* <TrailerAndBackdrop> */}
                {/* <BackdropImage src={backdropPath} alt={title} /> */}
                <TrailerContainer>

                    <iframe style={youtubeLoaded ? { display: "block" } : { display: "none" }} onLoad={() => setyoutubeLoaded(true)} id="player" type="text/html" //width="500" height="300"
                        src={`http://www.youtube.com/embed/${youtube}?enablejsapi=1`}
                        frameborder="0"></iframe>

                    <SpinnerContainer style={youtubeLoaded ? { display: "none" } : { display: "block" }}>
                        <ClipLoader />
                        <p>Loading Trailer</p>
                    </SpinnerContainer>

                </TrailerContainer>

            </MovieHeader>



            <MovieDescription>{overview}</MovieDescription>

        </MovieContainer>
    )
}

const SpinnerContainer = styled.div`
    margin: auto; 
    
`

const MovieDescription = styled.p`
    font-weight: 500; 
    font-size: 1.1rem;
`

const MovieContainer = styled.div`
    /* margin: 5rem 0;  */
`

const MovieInfoTop = styled.div`
    display: flex; 
    justify-content: space-between;
    margin-bottom: 2rem;
`

const RatingInfo = styled.div`
    display: flex; 
`



export default RenderMovieId; 