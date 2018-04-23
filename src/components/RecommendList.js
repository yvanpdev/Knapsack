import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import YTSearch from 'youtube-api-search';
import RecommendDetail from './RecommendDetail';
import API_KEY from '../../config/YoutubeAPI';


class RecommendList extends Component {
  constructor(props) {
  super(props);
  this.state = { videos: [] };

  this.videoSearch('fortnite');
  }

  videoSearch(term) {
    YTSearch({ key: API_KEY, term }, (videos) => {
      this.setState({
        videos
     });
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
