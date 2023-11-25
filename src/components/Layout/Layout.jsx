import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <>
      <div className={css.navWrapper}>
        <NavLink className={css.navLink} to="/favorites">Favorites contact</NavLink>
        <NavLink className={css.navLink}  to="/phonebook">Phonebook</NavLink>
      </div>
      <div className={css.container}>{children}</div>
    </>
  );
};

export default Layout;
