import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { LoginContext } from '../LoginContext';
import RenderMovie from '../BrowseByGenre/RenderMovie'
import { StyledLink } from '../CONSTANTS'
const RenderProfile = ({ theme }) => {

    const { dataObject, updateUserData, appUser, signInWithGoogle, handleSignOut, message } = useContext(LoginContext);

    //this state will hold the data we're getting from the api from the user's up next list. 
    const [upNextMovieData, setUpNextMovieData] = useState([])

    console.log(upNextMovieData);



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


    // const getRecommendations = async () => {

    //     try {
    //         fetch(`/recommendations/123`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 uid: appUser.uid,
    //                 data: {
    //                     likedMovies: appUser.data.likedMovies,
    //                     dislikedMovies: appUser.data.dislikedMovies,
    //                     upNextList: appUser.data.upNextList
    //                 }
    //             })
    //         })
    //             .then(res => res.json())
    //             .then(data => console.log(data))

    //     } catch (error) {
    //         console.error(error)
    //     }


    // }

    return (
        <>
            <div>
                <h1>Welcome, {appUser.displayName}</h1>
                <h2>Here's what's 🍿Up Next...</h2>

                {/* <button onClick={getRecommendations}>GET RECOMMENDATIONS</button> */}
            </div>

            {upNextMovieData &&
                <StyledMovieContainer>

                    {upNextMovieData.map((movie) => {
                        return (

                            <StyledLink to={`/movies/${movie.id}`} >
                                <RenderMovie
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
        </>


    )
}


const StyledMovieContainer = styled.div`
    display: flex; 
    flex-wrap: wrap; 
    justify-content: space-between; 

`

export default RenderProfile; 