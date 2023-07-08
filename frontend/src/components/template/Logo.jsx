import './logo.css';
import logo from '../../assets/images/logo.png';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo(props) {
  return (
    <aside className='logo'>
      <Link to="/" className="logo">
        <img src={logo} alt="Logo" />
      </Link>
    </aside>
  )
}