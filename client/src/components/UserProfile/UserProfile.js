import React, { useContext } from 'react';
import styled from 'styled-components';
import { LoginContext } from '../LoginContext';
import { app } from 'firebase';
import RenderProfile from './RenderProfile';

const UserProfile = () => {


    const { updateUserData, appUser, signInWithGoogle, handleSignOut, message } = useContext(LoginContext);


    return (
        appUser.email ?

            appUser.data.upNextList != "none" ?
                <RenderProfile /> : <div>Add Some Movies to your UpNext List</div>
            :
            <div>Create an Account</div>
    )
}

export default UserProfile; 