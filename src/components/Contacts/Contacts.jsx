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
import { ModalContactsInfo } from 'components/ModalContactsInfo/ModalContactsInfo';
import { TrashIcon } from './TrashIcon/TrashIcon';

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
          <li className={css.elemContacts} key={id} data-id={id} >
           <p className={css.contactText}> {name}: <span className={css.contactTextNumber}>{number}</span></p>
            <div className={css.wrapperBtnModal}>
            <ModalContactsInfo dataContacts={{ id, name, number }} />
            <button
            aria-label="This is a tooltip"
              className={css.btnContacts}
              type="button"
              onClick={() => {
                hendleDeletedContact(id);
              }}
            >
              <TrashIcon/>
            </button>
             
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;
