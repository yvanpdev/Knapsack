import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import firebase from 'firebase';
import KnapsackDetail from './KnapsackDetail';


class KnapsackList extends Component {
  constructor(props) {
  super(props);
  this.state = {
    key: [],
    video: []
   };

  this.fetchVideos();
  }

    fetchVideos() {
    const { currentUser } = firebase.auth();

    firebase.database().ref(`/users/${currentUser.uid}/userinfo/knapsack`)
      .on('value', snapshot => {
          this.setState({
            key: Object.keys(snapshot.val())
          });
      });

    const videoProm = this.state.key.map(id =>
      firebase.database().ref(`/users/${currentUser.uid}/userinfo/knapsack`)
      .child(id)
      .on('value', snapshot => {
        const payload = snapshot.val();
          this.setState({
              video: payload
          });
      })
    );
    console.log(this.state.video);
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
        <Text> HELL </Text>
      </ScrollView>
    );
  }
}

export default KnapsackList;
