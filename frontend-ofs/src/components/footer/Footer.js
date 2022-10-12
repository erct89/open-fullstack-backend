import './footer.css';
import React from 'react';

export const Footer = (props) => {
  const footerStyle = {
    background: 'rgb(200, 200, 200)',
    color: 'rgb(230, 20, 280)',
    fontStyle: 'italic',
    fontSize: '0.75rem'
  };

  return (<footer className='footer' style={footerStyle}>
    <hr/>
    <em>{props.message}</em>
  </footer>)
};

export default Footer;