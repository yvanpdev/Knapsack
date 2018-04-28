import React, { Component } from 'react';
import { View } from 'react-native';
import YouTube from 'react-native-youtube';
import API_KEY from '../../config/YoutubeAPI';

class VideoViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      status: '',
      quality: '',
      videoId: this.props.videoId
    };
  }
  render() {
    return (
      <View>

        <YouTube
          ref={(component) => { this.youTubePlayer = component; }}
          apiKey={API_KEY}
          videoId={this.state.videoId}
          play
          fullscreen
          loop
          onReady={() => this.setState({ isReady: true })}
          onChangeState={e => this.setState({ status: e.state })}
          onChangeQuality={e => this.setState({ quality: e.quality })}
          onError={e => this.setState({ error: e.error })}

          style={{ alignSelf: 'stretch', height: 300 }}
        />
      </View>
    );
  }
}

export default VideoViewer;
