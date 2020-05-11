import React from 'react';
import styled from 'styled-components';
import { genresList } from '../../data/genres';
import { StyledLink, GenreP } from '../CONSTANTS'

const MovieTextData = ({ genres, themes, title, releaseDate, genre, ratings }) => {
    let genreArray = [];
    let count = 0;



    genres.forEach(genreID => {
        for (let i = 0; i < genresList.length; i++) {
            if (genreID === genresList[i].id) {
                count = count + 1;
                // console.log(count)
                if (count < 4) {
                    genreArray.push(genresList[i].name)
                }
            }
        }
    })







    return (
        <MovieText>
            {/* <h3>{title}</h3> */}

            <ReleaseAndGenres>


                <h4 style={{ fontWeight: "bold" }}>{releaseDate} </h4> <p>| </p>

                {
                    genreArray.map(genreName => {
                        return <StyledLink key={genreName} to={`/genres/${genreName}`}>
                            <GenreP key={genreName}>{genreName}</GenreP>
                        </StyledLink>
                    })
                }

                {/* {
                    genres.map(genreID => {
                        let count = 0;
                        for (let i = 0; i < genresList.length; i++) {
                            if (genreID === genresList[i].id) {
                                count++;
                                if (count < 3) {
                                    return <p>{genresList[i].name}</p>
                                }


                            }

                        }
                    })
                } */}
            </ReleaseAndGenres>
            {/* <Ratings>⭐️{ratings}</Ratings> */}
        </MovieText>
    )
}

const MovieText = styled.div`
    /* width: 15rem; */
    /* width:21rem;  */
    margin-top: 1rem;
    /* border: 1px solid red; */
    display: flex;
    flex-direction: column;

    h3 {
        margin-bottom: .5rem;
        text-align: center;
    }
    
`

const Ratings = styled.h4`
    margin-bottom: .5rem;
    font-weight: 800; 
    text-align:left; 
`


const ReleaseAndGenres = styled.div`
    display: flex; 
    width: fit-content;
    overflow: hidden;
    width: 100%; 
    margin-bottom: .5rem;
    h4 {
        margin-right: .5rem;

    }
    p {
        margin-right: .5rem;
    }
   
`


export default MovieTextData; 