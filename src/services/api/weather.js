import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import Config from 'react-native-config';
export const weatherApi = createApi({
  reducerPath: ['weatherApi'],
  baseQuery: fetchBaseQuery({
    baseUrl: Config.WEATHER_API_URL,
  }),
  endpoints: build => ({
    getWeather: build.query({
      query: country => `find?q=${country}&appid=${Config.WEATHER_API_KEY}`,
      headers: {},
    }),
  }),
});

export const {useGetWeatherQuery} = weatherApi;
