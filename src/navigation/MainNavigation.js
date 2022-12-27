import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import ArticlesScreen from '../screens/ArticlesScreen';

const AuthStack = createStackNavigator();
const ArticlesStack = createStackNavigator();

export const ArticlesNavigator = () => {
  return (
    <ArticlesStack.Navigator>
      <ArticlesStack.Screen name="Articles" component={ArticlesScreen} />
    </ArticlesStack.Navigator>
  );
};

export const AuthNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={LoginScreen} />
    </AuthStack.Navigator>
  );
};
