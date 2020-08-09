import React, { useEffect, useState } from 'react';
import Login from './components/login/Login';
import Player from './components/player/Player';
import { getTokenFromUrl } from './spotify/spotify';
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from './DataLayer';

const spotify = new SpotifyWebApi();

function App() {
  const [token, dispatch] = useDataLayerValue();

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";

    let _token = hash.access_token;

    if (_token) {

      dispatch({
        type: "SET_TOKEN",
        token: _token
      })

      spotify.setAccessToken(_token);

      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user: user
        });
      });
    }
  }, [dispatch]);

  console.log(token);

  return (
    <div className="app">
      {
        token ? (
         <Player spotify={spotify} />
        ) : (
          <Login />
        )
      }
    </div>
  );
}

export default App;
