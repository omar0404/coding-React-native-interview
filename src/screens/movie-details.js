import {StyleSheet, View} from 'react-native';
import Image from 'react-native-fast-image';
import {IMAGE_URL} from '../consts';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  useFavoriteMovieMutation,
  useGetAccountStatesQuery,
} from '../services/api/movies';
const MovieDetails = ({route}) => {
  const movie = route.params;
  const {data} = useGetAccountStatesQuery(movie.id);
  const [favoriteMovie] = useFavoriteMovieMutation();
  const handleFavoriteMovie = () => {
    if (!data?.favorite) {
      favoriteMovie({
        media_type: 'movie',
        media_id: movie.id,
        favorite: true,
      });
    } else {
      favoriteMovie({
        media_type: 'movie',
        media_id: movie.id,
        favorite: false,
      });
    }
  };
  return (
    <View style={style.container}>
      <Image
        source={{
          uri: `${IMAGE_URL}/${movie.poster_path || movie.backdrop_path}`,
        }}
        resizeMode="cover"
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={['white', 'transparent']}
        start={{
          x: 0,
          y: 1,
        }}
        end={{
          x: 0,
          y: 0,
        }}
        style={{
          height: '40%',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 2,
        }}
      />
      <MaterialIcons
        onPress={handleFavoriteMovie}
        name={data?.favorite ? 'favorite' : 'favorite-outline'}
      />
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    aspectRatio: 500 / 750,
    width: '100%',
    position: 'relative',
  },
});
export default MovieDetails;
