import React, { createContext, useCallback, useEffect, useState } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import { AppUser, useGetAppUser } from "../hooks/useGetAppUser";
import { firebaseConfig } from "../config/firebase";
import { useGetMovieById } from "../hooks/useGetMovieById";
import {
  httpHandleDislike,
  httpHandleLike,
  httpHandleUpNextAdd,
} from "../request";
// import admin from 'firebase-admin';

export const LoginContext = createContext(null);
// export const SERVER_URL = "https://backend-upnext.herokuapp.com"

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();

firebase.analytics();

const LoginProvider = ({ children, loading }: any) => {
  //app User will get the json.data (which is holding the request body + any liked/disliked data)
  const [user, setUser] = useState<firebase.User | null>(null);
  const [appUser, setAppUser] = useState<any>({});
  const [message, setMessage] = useState("");
  const [dataObject, setDataObject] = useState<any>({});
  // const [recommendedAPI, setRecommendedAPI] = useState([]);
  const [movieCounter, setMovieCounter] = useState(0);
  const [sortOption, setSortOption] = useState("popularity");
  const [selectedGenre, setSelectedGenre] = useState("action");
  const [sortLabel, setSortLabel] = useState("Popularity");
  const [browsePage, setBrowsePage] = useState(1);
  const [lastSearch, setLastSearch] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [recStatus, setRecStatus] = useState("idle");
  const [theme, setTheme] = useState("dark");
  const [status, setStatus] = useState("loading");

  // const [userLevel, setUserLevel] = useState(0);
  const [recommendAllowed, setRecommendAllowed] = useState(false);
  // const [recommendationCount, setRecommendationCount] = useState(0);
  const [triggerSearchBar, setTriggerSearchBar] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [preparedMovies, setPreparedMovies] = useState("idle");

  const { getAppUser } = useGetAppUser();
  const { selectedMovieData } = useGetMovieById({ movieId: 899112 });

  console.log({ selectedMovieData });

  const handleAssignPreferences = useCallback((appUser: AppUser) => {
    let likedMoviesArray =
      appUser.data.likedMovies !== "none" &&
      Object.values(appUser.data.likedMovies);
    let dislikedMoviesArray =
      appUser.data.dislikedMovies !== "none" &&
      Object.values(appUser.data.dislikedMovies);
    let upNextArray =
      appUser.data.upNextList !== "none" &&
      Object.values(appUser.data.upNextList);

    setDataObject({
      disliked: dislikedMoviesArray,
      liked: likedMoviesArray,
      upNextList: upNextArray,
    });
  }, []);

  const handleGetAppUser = useCallback(
    async (user: any) => {
      const response = await getAppUser(user);
      if (response?.user) {
        setAppUser(response.user);
        handleAssignPreferences(response.user);
      }
      if (response?.message) {
        setMessage(response.message);
      }
    },
    [getAppUser, handleAssignPreferences]
  );

  const signInWithGoogle = useCallback(async () => {
    const provider = await firebaseAppAuth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
    handleGetAppUser(provider.user);
  }, [handleGetAppUser]);

  // function calculateLevel(ratingAmount) {
  //   let level = Math.floor(ratingAmount / 10);

  //   setUserLevel(level);
  //   setRecommendationCount(level);
  // }

  useEffect(() => {
    if (user && Object.keys(appUser)?.length) {
      setStatus("ready");
    }
  }, [user, appUser]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // Save the user to local storage
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        handleGetAppUser(user);
      } else {
        // Remove the user from local storage
        localStorage.removeItem("user");
      }
    });

    // Check for a user stored in local storage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [handleGetAppUser]);

  // useEffect(() => {
  //   if (dataObject.liked) {
  //     calculateLevel(dataObject.liked.length);
  //   }
  // }, [recommendedAPI, dataObject, appUser]);

  // If this is true, we'll signal the navbar.

  // useEffect(() => {
  //   if (appUser.data && appUser.data.recommendationCount >= userLevel) {
  //     setRecommendAllowed(false);
  //   } else setRecommendAllowed(true);
  // }, [appUser, recommendedAPI, userLevel]);

  const handleSignOut = useCallback(() => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log("SUCCESS SIGNOUT");
      })
      .catch((error) => {
        // An error happened.

        console.log(error, "sign out error");
      });

    setAppUser({});
  }, []);

  const handleMovieLike = useCallback(
    async (id: number) => {
      if (!user) return;
      const response = await httpHandleLike(user, firebaseAppAuth, id);
      setAppUser(response.data);
      setMessage(response.message);
    },
    [user]
  );

  const handleMovieDislike = useCallback(
    async (id) => {
      if (!user) return;
      const response = await httpHandleDislike(user, firebaseAppAuth, id);
      setAppUser(response.data);
      setMessage(response.message);
    },
    [user]
  );

  const handleAddUpNext = useCallback(
    async (id) => {
      if (!user) return;
      const response = await httpHandleUpNextAdd(id, firebaseAppAuth, user);
      setAppUser(response.data);
      setMessage(response.message);
    },
    [user]
  );

  // TURN RECOMMENDATIONS INTO DATA (SEND TO API) (TRIED IN B.E. FIRST)

  // const handleRecomendationRequest = () => {
  //   setRecommendationCount(recommendationCount + 1);
  //   try {
  //     fetch(`${SERVER_URL}/recommendations/get`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         uid: appUser.uid,
  //         data: {
  //           likedMovies: appUser.data.likedMovies,
  //           dislikedMovies: appUser.data.dislikedMovies,
  //           upNextList: appUser.data.upNextList,
  //         },
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .then((json) => {
  //         setAppUser(json.data);
  //         setMessage(json.message);
  //       });
  //     // .then(data => console.log(data))
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // REC STEP 2: CALL API WITH RESULTS!

  // TAKE RECOMMENDATIONS FROM USER OBJECT AND GET API MOVIES (objects) and set in STATE!
  //ONLY DO THIS WHEN THE RECOMMENDATION COUNT CHANGES (SO WHEN USER GENERATES NEW RECS)

  // const checkRec = () => {
  //     if (recommendedAPI.length === 10) {
  //         setRecStatus('idle')
  //     }
  // }

  // useEffect(() => {
  //   let recommendationsArray;
  //   if (!!appUser?.data && !!appUser?.data?.recommendations) {
  //     recommendationsArray = Object.values(appUser.data.recommendations);
  //   }

  //   setRecommendedAPI([]);

  //   recommendationsArray?.length > 1 &&
  //     recommendationsArray.forEach((movieId) => {
  //       fetch(`${SERVER_URL}/movies/${movieId}`)
  //         .then((res) => res.json())
  //         .then((data) => {
  //           // @ts-ignore
  //           setRecommendedAPI((recommendedAPI) => [...recommendedAPI, data]);
  //         });
  //       // .then(setRecStatus('idle'))
  //       // .then(checkRec())
  //     });
  // }, [appUser.data, recommendationCount]);

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <LoginContext.Provider
      // @ts-ignore
      value={{
        inputValue,
        setInputValue,
        triggerSearchBar,
        setTriggerSearchBar,
        preparedMovies,
        setPreparedMovies,
        setRecommendAllowed,
        recommendAllowed,
        loading,
        // recommendationCount,
        // userLevel,
        recStatus,
        setRecStatus,
        theme,
        setTheme,
        searchResults,
        setSearchResults,
        lastSearch,
        setLastSearch,
        browsePage,
        setBrowsePage,
        sortLabel,
        setSortLabel,
        selectedGenre,
        setSelectedGenre,
        sortOption,
        setSortOption,
        movieCounter,
        setMovieCounter,
        // handleRecomendationRequest,
        // recommendedAPI,
        dataObject,
        handleAddUpNext,
        handleMovieLike,
        handleMovieDislike,
        signInWithGoogle,
        appUser,
        setAppUser,
        handleSignOut,
        message,
        user,
        setMessage,
        status,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
// export default withFirebaseAuth({
//   providers,
//   firebaseAppAuth,
// })(LoginProvider);
