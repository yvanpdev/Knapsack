import React, { Component } from 'react';
import firebase from 'firebase';
import Router from './Router';
import FirebaseConfig from '../config/FirebaseConfig';

class App extends Component {

  componentWillMount() {
      firebase.initializeApp(FirebaseConfig);
  }

  render() {
    return (
      <Router />
    );
  }
}


export default App;
