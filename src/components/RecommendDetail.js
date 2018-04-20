import React, { Component } from 'react';
import { Text, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { Card, CardSection, Button } from './common';

class RecommendDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: props.video.snippet.thumbnails.medium.url,
      title: props.video.snippet.title,
      videoId: props.video.id.videoId
    };
    this.saveVideo = this.saveVideo.bind(this);
  }

  saveVideo() {
    const { currentUser } = firebase.auth();
    firebase.database().ref(`/users/${currentUser.uid}/userinfo/knapsack`)
      .push({
          title: this.state.title,
          imageUrl: this.state.imageUrl,
          videoId: this.state.videoId
        })
      .then(console.log(`save to user id ${currentUser.uid} with key value ${this.state.videoId}`));
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
            onPress={() => this.saveVideo()}
            style={{ backgroundColor: '#57d1c9' }}
            accessible
          >
            <Text style={styles.buttonText}> SAVE </Text>
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

export default RecommendDetail;
