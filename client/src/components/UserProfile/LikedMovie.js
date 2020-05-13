import React, { useState, useContext } from 'react'
import styled from 'styled-components';
import { LoginContext } from '../LoginContext';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa'
import { StyledMovieContainer, Wrapper, StyledScrollLeft, StyledScrollRight, Container, StyledPoster, StyledLink } from './PROFILE-CONSTANTS'
import ClipLoader from 'react-spinners/ClipLoader'
import UndoButton from '../BrowseByGenre/UndoButton'


const LikedMovie = () => {

    const { dataObject, appUser } = useContext(LoginContext);


    const [likedMovieData, setLikedMovieData] = useState([])
    const [loading, setLoading] = useState(false)

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

        setLoading(true);

        setLikedMovieData([]);

        appUser.data && dataObject.liked && dataObject.liked.forEach((movieId) => {
            fetch(`/movies/${movieId}`)
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        setLikedMovieData(likedMovieData => [
                            ...likedMovieData,
                            data
                        ]);
                        setLoading(false)
                    }

                })

        })
    }, [dataObject])


    return (

        likedMovieData.length > 0 && likedMovieData[0].status_code != 34 ?
            (

                loading ?
                    <RingLoaderContainer>
                        <ClipLoader size={45} />
                    </RingLoaderContainer>
                    :
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

                                    <StyledLink key={"liked:" + movie.id} to={`/movies/${movie.id}`} >
                                        <StyledPoster src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} />

                                        <div style={{ fontSize: ".8rem", width: "fit-content" }}>
                                            <UndoButton movieId={movie.id} />
                                        </div>
                                    </StyledLink>
                                )
                            }
                            )}
                        </Wrapper>
                    </Container>)

            :
            (
                loading ?
                    <RingLoaderContainer>
                        <ClipLoader size={45} />
                    </RingLoaderContainer>
                    :

                    <StyledMovieContainer>
                        <p>Nothing here yet.</p>
                    </StyledMovieContainer>)


    )
}


const RingLoaderContainer = styled.div`
    width: 25rem;
    display: flex; 
    justify-content: center; 
    align-items: center;

`


export default LikedMovie; 