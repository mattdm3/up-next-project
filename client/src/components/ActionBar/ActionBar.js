import React, { useContext, useState } from "react";
import styled, { keyframes } from 'styled-components';
import { LoginContext } from '../LoginContext';
import { lightTheme } from '../theme';

const ActionBar = ({ movieId }) => {

    const { handleMovieLike, handleMovieDislike, appUser, handleAddUpNext } = useContext(LoginContext);



    const handleLike = (e) => {
        e.preventDefault();

        // console.log(resultID, 'resultID')
        // console.log(genreData, 'GENRE DATA')

        // setGenreData(genreData => [
        //     ...genreData,
        //     [genreData.data]: genreData.splice(resultID, 1)
        // ]
        // ])

        // setTestArray(testArray => ([
        //     ...testArray,
        //     delete testArray[resultID]
        // ]))

        // setTestArray("HELLO")



        if (appUser.email) {
            handleMovieLike(movieId);
        }
        else {
            alert("Please make an account or login first.")
        }


    }

    const handleDislike = (e) => {
        e.preventDefault();

        if (appUser.email) {
            handleMovieDislike(movieId);
        } else {
            alert("Please make an account or login first.")
        }


    }

    const handleUpNext = (e) => {
        e.preventDefault();

        if (appUser.email) {
            handleAddUpNext(movieId)
        } else {
            alert("Please make an account or login first.")
        }

    }



    return (

        <StyleActionContainer>
            <p onClick={(e) => handleLike(e)}>👍🏼</p>
            <p onClick={(e) => handleUpNext(e)}>🍿</p>
            <p onClick={(e) => handleDislike(e)}>👎🏼</p>
        </StyleActionContainer>
    )
}


const StyleActionContainer = styled.div`
    display: flex; 
    z-index: 50;
    justify-content: space-evenly;
    width: 100%; 



    p {
        font-size: 1.8rem;
        margin-right: .5rem;
        padding: 15px; 
        background:   ${({ theme }) => theme === lightTheme ? "#232476" : "#F3F4FD"};
        border-radius: 50%; 
        margin-right: 1rem;

        &:hover {
            background: grey; 
        }
    }

`


const scaleUp = keyframes`
    0 {
        transform: scale(0);
    }
    50% {
        transform: scale(2);
    }
    100% {
        transform: scale(1);
    }
`

const ScaledButton = styled.div`
    animation: ${scaleUp} 700ms ease forwards; 
`

export default ActionBar;