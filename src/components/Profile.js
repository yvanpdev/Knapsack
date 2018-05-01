import React, { Component } from 'react';
import { Card, Avatar } from 'react-native-elements';
import firebase from 'firebase';
import { Text } from 'react-native';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      userName: '',
      email: ''
    };
  }

  componentWillMount() {
    const { currentUser } = firebase.auth();

    firebase.database().ref(`/users/${currentUser.uid}/userinfo`)
      .on('value', snapshot => {
        const payload = snapshot.val();
        console.log(payload.email);
      });
  }
  render() {
    return (
      <Card flexDirection="row">
      <Avatar
        large
        title="BP"
        onPress={() => console.log('Works!')}
        activeOpacity={0.7}
      />
        <Text> Name: Boy Pow</Text>
      </Card>
    );
  }
}

export default Profile;
