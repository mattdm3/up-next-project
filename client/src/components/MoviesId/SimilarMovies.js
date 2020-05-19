import React, { useState } from 'react';
import styled from 'styled-components';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa'
import { Link } from 'react-router-dom';
// import { SubHeading } from '../CONSTANTS'
import posterplaceholder from '../poster-placeholder.png'
import { serverUrl } from '../LoginContext'

const SimilarMovies = ({ movieId, theme }) => {

    const [similarMoviesArray, setSimilarMoviesArray] = useState(null)

    // SCROLL
    const scrollRef = React.useRef();

    const scrollLeft = (ref) => {
        scrollRef.current.scrollBy(-(scrollRef.current.offsetWidth), 0)
    }
    const scrollRight = (ref) => {
        scrollRef.current.scrollBy((scrollRef.current.offsetWidth), 0)
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

    const handleClick = () => {
        window.scrollTo(0, 0);
    }


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


                        <StyledLink onClick={() => handleClick()} key={movie.id} to={`/movies/${movie.id}`}>

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



                    )
                })}
            </Wrapper>

        </Container>
    )
}



const StyledLink = styled(Link)`
    margin: 0 4rem;
    position: relative; 
    

    @media screen and (max-width: 400px) {
        margin: 0 2rem;
    }

    @media screen and (max-width: 320px) {
        margin: 0 1rem;
    }
`

const StyledPoster = styled.img`
    border-radius: 10px; 
    max-width: 200px; 
    margin-left: auto; 

`

const Container = styled.div`
    position: relative;
    height: 100%; 
    width: 100%; 
    margin-left: auto;
    margin-right: auto; 
    padding: 0 2rem;
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
    width: 100%;
    display: flex;
    overflow: hidden; 
    -webkit-overflow-scrolling: touch;
    

    /* border: 2px solid pink; */



    a {
        text-decoration: none;
    }



/* @media only screen and (max-width: 500px) {
    margin-left: 5.5rem;
    
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