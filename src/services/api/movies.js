import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import Config from 'react-native-config';
export const moviesApi = createApi({
  reducerPath: ['moviesApi'],
  baseQuery: fetchBaseQuery({
    baseUrl: Config.TMDB_API_URL,
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMWVlZDM1MWIzZTM5OTlkMmFlODJiZmUwYjM0ZTBjZSIsInN1YiI6IjY2NDMwNTE4ZDNmYzFjMmY1ZmYyMDZkMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W62W-QHhuKyCb4FkGo40PNIpmo7i6eprgzr-kEdNv-A',
    },
  }),
  tagTypes: ['AccountStates'],
  endpoints: build => ({
    fetchMovies: build.query({
      query: page => `discover/movie?page=${page}`,
      serializeQueryArgs: ({endpointName}) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.results.push(...newItems.results);
      },
      forceRefetch({currentArg, previousArg}) {
        return currentArg !== previousArg;
      },
    }),
    getAccountStates: build.query({
      query: movieId => `movie/${movieId}/account_states`,
      providesTags: ['AccountStates'],
    }),
    favoriteMovie: build.mutation({
      query: body => ({
        url: 'account/21268440/favorite',
        method: 'POST',
        body,
      }),
      async onQueryStarted(body, {dispatch, queryFulfilled}) {
        const patchResult = dispatch(
          moviesApi.util.updateQueryData(
            'getAccountStates',
            body.media_id,
            draft => {
              Object.assign(draft, {...draft, favorite: body.favorite});
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useFetchMoviesQuery,
  useFavoriteMovieMutation,
  useGetAccountStatesQuery,
} = moviesApi;
