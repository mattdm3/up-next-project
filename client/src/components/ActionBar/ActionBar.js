import React, { useContext } from "react";
import styled from "styled-components";
import { LoginContext } from "../LoginContext";
import { lightTheme } from "../theme";

const ActionBar = ({ movieId, disabled }) => {
  const { handleMovieLike, handleMovieDislike, appUser, handleAddUpNext } =
    useContext(LoginContext);

  const handleLike = (e) => {
    e.preventDefault();

    if (appUser.email) {
      handleMovieLike(movieId);
    } else {
      alert("Please make an account or login first.");
    }
  };

  const handleDislike = (e) => {
    e.preventDefault();

    if (appUser.email) {
      handleMovieDislike(movieId);
    } else {
      alert("Please make an account or login first.");
    }
  };

  const handleUpNext = (e) => {
    e.preventDefault();

    if (appUser.email) {
      handleAddUpNext(movieId);
    } else {
      alert("Please make an account or login first.");
    }
  };

  return disabled ? (
    <DisabledStyleActionContainer style={{ opacity: 0.2 }}>
      <p>
        <span role="img" aria-labelledby="thumbs-up">
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
    </DisabledStyleActionContainer>
  ) : (
    <StyleActionContainer>
      <p onClick={(e) => handleLike(e)}>
        <span role="img" aria-labelledby="thumbs-up">
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

  button {
    font-size: 1.8rem;
    margin-right: 0.5rem;
    padding: 15px;
    background: ${({ theme }) =>
      theme === lightTheme ? "#232476" : "#F3F4FD"};
    border-radius: 50%;
    margin-right: 1rem;
    border: none;
    cursor: pointer;

    &:hover {
      background: grey;
    }
  }

  p {
    font-size: 1.8rem;
    margin-right: 0.5rem;
    padding: 15px;
    background: ${({ theme }) =>
      theme === lightTheme ? "#232476" : "#F3F4FD"};
    border-radius: 50%;
    margin-right: 1rem;
    cursor: pointer;

    &:hover {
      background: grey;
    }
  }
`;

const DisabledStyleActionContainer = styled.div`
  display: flex;
  z-index: 50;
  justify-content: space-evenly;
  width: 100%;
  align-items: center;

  button {
    font-size: 1.8rem;
    margin-right: 0.5rem;
    padding: 15px;
    background: ${({ theme }) =>
      theme === lightTheme ? "#232476" : "#F3F4FD"};
    border-radius: 50%;
    margin-right: 1rem;
    border: none;
    cursor: pointer;

    &:hover {
      background: grey;
    }
  }

  p {
    font-size: 1.8rem;
    margin-right: 0.5rem;
    padding: 15px;
    background: ${({ theme }) =>
      theme === lightTheme ? "#232476" : "#F3F4FD"};
    border-radius: 50%;
    margin-right: 1rem;
  }
`;

// const scaleUp = keyframes`
//     0 {
//         transform: scale(0);
//     }
//     50% {
//         transform: scale(2);
//     }
//     100% {
//         transform: scale(1);
//     }
// `

// const ScaledButton = styled.div`
//     animation: ${scaleUp} 700ms ease forwards;
// `

export default ActionBar;
