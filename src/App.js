import { useLocation, Switch, Route } from "react-router-dom";
import Auth from "./Page/Auth/Auth";
import GuardRoute from "./Component/GuardRoute";
import NotFound from "./Page/NotFound/NotFound";
import { useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux'
import { login, logout } from "./slice/authSlice";
import React from "react";
import Home from "./Page/Home/Home";


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