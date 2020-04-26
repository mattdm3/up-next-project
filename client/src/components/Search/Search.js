import React, { useState } from 'react';
import styled from 'styled-components';


const Search = () => {

    const [inputValue, setInputValue] = useState("")
    const [searchResults, setSearchResults] = useState(null);

    const handleSearch = () => {

        //search the API. send the BE first. 


        fetch('/searchMovie')
            .then(res => res.json())
            .then(data => setSearchResults(data))




    }



    return (
        <StyledSearchContainer>
            <h4>Search for a movie</h4>
            <div>
                <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                <button onClick={handleSearch}>Go</button>
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