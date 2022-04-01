// import React, { useState, Component, useEffect } from "react";
// import config from "../lib/config";
// import SubmitBar from ".";
// import SongWrapper from "../Component/MapLooping/SongWrapper";

// const Homey = () => {
//     const [accToken, setAccToken] = useState("");
//     const [isLogin, setIsLogin] = useState(false);
//     const [tracks, setTracks] = useState([]);



//     const getHashParams = () => {
//         const hashParams = {};
//         const r = /([^&;=]+)=?([^&;]*)/g;
//         const q = window.location.hash.substring(1);
//         let e = r.exec(q);
//         while (e) {
//             hashParams[e[1]] = decodeURIComponent(e[2]);
//             e = r.exec(q)
//         }
//         return hashParams;
//     };

//     useEffect(() => {
//         getAccToken()
//     }, []);

   

//     const getAccToken = () => {
//         const params = getHashParams();
//         const { access_token: access_token } = params;

//         setAccToken(accToken.access_token, isLogin.access_token !== undefined)

//     }

//     const onSuccessSearch = () => {
//                 setTracks({ tracks });
//             }

//     const getLinkAuth = () => {
//         const state = Date.now().toString();
//         const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

//         return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=http://localhost:3000&state=${state}&scope=${config.SPOTIFY_SCOPE}`;

//     }
//     return (


//         <div className="Home">
//             {!isLogin && (<a href={getLinkAuth()}>Authentication</a>)}
//             <SubmitBar accessToken={AccToken} onSuccess={(tracks) => onSuccessSearch(tracks)} />
//             <div className="songs">
//                 {tracks.map((g) => (
//                     <SongWrapper
//                         key={g.id}
//                         url={g.album.images[0].url}
//                         title={g.name}
//                         namebands={g.artists[0].name}
//                     />
//                 ))}
//             </div>
//         </div>
//     )
// }
// export default Homey;