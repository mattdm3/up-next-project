import React, { useState, useContext } from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { LoginContext } from '../LoginContext';

const options = [
    {
        label: 'Popularity',
        key: 'popularity'
    },
    {
        label: 'Highest Rated',
        key: 'vote_average'
    },
    {
        label: 'Highest Grossing',
        key: 'revenue'
    },


]

const SortDropdown = ({ handleSort }) => {

    const { sortLabel, setSortLabel } = useContext(LoginContext);


    // let [filter, setFilter] = useState(options[0])

    const handleSortSelect = (selection) => {

        // setFilter(selection)
        handleSort(selection)

        setSortLabel(selection.label)

    }

    return (
        <Dropdown>
            <StyledButton>Sort By {sortLabel} ↓</StyledButton>
            <DropdownContent>
                {options.map(option => {
                    return (

                        <SortOption key={option.key} onClick={() => handleSortSelect(option)}><div>{option.label}</div></SortOption>

                    )
                })}
            </DropdownContent>
        </Dropdown>
    )

}

const StyledButton = styled.button`
    color: #164C81;
    font-weight: 600; 
    border: none; 
    font-size: .9rem;
    text-transform: uppercase;
    

`


const DropdownContent = styled.div`
    display: none;
    position: absolute;
    background-color: white;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 10;
    color: inherit;
    font-size: .9rem;
    font-weight: 500; 
`;

const Dropdown = styled.div`
    position: absolute;
    right: 0; 
    top: 0;
    display: inline-block;
    z-index: 50; 
    font-weight: 700; 
    


    &:hover ${DropdownContent} {
        display: block;
      }
    `;


const SortOption = styled.div` 

      padding: 13px 18px; 
      min-width: 200px; 
   

    &:hover  {
        cursor: pointer;
        background-color: #e3e1e1;
      }
    `;





export default SortDropdown;