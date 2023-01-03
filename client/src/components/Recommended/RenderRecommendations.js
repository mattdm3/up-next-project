import React, { useContext } from "react";
import styled from "styled-components";
import { lightTheme } from "../theme";
import RecommendedActions from "./RecommendedActions";
import { LoginContext } from "../LoginContext";
import RecommendedMovieData from "./RecommendedMovieData";

import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { StyledLink } from "../CONSTANTS";
import UndoButton from "../BrowseByGenre/UndoButton";
import posterplaceholder from "../poster-placeholder.png";

const RenderRecommendations = ({
  overview,
  tagline,
  genre,
  voteAverage,
  runtime,
  posterPath,
  voteCount,
  revenue,
  backdropPath,
  imgSrc,
  title,
  releaseDate,
  ratings,
  altText,
  movieId,
  theme,
  triggerNextMovie,
  triggerPreviousMovie,
  genres,
}) => {
  const { appUser } = useContext(LoginContext);

  // appUser && appUser.data && console.log(appUser.data.dislikedMovies)
  // console.log(typeof movieId)

  return (
    // If the movie is liked/disliked/upnext;
    appUser.email &&
      appUser.data &&
      appUser.data.dislikedMovies &&
      appUser.data.likedMovies &&
      appUser.data.upNextList &&
      (appUser.data.dislikedMovies[movieId.toString()] === movieId.toString() ||
        appUser.data.likedMovies[movieId.toString()] === movieId.toString() ||
        appUser.data.upNextList[movieId.toString()] === movieId.toString()) ? (
      <MainContainer>
        <StyledContainer>
          <StyledLink to={`/movies/${movieId}`}>
            <PosterContainer>
              {imgSrc !== "https://image.tmdb.org/t/p/w500/null" ? (
                <MoviePoster
                  style={{ opacity: ".2 " }}
                  alt={altText}
                  src={imgSrc}
                />
              ) : (
                <>
                  <MoviePoster
                    style={{ boxShadow: "none" }}
                    alt={altText}
                    src={posterplaceholder}
                  />
                  <h4
                    style={{
                      transform: "translate(-50%, -50%)",
                      textAlign: "center",
                      color: "white",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                    }}
                  >
                    {title}
                  </h4>
                </>
              )}
            </PosterContainer>
          </StyledLink>
          <BelowContentContainer>
            <RecommendedActions disabled={true} movieId={movieId} />
            <RecommendedMovieData
              title={title}
              releaseDate={releaseDate}
              ratings={ratings}
              genre={genre}
              genres={genres}
            />
          </BelowContentContainer>

          <NextPrevButtons>
            <LeftArrow onClick={triggerPreviousMovie} />
            <RightArrow onClick={triggerNextMovie} />
          </NextPrevButtons>
        </StyledContainer>

        <LikeStateContainer>
          {appUser.data.dislikedMovies[movieId.toString()] ===
          movieId.toString() ? (
            <RatingResult>
              You rated this movie a{" "}
              <span role="img" aria-labelledby="thumbs-down">
                👎🏼
              </span>{" "}
            </RatingResult>
          ) : appUser.data.upNextList[movieId.toString()] ===
            movieId.toString() ? (
            <RatingResult>
              You added this to your UpNext{" "}
              <span role="img" aria-labelledby="popcorn">
                🍿
              </span>
            </RatingResult>
          ) : appUser.data.likedMovies[movieId.toString()] ===
            movieId.toString() ? (
            <RatingResult>
              You rated this movie a{" "}
              <span role="img" aria-labelledby="thumbs-up">
                👍🏼
              </span>
            </RatingResult>
          ) : (
            ""
          )}
          <UndoButton movieId={movieId} />
        </LikeStateContainer>
      </MainContainer>
    ) : (
      <MainContainer>
        <StyledContainer>
          <StyledLink to={`/movies/${movieId}`}>
            <PosterContainer>
              {imgSrc !== "https://image.tmdb.org/t/p/w500/null" ? (
                <MoviePoster alt={altText} src={imgSrc} />
              ) : (
                <>
                  <MoviePoster
                    style={{ boxShadow: "none" }}
                    alt={altText}
                    src={posterplaceholder}
                  />
                  <h4
                    style={{
                      transform: "translate(-50%, -50%)",
                      textAlign: "center",
                      color: "white",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                    }}
                  >
                    {title}
                  </h4>
                </>
              )}
            </PosterContainer>
          </StyledLink>

          <BelowContentContainer>
            <RecommendedActions movieId={movieId} />
            <RecommendedMovieData
              title={title}
              releaseDate={releaseDate}
              ratings={ratings}
              genre={genre}
              genres={genres}
            />
          </BelowContentContainer>

          <NextPrevButtons>
            <LeftArrow onClick={triggerPreviousMovie} />
            <RightArrow onClick={triggerNextMovie} />
          </NextPrevButtons>
        </StyledContainer>
      </MainContainer>
    )
  );
};

const BelowContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PosterContainer = styled.div`
  position: relative;

  margin-bottom: 1rem;
`;

const NextPrevButtons = styled.div`
  position: absolute;
  /* border: 1px solid red;  */
  width: 100%;
  /* height: 100%;  */
  top: 40%;

  font-size: 2rem;
`;

const RightArrow = styled(FaArrowAltCircleRight)`
  position: absolute;
  right: -4rem;
  cursor: pointer;
`;

const LeftArrow = styled(FaArrowAltCircleLeft)`
  left: -4rem;
  position: absolute;
  cursor: pointer;
`;

const MainContainer = styled.div`
  position: relative;
  width: fit-content;
`;

const RatingResult = styled.p`
  font-size: 1.1rem;
  margin: 0;
  padding: 0;
  font-weight: 600;

  span {
    font-size: 2.2rem;
  }
`;

const LikeStateContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledContainer = styled.div`
  margin-bottom: 5rem;
  min-width: 20rem;
  max-width: 23rem;

  /* cursor: pointer; */
  position: relative;

  h2 {
    max-width: 280px;
  }

  p {
    color: ${({ theme }) => (theme === lightTheme ? "#8D89C8" : "#C7C7FD")};
  }
`;

const MoviePoster = styled.img`
  border-radius: 10px;
  margin-bottom: 1rem;
  min-height: 24rem;
  min-width: 20rem;
  max-width: 23rem;
  box-shadow: ${({ theme }) =>
    theme === lightTheme
      ? "0px 0px 72px -15px rgba(35,36,118,1)"
      : "0px 0px 52px -15px #F3F4FD"};
`;

export default RenderRecommendations;
