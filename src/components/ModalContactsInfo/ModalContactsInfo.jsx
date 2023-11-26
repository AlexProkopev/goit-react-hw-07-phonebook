import React, { useState } from 'react';
import Modal from 'react-modal';
import "./ModalContactsInfo.css"
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteContactThunk,
  fetchContactsList,
  getContactsForId,
} from 'redux/contacts.reducer';
import { selectLoading } from 'redux/selectors';
import Loader from 'components/Loader/Loader';
import { InfoIcon } from 'components/Contacts/InfoIcon/InfoIcon';
import { Transition } from 'react-transition-group';


Modal.setAppElement('#root');

export const ModalContactsInfo = dataContacts => {
  const { id, name, number } = dataContacts.dataContacts;
  const loader = useSelector(selectLoading);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch = useDispatch();

  const openModal = ()=> {
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
      <button onClick={openModal} className="btnOpenModal">
        <InfoIcon />
      </button>
  
      <Transition in={modalIsOpen} timeout={500}>
        {state => (
          <Modal
            className={`wrapperModal`}
            portalClassName={`modal-portal ${state}`}
            overlayClassName="modal-overlay"
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="User info"
          >
            {loader && <Loader />}
            <h2 className={"text"}>
              Name: <span className={"span"}>{name}</span>
            </h2>
            <p className={"number"}>
              Phone: <a href={`tel:${number}`} className={"span"}>
                {number}
              </a>
            </p>
            <button type="button" className={"btnDeleted"} onClick={hendleDeletedContact}>
              Deleted
            </button>
            <button className="closeModal" type="button" onClick={closeModal}>
              Close
            </button>
          </Modal>
        )}
      </Transition>
    </div>
  );
};
