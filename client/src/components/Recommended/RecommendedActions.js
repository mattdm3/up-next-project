import React, { useContext } from "react";
import styled from "styled-components";
import { LoginContext } from "../LoginContext";
import { lightTheme } from "../theme";

const RecommendedActions = ({ movieId, disabled }) => {
  const { handleMovieLike, handleMovieDislike, appUser, handleAddUpNext } =
    useContext(LoginContext);

  const handleLike = (e) => {
    e.preventDefault();

    if (appUser.email) {
      handleMovieLike(movieId);
      // setMovieCounter(movieCounter + 1)
      //TEMPORARILY INCREMENT THE MOVIE COUNTER? FIGURE OUT WHAT TO DO WITH RATED RECOMMENDATIONS
    } else {
      alert("Please make an account or login first.");
    }
  };

  const handleDislike = (e) => {
    e.preventDefault();

    if (appUser.email) {
      handleMovieDislike(movieId);
      // setMovieCounter(movieCounter + 1);
    } else {
      alert("Please make an account or login first.");
    }
  };

  const handleUpNext = (e) => {
    e.preventDefault();

    if (appUser.email) {
      handleAddUpNext(movieId);
      // setMovieCounter(movieCounter + 1);
    } else {
      alert("Please make an account or login first.");
    }
  };

  return disabled ? (
    <StyleActionContainerDisabled>
      <p>
        <span role="img" aria-label="thumbs-up">
          👍🏼
        </span>
      </p>
      <p>
        <span role="img" aria-label="popcorn">
          🍿
        </span>
      </p>
      <p>
        <span role="img" aria-label="thumbs-down">
          👎🏼
        </span>
      </p>
    </StyleActionContainerDisabled>
  ) : (
    <StyleActionContainer>
      <p onClick={(e) => handleLike(e)}>
        <span role="img" aria-label="thumbs-up">
          👍🏼
        </span>
      </p>
      <p onClick={(e) => handleUpNext(e)}>
        <span role="img" aria-label="popcorn">
          🍿
        </span>
      </p>
      <p onClick={(e) => handleDislike(e)}>
        <span role="img" aria-label="thumbs-down">
          👎🏼
        </span>
      </p>
    </StyleActionContainer>
  );
};

const StyleActionContainer = styled.div`
  display: flex;
  z-index: 50;
  justify-content: space-evenly;
  width: 100%;
  align-items: center;

  /* p:first-of-type:hover{
    background: #388E3C;
}
p:last-of-type:hover{
    background: #C2185B;
} */

  p {
    font-size: 1.8rem;
    cursor: pointer;
    padding: 15px;
    background: ${(theme) => (theme === lightTheme ? "#232476" : "#F3F4FD")};
    border-radius: 50%;
    margin-right: 1rem;
    box-shadow: ${(theme) =>
      theme === lightTheme
        ? "0px 0px 15px -5px rgba(35,36,118,1)"
        : "0px 0px 15px -5px rgba(100,100,100,1)"};

    &:hover {
      background: #c5cae9;
    }
  }
`;
const StyleActionContainerDisabled = styled.div`
  display: flex;
  z-index: 50;
  opacity: 0.3;
  justify-content: space-evenly;
  p {
    font-size: 1.8rem;
    padding: 15px;
    background: ${(theme) => (theme === lightTheme ? "#232476" : "#F3F4FD")};
    border-radius: 50%;
    margin-right: 1rem;
  }
`;

export default RecommendedActions;
