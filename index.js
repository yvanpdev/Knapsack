import React from 'react';
import { AppRegistry, View } from 'react-native';
import Header from './src/components/Header';
import Login from './src/components/Login';

const App = () => (
    <View>
      <Header headerText={''} />
      <Login />
    </View>

);


AppRegistry.registerComponent('Knapsack', () => App);
