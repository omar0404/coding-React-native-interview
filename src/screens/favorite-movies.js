import {useCallback, useState} from 'react';
import {FlatList, ActivityIndicator, StyleSheet} from 'react-native';
import Movie from '../components/movie';
import {useGetFavoriteMoviesQuery} from '../services/api/movies';

const FavoriteMovies = ({navigation}) => {
  const {data, isLoading} = useGetFavoriteMoviesQuery();

  const onMoviePress = useCallback(movie => {
    navigation.navigate('MovieDetails', movie);
  }, []);

  const renderMovieItem = useCallback(({item}) => {
    return <Movie onPress={onMoviePress} movie={item} />;
  }, []);

  if (isLoading) {
    return <ActivityIndicator size={'large'} />;
  }
  return (
    <FlatList
      data={data?.results ?? []}
      renderItem={renderMovieItem}
      keyExtractor={item => item.id}
      style={style.container}
      numColumns={2}
    />
  );
};
const style = StyleSheet.create({
  container: {
    padding: 15,
  },
  fetching: {
    margin: 20,
  },
});
export default FavoriteMovies;
