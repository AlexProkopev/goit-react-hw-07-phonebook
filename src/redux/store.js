import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contacts.reducer';
import { filtersReducer } from './filter/filter.deducer';

export const store = configureStore({
  reducer: {
    contactsStore: contactsReducer,
    filtersStore: filtersReducer,
  },
});

export default store;
