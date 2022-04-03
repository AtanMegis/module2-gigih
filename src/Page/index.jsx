// import React, { Component,useState,useEffect } from "react";
// import config from "../lib/config";

// // export default class SubmitBar extends Component {
// const SubmitBar = () => {


// // state = {
// //         text: '',
// //     }
// const [text, setText] = useState("");

//     const handleInput = (e) => {
//         setText(e.target.value);
//     }

//     // handleInput(e) {
//     //     this.setState({ text: e.target.value });
//     // }


//    const onSubmit = async (e) => {
//     // async onSubmit(e) {
//         e.preventDefault();

//         // const { text } = this.state;

//         var requestOptions = {
//             headers: {
//               'Authorization': 'Bearer ' + this.props.accessToken,
//               'Content-Type': 'application/json',
//             },
//           };

//         try {
//       const response = await fetch(`${config.SPOTIFY_BASE_URL}/search?type=track&q=${text}`, requestOptions)
//         .then((data) => data.json());

//       const tracks = response.tracks.items;
//       this.props.onSuccess(tracks);
//     } catch (e) {
//       alert(e);
//     }

//     e.target.blur();

// }



//         return (
//             // <form className="submit--bar" onSubmit={(e) => this.onSubmit(e)}>
//             <form className="submit--bar" onSubmit={(e) => onSubmit(e)}>

//                 <input
//                     type="text"
//                     placeholder="Search..."
//                     className="form-submit-bar"
//                     required
//                     onChange={(e) => handleInput(e)}
//                     // onChange={(e) => this.handleInput(e)}
//                 />
//                 <button id="search" type="submit">Search</button>
//             </form>
//         )
//     }



// export default SubmitBar;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button/Button';


// export default function TrackWrapper({ imageUrl, title, artist, toggleSelect }) {

//   const [isSelected, setIsSelected] = useState(false);

export default function TrackWrapper({ imageUrl, title, artist, select, toggleSelect }) {

  const [isSelected, setIsSelected] = useState(select);

  const handleToggleSelect = () => {
    setIsSelected(!isSelected);
    toggleSelect();
  }

  return (
    <div className="card">
      <div className="card__image">
        <img src={imageUrl} alt={title} />
      </div>
      <div className="card__data">
        <div className="card__content">
          <h3 className="card__title">{title}</h3>
          <p className="card__artist">{artist}</p>
        </div>

        <div className="card__action">
          <Button variant={isSelected ? 'primary' : 'secondary'} onClick={handleToggleSelect}>{isSelected ? 'Deselect' : 'Select'}</Button>
        </div>
      </div>
    </div>
  );
}

TrackWrapper.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  toggleSelect: PropTypes.func.isRequired,
}


