import './App.css';
import React, { Component } from 'react';
import BigData from './Page/BigData';
import SongWrapper from './Component/MapLooping/SongWrapper';
import SearchBar from './Component/SearchBar';
import LoopedSong from './Component/MapLooping';
import data from './Component/MapLooping/SongData';
import Home from './Page/Home';
import Homey from './Page/TestHome';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
    <Home/>
    <ToastContainer/>
    </div>
  );
}

export default App;
