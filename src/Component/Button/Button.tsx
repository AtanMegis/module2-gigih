import React, { MouseEventHandler } from 'react'
import { Link } from 'react-router-dom'




// type Props = {
//   onClick: MouseEventHandler,
//   children: string,
//   type: string ,
//   className: string ,
//   href:string ,
//   variant: string,
//   external: boolean ,
  
// }
export const Buttons: React.FC<{ children: any, tipe: string , variant: string , class : string,
   clickHandler: MouseEventHandler, links : string, eksternal : "true"}> = ( props ) =>   {
    const classButton = ['btn'];

    if (props.variant !== 'primary') {
      classButton.push(`btn--${props.variant}`);
    }
  
    if (props.class !== '') {
    classButton.push(props.class);
    }
    
    if (props.links) {
      classButton.push('btn--link');
      
      if (props.eksternal) {
        return (
          <a
            href={props.links}
            className={classButton.join(' ')}
            {...props}
          >
            {props.children}
          </a>
        )
      }
      
      return (
        
        <Link
          to={props.links}
          className={classButton.join(' ')}
          {...props}
        >
          {props.children}
        </Link>
        
      )
    }
  
    return (
      <button
        // type={props.tipe}
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