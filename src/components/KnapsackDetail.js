import React, { Component } from 'react';
import { Text, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { Card, CardSection, Button } from './common';

class KnapsackDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: props.video.key,
      imageUrl: props.video.imageUrl,
      title: props.video.title,
      videoId: props.video.videoId
    };
    this.deleteVideo = this.deleteVideo.bind(this);
  }

  deleteVideo() {
    const { currentUser } = firebase.auth();
    firebase.database().ref(`/users/${currentUser.uid}/userinfo/knapsack/${this.state.key}`)
      .remove()
      .then(console.log(`deleted video id: ${this.state.key}`));
  }

  render() {
    const {
      headerTextStyle,
      imageStyle,
    } = styles;

    return (
      <Card>
        <CardSection>
            <Text style={headerTextStyle}>{this.state.title}</Text>
        </CardSection>

        <CardSection>
          <Image
            style={imageStyle}
            source={{ uri: this.state.imageUrl }}
          />
        </CardSection>

        <CardSection>

          <Button
            accessibilityLabel={'Click to log in!'}
            onPress={() => Actions.videoViewer({ videoId: this.state.videoId })}
            style={{ backgroundColor: 'red' }}
            accessible
          >
            <Text style={styles.buttonText}> PLAY </Text>
          </Button>

          <Button
            accessibilityLabel={'Click to Save!'}
            onPress={() => this.deleteVideo()}
            style={{ backgroundColor: '#57d1c9' }}
            accessible
          >
            <Text style={styles.buttonText}> REMOVE </Text>
          </Button>

        </CardSection>
      </Card>
    );
  }
}

const styles = {
  headerTextStyle: {
    fontSize: 18,
    marginLeft: 5,
    marginRight: 5
  },
  imageStyle: {
    height: 300,
    flex: 1,
    width: null,
  }
};

export default KnapsackDetail;
