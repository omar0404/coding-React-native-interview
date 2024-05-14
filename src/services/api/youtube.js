import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import Config from 'react-native-config';
export const youtubeApi = createApi({
  reducerPath: ['youtubeApi'],
  baseQuery: fetchBaseQuery({
    baseUrl: Config.YOUTUBE_API_URL,
  }),
  tagTypes: ['FavoriteMovies'],
  endpoints: build => ({
    getVideo: build.query({
      query: id => `videos?id=${id}&key=${Config.YOUTUBE_API_KEY}`,
      headers: {},
    }),
  }),
});

export const {useGetVideoQuery} = youtubeApi;
