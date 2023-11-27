import React from 'react';

import css from './BtnFavorite.module.css';



const BtnFavorite = ({ children,hendlerClick }) => {

  return (
    <>
      <button
        type="button"
        onClick={hendlerClick}
        className={css.btnFavorites}
      >
        {children}
      </button>
    </>
  );
};

export default BtnFavorite;
