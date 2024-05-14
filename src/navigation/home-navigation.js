import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/home';
import MovieDetails from '../screens/movie-details';

const Stack = createStackNavigator();

function HomeNavigation() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={Home}
      />
      <Stack.Screen name="MovieDetails" component={MovieDetails} />
    </Stack.Navigator>
  );
}
export default HomeNavigation;
