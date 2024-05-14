import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeNavigation from './home-navigation';
import FavoriteMoviesNavigation from './favorite-movies-navigation';
const Tab = createBottomTabNavigator();

const RootNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="HomeTab" component={HomeNavigation} />
      <Tab.Screen name="FavoritesTab" component={FavoriteMoviesNavigation} />
    </Tab.Navigator>
  );
};
export default RootNavigation;
