
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addFavorites,
  addFavoritesThunk,
} from 'redux/favorites/favorites.reduces';
import { selectFavorites, selectFilteredContacts } from 'redux/selectors';

import css from './BtnAddToFavorite.module.css';

import { Notify } from 'notiflix';

const BtnAddToFavorite = ({ children }) => {
  const getContacts = useSelector(selectFilteredContacts);
  const favoritesState = useSelector(selectFavorites);

  const dispatch = useDispatch();

  const handleClickFavorites = async e => {
    const parrentButtonId = e.target.closest('li').dataset.id;
    const getContactsForId = getContacts.find(
      contact => contact.id === parrentButtonId
    );

    const hasDuplicatesName = favoritesState.some(
      favorite =>
        favorite.name.toLowerCase() === getContactsForId.name.toLowerCase()
    );

    if (hasDuplicatesName) {
      Notify.failure('Duplicate contact name');
      return;
    } else {
      dispatch(addFavoritesThunk(getContactsForId));
      dispatch(addFavorites(getContactsForId));
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClickFavorites}
        className={css.btnFavorites}
      >
        {children}
      </button>
    </>
  );
};

export default BtnAddToFavorite;
