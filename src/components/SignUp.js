import React, { Component } from 'react';
import { AppRegistry, View, ScrollView, Text, Image, TextInput, TouchableOpacity, Button } from 'react-native';

class SignUp extends Component {
  state = {
     fname: '',
     lname: '',
     userName: '',
     password: '',
     email: '',
     favGenres: [],
     passwordLength: '',
     passwordShort: true
  }
checkPassword(text){
  this.setState( {password: text });

  if(text.length < 6){
    this.setState( {
      passwordLength: 'password must be at least 6 characters',
      passwordShort: true

  });
}
  else if( text.length < 25 && text.length > 5){
  this.setState( {
    passwordLength: this.state.passwordShort,
    passwordShort: false

});
return this.state.passwordShort;
}
}
  render(){
    return(
    <ScrollView>
      <Text style ={styles.headerText}> Sign Up </Text>
      <TextInput placeholder="First Name" style = {styles.inputStyle} onSubmitEditing={() => this.firstRef.focus()} returnKeyType='next' autoFocus = {true} onChangeText={ (text) => this.setState( {fname: text} ) } value = {this.state.fname}/>
      <TextInput placeholder="Last Name" style = {styles.inputStyle} ref={firstRef => this.firstRef = firstRef} onSubmitEditing={() => this.lastRef.focus()}  returnKeyType='next' onChangeText={ (text) => this.setState( {lname: text} ) }value = {this.state.lname}/>
      <TextInput placeholder="Email" style = {styles.inputStyle} ref={lastRef => this.lastRef = lastRef} onSubmitEditing={() => this.emailRef.focus()} returnKeyType='next'  onChangeText={ (text) => this.setState( {email: text} ) }value = {this.state.email}/>
      <TextInput placeholder="Username" style = {styles.inputStyle} ref={emailRef => this.emailRef = emailRef} onSubmitEditing={() => this.passwordRef.focus()}  returnKeyType='next' onChangeText={ (text) => this.setState( {userName: text} ) }value = {this.state.userName}/>
      <TextInput
        underlineColorAndroid = {'rgba(0,0,0,0.35)'}
        autoCorrect = {false}
        style = {[styles.inputStyle, this.state.passwordShort && styles.shortStyle]}
        secureTextEntry = {true}
        ref={passwordRef => this.passwordRef = passwordRef}
        onSubmitEditing={() => this.passwordRef.focus()}
        returnKeyType='next'
        placeholder="Password"
        onChangeText={ (text) => this.checkPassword(text) }value = {this.state.password}
      />
      <Text style= {styles.passText}> {this.state.passwordLength} </Text>
      <TouchableOpacity accessibilityLabel={'Click to Sign Up!'} onPress={() => this.props.navigation.goBack()} style={styles.buttonStyle} accessible={true}>
        <Text style = {styles.buttonText}> SUBMIT </Text>
       </TouchableOpacity>
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
    color: "#57d1c9",
    textAlign: "center"
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
    color: "black",
    fontWeight: "bold"
  },
  passText: {
    textAlign: 'center'
  }
}

export default SignUp;
