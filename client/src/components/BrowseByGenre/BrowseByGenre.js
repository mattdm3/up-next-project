import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { genres } from '../../data/genres'

const BrowseByGenre = () => {

    const [genreData, setGenreData] = useState(null);
    const { genreId } = useParams();

    // check the id of the genre; 

    genres.filter((genre) => {
        return genre.name === genreId;
    })






    React.useEffect(() => {

        fetch(`/genres/${genreId}`)
            .then(res => res.json())
            .then(data => console.log(data))

    }, [])





    return (
        <div>
            BROWSE BY GENRE
        </div>
    )
}

export default BrowseByGenre;