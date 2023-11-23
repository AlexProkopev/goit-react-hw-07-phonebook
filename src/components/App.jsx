import React from 'react';
import Phonebook from './Phonebook/Phonebook';

import Contacts from './Contacts/Contacts';
import Filters from './Filters/Filters';
import css from './App.module.css';
import { useSelector } from 'react-redux';
import { contatcs } from 'redux/selectors';

const App = () => {
  const contactsRedux = useSelector(contatcs);

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <Phonebook />

      <h2 className={css.title}>Contacts</h2>
      {contactsRedux.length > 0 && <Filters />}
      {!contactsRedux.length && <h2>Создайте контакт</h2>}
      <Contacts />
    </div>
  );
};

export default App;
