import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import axios from 'axios';
import RecommendDetail from './RecommendDetail';

class RecommendList extends Component {
  state = { videos: [] };

  componentWillMount() {
    axios.get('https://rallycoding.herokuapp.com/api/music_albums')
      .then(response => this.setState({ videos: response.data }));
  }

  renderAlbums() {
    return this.state.videos.map(video => <RecommendDetail key={video.title} video={video} />);
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
