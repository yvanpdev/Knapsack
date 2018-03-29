import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { ScrollView, Text, } from 'react-native';
import { Spinner, Input, Button, Card, CardSection } from './common';

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
      <Button
        accessibilityLabel={'Click to Sign Up!'}
        onPress={this.onButtonPress.bind(this)}
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
        <Card>
          <CardSection style={{ justifyContent: 'center' }}>
            <Text style={styles.headerText}> Sign Up </Text>
          </CardSection>

          <CardSection>
            <Input
              label="First Name"
              placeholder="First Name"
              style={styles.inputStyle}
              onSubmitEditing={() => this.firstRef.focus()}
              returnKeyType='next'
              autoFocus
              onChangeText={(firstName) => this.setState({ firstName })}
              value={this.state.fname}
            />
          </CardSection>

          <CardSection>
            <Input
              label="Last Name"
              style={styles.inputStyle}
              placeholder="Last Name"
              onChangeText={(lastName) => this.setState({ lastName })}
              value={this.state.lname}
            />
          </CardSection>

          <CardSection>
            <Input
              label="Email"
              style={styles.inputStyle}
              placeholder="Email"
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
            />
          </CardSection>

          <CardSection>
            <Input
              label="Username"
              style={styles.inputStyle}
              placeholder="Username"
              onChangeText={(userName) => this.setState({ userName })}
              value={this.state.userName}
            />
          </CardSection>

          <CardSection>
            <Input
              label="Password"
              style={styles.inputStyle}
              secureTextEntry
              placeholder="Password"
              onChangeText={this.checkPassword.bind(this)}
              value={this.state.password}
            />
            <Text style={styles.passText}> {this.state.passwordLength} </Text>
          </CardSection>

          <CardSection>
            {this.renderButton()}
          </CardSection>
        </Card>
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
