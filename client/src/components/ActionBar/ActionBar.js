import React, { useContext } from "react";
import styled from 'styled-components';
import { LoginContext } from '../LoginContext';

const ActionBar = ({ movieId }) => {

    const { handleMovieLike, updateUserData, appUser, signInWithGoogle, handleSignOut, message } = useContext(LoginContext);

    const handleLike = (e) => {
        e.preventDefault();

        handleMovieLike(movieId);


    }



    return (
        <StyleActionContainer>
            <p onClick={(e) => handleLike(e)}>👍🏼</p>
            <p>🍿</p>
            <p>👎🏼</p>
        </StyleActionContainer>
    )
}

const StyleActionContainer = styled.div`
    display: flex; 
    z-index: 50; 
    justify-content: space-between;

    p {
        font-size: 2.4rem;
    }
`

export default ActionBar;