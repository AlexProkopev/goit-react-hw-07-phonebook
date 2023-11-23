import React from 'react';
import Phonebook from './Phonebook/Phonebook';

import Contacts from './Contacts/Contacts';
import Filters from './Filters/Filters';
import css from './App.module.css';
import { useSelector } from 'react-redux';
import {selectErrore, selectcontatcs } from 'redux/selectors';
import { PhoneLogo } from './Phonebook/PhoneLogo/PhoneLogo';
import { ContactsIcon } from './Contacts/ContactsIcon/ContactsIcon';

const App = () => {
  const contactsRedux = useSelector(selectcontatcs);
  const errore = useSelector(selectErrore);

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook <PhoneLogo/></h1>
      <Phonebook />

      <h2 className={css.title}>Contacts <ContactsIcon/></h2>
      {contactsRedux.length > 0 && <Filters />}
      {!contactsRedux.length && errore === null && <h2>Создайте контакт</h2>}
      <Contacts />
    </div>
  );
};

export default App;
