import React, { useState } from 'react';
import Modal from 'react-modal';
import css from './ModalContactsInfo.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteContactThunk,
  fetchContactsList,
  getContactsForId,
} from 'redux/contacts.reducer';
import { selectLoading } from 'redux/selectors';
import Loader from 'components/Loader/Loader';

Modal.setAppElement('#root');

export const ModalContactsInfo = dataContacts => {
  const { id, name, number } = dataContacts.dataContacts;
  const loader = useSelector(selectLoading);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch = useDispatch();

  const openModal = e => {
    setModalIsOpen(true);
    dispatch(getContactsForId(id));
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const hendleDeletedContact = async () => {
    await dispatch(deleteContactThunk(id));
    dispatch(fetchContactsList());
    closeModal();
  };

  return (
    <div>
      <button onClick={openModal} className={css.btnOpenModal}>
        Info
      </button>
      <Modal
        className={css.wrapperModal}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="User info"
      >
        {loader && <Loader />}
        <h2 className={css.text}>
          Name: <span className={css.span}>{name}</span>
        </h2>
        <p className={css.number}>
          Phone:{' '}
          <a href={`tel:${number}`} className={css.span}>
            {number}
          </a>
        </p>
        <button type="button" onClick={hendleDeletedContact}>
          Deleted
        </button>
        <button className={css.closeModal} type="button" onClick={closeModal}>
          Close
        </button>
      </Modal>
    </div>
  );
};
