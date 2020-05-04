import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import { genres } from '../../data/genres';
import RenderMovie from './RenderMovie';
import { StyledLink } from '../CONSTANTS'
import { NavLink } from 'react-router-dom'
import SortDropdown from './SortDropDown';
import { LoginContext } from '../LoginContext';
import { lightTheme } from '../theme';
import { GrCaretNext } from 'react-icons/gr'
import { GrCaretPrevious } from 'react-icons/gr'
import { AiFillCaretLeft } from 'react-icons/ai'
import { AiFillCaretRight } from 'react-icons/ai'


const BrowseByGenre = () => {

    const [genreData, setGenreData] = useState(null);

    const { genreName } = useParams();

    const { theme, setTheme, searchResults, browsePage, setBrowsePage, sortLabel, setSortLabel, sortOption, setSortOption, selectedGenre, setSelectedGenre } = useContext(LoginContext);

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


    console.log(theme)

    const StyledPrevIcon = styled(AiFillCaretLeft)`
        font-size: 2rem;
        cursor: pointer; 
    
    `

    const StyledNextIcon = styled(AiFillCaretRight)`
        font-size: 2rem;
        cursor: pointer; 
        /* color: ${theme === "light" ? "red" : "green"}; */
    `




    return (
        <>

            {/* SHOW SEARCH RESULTS INSTEAD (if there's a search) */}

            {
                searchResults ?


                    <StyledMovieContainer>
                        <PageHeading>Search Results</PageHeading>
                        {searchResults.results.map(movie => {
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
                    </StyledMovieContainer> :


                    <>
                        <PageHeading>Browse by Genre</PageHeading>
                        <PageButtons>
                            <GenreButtons>
                                <NavigationLink onClick={() => handleGenreSelection("action")} activeStyle={(theme === "light") ? activeClass : activeClassNight} exact to="/genres/action">🔥Action</NavigationLink>
                                <NavigationLink onClick={() => handleGenreSelection("drama")} activeStyle={(theme === "light") ? activeClass : activeClassNight} to="/genres/drama">🎭Drama</NavigationLink>
                                <NavigationLink onClick={() => handleGenreSelection("adventure")} activeStyle={(theme === "light") ? activeClass : activeClassNight} to="/genres/adventure">🗺️Adventure</NavigationLink>
                                <NavigationLink onClick={() => handleGenreSelection("fantasy")} activeStyle={(theme === "light") ? activeClass : activeClassNight} to="/genres/fantasy">✨Fantasy</NavigationLink>
                                <NavigationLink onClick={() => handleGenreSelection("comedy")} activeStyle={(theme === "light") ? activeClass : activeClassNight} to="/genres/comedy">😂Comedy</NavigationLink>
                                <NavigationLink onClick={() => handleGenreSelection("documentary")} activeStyle={(theme === "light") ? activeClass : activeClassNight} to="/genres/documentary">💕Romance</NavigationLink>






                            </GenreButtons>
                            <SortDropdown
                                handleSort={handleSort}

                            />
                        </PageButtons>
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "fit-content" }}>
                                <PageToggle>
                                    {/* <p onClick={handlePreviousPage}>Previous</p>
                <p onClick={handleNextPage}>Next</p> */}
                                    <StyledPrevIcon onClick={handlePreviousPage} />
                                    <StyledNextIcon onClick={handleNextPage} />

                                </PageToggle>
                                <p>Page {browsePage}</p>
                            </div>
                        </div>

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
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "fit-content" }}>
                                <PageToggle>
                                    {/* <p onClick={handlePreviousPage}>Previous</p>
                <p onClick={handleNextPage}>Next</p> */}
                                    <StyledPrevIcon onClick={handlePreviousPage} />
                                    <StyledNextIcon onClick={handleNextPage} />

                                </PageToggle>
                                <p>Page {browsePage}</p>
                            </div>
                        </div>

                    </>

            }


        </>
    )
}

const StyledMovieContainer = styled.div`
    display: flex; 
    flex-wrap: wrap; 
    justify-content: space-between; 
    margin-top: 2rem;
    position: relative;
    flex-shrink: shrink; 
    align-content: flex-start; 

    @media screen and (max-width: 740px) {
        justify-content: center; 
    }

`

// TRY WITH GRID
// const StyledMovieContainer = styled.div`
//     display: grid;
//     /* grid-template-columns: repeat(auto-fill, minmax(150px, 310px)); */
//     grid-template-columns: repeat(auto-fit, minmax(250px, 1fr) );
//     grid-template-columns: repeat(3, 1fr);
//     grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//     /* grid-template-rows: repeat(3, 1fr); */
//     grid-column-gap: 100px;
//     grid-row-gap: 100px;
//     max-width: 100%; 

// `

const PageHeading = styled.h1`
    font-size: 3rem;
    font-weight: 800; 
    margin-top: 2rem;
`

const NavigationLink = styled(NavLink)`
    text-decoration: none;
    color: inherit;
    font-weight: 400; 
    transition-duration: 400ms; 
    padding: .7rem 1.2rem;
    border-radius: 25px;
    

`



const activeClass = {
    color: "white",
    background: "blue",
    textDecoration: "none",
    padding: ".7rem 1.2rem",
    borderRadius: "1.5rem"
}

const activeClassNight = {
    color: "blue",
    background: "white",
    textDecoration: "none",
    padding: ".7rem 1.2rem",
    borderRadius: "1.5rem"
}

const GenreButtons = styled.div`
    display: flex; 
    position:relative;
    align-items: center;
    flex-wrap: wrap; 
    

`
const PageButtons = styled.div`
    display: flex; 
    align-items: center;
    justify-content: space-between;
    
    margin-top: 2rem;

`

const PageToggle = styled.div`
    display: flex; 
    margin-top: 2rem;
    p {
        padding-right: 1.5rem;
    }
`






export default BrowseByGenre;