import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { LoginContext } from '../LoginContext';
import UpNextMovies from './UpNextMovies';
import { PageHeading } from '../CONSTANTS'
import LikedMovie from './LikedMovie';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa'
import { Link, NavLink } from 'react-router-dom';
import DislikedMovie from './DislikedMovie';




const RenderProfile = ({ theme }) => {

    const { dataObject, updateUserData, appUser, signInWithGoogle, handleSignOut, message } = useContext(LoginContext);

    //this state will hold the data we're getting from the api from the user's up next list. 
    const [upNextMovieData, setUpNextMovieData] = useState([])



    console.log(dataObject.disliked)

    // console.log(upNextMovieData);
    // SCROLL
    const scrollRef = React.useRef();

    const scrollLeft = (ref) => {
        scrollRef.current.scrollBy(-300, 0)
    }
    const scrollRight = (ref) => {
        scrollRef.current.scrollBy(300, 0)
    }

    const executeScrollLeft = () => scrollLeft(scrollRef);
    const executeScrollRight = () => scrollRight(scrollRef);
    // 



    // React.useEffect(() => {

    //     dataObject.upNextList && dataObject.upNextList.forEach((movieId) => {

    //         fetch(`/movies/${movieId}`)
    //             .then(res => res.json())
    //             .then(data => {
    //                 setUpNextMovieData(upNextMovieData => [
    //                     ...upNextMovieData,
    //                     data
    //                 ])
    //             })

    //     })

    // }, [appUser, dataObject])


    // React.useEffect(() => {
    //     dataObject.liked && dataObject.liked.forEach((movieId) => {
    //         fetch(`/movies/${movieId}`)
    //             .then(res => res.json())
    //             .then(data => {
    //                 setLikedMovieData(likedMovieData => [
    //                     ...likedMovieData,
    //                     data
    //                 ])
    //             })

    //     })
    // }, [appUser, dataObject])


    // React.useEffect(() => {
    //     dataObject.disliked && dataObject.disliked.forEach((movieId) => {
    //         fetch(`/movies/${movieId}`)
    //             .then(res => res.json())
    //             .then(data => {
    //                 setDislikedMovieData(dislikedMovieData => [
    //                     ...dislikedMovieData,
    //                     data
    //                 ])
    //             })

    //     })
    // }, [appUser, dataObject])



    return (
        <>

            <PageHeading>Welcome, {appUser.displayName}</PageHeading>
            <SubHeading>Here's what's 🍿Up Next</SubHeading>
            <UpNextMovies />

            <SubHeading>Movies You Liked 👍🏼</SubHeading>

            <LikedMovie />


            <SubHeading>Movies You Disliked 👎🏼</SubHeading>

            <DislikedMovie />


        </>


    )
}

const StyledLink = styled(Link)`
    margin: 0 2.3rem; 
    position: relative; 
`

const StyledPoster = styled.img`
    border-radius: 10px; 
`

const Container = styled.div`
    position: relative;
    height: 100%; 
    width: 90%; 
    margin-left: auto;
    margin-right: auto; 
    margin: 8rem 0; 
`

const StyledScrollLeft = styled.div`
    position: absolute; 
    left: -4.5rem;
    top: 50%;  
    z-index: 10; 
    font-size:4rem; 
    cursor: pointer;

`
const StyledScrollRight = styled.div`
    position: absolute; 
    right: -4.5rem;
    top: 50%;  
    z-index: 10; 
    font-size:4rem; 
    cursor: pointer;

`


const Wrapper = styled.div`
    overflow: auto;
    white-space: nowrap;
    width: 100%;
    display: flex;
    overflow: hidden; 

    a {
        text-decoration: none;
    }



/* @media only screen and (max-width: 600px) {
    overflow-y: hidden;
    
} */
`
const SubHeading = styled.h3`
    margin: 4rem 0; 
    font-weight: 700; 
`


const StyledMovieContainer = styled.div`
    display: flex; 
    /* flex-wrap: wrap;  */
    overflow-x: scroll;
    justify-content: space-between; 

`

export default RenderProfile; 