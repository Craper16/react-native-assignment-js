import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import {authApi} from './api/authApi';
import articlesSlice from './articles/articlesSlice';
import {articlesApi} from './api/articlesApi';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    articles: articlesSlice,
    [authApi.reducerPath]: authApi.reducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware).concat(articlesApi.middleware),
});

export default store;
