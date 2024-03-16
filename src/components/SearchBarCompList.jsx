import React from 'react'
import SearchBarCompRow from './SearchBarCompRow';


const SearchBarCompList = ({ searchResults, onDelete }) => {
  return (

    <tbody>
        {searchResults.map((users, index) => (
            <SearchBarCompRow key={index} userArr={users} onDelete={onDelete} />
         ))}
  </tbody>
  );
};


export default SearchBarCompList;