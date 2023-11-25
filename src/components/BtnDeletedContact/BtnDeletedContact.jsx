import { TrashIcon } from 'components/Contacts/TrashIcon/TrashIcon';
import React from 'react'
import { useDispatch } from 'react-redux';
import { deleteContactThunk, fetchContactsList } from 'redux/contacts.reducer';
import css from "./BtnDeletedContact.module.css"

const BtnDeletedContact = ({idCurrent}) => {

    const dispatch = useDispatch();

    const hendleDeletedContact = async id => {
        await dispatch(deleteContactThunk(id));
        dispatch(fetchContactsList());
      };

  return (
    <><button
    className={css.btnContacts}
    type="button"
    onClick={() => {
      hendleDeletedContact(idCurrent);
    }}
  >
    <TrashIcon />
  </button></>
  )
}

export default BtnDeletedContact