import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../slice/authSlice';
import Button from '../Button/Button';
import Logo from '../Logo';
import styles from './navbar.module.css';

export default function Navbar() {
  const dispatch = useDispatch();

  return (
    <nav className="navbar">
      <div className="container navbar__nav">
        <Logo />

        <div className={styles.navbarMenu}>
          <Button size="small" onClick={() => dispatch(logout())}>Logout</Button>
        </div>
      </div>
    </nav>
  )
}