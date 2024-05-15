import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from './src/reducers/store';
import Navigation from './src/navigation';
import Toast from 'react-native-toast-message';
import {moviesApi} from './src/services/api/movies';
function App() {
  useEffect(() => {
    // TODO show splash screen until this is done
    store.dispatch(
      moviesApi.util.prefetch('getConfiguration', undefined, {
        force: true,
      }),
    );
  }, []);
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
