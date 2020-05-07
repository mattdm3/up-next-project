import React, { useState, useRef, useEffect, useContext } from 'react'
import styled from 'styled-components';
import { LoginContext } from '../LoginContext';
import { PageHeading } from '../CONSTANTS'
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa'
import { Link, NavLink } from 'react-router-dom';
import { StyledMovieContainer, Subheading, Wrapper, StyledScrollLeft, StyledScrollRight, Container, StyledPoster, StyledLink } from './PROFILE-CONSTANTS'
import UpNextActions from './UpNextActions';


const UpNextMovies = () => {

    const { dataObject, updateUserData, appUser, signInWithGoogle, handleSignOut, message } = useContext(LoginContext);

    const [upNextMovieData, setUpNextMovieData] = useState([])
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

        dataObject.upNextList && dataObject.upNextList.forEach((movieId) => {

            fetch(`/movies/${movieId}`)
                .then(res => res.json())
                .then(data => {
                    setUpNextMovieData(upNextMovieData => [
                        ...upNextMovieData,
                        data
                    ])
                })

        })

    }, [appUser, dataObject])


    return (

        upNextMovieData.length > 0 ?

            <Container>
                <StyledScrollLeft onClick={executeScrollLeft}>
                    <FaCaretLeft />
                </StyledScrollLeft>
                <StyledScrollRight onClick={executeScrollRight}>
                    <FaCaretRight />
                </StyledScrollRight>
                <Wrapper style={{ scrollBehavior: "smooth" }} ref={scrollRef}>

                    {upNextMovieData && upNextMovieData.map((movie) => {
                        return (
                            <>
                                <ListContainer>
                                    <StyledLink to={`/movies/${movie.id}`} >
                                        <StyledPoster src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`} />
                                    </StyledLink>
                                    <UpNextActions movieId={movie.id} />
                                </ListContainer>
                            </>

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

const ListContainer = styled.div`
    display: flex; 
    flex-direction: column;
    align-items: center;
`



export default UpNextMovies; 