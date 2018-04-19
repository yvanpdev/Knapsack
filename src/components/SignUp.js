import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import { Spinner } from './common';
import * as constants from '../constants.js';

class SignUp extends Component {
  constructor(props) {
    super(props);
  this.state = {
     firstName: '',
     lastName: '',
     userName: '',
     password: '',
     email: '',
     favGenres: [],
     passwordLength: '',
     passwordShort: true,
     loading: false
  };
  this.checkPassword = this.checkPassword.bind(this);
  this.onButtonPress = this.onButtonPress.bind(this);
}
onButtonPress() {
  const { email, password, firstName, lastName, userName } = this.state;

  this.setState({ loading: true });

  firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        firebase.database().ref(`/users/${user.uid}/userinfo`)
          .push({ firstName, lastName, userName, email });
      })
      .then(() => {
        Actions.pop();
      });
}

checkPassword(text) {
  this.setState({ password: text });

  if (text.length < constants.MINIMUM_PASSWORD_LENGTH) {
    this.setState({
      passwordLength: `password must be at least ${constants.MINIMUM_PASSWORD_LENGTH} characters`,
      passwordShort: true
    });
  } else if (text.length < constants.MAXIMUM_PASSWORD_LENGTH
     && text.length > constants.MINIMUM_PASSWORD_LENGTH) {
    this.setState({
      passwordLength: this.state.passwordShort,
      passwordShort: false
  });

  return this.state.passwordShort;
  }
}

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button
        accessibilityLabel={'Click to Sign Up!'}
        onPress={this.onButtonPress}
        style={styles.buttonStyle}
        accessible
      >
        <Text style={styles.buttonText}> SUBMIT </Text>
      </Button>
    );
  }
  render() {
    return (
      <ScrollView>
        <Text style={styles.headerText}> Sign Up </Text>
        <TextInput
          placeholder="First Name"
          style={styles.inputStyle}
          onSubmitEditing={() => this.firstRef.focus()}
          returnKeyType='next'
          autoFocus
          onChangeText={(firstName) => this.setState({ firstName })}
          value={this.state.fname}
        />

        <TextInput
          placeholder="Last Name"
          style={styles.inputStyle}
          ref={firstRef => this.firstRef = firstRef}
          onSubmitEditing={() => this.lastRef.focus()}
          returnKeyType='next'
          onChangeText={(lastName) => this.setState({ lastName })}
          value={this.state.lname}
        />

        <TextInput
          placeholder="Email"
          style={styles.inputStyle}
          ref={lastRef => this.lastRef = lastRef}
          onSubmitEditing={() => this.emailRef.focus()}
          returnKeyType='next'
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email}
        />

        <TextInput
          placeholder="Username"
          style={styles.inputStyle}
          ref={emailRef => this.emailRef = emailRef}
          onSubmitEditing={() => this.passwordRef.focus()}
          returnKeyType='next'
          onChangeText={(userName) => this.setState({ userName })}
          value={this.state.userName}
        />

        <TextInput
          underlineColorAndroid={'rgba(0,0,0,0.35)'}
          autoCorrect={false}
          style={[styles.inputStyle, this.state.passwordShort && styles.shortStyle]}
          secureTextEntry
          ref={passwordRef => this.passwordRef = passwordRef}
          onSubmitEditing={() => this.passwordRef.focus()}
          returnKeyType='next'
          placeholder="Password"
          onChangeText={this.checkPassword}
          value={this.state.password}
        />

        <Text style={styles.passText}> {this.state.passwordLength} </Text>

        {this.renderButton()}

      </ScrollView>
    );
  }

}
const styles = {
  inputStyle: {
    fontSize: 18,
    margin: 20,
    padding: 5
  },
  headerText: {
    fontSize: 30,
    color: '#57d1c9',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 30
  },
  shortStyle: {
    borderColor: '#e71636',
    borderWidth: 1
  },
  buttonStyle: {
    backgroundColor: '#57d1c9',
  },
  buttonText: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold'
  },
  passText: {
    textAlign: 'center'
  }
};

export default SignUp;
