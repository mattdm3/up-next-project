import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { LoginContext } from '../LoginContext';
import RenderMovie from '../BrowseByGenre/RenderMovie';
import RenderRecommendations from './RenderRecommendations';
import RecommendedActions from '../Recommended/RecommendedActions'
import { lightTheme } from '../theme';
import { useHistory } from 'react-router-dom'
import ClipLoader from "react-spinners/ClipLoader";
import BeatLoader from 'react-spinners/BeatLoader';
import { FaGoogle } from 'react-icons/fa'



const Recommended = () => {

    const { loading, recommendationCount, userLevel, recStatus, setRecStatus, movieCounter, setMovieCounter, handleRecomendationRequest, recommendedAPI, recommendedMovies, setRecommendedMovies, dataObject, updateUserData, appUser, signInWithGoogle, handleSignOut, message, theme } = useContext(LoginContext);

    let history = useHistory()

    const [loadingText, setLoadingText] = useState("🎬Generating Recommendations");


    const [recommendButton, setRecommendButton] = useState(true);





    React.useEffect(() => {

        if (appUser.data && appUser.data.recommendationCount >= userLevel) {
            setRecommendButton(false)
        } else setRecommendButton(true)
    }, [appUser, recommendedAPI])


    // check if the recommendations have fully loaded. 

    React.useEffect(() => {

        if (recommendedAPI.length >= 10) {
            setRecStatus('idle')
        }

    }, [recommendedAPI])




    const getRecommendations = () => {



        //  CREATE CONDITIONS SO USER CAN"T KEEP ASKING FOR A REFRESH! 

        // CONDITION: 

        if (appUser.data.likedMovies.length < 5) {
            alert("please rate more movies first")
            history.push("/genres/action")
        } else {
            if (appUser.data.recommendationCount >= userLevel) {

                alert("rate more movies first")
            } else {
                // setRecStatus("getting");
                handleRecomendationRequest();

                const recText = ["🤐zipping movies", "📚creating dictionaries", "👩🏻‍🏫 calculating coefficients", "...🤔thinking...", "......🤔🤔thinking more......", "(👍good movie selections by the way)", "⌚okay almost there", "...getting the 🍿...", "almost....", "....there...."];

                let index = 0;
                setInterval(() => {
                    setLoadingText(recText[index]);
                    index++;
                }, 1900)

            }

        }

    }


    const triggerNextMovie = () => {

        let maximumCount = recommendedAPI.length - 1;

        if (movieCounter < maximumCount) {
            setMovieCounter(movieCounter + 1);

        }

    }

    const triggerPreviousMovie = () => {

        let maximumCount = recommendedAPI.length;

        if (movieCounter >= 1) {
            setMovieCounter(movieCounter - 1);

        }

    }

    const handleSignIn = () => {
        signInWithGoogle();

    }

    return (

        appUser.email ?
            <RecommendedContainer>
                {recStatus === "getting" ?

                    <GetBtn disabled onClick={getRecommendations}><BeatLoader /></GetBtn>
                    :
                    <GetBtn style={recommendButton ? { opacity: "1" } : { opacity: ".5", boxShadow: "none" }} onClick={getRecommendations}>{recommendButton ? "Generate Recommendations" : "Rate More Movies To Enable"}</GetBtn>}

                {
                    recStatus === "getting" ?
                        <div style={{ marginTop: "5rem", textAlign: "center" }}>
                            {/* <ClipLoader /> */}
                            <p style={{ fontSize: "1.2rem" }}>{loadingText}</p>
                        </div>
                        :
                        <div>
                            <FullViewContainer>
                                {
                                    recommendedAPI.length > 0 && recommendedAPI[movieCounter] && <RenderRecommendations
                                        title={recommendedAPI[movieCounter].title}
                                        altText={recommendedAPI[movieCounter].title}
                                        imgSrc={`https://image.tmdb.org/t/p/w500/${recommendedAPI[movieCounter].poster_path}`}
                                        ratings={recommendedAPI[movieCounter].vote_average}
                                        movieId={recommendedAPI[movieCounter].id}
                                        triggerNextMovie={triggerNextMovie}
                                        triggerPreviousMovie={triggerPreviousMovie}
                                        genres={recommendedAPI[movieCounter]["genres"]}
                                        releaseDate={recommendedAPI[movieCounter].release_date.slice(0, 4)}
                                    />
                                }
                            </FullViewContainer>
                        </div>
                }
            </RecommendedContainer>
            :
            <>
                <RecommendedContainer>
                    <LoginContainer>
                        <Line>
                            <hr />
                            <p>sign up or login with</p>
                            <hr />
                        </Line>

                    </LoginContainer>
                    <GoogleButton onClick={handleSignIn}>

                        {
                            loading ?
                                <BeatLoader />
                                :
                                <FaGoogle />
                        }


                    </GoogleButton>
                </RecommendedContainer>

            </>


    )
}

const GetBtn = styled.button`
        background: ${({ theme }) => theme === lightTheme ? "#F65F2D" : "#F65F2D"};
        color: ${({ theme }) => theme === lightTheme ? "#FFFFFF" : "#1F209A"};
        border-radius: 10px; 
        margin-bottom: 2rem;
        padding: 1rem 1.5rem;
        font-size: 1.1rem ;
        text-transform: uppercase; 
        font-weight: 600; 
        border: none;
        width: 17rem;
        cursor: pointer;
        box-shadow: ${({ theme }) => theme === lightTheme ? "0px 0px 15px -5px rgba(35,36,118,1)" : "0px 0px 15px -5px rgba(100,100,100,1)"};
    
`

const RecommendedContainer = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 10rem;
    
    
`



const StyledContainer = styled.div`

    margin-bottom: 5rem; 
    min-width: 20rem; 
    max-width: 20rem; 
    /* border: 1px solid red;  */
    
    position: relative; 




    h2 {
        max-width: 280px; 
    }

    p{
        color:  ${({ theme }) => theme === lightTheme ? "#8D89C8" : "#C7C7FD"};
    }
`

const FullViewContainer = styled.div`
    /* position: absolute;
    width: 100%; 
    height: 100vh;   */
    left: 0; 

`

const MoviePoster = styled.img`
    border-radius: 10px; 
    min-height: 24rem; 
    min-width: 20rem; 
    max-width: 20rem; 
    
`

const GoogleButton = styled.div`
    width: 14rem; 
    height: 2.7rem;
    margin-top: 1.5rem;
    border-radius: 10px; 
    background: #F65F2D; 
    color: white; 
    text-align: center; 
    display: flex; 
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    cursor: pointer;

`

const LoginContainer = styled.div`
    display: flex; 
    flex-direction: column; 
`

const Line = styled.div`
    display: flex; 
    justify-content: center; 
    align-items: center; 
    color: #8D89C8; 
    p {
        margin: 0;
        padding: 0; 
    }
    hr {
        color: #8D89C8; 
        width: 7rem; 
        margin: 0 .5rem; 
        padding: 0;
        height: 1px;  
        border-style: solid;
        border-width: 1px; 
    }
`

export default Recommended; 