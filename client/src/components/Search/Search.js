import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { LoginContext } from '../LoginContext';

const Search = () => {


    const { lastSearch, setLastSearch, searchResults, setSearchResults } = useContext(LoginContext);

    const [inputValue, setInputValue] = useState("")
    // const [searchResults, setSearchResults] = useState(null);

    const handleSearch = () => {


        fetch(`/search/${lastSearch}`)
            .then(res => res.json())
            .then(data => setSearchResults(data))

    }

    console.log(lastSearch)
    searchResults && console.log(searchResults, "SEARCH RESULTS")

    const handleClearSearch = () => {
        setLastSearch("");
        setSearchResults(null);
    }

    return (
        <StyledSearchContainer>
            {/* <h4>Search for a movie</h4> */}
            <div>
                <input placeholder="search a movie" type="text" value={lastSearch} onChange={(e) => setLastSearch(e.target.value)} />
                <button onClick={handleSearch}>Go</button>
                <button onClick={handleClearSearch}>Clear</button>
            </div>

        </StyledSearchContainer>
    )
}

const StyledSearchContainer = styled.div`
    display: flex; 
    flex-direction: column;
    align-items: center; 
    /* border: 1px solid grey;  */
    height: 100%; 
`

export default Search; 