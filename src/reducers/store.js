import {configureStore} from '@reduxjs/toolkit';
import {moviesApi} from '../services/api/movies';
import {ErrorMiddleware} from './error-middleware';

export const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
  },
  middleware: gDM => gDM().concat(moviesApi.middleware).concat(ErrorMiddleware),
});
