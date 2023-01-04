/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { genresList } from "../../data/genres";
import RenderMovie from "./RenderMovie";
import { NavLink } from "react-router-dom";
import SortDropdown from "./SortDropDown";
import { LoginContext } from "../LoginContext";
import { AiFillCaretLeft } from "react-icons/ai";
import { AiFillCaretRight } from "react-icons/ai";
import Search from "../Search/Search";
import GenreDropDown from "./GenreDropDown";
import { serverUrl } from "../LoginContext";
import UpButton from "./UpButton";

const BrowseByGenre = ({ theme }) => {
  const [genreData, setGenreData] = useState(null);
  const { genreName } = useParams();

  const {
    triggerSearchBar,
    setTriggerSearchBar,
    setInputValue,
    searchResults,
    setSearchResults,
    lastSearch,
    browsePage,
    setBrowsePage,
    sortOption,
    setSortOption,
    setSelectedGenre,
  } = useContext(LoginContext);

  const selectedGenreId = useMemo(() => {
    return genresList.filter((item) => item.name === genreName)[0].id;
  }, [genreName]);

  // THIS IS going to refetch based on the sort choice
  const handleSort = (option) => {
    setSortOption(option.key);
  };

  const handlePreviousPage = () => {
    if (browsePage > 1) {
      setBrowsePage(browsePage - 1);
    }
    window.scrollTo(0, 0);
  };
  const handleNextPage = () => {
    if (genreData.total_pages > browsePage) {
      setBrowsePage(browsePage + 1);
    }
    window.scrollTo(0, 0);
  };

  const handleGenreSelection = (genre) => {
    setSelectedGenre(genre);
    if (genre !== genreName) {
      setBrowsePage(1);
    }
  };

  useEffect(() => {
    if (selectedGenreId) {
      console.log("GETTING ");
      fetch(
        `${serverUrl}/movies/genres/${selectedGenreId}?sort=${sortOption}&browsePage=${browsePage}`
      )
        .then((res) => res.json())
        .then((data) => setGenreData(data));
    }
  }, [selectedGenreId, sortOption, browsePage]);

  const handleClearSearch = () => {
    setSearchResults(null);
    setInputValue("");
    if (triggerSearchBar) {
      setTriggerSearchBar(false);
    } else {
      setTriggerSearchBar(true);
    }
  };

  return (
    <>
      <Search theme={theme} />
      <UpButton />

      {searchResults ? (
        <>
          <PageHeading>Search Results for '{lastSearch}' </PageHeading>
          <StyledClearButton onClick={handleClearSearch}>
            Clear
          </StyledClearButton>
          <StyledMovieContainer>
            {searchResults.results.map((movie, resultID) => {
              return (
                <RenderMovie
                  key={movie.id}
                  altText={movie.title}
                  genre={selectedGenreId}
                  releaseDate={
                    movie.release_date && movie.release_date.slice(0, 4)
                  }
                  title={movie.title}
                  imgSrc={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  ratings={movie.vote_average}
                  theme={theme}
                  genres={movie["genre_ids"]}
                  movieId={movie.id}
                  resultID={resultID}
                />
              );
            })}
          </StyledMovieContainer>
        </>
      ) : (
        <>
          <PageHeading>Browse by Genre</PageHeading>
          <PageButtons>
            <GenreButtons>
              <NavigationLink
                onClick={() => handleGenreSelection("action")}
                activeStyle={theme === "light" ? activeClass : activeClassNight}
                exact
                to="/genres/action"
              >
                {" "}
                <span className="mr-1" role="img" aria-label="fire">
                  🔥
                </span>{" "}
                Action
              </NavigationLink>
              <NavigationLink
                onClick={() => handleGenreSelection("drama")}
                activeStyle={theme === "light" ? activeClass : activeClassNight}
                to="/genres/drama"
              >
                <span className="mr-1" role="img" aria-label="drama">
                  🎭
                </span>
                Drama
              </NavigationLink>
              <NavigationLink
                style={{ marginRight: "2rem" }}
                onClick={() => handleGenreSelection("adventure")}
                activeStyle={theme === "light" ? activeClass : activeClassNight}
                to="/genres/adventure"
              >
                <span className="mr-1" role="img" aria-label="map">
                  🗺️
                </span>
                Adventure
              </NavigationLink>
              {/* <NavigationLink onClick={() => handleGenreSelection("fantasy")} activeStyle={(theme === "light") ? activeClass : activeClassNight} to="/genres/fantasy">✨Fantasy</NavigationLink>
                                <NavigationLink onClick={() => handleGenreSelection("comedy")} activeStyle={(theme === "light") ? activeClass : activeClassNight} to="/genres/comedy">😂Comedy</NavigationLink>
                                <NavigationLink onClick={() => handleGenreSelection("romance")} activeStyle={(theme === "light") ? activeClass : activeClassNight} to="/genres/romance">💕Romance</NavigationLink> */}
              <GenreDropDown />
            </GenreButtons>

            <SortDropdown handleSort={handleSort} />
          </PageButtons>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "fit-content",
              }}
            >
              <PageToggle>
                <StyledPrevIcon onClick={handlePreviousPage} />
                <StyledNextIcon onClick={handleNextPage} />
              </PageToggle>
              <p>Page {browsePage}</p>
            </div>
          </div>

          <StyledMovieContainer>
            {genreData?.results.map((movie, resultID) => {
              return (
                <RenderMovie
                  altText={movie.title}
                  genre={genreName}
                  releaseDate={movie.release_date.slice(0, 4)}
                  title={movie.title}
                  imgSrc={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  ratings={movie.vote_average}
                  theme={theme}
                  movieId={movie.id}
                  genres={movie["genre_ids"]}
                  resultID={resultID}
                  genreData={genreData}
                  setGenreData={setGenreData}
                  key={movie.id}
                />
              );
            })}
          </StyledMovieContainer>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "fit-content",
              }}
            >
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
      )}
    </>
  );
};
const StyledPrevIcon = styled(AiFillCaretLeft)`
  font-size: 2rem;
  cursor: pointer;
`;
const StyledClearButton = styled.p`
  /* position: absolute; */
  right: 0.5rem;
  top: 28%;
  cursor: pointer;
`;
const StyledNextIcon = styled(AiFillCaretRight)`
  font-size: 2rem;
  cursor: pointer;
`;

const StyledMovieContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 2rem;
  position: relative;
  align-content: flex-start;

  @media screen and (max-width: 824px) {
    justify-content: center;
  }
`;

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
`;

const NavigationLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
  font-weight: 400;
  transition-duration: 400ms;
  padding: 0.7rem 1.2rem;
  border-radius: 25px;

  @media screen and (max-width: 760px) {
    display: none;
  }
`;

const activeClass = {
  color: "white",
  background: "blue",
  textDecoration: "none",
  padding: ".7rem 1.2rem",
  borderRadius: "1.5rem",
};

const activeClassNight = {
  color: "blue",
  background: "white",
  textDecoration: "none",
  padding: ".7rem 1.2rem",
  borderRadius: "1.5rem",
};

const GenreButtons = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  flex-wrap: wrap;
`;
const PageButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 2rem;
`;

const PageToggle = styled.div`
  display: flex;
  margin-top: 2rem;
  p {
    padding-right: 1.5rem;
  }
`;

export default BrowseByGenre;
