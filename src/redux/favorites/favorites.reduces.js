import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import axios from 'axios';
import { Notify } from 'notiflix';

export const fetchFavoritesList = createAsyncThunk(
  'favorites/getFavorites',
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get(
        'https://655ef6fa879575426b44404b.mockapi.io/favorites/'
      );
      
      return data;
    } catch (err) {
      Notify.failure('Not connected to the server');
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const deleteFavoritesThunk = createAsyncThunk(
  'favorites/deleteFavorites',
  async (id, thunkApi) => {
    try {
      const { data } = await axios.delete(
        `https://655ef6fa879575426b44404b.mockapi.io/favorites/${id}`
      );

      
      Notify.success('Contact deleted from favorites');
      return data;
    } catch (err) {
      Notify.failure('Contact not deleted successfully');

      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const addFavoritesThunk = createAsyncThunk(
  'favorites/addFavorites',
  async (favoritesData, thunkApi) => {
    try {
      const { data } = await axios.post(
        `https://655ef6fa879575426b44404b.mockapi.io/favorites/`,
        favoritesData
      );
      Notify.success('Contact added to favorites');
      return data;
    } catch (err) {
      Notify.failure('Contact not added successfully');
      return thunkApi.rejectWithValue(err.message);
    }
  }
);




const initialState = {
  favorites: [],
  isFavorite: false,
  favoritesForId:[],
  isLoading: false,
  isError: null,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorites(state, { payload }) {
      state.favorites.push(payload);
     
    },
    deleteFavorites(state, { payload }) {
      state.favorites = state.favorites.filter(contact => contact.id !== payload);
    },
    getFavoritesForId(state, { payload }) {
      state.favoritesForId = state.favorites.find(contact => contact.id === payload);
    },
    
  },
  extraReducers: builder =>
    builder
      .addCase(fetchFavoritesList.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.favorites = payload;
      })
      .addCase(deleteFavoritesThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addMatcher(
        isAnyOf(fetchFavoritesList.pending, deleteFavoritesThunk.pending),
        state => {
          
          state.isLoading = true;
          state.isError = null;
          
        }
      )
      .addMatcher(
        isAnyOf(fetchFavoritesList.rejected, deleteFavoritesThunk.rejected),
        (state, { payload }) => {
          state.isLoading = false;
          state.isError = payload;
        }
      ),
});

export const { addFavorites, deleteFavorites,getFavoritesForId } = favoritesSlice.actions;

export const favoritesReducer = favoritesSlice.reducer;
