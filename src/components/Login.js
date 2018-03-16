import React, { Component } from 'react';
import { AppRegistry, View, ScrollView, Keyboard, Text, Image, TextInput, TouchableOpacity, Button } from 'react-native';

class Login extends Component {
  state = {
     userName: '',
     password: ''
  }

  render() {
    return (
      <View>
        <View style={styles.containerStyle}>

          <Image style = {styles.imageStyle} source={require('../img/knapsack_logo.png')} />
          <Text style={styles.headerText}>Knapsack</Text>
          <Text style = {styles.sloganText}>Store all your favorite content in one place.</Text>
        </View>
        <ScrollView>
        <TextInput  style={styles.inputStyle} placeholder="Username" onSubmitEditing={() => this.passwordRef.focus()} returnKeyType='next' onChangeText={ (text) => this.setState( {userName: text} ) }
        value={this.state.userName} />
        <TextInput secureTextEntry={true} style={styles.inputStyle} placeholder="Password" ref={passwordRef => this.passwordRef = passwordRef}  onChangeText={ (text) => this.setState( {password: text} ) }
        value={this.state.password} />
        </ScrollView>
        <View>
        <TouchableOpacity accessibilityLabel={'Click to log in!'} onPress={() => this.props.navigation.navigate('Recommend')} style={styles.buttonStyle} accessible={true}>
          <Text style = {styles.buttonText}> LOGIN </Text>
         </TouchableOpacity>
        {/*  <Button accessible={true} accessibilityLabel={'Click to log in!'} style={styles.buttonStyle} onPress={()=> alert("Login")} title="Login" /> */ }
        </View>

        <View>
        <TouchableOpacity accessibilityLabel={'Click to sign up!'}  onPress={() => this.props.navigation.navigate('Sign_Up')} style={styles.buttonStyle} accessible={true}>
          <Text style = {styles.buttonText} > SIGN UP  </Text>
         </TouchableOpacity>
        { /*  <Button onPress={() => alert("Sign Up")} title="Sign Up" /> */}
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
    color: "#57d1c9"
  },
  sloganText: {
    fontStyle: 'italic'
  },
  imageStyle: {
    height: 200,
    width: 200,
    borderColor: '#ddd',
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
    color: "black",
    fontWeight: "bold"
  }

}
export default Login;
