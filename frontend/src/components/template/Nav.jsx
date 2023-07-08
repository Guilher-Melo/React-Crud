import NavItem from './NavItem';
import './nav.css';
import React from 'react';

export default function Nav(props) {
  return (
    <aside className='menu-area'>
      <nav className="menu">
        <NavItem rota="/" icon="home" label="Início" />
        <NavItem rota="/users" icon="users" label="Usuários" />
      </nav>
    </aside>
  )
}