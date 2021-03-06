import React, { useState, useContext } from 'react'
import styled from 'styled-components';
import { serverUrl, LoginContext } from '../LoginContext';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa'
import { StyledMovieContainer, Wrapper, StyledScrollLeft, StyledScrollRight, Container, StyledPoster, StyledLink } from './PROFILE-CONSTANTS'
import UpNextActions from './UpNextActions';
import ClipLoader from 'react-spinners/ClipLoader'

const UpNextMovies = () => {

    const { dataObject, appUser } = useContext(LoginContext);

    const [upNextMovieData, setUpNextMovieData] = useState([])
    const [loading, setLoading] = useState(false)




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

        setUpNextMovieData([]);
        setLoading(true)

        appUser.data && dataObject.upNextList && dataObject.upNextList.forEach((movieId) => {

            if (movieId !== "none") {
                try {

                    fetch(`${serverUrl}/movies/${movieId}`)
                        .then(res => res.json())
                        .then(data => {
                            if (data) {
                                setUpNextMovieData(upNextMovieData => [
                                    ...upNextMovieData,
                                    data
                                ]);
                                setLoading(false)
                            }

                        })

                } catch (error) {
                    console.log('error searching movie', error.message)
                }
            }


        })

    }, [dataObject])




    return (

        upNextMovieData.length > 0 && upNextMovieData[0].status_code !== 34 ?

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

                            {upNextMovieData && upNextMovieData.map((movie) => {
                                return (

                                    <ListContainer key={"upNext:" + movie.id}>
                                        <StyledLink to={`/movies/${movie.id}`} >


                                            <StyledPoster src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`} />




                                        </StyledLink>
                                        <UpNextActions setUpNextMovieData={setUpNextMovieData} loading={loading} setLoading={setLoading} movieId={movie.id} />
                                    </ListContainer>


                                )
                            }
                            )}
                        </Wrapper>
                    </Container>

            )



            :
            (
                loading ?
                    <RingLoaderContainer>
                        <ClipLoader size={45} />
                    </RingLoaderContainer>
                    :
                    <StyledMovieContainer>
                        <p>Nothing here yet.</p>
                    </StyledMovieContainer>
            )





    )
}

const RingLoaderContainer = styled.div`
    width: 25rem;
    display: flex; 
    justify-content: center; 
    align-items: center;

`

const ListContainer = styled.div`
    display: flex; 
    flex-direction: column;
    align-items: center;
    margin: 0 10px; 

    /* @media screen and (max-width: 500px) {
        width: 100vw; 
    } */
    
`



export default UpNextMovies; 