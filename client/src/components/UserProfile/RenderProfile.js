import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { LoginContext } from '../LoginContext';
import UpNextMovies from './UpNextMovies';
import { PageHeading, StyledLink } from '../CONSTANTS'
import LikedMovie from './LikedMovie';





const RenderProfile = ({ theme }) => {

    const { dataObject, updateUserData, appUser, signInWithGoogle, handleSignOut, message } = useContext(LoginContext);

    //this state will hold the data we're getting from the api from the user's up next list. 
    const [upNextMovieData, setUpNextMovieData] = useState([])
    const [likedMovieData, setLikedMovieData] = useState([])
    const [dislikedMovieData, setDislikedMovieData] = useState([])

    // console.log(upNextMovieData);



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


    React.useEffect(() => {
        dataObject.disliked && dataObject.disliked.forEach((movieId) => {
            fetch(`/movies/${movieId}`)
                .then(res => res.json())
                .then(data => {
                    setDislikedMovieData(dislikedMovieData => [
                        ...dislikedMovieData,
                        data
                    ])
                })

        })
    }, [appUser, dataObject])



    return (
        <>

            <PageHeading>Welcome, {appUser.displayName}</PageHeading>
            <SubHeading>Here's what's 🍿Up Next</SubHeading>

            {/* <button onClick={getRecommendations}>GET RECOMMENDATIONS</button> */}


            {upNextMovieData &&
                <StyledMovieContainer>

                    {upNextMovieData.map((movie) => {
                        return (

                            <StyledLink to={`/movies/${movie.id}`} >
                                <UpNextMovies
                                    key={movie.id}
                                    altText={movie.title}
                                    /* genre={genreName} */
                                    releaseDate={movie.release_date.slice(0, 4)}
                                    title={movie.title}
                                    imgSrc={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                    ratings={movie.vote_average}
                                    theme={theme}
                                    movieId={movie.id}
                                />
                            </StyledLink>


                        )
                    }
                    )}
                </StyledMovieContainer>
            }


            <SubHeading>Movies You Liked 👍🏼</SubHeading>

            <StyledMovieContainer>

                {likedMovieData.map((movie) => {
                    return (

                        <StyledLink to={`/movies/${movie.id}`} >
                            <LikedMovie
                                key={movie.id}
                                altText={movie.title}
                                /* genre={genreName} */
                                releaseDate={movie.release_date.slice(0, 4)}
                                title={movie.title}
                                imgSrc={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                ratings={movie.vote_average}
                                theme={theme}
                                movieId={movie.id}
                            />
                        </StyledLink>


                    )
                }
                )}
            </StyledMovieContainer>


            <SubHeading>Movies You Disliked</SubHeading>

            <StyledMovieContainer>

                {dislikedMovieData.map((movie) => {
                    return (

                        <StyledLink to={`/movies/${movie.id}`} >
                            <LikedMovie
                                key={movie.id}
                                altText={movie.title}
                                /* genre={genreName} */
                                releaseDate={movie.release_date.slice(0, 4)}
                                title={movie.title}
                                imgSrc={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                ratings={movie.vote_average}
                                theme={theme}
                                movieId={movie.id}
                            />
                        </StyledLink>


                    )
                }
                )}
            </StyledMovieContainer>

        </>


    )
}

const SubHeading = styled.h3`
    margin: 4rem 0; 
    font-weight: 700; 
`


const StyledMovieContainer = styled.div`
    display: flex; 
    /* flex-wrap: wrap;  */
    overflow-x: scroll;
    justify-content: space-between; 

`

export default RenderProfile; 