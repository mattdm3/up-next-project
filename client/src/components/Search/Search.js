import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { LoginContext, serverUrl } from "../LoginContext";
import { FiSearch } from "react-icons/fi";
import { lightTheme } from "../theme";
import { FiX } from "react-icons/fi";

const Search = () => {
  const {
    inputValue,
    setInputValue,
    setLastSearch,
    setSearchResults,
    triggerSearchBar,
    setTriggerSearchBar,
  } = useContext(LoginContext);

  // const [inputValue, setInputValue] = useState("")

  // const [searchResults, setSearchResults] = useState(null);

  // const [triggerSearchBar, setTriggerSearchBar] = useState(false);

  let inputRef = React.useRef();

  const handleClearSearch = () => {
    setSearchResults(null);
    setInputValue("");
    toggleSearchTrigger();
  };
  // This is a toggler to open/close search bar.

  const toggleSearchTrigger = () => {
    setInputValue("");
    if (triggerSearchBar) {
      setTriggerSearchBar(false);
    } else {
      setTriggerSearchBar(true);
    }
  };

  const handleSearch = () => {
    setInputValue("");
    toggleSearchTrigger();

    fetch(`${serverUrl}/search/${inputValue}`)
      .then((res) => res.json())
      .then((data) => setSearchResults(data));
  };

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
  };

  // THIS will autofocus the search when search bar is triggered.

  useEffect(() => {
    inputRef.current.focus();
  }, [triggerSearchBar]);

  // Listener for user search for "ENTER button"

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && inputValue.length > 1) {
      setLastSearch(inputValue);
      handleSearch();
    }
  };

  useEffect(() => {
    if (triggerSearchBar) {
      window.addEventListener("keydown", (e) => handleKeyPress(e));
    } else if (!triggerSearchBar) {
      window.removeEventListener("keydown", (e) => handleKeyPress(e));
    }

    return () =>
      window.removeEventListener("keydown", (e) => handleKeyPress(e));
  }, [triggerSearchBar, inputValue]);

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
            onClick={() => toggleSearchTrigger()}
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
