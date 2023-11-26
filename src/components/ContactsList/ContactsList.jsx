// import BtnAddToFavorite from 'components/BtnAddToFavorite/BtnAddToFavorite';
// import BtnDeletedContact from 'components/BtnDeletedContact/BtnDeletedContact';
// import { ModalContactsInfo } from 'components/ModalContactsInfo/ModalContactsInfo';
// import React from 'react';
// import { useSelector } from 'react-redux';
// import { selectFavorites, selectFilteredContacts } from 'redux/selectors';

// import css from './ContactsList.module.css';
// import { FavoriteIcon } from 'components/Contacts/FavoriteIcon/FavoriteIcon';
// import { IsFavoriteBtn } from 'components/Contacts/IsFavoriteBtn/IsFavoriteBtn';

// const ContactsList = () => {
//   const getContacts = useSelector(selectFilteredContacts);
//   const favorites = useSelector(selectFavorites)
//   const sortedContacts = [...getContacts].sort((a, b) =>
//     a.name.localeCompare(b.name)
//   );
//   return (
//     <>
//       {sortedContacts.map(({ id, name, number }) => {
//         const isFavorite = favorites.some(favorite => favorite.name === name);
//         return (
//         <li className={css.elemContacts} key={id} data-id={id}>
//           <p className={css.contactText}>
//             {name}: <span className={css.contactTextNumber}>{number}</span>
//           </p>
//           <div className={css.wrapperBtnModal}>
//             <BtnAddToFavorite >
//               {isFavorite ? <IsFavoriteBtn/> : <FavoriteIcon />}
//             </BtnAddToFavorite>
//             <ModalContactsInfo dataContacts={{ id, name, number }} />
//             <BtnDeletedContact idCurrent={id} />
//           </div>
//         </li>
//       )})}
//     </>
//   );
// };

// export default ContactsList;

import BtnAddToFavorite from 'components/BtnAddToFavorite/BtnAddToFavorite';
import BtnDeletedContact from 'components/BtnDeletedContact/BtnDeletedContact';
import { ModalContactsInfo } from 'components/ModalContactsInfo/ModalContactsInfo';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectFavorites, selectFilteredContacts } from 'redux/selectors';

import css from './ContactsList.module.css';
import { FavoriteIcon } from 'components/Contacts/FavoriteIcon/FavoriteIcon';
import { IsFavoriteBtn } from 'components/Contacts/IsFavoriteBtn/IsFavoriteBtn';

const ContactsList = () => {
  const getContacts = useSelector(selectFilteredContacts);
  const favorites = useSelector(selectFavorites);

  const sortedContacts = [...getContacts].sort((a, b) => {
    const isAFavorite = favorites.some((favorite) => favorite.name === a.name);
    const isBFavorite = favorites.some((favorite) => favorite.name === b.name);

    if (isAFavorite && !isBFavorite) return -1;
    if (!isAFavorite && isBFavorite) return 1;

    return a.name.localeCompare(b.name);
  });

  return (
    <>
      {sortedContacts.map(({ id, name, number }) => {
        const isFavorite = favorites.some((favorite) => favorite.name === name);
        return (
          <li className={css.elemContacts} key={id} data-id={id}>
            <p className={css.contactText}>
              {name}: <span className={css.contactTextNumber}>{number}</span>
            </p>
            <div className={css.wrapperBtnModal}>
              <BtnAddToFavorite>
                {isFavorite ? <IsFavoriteBtn /> : <FavoriteIcon />}
              </BtnAddToFavorite>
              <ModalContactsInfo dataContacts={{ id, name, number }} />
              <BtnDeletedContact idCurrent={id} />
            </div>
          </li>
        );
      })}
    </>
  );
};

export default ContactsList;