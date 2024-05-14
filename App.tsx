import React from 'react';
import {SafeAreaView} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from './src/reducers/store';
import Navigation from './src/navigation';
import Toast from 'react-native-toast-message';
function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={{flex: 1}}>
        <Provider store={store}>
          <Navigation />
        </Provider>
        <Toast />
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default App;
