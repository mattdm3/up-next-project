import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import { genres } from '../../data/genres';
import RenderMovie from './RenderMovie';
import { StyledLink } from '../CONSTANTS'
import { NavLink } from 'react-router-dom'
import SortDropdown from './SortDropDown';
import { LoginContext } from '../LoginContext';

const BrowseByGenre = ({ theme }) => {

    const [genreData, setGenreData] = useState(null);

    const { genreName } = useParams();

    const { sortLabel, setSortLabel, sortOption, setSortOption, selectedGenre, setSelectedGenre } = useContext(LoginContext);

    // check the id of the genre; 
    let selectedGenreId = null;

    for (let i = 0; i < genres.length; i++) {
        if (genres[i].name === genreName) {
            selectedGenreId = genres[i].id;
        }
    }


    // THIS IS going to refetch based on the sort choice
    const handleSort = (option) => {

        console.log(option.key)
        setSortOption(option.key)

    }


    React.useEffect(() => {

        if (selectedGenreId) {
            fetch(`/genres/${selectedGenreId}?sort=${sortOption}`)
                .then(res => res.json())
                .then(data => setGenreData(data))
        }

    }, [selectedGenreId, sortOption])





    return (
        <>
            <GenreButtons>
                <NavigationLink onClick={() => setSelectedGenre("action")} activeStyle={activeClass} exact to="/genres/action">Action</NavigationLink>
                <NavigationLink onClick={() => setSelectedGenre("drama")} activeStyle={activeClass} to="/genres/drama">Drama</NavigationLink>
                <NavigationLink onClick={() => setSelectedGenre("adventure")} activeStyle={activeClass} to="/genres/adventure">Adventure</NavigationLink>
                <NavigationLink onClick={() => setSelectedGenre("comedy")} activeStyle={activeClass} to="/genres/comedy">Comedy</NavigationLink>
                <NavigationLink onClick={() => setSelectedGenre("crime")} activeStyle={activeClass} to="/genres/crime">Crime</NavigationLink>
                <NavigationLink onClick={() => setSelectedGenre("documentary")} activeStyle={activeClass} to="/genres/documentary">Documentary</NavigationLink>

                <SortDropdown
                    handleSort={handleSort}

                />
            </GenreButtons>



            <StyledMovieContainer>


                {genreData && genreData.results.map(movie => {
                    return (
                        <StyledLink key={movie.id} to={`/movies/${movie.id}`} >
                            <RenderMovie
                                altText={movie.title}
                                genre={genreName}
                                releaseDate={movie.release_date.slice(0, 4)}
                                title={movie.title}
                                imgSrc={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                ratings={movie.vote_average}
                                theme={theme}
                                movieId={movie.id}
                            />
                        </StyledLink>

                    )
                })
                }
            </StyledMovieContainer>
        </>
    )
}

const StyledMovieContainer = styled.div`
    display: flex; 
    flex-wrap: wrap; 
    justify-content: space-between; 
    margin-top: 3rem;
    position: relative;

`

const NavigationLink = styled(NavLink)`
    text-decoration: none;
    color: inherit;
    font-weight: 600; 
    transition-duration: 400ms; 
    padding: 5px;
    border-radius: 5px;
`
const activeClass = {
    color: "white",
    background: "blue",
    textDecoration: "none",
    padding: "5px",
    borderRadius: "5px"
}

const GenreButtons = styled.div`
    display: flex; 
    position:relative;
`

export default BrowseByGenre;