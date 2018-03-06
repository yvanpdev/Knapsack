import React, { Component } from 'react';
import { View, Text, Image, TextInput, Button } from 'react-native';

class Login extends Component {
  state = {
     userName: 'User Name',
     password: 'Password'
  }

  render() {
    return (
      <View>
        <View style={styles.containerStyle}>
          <Text style={styles.imageStyle}></Text>
          <Text style={styles.headerText}>Knapsack</Text>
          <Text>Store all your favorite content in one place</Text>
        </View>
        <TextInput style={styles.inputStyle} onChangeText={ (text) => this.setState( {userName: text} ) }
        value={this.state.userName} />
        <TextInput style={styles.inputStyle} onChangeText={ (text) => this.setState( {password: text} ) }
        value={this.state.password} />

        <View style={styles.buttonStyle}>
          <Button style={styles.buttonStyle} onPress={()=> alert("Login")} title="Login" />
        </View>

        <View style={styles.buttonStyle}>
          <Button onPress={() => alert("Sign Up")} title="Sign Up" />
        </View>
      </View>

    );
  }
};

const styles= {
  containerStyle: {
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  headerText: {
    fontSize: 68,
  },
  imageStyle: {
    height: 200,
    width: 200,
    borderColor: '#ddd',
    borderWidth: 5,
    borderRadius: 30,
  },
  inputStyle: {
    borderBottomWidth: 1,
    backgroundColor: '#ddd',
    borderColor: '#EDF9FE',
    padding: 5,
    margin: 5,
    fontSize: 20
  },
  buttonStyle: {
    backgroundColor: '#EDF9FE',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  }

}
export default Login;
