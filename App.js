import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider as ReduxProvider} from 'react-redux';

import store from './src/redux/store';

import AppNavigation from './src/navigation/AppNavigation';

const App = () => {
  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <AppNavigation />
      </PaperProvider>
    </ReduxProvider>
  );
};

export default App;
