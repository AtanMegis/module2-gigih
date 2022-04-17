import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../slice/authSlice';
import { Buttons } from '../Button/Button';
import Logo from '../Logo';
import styles from './navbar.module.css';

export default function Navbar() {
  const dispatch = useDispatch();

  return (
    <nav className="navbar">
      <div className="container navbar__nav">
        <Logo />

        <div className={styles.navbarMenu}>
          <Buttons size="small" onClick={() => dispatch(logout())}>Logout</Buttons>
        </div>
      </div>
    </nav>
  )
}