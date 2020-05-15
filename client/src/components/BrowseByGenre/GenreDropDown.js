import React from "react"
import styled from 'styled-components'
import { genresList } from '../../data/genres'
import Select from 'react-select'
import { useParams, useHistory } from 'react-router-dom'

const GenreDropDown = () => {

    const { genreName } = useParams();
    let history = useHistory();

    const selectOptions = []

    genresList.forEach((genre) => {
        selectOptions.push({ value: genre.name, label: genre.label })
    })

    const handleSelect = (e) => {
        const target = e.value;
        history.push(`/genres/${target}`)
    }


    return (
        <StyledSelect placeholder={genreName} onChange={handleSelect} options={selectOptions} />
    )
}

const StyledSelect = styled(Select)`
    color: blue; 
    width: 150px;  

    @media screen and (max-width: 400px) {
        width: 120px; 
        height: fit-content;
    }
`

export default GenreDropDown;