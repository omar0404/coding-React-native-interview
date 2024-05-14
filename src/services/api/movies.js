import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import Config from 'react-native-config';
export const moviesApi = createApi({
  reducerPath: ['moviesApi'],
  baseQuery: fetchBaseQuery({
    baseUrl: Config.TMDB_API_URL,
    headers: {
      Authorization: `Bearer ${Config.TMDB_AUTH}`,
    },
  }),
  tagTypes: ['FavoriteMovies'],
  endpoints: build => ({
    getConfiguration: build.query({
      query: () => 'configuration',
    }),
    getMovieCountry: build.query({
      query: movieId => `movie/${movieId}`,
      transformResponse: data => {
        return data.production_countries?.[0].name;
      },
    }),
    getMovies: build.query({
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

    getFavoriteMovies: build.query({
      query: () => 'account/21268440/favorite/movies',
      providesTags: ['FavoriteMovies'],
    }),
    getAccountStates: build.query({
      query: movieId => `movie/${movieId}/account_states`,
    }),
    getMovieTrailer: build.query({
      query: movieId => `movie/${movieId}/videos`,
      transformResponse: videos => {
        return videos.results.find(
          video => video.type === 'Trailer' && video.site === 'YouTube',
        );
      },
    }),
    favoriteMovie: build.mutation({
      query: body => ({
        url: 'account/21268440/favorite',
        method: 'POST',
        body,
      }),
      async onQueryStarted(body, {dispatch, queryFulfilled}) {
        dispatch(moviesApi.util.invalidateTags(['FavoriteMovies']));

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
  useGetMovieCountryQuery,
  useGetConfigurationQuery,
  useGetMovieTrailerQuery,
  useGetMoviesQuery,
  useFavoriteMovieMutation,
  useGetAccountStatesQuery,
  useGetFavoriteMoviesQuery,
} = moviesApi;
