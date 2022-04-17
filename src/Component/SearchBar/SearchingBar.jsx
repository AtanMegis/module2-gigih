import React, { useState } from "react";
import PropTypes from 'prop-types';
import Input from "../Input/Input";
import { toast } from 'react-toastify';
import { searchTrack } from "../../lib/fetchApi";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../../slice/authSlice";
import styles from "./searchingbar.module.css";
import { Buttons } from "../Button/Button"


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
      <div className={styles['SearchBar-wrapper']}>
        <form className="form-search" onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Search track..."
            className="form-search__input"
            required
            value={text}
            onChange={handleInput}
          />
          <Buttons type="submit">Search</Buttons>
        </form>
  
        {!isClear && (
          <Buttons variant="text" onClick={handleClear} className="mt-1">Clear search</Buttons>
        )}
      </div>
    )
  }
  
  SearchingBar.propTypes = {
    onSuccess: PropTypes.func.isRequired,
    onClearSearch: PropTypes.func.isRequired,
  };


