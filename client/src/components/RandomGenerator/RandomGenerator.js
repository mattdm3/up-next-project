import React from 'react';
import styled from 'styled-components';


const RandomGenerator = ({ randomMovie, handleRandomMovie }) => {

    return (
        <StyledContainer>
            <button onClick={handleRandomMovie}>Generate Random Movie</button>
            <div>
                {randomMovie &&
                    <h1>{randomMovie.original_title}</h1>
                }
            </div>
        </StyledContainer>
    )
}

const StyledContainer = styled.div`
    display: flex; 
    flex-direction: column; 
    justify-content: center; 
    align-items: center; 
`

export default RandomGenerator; 
