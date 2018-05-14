import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import YTSearch from 'youtube-api-search';
import firebase from 'firebase';
import RecommendDetail from './RecommendDetail';
import API_KEY from '../../config/YoutubeAPI';


class RecommendList extends Component {
  constructor(props) {
  super(props);
  this.state = {
    videos: [],
    searchTerms: []
  };

    this.fetchCategories();
  }


  videoSearch() {
    console.log(this.state.searchTerms);
    this.state.searchTerms.forEach(term => {
    YTSearch({ key: API_KEY, term }, (video) => {
      this.setState({
        videos: [...this.state.videos, ...video]
     });
    });
  });
  }

  snapshotToArray(snapshot) {
    const returnArr = [];

    snapshot.forEach((childSnapshot) => {
        const item = childSnapshot.val();
        returnArr.push(item);
    });

    return returnArr;
  }

  fetchCategories() {
    const { currentUser } = firebase.auth();

    firebase.database().ref(`/users/${currentUser.uid}/userinfo/categories`)
      .on('value', snapshot => {
        const payload = this.snapshotToArray(snapshot);
        this.setState({
          searchTerms: payload
        });
        this.videoSearch();
      });
  }

  renderAlbums() {
    return this.state.videos.map(
      video => <RecommendDetail key={video.snippet.title} video={video} />
    );
  }

  render() {
    return (
      <ScrollView>
        {this.renderAlbums()}
      </ScrollView>
    );
  }
}

export default RecommendList;
