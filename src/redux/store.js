import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contacts.reducer';
import { filtersReducer } from './filter/filter.deducer';
import { favoritesReducer } from './favorites/favorites.reduces';

export const store = configureStore({
  reducer: {
    contactsStore: contactsReducer,
    filtersStore: filtersReducer,
    favoritesStore: favoritesReducer,
  },
});

export default store;


// создать стейт для хранения избранного и при клике на звездочку помещать её по айди туда