import React from 'react';
import { AppRegistry, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Login from './src/components/Login';
import RecommendList from './src/components/RecommendList';

class App extends React.Component {
  render() {
    return <RootStack />;
  }
};

const RootStack = StackNavigator(
  {
    Home: {
      screen: Login,
    },
    Recommend: {
      screen: RecommendList
    }

  },
  {
    initialRouteName: 'Home',
  }
);

AppRegistry.registerComponent('Knapsack', () => App);
