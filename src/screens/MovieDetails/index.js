import {
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Image from 'react-native-fast-image';
import {IMAGE_URL} from '../../consts';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Entypo from 'react-native-vector-icons/Entypo';
import {
  useFavoriteMovieMutation,
  useGetAccountStatesQuery,
  useGetMovieTrailerQuery,
  useGetMovieCountryQuery,
} from '../../services/api/movies';
import {useGetVideoQuery} from '../../services/api/youtube';
import {useEffect} from 'react';
import DetailItem from './detail-item';
import {useGetWeatherQuery} from '../../services/api/weather';
const MovieDetails = ({route}) => {
  const movie = route.params;
  const {data: country} = useGetMovieCountryQuery(movie.id);
  const {data: weather} = useGetWeatherQuery(country);

  const {data: trailerData} = useGetMovieTrailerQuery(movie.id);
  const {data: trailer} = useGetVideoQuery(trailerData?.key, {
    skip: !trailerData?.key,
  });
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
  const onLocationPress = () => {
    Linking.openURL(
      'https://www.google.com/maps/search/?api=1&query=Movie Theaters',
    );
  };
  const onTrailerPress = () => {
    Linking.openURL(`https://www.youtube.com/watch?v=${trailerData?.key}`);
  };
  return (
    <ScrollView style={style.container}>
      <View>
        <Image
          source={{
            uri: `${IMAGE_URL}/${movie.poster_path || movie.backdrop_path}`,
          }}
          resizeMode="cover"
          style={style.cover}
        />
        <View style={{padding: 10}}>
          <View>
            <View
              style={[
                style.row,
                {justifyContent: 'space-between', alignItems: 'center'},
              ]}>
              <Text style={style.title}>{movie.title}</Text>
              <MaterialIcons
                size={40}
                onPress={handleFavoriteMovie}
                name={data?.favorite ? 'favorite' : 'favorite-outline'}
              />
            </View>
            <Text style={style.overview}>{movie.overview}</Text>
          </View>

          <View style={style.row}>
            <DetailItem
              label={weather?.list?.[0]?.weather?.[0].description ?? 'unknown'}
              Icon={props => (
                <MaterialCommunityIcons name={'weather-cloudy'} {...props} />
              )}
            />
            <TouchableOpacity style={style.location} onPress={onLocationPress}>
              <DetailItem
                label={'Movie Theaters'}
                labelStyle={style.hyperlink}
                Icon={props => <Entypo name={'location-pin'} {...props} />}
              />
            </TouchableOpacity>
          </View>
          <View style={style.row}>
            <TouchableOpacity style={{width: '50%'}} onPress={onTrailerPress}>
              <DetailItem
                label={'Trailer'}
                labelStyle={style.hyperlink}
                Icon={props => (
                  <MaterialIcons name={'local-movies'} {...props} />
                )}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const style = StyleSheet.create({
  hyperlink: {
    textDecorationLine: 'underline',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  cover: {
    width: '100%',
    height: 200,
  },
  overview: {
    color: 'gray',
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  col: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  location: {flex: 1},
});
export default MovieDetails;
