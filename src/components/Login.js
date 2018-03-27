import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { Button, Input, CardSection, Spinner } from './common';
import Logo from '../img/knapsack_logo.png';


class Login extends Component {
  constructor(props) {
  super(props);
  this.state = {
     email: '',
     password: '',
     error: '',
     loading: false
  };
  this.onPasswordChange = this.onPasswordChange.bind(this);
  this.onEmailChange = this.onEmailChange.bind(this);
}

  onLogginSuccess() {
    this.setState({ email: '', password: '', loading: false, error: '' });
    Actions.main();
  }

  onLogginFail() {
    this.setState({ error: 'Authentication Failed.', loading: false });
  }

  onButtonPress() {
    const { email, password } = this.state;

   this.setState({ error: '', loading: true });

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(this.onLogginSuccess.bind(this))
    .catch(this.onLogginFail.bind(this));
  }

  onPasswordChange(password) {
    this.setState({ password });
  }

  onEmailChange(email) {
    this.setState({ email });
  }

  renderLoginButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return (
      <Button
        accessibilityLabel={'Click to log in!'}
        onPress={this.onButtonPress.bind(this)}
        style={{ backgroundColor: '#57d1c9' }}
        accessible
      >
        <Text style={styles.buttonText}> LOGIN </Text>
      </Button>
    );
  }

  renderSignupButton() {
    return (
      <Button
        accessibilityLabel={'Click to sign up!'}
        onPress={() => Actions.signUp()}
        style={{ backgroundColor: '#57d1c9' }}
        accessible
      >
          <Text style={styles.buttonText}>SIGN UP</Text>
      </Button>
    );
  }

  render() {
    return (
      <View>
        <View style={styles.containerStyle}>

          <Image style={styles.imageStyle} source={Logo} />
          <Text style={styles.headerText}>Knapsack</Text>
          <Text style={styles.sloganText}>Store all your favorite content in one place.</Text>
        </View>
        <CardSection>
          <Input
            style={styles.inputStyle}
            label="Email"
            placeholder="email@gmail.com"
            onChangeText={this.onEmailChange}
            value={this.state.userName}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            style={styles.inputStyle}
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange}
            value={this.state.password}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

        <CardSection>
          {this.renderLoginButton()}
        </CardSection>

        <CardSection>
          {this.renderSignupButton()}
        </CardSection>

      </View>

    );
  }
}

const styles = {
  containerStyle: {
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  headerText: {
    fontSize: 68,
    color: '#57d1c9'
  },
  sloganText: {
    fontStyle: 'italic'
  },
  imageStyle: {
    marginTop: 20,
    height: 200,
    width: 200,
    borderColor: '#ddd',
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export default Login;
