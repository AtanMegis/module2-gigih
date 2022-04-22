import React, { MouseEventHandler } from 'react'
import { Link } from 'react-router-dom'


export const Buttons: React.FC<{ children: any, tipe: string , variant: string , class : string,
   clickHandler: MouseEventHandler, links : string, eksternal ?:  boolean | string}> = ( props ) =>   {
    const classButton = ['btn'];
    console.log(classButton);


    if (props.eksternal) {
      return (
        <a
          href={props.links}   
          {...props}
        >
          {props.children}
        </a>
      )
    }

    if (props.links) {
      return ( 
        <Link
          to={props.links} 
          {...props}
        >
          {props.children}
        </Link>   
      )
    }
  
    return (
      <button
      onClick={props.clickHandler}
      {...props}
      >
        {props.children}
      </button>
    )
  }
   


  // Button.defaultProps = {
  //   type: 'button',
  //   className: '',
  //   variant: 'primary',
  //   onClick: null,
  //   href: null,
  // };
  
  // Button.propTypes = {
  //   children: PropTypes.node.isRequired,
  //   type: PropTypes.string,
  //   className: PropTypes.string,
  //   variant: PropTypes.oneOf(['primary', 'secondary', 'text']),
  //   onClick: PropTypes.func,
  //   href: PropTypes.string,
  // };