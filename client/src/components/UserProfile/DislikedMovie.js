import React, { useState, useContext } from "react";
import styled from "styled-components";
import { serverUrl, LoginContext } from "../LoginContext";

import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

import {
  StyledMovieContainer,
  Wrapper,
  StyledScrollLeft,
  StyledScrollRight,
  Container,
  StyledPoster,
  StyledLink,
} from "./PROFILE-CONSTANTS";
import UndoButton from "../BrowseByGenre/UndoButton";

import ClipLoader from "react-spinners/ClipLoader";

const DislikedMovie = () => {
  const { dataObject, appUser } = useContext(LoginContext);

  const [dislikedMovieData, setDislikedMovieData] = useState([]);
  const [loading, setLoading] = useState(false);

  // SCROLL
  const scrollRef = React.useRef();

  const scrollLeft = (ref) => {
    scrollRef.current.scrollBy(-300, 0);
  };
  const scrollRight = (ref) => {
    scrollRef.current.scrollBy(300, 0);
  };

  const executeScrollLeft = () => scrollLeft(scrollRef);
  const executeScrollRight = () => scrollRight(scrollRef);
  //

  // dataObject.disliked && console.log(dataObject.disliked[0])

  React.useEffect(() => {
    setDislikedMovieData([]);
    setLoading(true);

    appUser.data &&
      dataObject.disliked &&
      dataObject.disliked.forEach((movieId) => {
        fetch(`${serverUrl}/movies/${movieId}`)
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              setDislikedMovieData((dislikedMovieData) => [
                ...dislikedMovieData,
                data,
              ]);
              setLoading(false);
            }
          });
      });
  }, [dataObject, appUser]);

  return dislikedMovieData.length > 0 &&
    dislikedMovieData[0].status_code !== 34 ? (
    loading ? (
      <RingLoaderContainer>
        <ClipLoader size={45} />
      </RingLoaderContainer>
    ) : (
      <Container>
        <StyledScrollLeft onClick={executeScrollLeft}>
          <FaCaretLeft />
        </StyledScrollLeft>
        <StyledScrollRight onClick={executeScrollRight}>
          <FaCaretRight />
        </StyledScrollRight>
        <Wrapper style={{ scrollBehavior: "smooth" }} ref={scrollRef}>
          {dislikedMovieData &&
            dislikedMovieData.map((movie) => {
              return (
                <StyledLink
                  key={"disliked:" + movie.id}
                  to={`/movies/${movie.id}`}
                >
                  <StyledPoster
                    src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                  />

                  <div style={{ fontSize: ".8rem", width: "fit-content" }}>
                    <UndoButton movieId={movie.id} />
                  </div>
                </StyledLink>
              );
            })}
        </Wrapper>
      </Container>
    )
  ) : loading ? (
    <RingLoaderContainer>
      <ClipLoader size={45} />
    </RingLoaderContainer>
  ) : (
    <StyledMovieContainer>
      <p>Nothing here yet.</p>
    </StyledMovieContainer>
  );
};

const RingLoaderContainer = styled.div`
  width: 25rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default DislikedMovie;
