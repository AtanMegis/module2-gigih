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
import SearchingBar from './SearchingBar';
import config from '../lib/config';
import TrackWrapper from '.';
import Button from './Button/Button';
import CreatePlaylistForm from './Playlist/Form';
import { getUserProfile } from '../lib/fetchApi';
import { toast } from 'react-toastify';


export default function Home() {

    const [accessToken, setAccessToken] = useState('');
    const [isAuthorize, setIsAuthorize] = useState(false);
    const [tracks, setTracks] = useState([]);
    const [selectedTracksUri, setSelectedTracksUri] = useState([]);
    const [selectedTracks, setSelectedTracks] = useState([]);
    const [isInSearch, setIsInSearch] = useState(false);
    const [user, setUser] = useState({})


    useEffect(() => {
        //const accessToken = new URLSearchParams(window.location.hash).get('#access_token');
        const accessTokenParams = new URLSearchParams(window.location.hash).get('#access_token');
        // setAccessToken(accessToken);
        // setIsAuthorize(accessToken !== null);

        if (accessTokenParams !== null) {
            setAccessToken(accessTokenParams);
            setIsAuthorize(accessTokenParams !== null);
        }

        const setUserProfile = async () => {
            try {
                const response = await getUserProfile(accessTokenParams)

                setUser(response);
            } catch (e) {
                toast.error(e);
            }
        }
        setUserProfile();
    }, []);

    useEffect(() => {
        if (!isInSearch) {
            // const selectedTracks = filterSelectedTracks();
            setTracks(selectedTracks);
        }
    }, [selectedTracksUri, selectedTracks, isInSearch]); //[selectedTracksUri]);

    const getSpotifyLinkAuthorize = () => {
        const state = Date.now().toString();
        const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
        return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=http://localhost:3000&state=${state}&scope=${config.SPOTIFY_SCOPE}`;
    }


    // const filterSelectedTracks = () => {
    //     return tracks.filter((track) => selectedTracksUri.includes(track.uri));
    // }

    const onSuccessSearch = (searchTracks) => {
        setIsInSearch(true);

        // const selectedTracks = filterSelectedTracks();
        // const searchDistincTracks = searchTracks.filter((track) => !selectedTracksUri.includes(track.uri));
        // setTracks([...selectedTracks, ...searchDistincTracks]);
        const selectedSearchTracks = searchTracks.filter((track) => selectedTracksUri.includes(track.uri));

        setTracks([...new Set([...selectedSearchTracks, ...searchTracks])])
    }

    const clearSearch = () => {
        // const selectedTracks = filterSelectedTracks();

        setTracks(selectedTracks);
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
        <>
            {!isAuthorize && (
                <main className="center">
                    <p>Login for next step...</p>
                    <Button href={getSpotifyLinkAuthorize()}>Authorize</Button>
                </main>
            )}
            {isAuthorize && (
                <main className="container" id="home">
                    <CreatePlaylistForm
                        accessToken={accessToken}
                        userId={user.id}
                        uriTracks={selectedTracksUri}
                    />

                    <hr />
                    <SearchingBar
                        accessToken={accessToken}
                        // onSuccess={(tracks) => onSuccessSearch(tracks)}
                        onSuccess={onSuccessSearch}
                        onClearSearch={clearSearch}
                    />
                    <div className="content">
                        {tracks.length === 0 && (
                            <p>No tracks</p>
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
            )}
        </>
    );
}
