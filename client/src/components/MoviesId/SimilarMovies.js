import React, { useState } from 'react';
import styled from 'styled-components';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa'
import { Link, NavLink } from 'react-router-dom';
// import { SubHeading } from '../CONSTANTS'
import posterplaceholder from '../poster-placeholder.png'
import { lightTheme } from '../theme'
import SimilarActions from './SimilarActions';
import { serverUrl } from '../LoginContext'

const SimilarMovies = ({ movieId, theme }) => {

    const [similarMoviesArray, setSimilarMoviesArray] = useState(null)

    // SCROLL
    const [relatedItems, setRelatedItems] = useState(null)
    const scrollRef = React.useRef();

    const scrollLeft = (ref) => {
        scrollRef.current.scrollBy(-280, 0)
    }
    const scrollRight = (ref) => {
        scrollRef.current.scrollBy(280, 0)
    }

    const executeScrollLeft = () => scrollLeft(scrollRef);
    const executeScrollRight = () => scrollRight(scrollRef);
    // 



    React.useEffect(() => {

        if (movieId) {
            fetch(`${serverUrl}/movies/getSimilar/${movieId}`)
                .then(res => res.json())
                .then(data => setSimilarMoviesArray(data.results))
        }

    }, [movieId])


    return (
        <Container>
            <SubHeading>Similar Titles</SubHeading>
            <StyledScrollLeft onClick={executeScrollLeft}>
                <FaCaretLeft />
            </StyledScrollLeft>
            <StyledScrollRight onClick={executeScrollRight}>
                <FaCaretRight />
            </StyledScrollRight>

            <Wrapper style={{ scrollBehavior: "smooth" }} ref={scrollRef}>
                {similarMoviesArray && similarMoviesArray.map(movie => {
                    return (
                        <>
                            <div>
                                <StyledLink to={`/movies/${movie.id}`}>

                                    {
                                        movie.poster_path != null ?
                                            <StyledPoster src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} />
                                            :
                                            <>
                                                <StyledPoster src={posterplaceholder} />
                                                <p style={{ position: "absolute", bottom: "15%", left: "50%", transform: "translate(-50%, -50%)", color: "white" }}>{movie.title}</p>
                                            </>
                                    }




                                </StyledLink>
                                {/* <SimilarActions movieId={movie.id} /> */}
                            </div>
                        </>
                    )
                })}
            </Wrapper>

        </Container>
    )
}



const StyledLink = styled(Link)`
    margin-right: 80px; 
    position: relative; 
`

const StyledPoster = styled.img`
    border-radius: 10px; 
    max-width: 200px; 

`

const Container = styled.div`
    position: relative;
    height: 100%; 
    width: 100%; 
    margin-left: auto;
    margin-right: auto; 
    margin: 8rem 0; 
`

const StyledScrollLeft = styled.div`
    position: absolute; 
    left: -2.5rem;
    top: 50%;  
    z-index: 10; 
    font-size:4rem; 
    cursor: pointer;

`
const StyledScrollRight = styled.div`
    position: absolute; 
    right: -2.5rem;
    top: 50%;  
    z-index: 10; 
    font-size:4rem; 
    cursor: pointer;

`


const Wrapper = styled.div`
    overflow: auto;
    white-space: nowrap;
    width: 90%;
    display: flex;
    overflow: hidden; 
    margin-left: 3.8rem;

    a {
        text-decoration: none;
    }



/* @media only screen and (max-width: 600px) {
    overflow-y: hidden;
    
} */
`

const SubHeading = styled.h3`
    margin: 4rem 0; 
    font-weight: 700; 

    @media screen and (max-width: 500px) {
        text-align: center;
    }
`

export default SimilarMovies; 