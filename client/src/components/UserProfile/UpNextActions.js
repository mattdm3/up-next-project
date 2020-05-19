import React, { useContext } from "react";
import styled from 'styled-components';
import { LoginContext } from '../LoginContext';
import { lightTheme } from '../theme';

const UpNextActions = ({ movieId, upNextMovieData, loading, setUpNextMovieData, setLoading }) => {

    const { handleMovieLike, handleMovieDislike } = useContext(LoginContext);




    const handleLike = (e) => {
        e.preventDefault();
        // setUpNextMovieData([])
        // setLoading(true);
        handleMovieLike(movieId);
        // setLoading(false)




        // setTimeout(() => {
        //     setLoading(false);
        // }, 1000)



    }

    const handleDislike = (e) => {
        e.preventDefault();


        handleMovieDislike(movieId);


    }



    return (

        <StyleActionContainer>
            <p onClick={(e) => handleLike(e)}><span role="img" aria-label="thumbs-up">👍🏼</span></p>
            <p onClick={(e) => handleDislike(e)}><span role="img" aria-label="thumbs-down">👎🏼</span></p>
        </StyleActionContainer>
    )
}


const StyleActionContainer = styled.div`
    display: flex; 
    z-index: 50;
    justify-content: space-evenly;
    width: 60%; 
    margin-top: 1.5rem;

    /* p:first-of-type {
        background: green;
    } */



    p {
        font-size: 1.4rem;
        margin-right: .5rem;
        padding: 15px; 
        background:   ${({ theme }) => theme === lightTheme ? "#232476" : "#F65F2D"};
        border-radius: 50%; 
        margin-right: 1rem;
        cursor: pointer; 

        &:hover {
            background: grey; 
        }
    }

`


// const scaleUp = keyframes`
//     0 {
//         transform: scale(0);
//     }
//     50% {
//         transform: scale(2);
//     }
//     100% {
//         transform: scale(1);
//     }
// `

// const ScaledButton = styled.div`
//     animation: ${scaleUp} 700ms ease forwards; 
// `

export default UpNextActions;