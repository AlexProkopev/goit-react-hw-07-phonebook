import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {deleteFavoritesThunk, fetchFavoritesList } from 'redux/favorites/favorites.reduces';
import { selectFavorites } from 'redux/selectors';
import css from "./FavoritesList.module.css"
import { TrashIcon } from 'components/Contacts/TrashIcon/TrashIcon';

const FavoritesList = () => {
  const favorites = useSelector(selectFavorites);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavoritesList());
  }, [dispatch]);

  const handleDeletedDavorite = async id => {
await dispatch(deleteFavoritesThunk(id));
dispatch(fetchFavoritesList());
  };

  return (
    <>
      {favorites.map(({ id, name, number }) => {
        return (
          <li key={id} className={css.elemContacts}>
            <p className={css.contactText} >
              {name} : <span className={css.contactTextNumber}>{number}</span>
            </p>
            <button type="button" className={css.btnDeleteFavorite} onClick={()=> handleDeletedDavorite(id)}><TrashIcon/></button>
          </li>
        );
      })}
    </>
  );
};

export default FavoritesList;
