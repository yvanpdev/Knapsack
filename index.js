import React from 'react';
import { AppRegistry, View } from 'react-native';
import Header from './src/components/Header';

const App = () => (
    <View>
      <Header headerText={'Knapsack under construction!'} />
    </View>

);


AppRegistry.registerComponent('Knapsack', () => App);
