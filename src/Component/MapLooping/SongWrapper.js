import React from "react";

const SongWrapper = ({ nameSong, url, nameBand }) => {

    return (
        <div className="img-song">
            <img alt="gif" src={url} className="gif-song" />
            <p className="title">{nameSong}</p>
            <p className="nameBands">{nameBand}</p>
            <div>
            <button className="btn btn--song">Select</button></div>
        </div>
    )
}

export default SongWrapper;