import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import { Spinner } from './common';

class SignUp extends Component {
  state = {
     firstName: '',
     lastName: '',
     userName: '',
     password: '',
     email: '',
     favGenres: [],
     passwordLength: '',
     passwordShort: true,
     loading: false
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

  if (text.length < 6) {
    this.setState({
      passwordLength: 'password must be at least 6 characters',
      passwordShort: true
    });
  } else if (text.length < 25 && text.length > 5) {
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
      <TouchableOpacity
        accessibilityLabel={'Click to Sign Up!'}
        onPress={this.onButtonPress.bind(this)}
        style={styles.buttonStyle}
        accessible
      >
        <Text style={styles.buttonText}> SUBMIT </Text>
      </TouchableOpacity>
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
          onChangeText={this.checkPassword.bind(this)}
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
    fontSize: 20,
    margin: 20,
    padding: 5,
  },
  headerText: {
    fontSize: 30,
    color: '#57d1c9',
    textAlign: 'center'
  },
  shortStyle: {
    borderColor: '#e71636',
    borderWidth: 1
  },
  buttonStyle: {
    backgroundColor: '#57d1c9',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: 260,
    height: 50,
    borderRadius: 5,
    marginLeft: 55
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
