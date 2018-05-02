import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import firebase from 'firebase';
import KnapsackDetail from './KnapsackDetail';


class KnapsackList extends Component {
  constructor(props) {
  super(props);
  this.state = {
    videos: {
      key: [],
      video: []
    } };

  this.fetchVideos();
  }

    fetchVideos() {
    const { currentUser } = firebase.auth();

    firebase.database().ref(`/users/${currentUser.uid}/userinfo/knapsack`)
      .on('value', snapshot => {
        const payload = snapshot.val();
          this.setState({
            videos: {
              key: Object.keys(snapshot.val()),
              video: payload
            }
          });
      });
  }

  renderAlbums() {
     return this.state.videos.map(
       video => <KnapsackDetail key={video.key} video={video} />
    );
  }

  render() {
    console.log(this.state.videos);
    return (
      <ScrollView>
        {this.renderAlbums}
      </ScrollView>
    );
  }
}

export default KnapsackList;
