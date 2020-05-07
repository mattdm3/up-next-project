import React, { useState, useRef, useEffect, useContext } from 'react'
import styled from 'styled-components';
import { LoginContext } from '../LoginContext';
import UpNextMovies from './UpNextMovies';
import { PageHeading } from '../CONSTANTS'
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa'
import { Link, NavLink } from 'react-router-dom';
import { StyledMovieContainer, Subheading, Wrapper, StyledScrollLeft, StyledScrollRight, Container, StyledPoster, StyledLink } from './PROFILE-CONSTANTS'


const LikedMovie = () => {

    const { dataObject, updateUserData, appUser, signInWithGoogle, handleSignOut, message } = useContext(LoginContext);

    const [likedMovieData, setLikedMovieData] = useState([])
    // SCROLL
    const scrollRef = React.useRef();

    const scrollLeft = (ref) => {
        scrollRef.current.scrollBy(-300, 0)
    }
    const scrollRight = (ref) => {
        scrollRef.current.scrollBy(300, 0)
    }

    const executeScrollLeft = () => scrollLeft(scrollRef);
    const executeScrollRight = () => scrollRight(scrollRef);
    // 



    React.useEffect(() => {
        dataObject.liked && dataObject.liked.forEach((movieId) => {
            fetch(`/movies/${movieId}`)
                .then(res => res.json())
                .then(data => {
                    setLikedMovieData(likedMovieData => [
                        ...likedMovieData,
                        data
                    ])
                })

        })
    }, [appUser, dataObject])


    return (

        likedMovieData.length > 0 ?

            <Container>
                <StyledScrollLeft onClick={executeScrollLeft}>
                    <FaCaretLeft />
                </StyledScrollLeft>
                <StyledScrollRight onClick={executeScrollRight}>
                    <FaCaretRight />
                </StyledScrollRight>
                <Wrapper style={{ scrollBehavior: "smooth" }} ref={scrollRef}>

                    {likedMovieData && likedMovieData.map((movie) => {
                        return (

                            <StyledLink to={`/movies/${movie.id}`} >
                                <StyledPoster src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} />
                            </StyledLink>
                        )
                    }
                    )}
                </Wrapper>
            </Container>

            :
            <StyledMovieContainer>
                <p>Nothing here yet.</p>
            </StyledMovieContainer>


    )
}



export default LikedMovie; 