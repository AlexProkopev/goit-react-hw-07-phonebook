import React, { useEffect } from 'react';
import css from './Contacts.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContactThunk, fetchContactsList } from 'redux/contacts.reducer';
import {
  selectErrore,
  selectFilteredContacts,
  selectLoading,
} from 'redux/selectors';
import Loader from 'components/Loader/Loader';
import Errore from 'components/Errore/Errore';

const Contacts = () => {
  const loader = useSelector(selectLoading);
  const errore = useSelector(selectErrore);
  const getContacts = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();

  const hendleDeletedContact = async id => {
    await dispatch(deleteContactThunk(id));
    dispatch(fetchContactsList());
  };

  const sortedContacts = [...getContacts].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  useEffect(() => {
    dispatch(fetchContactsList());
    setInterval(() => {
      dispatch(fetchContactsList());
    }, 300000);
  }, [dispatch]);

  return (
    <div>
      {loader && <Loader />}
      {errore && <Errore />}
      <ul className={css.listContacts}>
        {sortedContacts.map(({ id, name, number }) => (
          <li className={css.elemContacts} key={id}>
            {name}: {number}
            <button
              className={css.btnContacts}
              type="button"
              onClick={() => {
                hendleDeletedContact(id);
              }}
            >
              Deleted
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;
