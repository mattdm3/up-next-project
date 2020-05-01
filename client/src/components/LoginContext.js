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


const options = [
    {
        label: 'Popularity',
        key: 'popularity'
    },
    {
        label: 'Highest Rated',
        key: 'vote_average'
    },
    {
        label: 'Highest Grossing',
        key: 'revenue'
    },


]

const LoginProvider = ({ children, signInWithGoogle, user, signOut }) => {

    // console.log(firebaseAppAuth.getUid());


    //app User will get the json.data (which is holding the request body + any liked/disliked data)
    const [appUser, setAppUser] = useState({});
    const [message, setMessage] = useState('');
    const [dataObject, setDataObject] = useState({});
    const [recommendedAPI, setRecommendedAPI] = useState([]);
    const [movieCounter, setMovieCounter] = useState(0)
    const [sortOption, setSortOption] = useState('popularity')
    const [selectedGenre, setSelectedGenre] = useState('action')
    const [sortLabel, setSortLabel] = useState('Popularity')
    const [browsePage, setBrowsePage] = useState(1);


    useEffect(() => {
        if (appUser.email) {
            let likedMoviesArray = Object.values(appUser.data.likedMovies);
            let dislikedMoviesArray = Object.values(appUser.data.dislikedMovies);
            let upNextArray = Object.values(appUser.data.upNextList);

            setDataObject({
                disliked: dislikedMoviesArray,
                liked: likedMoviesArray,
                upNextList: upNextArray,
            });
        }
    }, [appUser])


    // HANDLE SIGNOUT

    const handleSignOut = () => {
        signOut();
        setAppUser({});
    }

    // CREATES NEW USER 

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
                    data: {
                        likedMovies: "none",
                        dislikedMovies: "none",
                        upNextList: "none",
                    }
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

        // user && fetch(`/updateUserData`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         email: user.email,
        //         currentUserId: firebaseAppAuth.currentUser.uid,
        //     }),
        // })
        //     .then((res) => res.json())
        //     .then((json) => {
        //         setAppUser(json.data);
        //         setMessage(json.message);
        //     });

    }

    const handleMovieLike = (id) => {

        user && fetch(`/handleLikeMovie`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: user.email,
                uid: firebaseAppAuth.currentUser.uid,
                movieId: id,
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                setAppUser(json.data);
                setMessage(json.message);
            });

    }

    const handleMovieDislike = (id) => {

        user && fetch(`/handleDislikeMovie`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: user.email,
                uid: firebaseAppAuth.currentUser.uid,
                movieId: id,
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                setAppUser(json.data);
                setMessage(json.message);
            });

    }

    const handleAddUpNext = (id) => {

        user && fetch(`/handleAddUpNext`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: user.email,
                uid: firebaseAppAuth.currentUser.uid,
                movieId: id,
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                setAppUser(json.data);
                setMessage(json.message);
            });

    }

    // TURN RECOMMENDATIONS INTO DATA (SEND TO API) (TRIED IN B.E. FIRST)

    const handleRecomendationRequest = () => {
        try {

            //recommendation status state? 


            fetch(`/recommendations/get`, {
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
                .then((json) => {
                    setAppUser(json.data);
                    setMessage(json.message);
                    console.log(json)
                });
            // .then(data => console.log(data))


        } catch (error) {
            console.error(error)
        }

    }

    // TAKE RECOMMENDATIONS FROM USER OBJECT AND GET API MOVIES (objects) and set in STATE!


    React.useEffect(() => {

        let recommendationsArray;
        if (appUser.data != null && appUser.data.recommendations != null) {

            recommendationsArray = Object.values(appUser.data.recommendations);
        }

        recommendationsArray && recommendationsArray.length > 1 && recommendationsArray.forEach((movieId) => {

            setRecommendedAPI([])

            fetch(`/movies/${movieId}`)
                .then(res => res.json())
                .then(data => {
                    setRecommendedAPI(recommendedAPI => [
                        ...recommendedAPI,
                        data,
                    ])
                })

        })

    }, [appUser])

    return <LoginContext.Provider value={{ browsePage, setBrowsePage, sortLabel, setSortLabel, selectedGenre, setSelectedGenre, sortOption, setSortOption, movieCounter, setMovieCounter, handleRecomendationRequest, recommendedAPI, dataObject, handleAddUpNext, handleMovieLike, handleMovieDislike, signInWithGoogle, appUser, handleSignOut, message, updateUserData }}>{children}</LoginContext.Provider>;
};

// export default LoginProvider;
export default withFirebaseAuth({
    providers,
    firebaseAppAuth,
})(LoginProvider);