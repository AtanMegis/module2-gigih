import './App.css';
import React, { Component }  from 'react';
import SearchBar from './Feature/SearchBar';
import ContainerSong from './Feature/Song';


function App() {
  return (
    <div className="App">
      <SearchBar/>
      <ContainerSong/>
      <button class="btnSelect">Select</button>
    </div>
  );
}

export default App;
