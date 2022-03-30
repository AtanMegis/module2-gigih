import React, { Component } from "react";
import SubmitBar from ".";
import SongWrapper from "../Component/MapLooping/SongWrapper";
import SearchBar from "../Component/SearchBar";
import config from "../lib/config";


class Home extends Component {
    state = {
        accToken: '',
        isLogin: false,
        tracks: [],
    }


    getHashParams() {
        const hashParams = {};
        const r = /([^&;=]+)=?([^&;]*)/g;
        const q = window.location.hash.substring(1);
        let e = r.exec(q);
        while(e) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
            e = r.exec(q)
        }
        return hashParams;
    }

    componentDidMount() {
        const params = this.getHashParams();
        const {access_token : accessToken} = params;
        
        this.setState({accToken : accessToken, isLogin: accessToken !== undefined});

    }

    getLinkAuth() {
        const state = Date.now().toString();
        const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

        return `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=http://localhost:3000&state=${state}&scope=${config.SPOTIFY_SCOPE}`;

    }

    onSuccessSearch(tracks) {
        this.setState({ tracks });
    }

    render () {
        return (
            
            
            <div className="Home">
            {!this.state.isLogin &&( <a href={this.getLinkAuth()}>Auth</a>)}
            <SubmitBar accessToken={this.state.accToken} onSuccess={(tracks) => this.onSuccessSearch(tracks)}/>
            <div className="songs">
            {this.state.tracks.map((g) => (
                <SongWrapper
                key={g.id}
                url={g.album.images[0].url}
                title={g.name}
                namebands={g.artists[0].name}
                />
            ))}
            </div>
            </div>
        )
    }

}
export default Home;
