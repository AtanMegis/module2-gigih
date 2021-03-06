import React, { Component }  from 'react';


const ContainerSong = ({url, nameSong, nameBand, }) => {
    return( 
      <div className="song_wrapper">
      <div className="song_title">
      <label>{nameSong}</label>
      <div className='song_artist'>
      <p>{nameBand}</p>
      <div className='song_image'>
      <img src={url} /> 
        <div><button className='btn btn--red'>Select</button>
        </div>
      </div>
      </div>
      </div>
      </div>
  
    )
}

export default ContainerSong;