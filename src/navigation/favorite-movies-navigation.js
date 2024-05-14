import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FavoriteMovies from '../screens/favorite-movies';
import MovieDetails from '../screens/MovieDetails';

const Stack = createStackNavigator();

function FavoriteMoviesNavigation() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="FavoriteMovies" component={FavoriteMovies} />
      <Stack.Screen name="MovieDetails" component={MovieDetails} />
    </Stack.Navigator>
  );
}
export default FavoriteMoviesNavigation;
