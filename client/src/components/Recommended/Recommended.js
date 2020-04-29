import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { LoginContext } from '../LoginContext';
import RenderMovie from '../BrowseByGenre/RenderMovie';

const Recommended = () => {

    const { dataObject, updateUserData, appUser, signInWithGoogle, handleSignOut, message } = useContext(LoginContext);

    const [recommendedMovies, setRecommendedMovies] = useState(null);


    const getRecommendations = async () => {

        try {
            fetch(`/recommendations/123`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uid: appUser.uid,
                    data: {
                        likedMovies: appUser.data.likedMovies,
                        dislikedMovies: appUser.data.dislikedMovies,
                        upNextList: appUser.data.upNextList
                    }
                })
            })
                .then(res => res.json())
                .then(data => setRecommendedMovies(data.body))
            // .then(data => console.log(data))


        } catch (error) {
            console.error(error)
        }


    }

    console.log(recommendedMovies);

    return (


        <div>
            <button onClick={getRecommendations}>Get Recommended</button>




            <div>
                {recommendedMovies && recommendedMovies.map(movie => {
                    return <h2>{movie.title}</h2>
                })}
            </div>
        </div>


    )
}

export default Recommended; 