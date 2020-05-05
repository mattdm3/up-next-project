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



const Recommended = () => {

    const { recommendationCount, userLevel, recStatus, setRecStatus, movieCounter, setMovieCounter, handleRecomendationRequest, recommendedAPI, recommendedMovies, setRecommendedMovies, dataObject, updateUserData, appUser, signInWithGoogle, handleSignOut, message, theme } = useContext(LoginContext);

    const [loadingText, setLoadingText] = useState("🎬Generating Recommendations");


    const [recommendButton, setRecommendButton] = useState(true);


    appUser.data && console.log(appUser.data.recommendationCount, "rec count")
    console.log(userLevel, "userLevel")

    let history = useHistory()

    // console.log(appUser.data.recommendationCount)

    // RAW RECOMMENDATIONS FROM BACK END 

    React.useEffect(() => {

        if (appUser.data && appUser.data.recommendationCount >= userLevel) {
            setRecommendButton(false)
        } else setRecommendButton(true)
    }, [appUser])

    console.log(recommendButton)


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


                handleRecomendationRequest();

                const recText = ["🤐zipping movies", "📚creating dictionaries", "👩🏻‍🏫calculating coefficients", "...🤔thinking...", "......🤔🤔thinking more......", "(👍🏿good movie selections by the way)", "⌚okay almost there", "⏳man this AI stuff is slow"];
                setRecStatus("getting");
                let index = 0;
                setInterval(() => {
                    setLoadingText(recText[index]);
                    index++;
                }, 1800)

            }







        }

    }

    // recommendedAPI && console.log(recommendedAPI[0])
    // console.log(recommendedMovies)



    const triggerNextMovie = () => {

        let maximumCount = recommendedAPI.length - 1;

        if (movieCounter < maximumCount) {
            setMovieCounter(movieCounter + 1);
            console.log(movieCounter, "MOVIE COUNTER");
            console.log(recommendedAPI[movieCounter]);
            console.log(recommendedAPI[movieCounter].id)
        }

    }

    const triggerPreviousMovie = () => {

        let maximumCount = recommendedAPI.length;

        if (movieCounter >= 1) {
            setMovieCounter(movieCounter - 1);
            console.log(movieCounter, "MOVIE COUNTER");

        }

    }

    // console.log(recommendedAPI[movieCounter]);

    // console.log(movieCounter)



    return (

        appUser.email ?
            <RecommendedContainer>



                {recStatus === "getting" ?

                    <GetBtn disabled onClick={getRecommendations}><BeatLoader /></GetBtn>
                    :
                    <GetBtn style={recommendButton ? { opacity: "1" } : { opacity: ".5", boxShadow: "none" }} onClick={getRecommendations}>Generate Recommendations</GetBtn>}

                {
                    recStatus === "idle" ?
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
                        :
                        <div style={{ marginTop: "5rem", textAlign: "center" }}>
                            <ClipLoader />
                            <h3>{loadingText}</h3>
                        </div>



                }




            </RecommendedContainer >
            :
            <div>Create an account</div>


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
    cursor: pointer;
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

export default Recommended; 