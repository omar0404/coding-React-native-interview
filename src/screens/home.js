import {useCallback, useState} from 'react';
import {
  useGetMovieGenresQuery,
  useGetMoviesQuery,
  useSearchMovieQuery,
} from '../services/api/movies';
import {
  FlatList,
  View,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import Movie from '../components/movie';

const Home = ({navigation}) => {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const {data: genres} = useGetMovieGenresQuery();
  const {data: searchResults} = useSearchMovieQuery(
    {searchValue, page},
    {
      skip: !searchValue,
    },
  );
  const {data, isFetching, isLoading} = useGetMoviesQuery(
    {page, genres: selectedGenres.join(',')},
    {
      skip: !!searchValue,
    },
  );
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
  const onSearch = value => {
    setPage(1);
    setSearchValue(value);
  };
  const onGenreSelect = id => {
    setPage(1);
    const index = selectedGenres.indexOf(id);
    if (index > -1) {
      setSelectedGenres(selectedGenres.filter(genreId => genreId !== id));
    } else {
      setSelectedGenres([...selectedGenres, id]);
    }
  };
  if (isLoading) {
    return <ActivityIndicator size={'large'} />;
  }
  const movies = searchValue ? searchResults?.results : data?.results ?? [];

  return (
    <>
      <TextInput
        onChangeText={onSearch}
        style={style.search}
        placeholder={'Search'}
      />
      {!searchValue && (
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          {(genres?.genres ?? []).map(genre => (
            <TouchableOpacity
              onPress={() => onGenreSelect(genre.id)}
              style={[
                style.genre,
                selectedGenres.includes(genre.id) && style.activeGenre,
              ]}
              key={genre.id}>
              <Text>{genre.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      <FlatList
        data={movies}
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
    </>
  );
};
const style = StyleSheet.create({
  container: {
    padding: 15,
  },
  fetching: {
    margin: 20,
  },
  search: {
    backgroundColor: 'white',
    borderRadius: 5,
    height: 40,
    paddingLeft: 10,
    width: '85%',
    alignSelf: 'center',
    marginTop: 10,
  },
  genre: {
    backgroundColor: 'white',
    padding: 7,
    height: 40,
    borderRadius: 5,
    margin: 10,
    justifyContent: 'center',
  },
  activeGenre: {
    backgroundColor: 'gray',
  },
});
export default Home;
