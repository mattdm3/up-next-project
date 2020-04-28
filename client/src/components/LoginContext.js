import React, { createContext, useEffect, useState } from 'react';
import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase';
import 'firebase/auth';
// import admin from 'firebase-admin';



export const LoginContext = createContext(null);


const firebaseConfig = {
    apiKey: "AIzaSyBf0PRvItpZll7tKJBC-DS4DwYRZRmb_u0",
    authDomain: "up-next-c62cb.firebaseapp.com",
    databaseURL: "https://up-next-c62cb.firebaseio.com",
    projectId: "up-next-c62cb",
    storageBucket: "up-next-c62cb.appspot.com",
    messagingSenderId: "497710210803",
    appId: "1:497710210803:web:3daae19de57edf3c582186"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();


const providers = {
    googleProvider: new firebase.auth.GoogleAuthProvider(),
};

const LoginProvider = ({ children, signInWithGoogle, user, signOut }) => {

    // console.log(firebaseAppAuth.getUid());

    // console.log(user, "USER");

    // firebaseAppAuth.currentUser && console.log(firebaseAppAuth.currentUser.uid);

    const [appUser, setAppUser] = useState({});
    const [message, setMessage] = useState('');

    // firebaseAppAuth.currentUser && console.log(firebaseAppAuth.currentUser.providerData[0].uid)

    const handleSignOut = () => {
        signOut();
        setAppUser({});
    }

    useEffect(() => {
        if (user) {
            // console.log(user);

            fetch(`/users`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    uid: user.uid,
                }),
            })
                .then((res) => res.json())
                .then((json) => {
                    setAppUser(json.data);
                    setMessage(json.message);
                });

        }
    }, [user])





    const updateUserData = () => {
        // console.log(user, "current user trigger")

        // console.log(firebaseAppAuth.currentUser);

        user && fetch(`/updateUserData`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: user.email,
                currentUserId: firebaseAppAuth.currentUser.uid,
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                setAppUser(json.data);
                setMessage(json.message);
            });

    }
    const handleMovieLike = (id) => {

        user && fetch(`/handleLikeMovie`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: user.email,
                currentUserId: firebaseAppAuth.currentUser.uid,
                movieId: id,
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                setAppUser(json.data);
                setMessage(json.message);
            });

    }

    return <LoginContext.Provider value={{ handleMovieLike, signInWithGoogle, appUser, handleSignOut, message, updateUserData }}>{children}</LoginContext.Provider>;
};

// export default LoginProvider;
export default withFirebaseAuth({
    providers,
    firebaseAppAuth,
})(LoginProvider);