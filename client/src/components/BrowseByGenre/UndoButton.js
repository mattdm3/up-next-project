import React, { useContext } from "react";
import styled from "styled-components";
import { httpUndoRating, SERVER_URL } from "../../request";
import { LoginContext } from "../LoginContext";

const UndoButton = ({ movieId }) => {
  const { appUser, setAppUser } = useContext(LoginContext);

  const handleUndoRating = async (e, movieId) => {
    e.preventDefault();
    const newRatings = await httpUndoRating(movieId, appUser);
    setAppUser(newRatings);
  };

  return (
    <Undo
      onClick={(e) => handleUndoRating(e, movieId)}
      style={{ padding: "1rem" }}
    >
      Undo
    </Undo>
  );
};

const Undo = styled.p`
  cursor: pointer;
  &:hover {
    color: #f65f2d;
    font-weight: 600;
  }
`;

export default UndoButton;
