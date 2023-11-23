import React, { useEffect } from 'react';
import css from './Contacts.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContacts } from 'redux/contacts.reducer';
import { contatcs, filter } from 'redux/selectors';

 const Contacts =()=> {

  const contacts = useSelector(contatcs);
  const filters = useSelector(filter);
  const dispatch = useDispatch();


  const hendleDeletedContact = id => dispatch(deleteContacts(id))
   

   const getContacts = () => {
    const filterLowerCase = filters.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filterLowerCase)
    );
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

    return (
      <div>
        <ul className={css.listContacts}>
          {getContacts().map(({ id, name, number }) => (
            <li className={css.elemContacts} key={id}>
              {name}: {number}{' '}
              <button
                className={css.btnContacts}
                type="button"
                onClick={() => {
                  hendleDeletedContact(id);
                }}
              >
                {' '}
                Deleted{' '}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }


export default Contacts