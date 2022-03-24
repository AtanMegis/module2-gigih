import React, { Component }  from 'react';


const SearchBar = () => {
    return(
        <form action="/search">
        <input placeholder="Search" required/>
        <button type="submit">Search</button>
    
        </form>
        )
};
export default SearchBar;
