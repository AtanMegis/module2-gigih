import React, { useState } from "react";
import PropTypes from 'prop-types';
import Button from "../Button/Button";
import Input from "../InputPlaylist/Input";
import { toast } from 'react-toastify';
import { searchTrack } from "../../lib/fetchApi";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../../slice/authSlice";

export default function SearchingBar({ onSuccess, onClearSearch }) {
    const accessToken = useSelector((state) => state.auth.accessToken);
    const [text, setText] = useState('');
    const [isClear, setIsClear] = useState(true);
    const dispatch = useDispatch();
  
    const handleInput = (e) => {
      setText(e.target.value);
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await searchTrack(text, accessToken);
        console.log(response)
        const tracks = response.tracks.items;
        onSuccess(tracks, text);
        setIsClear(false);
      } catch (error) {
          console.log("error = ", error)
        if (error.response.status === 401) {
          dispatch(logout());
        } else {
          toast.error(error.message);
        }
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
            placeholder="Search track..."
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
    onSuccess: PropTypes.func.isRequired,
    onClearSearch: PropTypes.func.isRequired,
  };

