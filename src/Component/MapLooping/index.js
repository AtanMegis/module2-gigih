import React, { Component } from 'react';
import SongWrapper from './SongWrapper';
import SearchBar from '../SearchBar';
import data from './SongData';
import "./index.css"

const LoopedSong = () => {


    return (
        <div className='container__songs'>
        <div className='box__container'>
     
        {data.map((song) => (
            <SongWrapper
            key={song.id}
            url={song.album.images[0].url}
            nameSong={song.name}
            nameBand={song.artists[0].name}
            />
        ))}

        </div>
      </div>
    );

};

export default LoopedSong;

  
