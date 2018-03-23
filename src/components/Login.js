import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button, Input, CardSection } from './common';
import Logo from '../img/knapsack_logo.png';


class Login extends Component {
  state = {
     userName: '',
     password: ''
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
            onChangeText={(text) => this.setState({ userName: text })}
            value={this.state.userName}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            style={styles.inputStyle}
            label="Password"
            placeholder="password"
            onChangeText={(text) => this.setState({ password: text })}
            value={this.state.password}
          />
        </CardSection>

        <CardSection>
          <Button
            accessibilityLabel={'Click to log in!'}
            onPress={() => Actions.main()}
            style={{ backgroundColor: '#57d1c9' }}
            accessible
          >
            <Text style={styles.buttonText}> LOGIN </Text>
           </Button>
        </CardSection>

        <CardSection>
          <Button
            accessibilityLabel={'Click to sign up!'}
            onPress={() => Actions.signUp()}
            style={{ backgroundColor: '#57d1c9' }}
            accessible
          >
              <Text style={styles.buttonText}>SIGN UP</Text>
          </Button>
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
  }
};

export default Login;
