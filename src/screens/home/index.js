import {useCallback, useState} from 'react';
import {useFetchMoviesQuery} from '../../services/api/movies';
import {FlatList, ActivityIndicator, StyleSheet} from 'react-native';
import Movie from './movie';

const Home = ({navigation}) => {
  const [page, setPage] = useState(1);
  const {data, isFetching, isLoading} = useFetchMoviesQuery(page);

  const onMoviePress = useCallback(movie => {
    navigation.navigate('MovieDetails', movie);
  }, []);

  const renderMovieItem = useCallback(({item}) => {
    return <Movie onPress={onMoviePress} movie={item} />;
  }, []);
  const onEndReached = () => {
    if (!isFetching) {
      setPage(page + 1);
    }
  };

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
      onEndReached={onEndReached}
      ListFooterComponent={
        isFetching && (
          <ActivityIndicator style={style.fetching} size={'large'} />
        )
      }
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
export default Home;
