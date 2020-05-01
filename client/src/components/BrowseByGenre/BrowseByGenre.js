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

    const { browsePage, setBrowsePage, sortLabel, setSortLabel, sortOption, setSortOption, selectedGenre, setSelectedGenre } = useContext(LoginContext);

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

    const handlePreviousPage = () => {
        if (browsePage > 1) {
            setBrowsePage(browsePage - 1)
        }



    }
    const handleNextPage = () => {
        console.log(genreData.total_pages);
        if (genreData.total_pages > browsePage) {
            setBrowsePage(browsePage + 1)
        }
    }

    const handleGenreSelection = (genre) => {

        setSelectedGenre(genre);
        if (genre != genreName) {
            setBrowsePage(1);
        }

    }


    React.useEffect(() => {

        if (selectedGenreId) {
            fetch(`/genres/${selectedGenreId}?sort=${sortOption}&browsePage=${browsePage}`)
                .then(res => res.json())
                .then(data => setGenreData(data))
        }

    }, [selectedGenreId, sortOption, browsePage])





    return (
        <>
            <GenreButtons>
                <NavigationLink onClick={() => handleGenreSelection("action")} activeStyle={activeClass} exact to="/genres/action">Action</NavigationLink>
                <NavigationLink onClick={() => handleGenreSelection("drama")} activeStyle={activeClass} to="/genres/drama">Drama</NavigationLink>
                <NavigationLink onClick={() => handleGenreSelection("adventure")} activeStyle={activeClass} to="/genres/adventure">Adventure</NavigationLink>
                <NavigationLink onClick={() => handleGenreSelection("comedy")} activeStyle={activeClass} to="/genres/comedy">Comedy</NavigationLink>
                <NavigationLink onClick={() => handleGenreSelection("crime")} activeStyle={activeClass} to="/genres/crime">Crime</NavigationLink>
                <NavigationLink onClick={() => handleGenreSelection("documentary")} activeStyle={activeClass} to="/genres/documentary">Documentary</NavigationLink>

                <div>
                    <button onClick={handlePreviousPage}>Previous</button>
                    <button onClick={handleNextPage}>Next</button>
                </div>

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
            <div>
                <button onClick={handlePreviousPage}>Previous</button>
                <button onClick={handleNextPage}>Next</button>
            </div>


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