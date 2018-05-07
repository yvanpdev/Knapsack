import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import firebase from 'firebase';
import KnapsackDetail from './KnapsackDetail';


class KnapsackList extends Component {
  constructor(props) {
  super(props);
  this.state = {
    videos: []
   };

  this.fetchVideos();
  }

  snapshotToArray(snapshot) {
    const returnArr = [];

    snapshot.forEach((childSnapshot) => {
        const item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
  }

  fetchVideos() {
    const { currentUser } = firebase.auth();

    firebase.database().ref(`/users/${currentUser.uid}/userinfo/knapsack`)
      .on('value', snapshot => {
        const payload = this.snapshotToArray(snapshot);
        this.setState({
          videos: payload
        });
      });
  }

  renderAlbums() {
     return this.state.videos.map(
       (video) => <KnapsackDetail key={video.key} video={video} />);
  }


  render() {
    return (
      <ScrollView>
        {this.renderAlbums()}
      </ScrollView>
    );
  }
}

export default KnapsackList;
