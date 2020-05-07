import React, { useContext } from 'react';
import styled from 'styled-components';
import { LoginContext } from '../LoginContext';
import { app } from 'firebase';
import RenderProfile from './RenderProfile';

const UserProfile = () => {


    const { updateUserData, appUser, signInWithGoogle, handleSignOut, message } = useContext(LoginContext);


    return (
        appUser.email ? <RenderProfile /> : <div>Please login or make an account.</div>

    )
}

export default UserProfile; 