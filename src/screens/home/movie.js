import {memo} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Image from 'react-native-fast-image';
import {IMAGE_URL} from '../../consts';

const Movie = memo(({movie, onPress}) => (
  <TouchableOpacity onPress={() => onPress(movie)} style={style.container}>
    <Image
      source={{uri: `${IMAGE_URL}${movie.poster_path}`}}
      style={style.poster}
    />
    <Text style={style.title} numberOfLines={1}>
      {movie.title}
    </Text>
    <Text style={style.releaseDate}>{movie.release_date}</Text>
  </TouchableOpacity>
));
const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '45%',
    margin: 5,
  },
  poster: {
    width: '100%',
    height: 250,
    marginBottom: 10,
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
  },
  releaseDate: {
    color: 'gray',
    marginTop: 5,
  },
});
export default Movie;
