import React, { useContext } from 'react';
import styled from 'styled-components';
import { LoginContext } from '../LoginContext';
import UpNextMovies from './UpNextMovies';
import { PageHeading } from '../CONSTANTS'
import LikedMovie from './LikedMovie';
import DislikedMovie from './DislikedMovie';




const RenderProfile = ({ theme }) => {

    const { appUser } = useContext(LoginContext);

    //this state will hold the data we're getting from the api from the user's up next list. 
    // const [upNextMovieData, setUpNextMovieData] = useState([])






    return (
        <>

            <PageHeading>Welcome, {appUser.displayName}</PageHeading>
            <SubHeading>Here's what's <span role="img" aria-label="popcorn">🍿</span>Up Next</SubHeading>
            <UpNextMovies />

            <SubHeading>Movies You Liked <span role="img" aria-label="thumbs-up">👍🏼</span></SubHeading>

            <LikedMovie />


            <SubHeading>Movies You Disliked <span role="img" aria-label="thumbs-down">👎🏼</span></SubHeading>

            <DislikedMovie />


        </>


    )
}


const SubHeading = styled.h3`
    margin: 4rem 0; 
    font-weight: 700; 
`




export default RenderProfile; 