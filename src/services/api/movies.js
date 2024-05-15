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
    searchMovie: build.query({
      query: ({searchValue, page}) =>
        `search/movie?query=${searchValue}&page=${page}`,
      serializeQueryArgs: ({endpointName}) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        if (newItems.page > 1) {
          currentCache.results.push(...newItems.results);
        } else {
          return newItems;
        }
      },
      forceRefetch({currentArg, previousArg}) {
        return currentArg !== previousArg;
      },
    }),
    getConfiguration: build.query({
      query: () => 'configuration',
    }),
    getMovieGenres: build.query({
      query: () => 'genre/movie/list',
    }),
    getMovieCountry: build.query({
      query: movieId => `movie/${movieId}`,
      transformResponse: data => {
        return data.production_countries?.[0].name;
      },
    }),
    getMovies: build.query({
      query: ({page, genres}) =>
        `discover/movie?page=${page}&with_genres=${genres}`,
      serializeQueryArgs: ({endpointName}) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        if (newItems.page > 1) {
          currentCache.results.push(...newItems.results);
        } else {
          return newItems;
        }
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
  useGetMovieGenresQuery,
  useSearchMovieQuery,
  useGetMovieCountryQuery,
  useGetConfigurationQuery,
  useGetMovieTrailerQuery,
  useGetMoviesQuery,
  useFavoriteMovieMutation,
  useGetAccountStatesQuery,
  useGetFavoriteMoviesQuery,
} = moviesApi;
