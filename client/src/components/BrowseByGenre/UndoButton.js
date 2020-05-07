import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { LoginContext } from '../LoginContext';


const UndoButton = ({ movieId }) => {

    const { handleMovieLike, handleMovieDislike, updateUserData, appUser, signInWithGoogle, handleSignOut, message, setAppUser } = useContext(LoginContext);

    // console.log(appUser)

    const handleUndoRating = (e, movieId) => {
        e.preventDefault();
        console.log("UNDO")
        console.log(movieId)

        fetch(`/handleUndoRating`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: appUser.email,
                uid: appUser.uid,
                movieId: movieId,
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                setAppUser(json.data);
            });

    }




    return (

        <Undo onClick={(e) => handleUndoRating(e, movieId)} style={{ padding: "1rem" }}>Undo</Undo>

    )
}


const Undo = styled.p`
    cursor: pointer; 

    &:hover {
        color: #F65F2D;
        font-weight: 600;
    }
`


export default UndoButton; 