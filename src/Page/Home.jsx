// import React, { Component } from "react";
// import SubmitBar from ".";
// import SongWrapper from "../Component/MapLooping/SongWrapper";
// import SearchBar from "../Component/SearchBar";
// import config from "../lib/config";


// class Home extends Component {
//     state = {
//         accToken: '',
//         isLogin: false,
//         tracks: [],
//     }


//     getHashParams() {
//         const hashParams = {};
//         const r = /([^&;=]+)=?([^&;]*)/g;
//         const q = window.location.hash.substring(1);
//         let e = r.exec(q);
//         while(e) {
//             hashParams[e[1]] = decodeURIComponent(e[2]);
//             e = r.exec(q)
//         }
//         return hashParams;
//     }

//     componentDidMount() {
//         const params = this.getHashParams();
//         const {access_token : accessToken} = params;

//         this.setState({accToken : accessToken, isLogin: accessToken !== undefined});

//     }

//     getLinkAuth() {
//         const state = Date.now().toString();
//         const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

//         return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=http://localhost:3000&state=${state}&scope=${config.SPOTIFY_SCOPE}`;

//     }

//     onSuccessSearch(tracks) {
//         this.setState({ tracks });
//     }

//     render () {
//         return (


//             <div className="Home">
//             {!this.state.isLogin &&( <a href={this.getLinkAuth()}>Auth</a>)}
//             <SubmitBar accessToken={this.state.accToken} onSuccess={(tracks) => this.onSuccessSearch(tracks)}/>
//             <div className="songs">
//             {this.state.tracks.map((g) => (
//                 <SongWrapper
//                 key={g.id}
//                 url={g.album.images[0].url}
//                 title={g.name}
//                 namebands={g.artists[0].name}
//                 />
//             ))}
//             </div>
//             </div>
//         )
//     }

// }
// export default Home;

import React, { useEffect, useState } from 'react'
import SearchingBar from '../Component/SearchBar/SearchingBar';
import CreatePlaylistForm from '../Component/CreatePlaylist/Form';
import TrackWrapper from '../Component/Tracks/index';
import Layout from '../Component/Layout';
import { useDocumentTitle } from '../lib/customHooks';
import { ToastContainer } from 'react-toastify';



export default function Home() {
    const [tracks, setTracks] = useState([]);
    const [selectedTracksUri, setSelectedTracksUri] = useState([]);
    const [selectedTracks, setSelectedTracks] = useState([]);
    const [isInSearch, setIsInSearch] = useState(false);
    const [message, setMessage] = useState('No tracks');
    useDocumentTitle('Create Playlist - Spotipy');
  
    useEffect(() => {
      if (!isInSearch) {
        setTracks(selectedTracks);
      }
    }, [selectedTracksUri, selectedTracks, isInSearch]);
  
    const onSuccessSearch = (searchTracks, query) => {
      setIsInSearch(true);
  
      const selectedSearchTracks = searchTracks.filter((track) => selectedTracksUri.includes(track.uri));
  
      setTracks(() => {
        const _tracks = [...new Set([...selectedSearchTracks, ...searchTracks])];
  
        if (_tracks.length === 0) {
          setMessage(`No tracks found with query "${query}"`);
        } else {
          setMessage('');
        }
  
        return _tracks;
      });
    }
  
    const clearSearch = () => {
      setTracks(selectedTracks);
      setMessage('No tracks');
      setIsInSearch(false);
    }
  
    const toggleSelect = (track) => {
      const uri = track.uri;
  
      if (selectedTracksUri.includes(uri)) {
        setSelectedTracksUri(selectedTracksUri.filter((item) => item !== uri));
        setSelectedTracks(selectedTracks.filter((item) => item.uri !== uri));
      } else {
        setSelectedTracksUri([...selectedTracksUri, uri]);
        setSelectedTracks([...selectedTracks, track]);
      }
    }
  
    return (
      <Layout>
        <main className="container" id="home">
          <CreatePlaylistForm uriTracks={selectedTracksUri} />
  
          <hr />
        <ToastContainer />
          <SearchingBar
            onSuccess={onSuccessSearch}
            onClearSearch={clearSearch}
          />
  
          <div className="content">
            {tracks.length === 0 && (
              <p>{message}</p>
            )}
  
            <div className="tracks">
              {tracks.map((track) => (
                <TrackWrapper
                  key={track.id}
                  imageUrl={track.album.images[0].url}
                  title={track.name}
                  artist={track.artists[0].name}
                  select={selectedTracksUri.includes(track.uri)}
                  toggleSelect={() => toggleSelect(track)}
                />
              ))}
            </div>
          </div>
        </main>
      </Layout>
    );
  }