import React, { createContext, useCallback, useEffect, useState } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import { AppUser, useGetAppUser } from "../hooks/useGetAppUser";
import { firebaseConfig } from "../config/firebase";
// import admin from 'firebase-admin';

export const LoginContext = createContext(null);
// export const serverUrl = "https://backend-upnext.herokuapp.com"
export const serverUrl = "";

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();

firebase.analytics();

const LoginProvider = ({ children, loading }: any) => {
  //app User will get the json.data (which is holding the request body + any liked/disliked data)
  const [user, setUser] = useState<firebase.User | null>(null);
  const [appUser, setAppUser] = useState<any>({});
  const [message, setMessage] = useState("");
  const [dataObject, setDataObject] = useState<any>({});
  const [recommendedAPI, setRecommendedAPI] = useState([]);
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

  const [userLevel, setUserLevel] = useState(0);
  const [recommendAllowed, setRecommendAllowed] = useState(false);
  const [recommendationCount, setRecommendationCount] = useState(0);
  const [triggerSearchBar, setTriggerSearchBar] = useState(false);
  const [inputValue, setInputValue] = useState("");
  //debugging/

  const [preparedMovies, setPreparedMovies] = useState("idle");

  const { getAppUser } = useGetAppUser();

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

  function calculateLevel(ratingAmount) {
    let level = Math.floor(ratingAmount / 10);

    setUserLevel(level);
    setRecommendationCount(level);
  }

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

  useEffect(() => {
    if (dataObject.liked) {
      calculateLevel(dataObject.liked.length);
    }
  }, [recommendedAPI, dataObject, appUser]);

  // If this is true, we'll signal the navbar.

  useEffect(() => {
    if (appUser.data && appUser.data.recommendationCount >= userLevel) {
      setRecommendAllowed(false);
    } else setRecommendAllowed(true);
  }, [appUser, recommendedAPI, userLevel]);

  // IF USER DELETES ALL MOVIES OBJECT ARRAY, DO THIS/ (THIS FIXED IT TEMPORARILY ) TRYING IN BACK END

  // useEffect(() => {

  //     if (appUser.data) {

  //         if (appUser.data.likedMovies === undefined) {
  //             appUser.data.likedMovies = 0
  //         };

  //         if (!appUser.data.upNextList) {
  //             appUser.data.upNextList = 0
  //         }

  //         if (appUser.data.dislikedMovies === undefined) {
  //             appUser.data.dislikedMovies = 0
  //         }

  //     }

  // }, [appUser])

  // HANDLE SIGNOUT

  const handleSignOut = () => {
    // signOut();
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
  };

  const handleMovieLike = useCallback(
    (id: number) => {
      user &&
        fetch(`${serverUrl}/users/like`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            uid: firebaseAppAuth?.currentUser?.uid,
            movieId: id.toString(),
          }),
        })
          .then((res) => res.json())
          .then((json) => {
            setAppUser(json.data);
            setMessage(json.message);
          });
    },
    [user]
  );

  const handleMovieDislike = useCallback(
    (id) => {
      user &&
        fetch(`${serverUrl}/users/dislike`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            uid: firebaseAppAuth?.currentUser?.uid,
            movieId: id.toString(),
          }),
        })
          .then((res) => res.json())
          .then((json) => {
            setAppUser(json.data);
            setMessage(json.message);
          });
    },
    [user]
  );

  const handleAddUpNext = useCallback(
    (id) => {
      user &&
        fetch(`${serverUrl}/users/upNext`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            uid: firebaseAppAuth?.currentUser?.uid,
            movieId: id.toString(),
          }),
        })
          .then((res) => res.json())
          .then((json) => {
            setAppUser(json.data);
            setMessage(json.message);
          });
    },
    [user]
  );

  // TURN RECOMMENDATIONS INTO DATA (SEND TO API) (TRIED IN B.E. FIRST)

  const handleRecomendationRequest = () => {
    setRecommendationCount(recommendationCount + 1);
    try {
      fetch(`${serverUrl}/recommendations/get`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: appUser.uid,
          data: {
            likedMovies: appUser.data.likedMovies,
            dislikedMovies: appUser.data.dislikedMovies,
            upNextList: appUser.data.upNextList,
          },
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          setAppUser(json.data);
          setMessage(json.message);
        });
      // .then(data => console.log(data))
    } catch (error) {
      console.error(error);
    }
  };

  // REC STEP 2: CALL API WITH RESULTS!

  // TAKE RECOMMENDATIONS FROM USER OBJECT AND GET API MOVIES (objects) and set in STATE!
  //ONLY DO THIS WHEN THE RECOMMENDATION COUNT CHANGES (SO WHEN USER GENERATES NEW RECS)

  // const checkRec = () => {
  //     if (recommendedAPI.length === 10) {
  //         setRecStatus('idle')
  //     }
  // }

  useEffect(() => {
    let recommendationsArray;
    if (!!appUser?.data && !!appUser?.data?.recommendations) {
      recommendationsArray = Object.values(appUser.data.recommendations);
    }

    setRecommendedAPI([]);

    recommendationsArray?.length > 1 &&
      recommendationsArray.forEach((movieId) => {
        fetch(`${serverUrl}/movies/${movieId}`)
          .then((res) => res.json())
          .then((data) => {
            // @ts-ignore
            setRecommendedAPI((recommendedAPI) => [...recommendedAPI, data]);
          });
        // .then(setRecStatus('idle'))
        // .then(checkRec())
      });
  }, [appUser.data, recommendationCount]);

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
        recommendationCount,
        userLevel,
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
        handleRecomendationRequest,
        recommendedAPI,
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
