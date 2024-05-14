import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeNavigation from './home-navigation';
const Tab = createBottomTabNavigator();

const RootNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeTab" component={HomeNavigation} />
      {/* <Tab.Screen name="Favorites" component={Home} /> */}
    </Tab.Navigator>
  );
};
export default RootNavigation;
