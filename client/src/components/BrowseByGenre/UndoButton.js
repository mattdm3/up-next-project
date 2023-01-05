import React, { useContext } from "react";
import styled from "styled-components";
import { LoginContext, serverUrl } from "../LoginContext";

const UndoButton = ({ movieId }) => {
  const { appUser, setAppUser } = useContext(LoginContext);

  const handleUndoRating = (e, movieId) => {
    e.preventDefault();

    fetch(`${serverUrl}/users/undoRating`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: appUser.email,
        uid: appUser.uid,
        movieId: movieId.toString(),
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setAppUser(json.data);
      });
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
