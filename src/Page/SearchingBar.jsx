import React, { useState } from "react";
import PropTypes from 'prop-types';
import Button from "./Button/Button";
import Input from "../Component/InputPlaylist/Input";
import { toast } from 'react-toastify';
import { searchTrack } from "../lib/fetchApi";
import { useSelector } from 'react-redux';


export default function SearchingBar({  onSuccess, onClearSearch }) {
    const accessToken = useSelector((state) => state.auth.accessToken);
    const [text, setText] = useState('');
    const [isClear, setIsClear] = useState(true);


    const handleInput = (e) => {
        setText(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();



        // const requestOptions = {
        //     headers: {
        //         'Authorization': 'Bearer ' + accessToken,
        //         'Content-Type': 'application/json',
        //     },
        // };

        try {
            // const response = await fetch(`${config.SPOTIFY_BASE_URL}/search?type=track&q=${text}`, requestOptions)
            //     .then((data) => data.json());
            const response = await searchTrack(text, accessToken);

            const tracks = response.tracks.items;
            onSuccess(tracks);
            setIsClear(false);
        } catch (e) {
            // alert(e);
            toast.error(e);
        }
    }

    const handleClear = () => {
        onClearSearch();
        setText('');
        setIsClear(true);
    }


    return (
        <div>
            <form className="form-search" onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="Search..."
                    className="form-search__input"
                    required
                    value={text}
                    onChange={handleInput}
                />
                <Button type="submit">Search</Button>
            </form>
            {!isClear && (
                <Button variant="text" onClick={handleClear} className="mt-1">Clear search</Button>
            )}
        </div>
    )
}

SearchingBar.propTypes = {
    accessToken: PropTypes.string.isRequired,
    onSuccess: PropTypes.func.isRequired,
    onClearSearch: PropTypes.func.isRequired,
}





