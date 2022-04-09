// import './App.css';
// import React, { Component } from 'react';
// import BigData from './Page/BigData';
// import SongWrapper from './Component/MapLooping/SongWrapper';
// import SearchBar from './Component/SearchBar';
// import LoopedSong from './Component/MapLooping';
// import data from './Component/MapLooping/SongData';
// import Home from './Page/Home';
// import Homey from './Page/TestHome';
// import { ToastContainer } from 'react-toastify';

// function App() {
//   return (
//     <div className="App">
//     <Home/>
//     <ToastContainer/>
//     </div>
//   );
// }

// export default App;

// import {
//   BrowserRouter as Router,
//   Switch,
//   Route
// } from "react-router-dom";
// import NewCreatePlaylist from "./CreatePlaylist";
// import Dashboard from "./Dashboard";
// import React from "react";
// import './App.css';

// function App() {
//   return (
//     <Router>
//       <Switch>
//         <Route path="/" exact>
//         <Dashboard/>
//         </Route>
//         <Route path="/create-playlist" exact>
//         <NewCreatePlaylist/>
//         </Route>
//       </Switch>
//     </Router>
//   )
// }


// export default App;
import CreatePlaylistForm from "./Component/CreatePlaylist/Form";
import { useLocation, Switch, Route } from "react-router-dom";
import Auth from "./Page/Auth";
import GuardRoute from "./Component/GuardRoute";
import NotFound from "./Page/NotFound";
import { useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux'
import { login, logout } from "./slice/authSlice";
import React from "react";
import Home from "./Page/Home";


function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const accessTokenState = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      const expiredDate = localStorage.getItem('expiredDate');

      if (expiredDate < +new Date()) {
        dispatch(logout());
      } else if (!accessTokenState) {
        const user = JSON.parse(localStorage.getItem('user'));
        dispatch(login({
          accessToken,
          user,
          expiredDate,
          }));
      }
    }
  }, [accessTokenState, dispatch, location.pathname]);

  return (
    <Switch>
      <GuardRoute path="/create-playlist" type="private" exact>
        <Home />
      </GuardRoute>
      <GuardRoute path="/" type="guest" exact>
        <Auth />
      </GuardRoute>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
}

export default App;