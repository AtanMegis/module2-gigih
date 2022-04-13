import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styles from './button.module.css'
import { Button } from '@mui/material'

export default function Buttons({ children, type, variant, className, onClick, href, external, ...props }) {
    const classButton = ['btn'];
  
    if (variant !== 'primary') {
      classButton.push(`btn--${variant}`);
    }
  
    if (className !== '') {
      classButton.push(className);
    }
  
    if (href) {
      classButton.push('btn--link');
  
      if (external) {
        return (
          <a
            href={href}
            className={classButton.join(' ')}
            {...props}
          >
            {children}
          </a>
        )
      }
      
      return (
        <Link
          to={href}
          className={classButton.join(' ')}
          {...props}
        >
          {children}
        </Link>
      )
    }
  
    return (
      <Button
        type={type}
        className={styles.lalala}
        onClick={onClick}
        {...props}
      >
        {children}
      </Button>
    )
  }
  
  Button.defaultProps = {
    type: 'button',
    className: '',
    variant: 'primary',
    onClick: null,
    href: null,
  };
  
  Button.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.string,
    className: PropTypes.string,
    variant: PropTypes.oneOf(['primary', 'secondary', 'text']),
    onClick: PropTypes.func,
    href: PropTypes.string,
  };