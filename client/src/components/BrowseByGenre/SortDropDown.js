import React, { useContext } from "react";
import styled from 'styled-components';
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

const StyledButton = styled.p`
    
    /* font-weight: 600;  */
    border: none; 
    /* font-size: .9rem; */
    /* text-transform: uppercase; */
    /* color: inherit; */
    cursor:pointer;
    width: fit-content;
    /* padding: .7rem 1.2rem; */
    padding-bottom: .7rem;
    

`


const DropdownContent = styled.div`
    display: none;
    position: absolute;
    background-color: white;
    width: fit-content;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 500;
    font-size: .9rem;
    font-weight: 500; 
    color: #1F209A; 
    border-radius: 5px; 
    right: 0; 
    
`;

const Dropdown = styled.div`
    /* position: absolute; */
    /* right: 0; 
    top: 0; */
    /* display: inline-block; */
    z-index: 500; 
    /* font-weight: 700;  */
    /* margin: 1rem; */
    position: relative;
    
    

    &:hover ${DropdownContent} {
        display: block;
      }
    `;


const SortOption = styled.div` 

      padding: .8rem 1rem; 
     
      /* min-width: 200px;  */
      /* border: 1px solid green;  */
   

    &:hover  {
        cursor: pointer;
        background-color: #F3F4FD;
      }
    `;





export default SortDropdown;
