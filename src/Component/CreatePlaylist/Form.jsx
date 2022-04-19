import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addTracksToPlaylist, createPlaylist } from '../../lib/fetchApi';
import Input from '../Input/Input';
import InputGroup from '../InputGroup/InputGroup';
import PropTypes from 'prop-types';
import { logout } from '../../slice/authSlice';
import styles from './form.module.css'
import { Buttons } from '../Button/Button';

export default function CreatePlaylistForm({ uriTracks }) {
    const accessToken = useSelector((state) => state.auth.accessToken);
    const userId = useSelector((state) => state.auth.user.id);
    const dispatch = useDispatch();
  
    const [form, setForm] = useState({
      title: '',
      description: '',
    });
  
    const [errorForm, setErrorForm] = useState({
      title: '',
      description: '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
  
      setForm({ ...form, [name]: value });
      setErrorForm({ ...errorForm, [name]: '' });
    }
  
    const validateForm = () => {
      let isValid = true;
  
      if (form.title.length < 10) {
        setErrorForm({
          ...errorForm,
          title: 'Title must be at least 10 characters long',
        });
        isValid = false;
      }
  
      if (form.description.length > 100) {
        setErrorForm({
          ...errorForm,
          description: 'Description must be less than 100 characters long',
        });
        isValid = false;
      }
  
      return isValid;
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault();
        console.log(uriTracks);
      if (validateForm()) {
          console.log("masuk if")
          console.log("uri tracks = ", uriTracks)
        if (uriTracks.length >= 0) {
            console.log("masuk if 2")
          try {
            const responseCreatePlaylist = await createPlaylist(accessToken, userId, {
              name: form.title,
              description: form.description,
            });
            
            await addTracksToPlaylist(accessToken, responseCreatePlaylist.id, uriTracks);
            console.log("sebelum toast")
            toast.success('Playlist created successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            console.log("sesudah")
            setForm({ title: '', description: '' });
          } catch (error) {
              console.log("error = ", error)
            if (error.response.status === 401) {
              dispatch(logout());
            } else {
              toast.error(error.message);
            }
          }
        } else {
          toast.error('Please select at least one track');
        }
      }
    }
    
    return (
      <div className={styles['create-playlist-form']}>
        <div>
          <h2>Create Playlist</h2>
          <form className="form form-playlist" onSubmit={handleSubmit}>
         
          <InputGroup>
          <Input
            label="Title"
            placeholder="Title of playlist"
            value={form.title}
            id="title-playlist"
            name="title"
            onChange={handleChange}
            error={errorForm.title}
            required
          />
        </InputGroup>
            <InputGroup>
              <Input
                type='textarea'
                label="Description"
                placeholder="Description of playlist"
                value={form.description}
                id="description-playlist"
                name="description"
                onChange={handleChange}
                required
                error={errorForm.description}
              />
            </InputGroup>
  
            <div className="form-playlist__action">
              <Buttons type="submit">Create</Buttons>
            </div>
          </form>
        </div>
      </div>
    )
  }
  
  CreatePlaylistForm.propTypes = {
    uriTracks: PropTypes.array.isRequired,
  };