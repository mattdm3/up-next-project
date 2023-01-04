import React, { useCallback, useContext, useEffect } from "react";
import styled from "styled-components";
import { LoginContext, serverUrl } from "../LoginContext";
import { FiSearch } from "react-icons/fi";
import { lightTheme } from "../theme";
import { FiX } from "react-icons/fi";
import { useGetSearch } from "../../hooks/useGetSearch";

const Search = () => {
  const { inputValue, triggerSearchBar } = useContext(LoginContext);

  const {
    handleKeyPress,
    handleInputValue,
    toggleSearchTrigger,
    handleClearSearch,
  } = useGetSearch();

  let inputRef = React.useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [triggerSearchBar]);

  useEffect(() => {
    if (triggerSearchBar) {
      window.addEventListener("keydown", handleKeyPress);
    } else if (!triggerSearchBar) {
      window.removeEventListener("keydown", handleKeyPress);
    }

    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [triggerSearchBar, inputValue, handleKeyPress]);

  return (
    <StyledSearchContainer>
      {/* <h4>Search for a movie</h4> */}
      <SearchIconContainer>
        <FiSearch onClick={toggleSearchTrigger} />
      </SearchIconContainer>
      <div style={{ position: "relative" }}>
        <SearchInput
          ref={inputRef}
          style={
            triggerSearchBar
              ? {
                  opacity: "1",
                  transition: "all 800ms ease-in-out",
                  width: "200px",
                  zIndex: "10",
                }
              : {
                  width: "0",
                  opacity: "0",
                  zIndex: "-10",
                  transition: "all 400ms ease-in-out",
                }
          }
          placeholder="search a movie title"
          type="text"
          value={inputValue}
          onChange={(e) => handleInputValue(e)}
        />
        {/* <button onClick={handleSearch}>Go</button> */}

        {inputValue ? (
          <StyledClearButton
            style={inputValue ? { display: "block" } : { display: "none" }}
            onClick={handleClearSearch}
          >
            Clear
          </StyledClearButton>
        ) : (
          <StyledClearButton
            onClick={toggleSearchTrigger}
            style={
              triggerSearchBar
                ? {
                    display: "block",
                    opacity: "1",
                    transition: "all 1000ms ease-in-out",
                  }
                : { opacity: "0", position: "absolute", left: "-40px" }
            }
          >
            <FiX />
          </StyledClearButton>
        )}
      </div>
    </StyledSearchContainer>
  );
};

const StyledClearButton = styled.p`
  position: absolute;
  right: 0.5rem;
  top: 28%;
  cursor: pointer;
`;

const SearchIconContainer = styled.div`
  font-size: 2rem;
  cursor: pointer;
  margin-right: 1rem;
`;

const StyledSearchContainer = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
  /* border: 1px solid grey;  */
  height: 100%;
`;

const SearchInput = styled.input`
  background: transparent;
  border: 1px solid #dedede;
  border-style: solid;
  border-radius: 5px;
  font-size: 1.1rem;
  animation-duration: 400ms;
  color: ${({ theme }) => (theme === lightTheme ? "#232476" : "#F3F4FD")};
  font-weight: 600;

  padding: 0 5px;

  height: 35px;
  top: 45px;

  &:focus {
    outline: none;
  }
`;

export default Search;
