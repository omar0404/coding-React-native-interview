import {configureStore} from '@reduxjs/toolkit';
import {moviesApi} from '../services/api/movies';
import {ErrorMiddleware} from './error-middleware';
import {youtubeApi} from '../services/api/youtube';
import {weatherApi} from '../services/api/weather';

export const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
    [youtubeApi.reducerPath]: youtubeApi.reducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
  },
  middleware: gDM =>
    gDM()
      .concat(moviesApi.middleware)
      .concat(youtubeApi.middleware)
      .concat(weatherApi.middleware)
      .concat(ErrorMiddleware),
});
