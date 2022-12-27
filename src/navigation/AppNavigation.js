import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { AuthNavigator, ArticlesNavigator } from './MainNavigation';

const AppNavigation = () => {
  const isAuth = useSelector(state => !!state.auth.accessToken);

  return (
    <NavigationContainer>
      {isAuth && <ArticlesNavigator />}
      {!isAuth && <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigation;
