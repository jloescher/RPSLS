import { Center, Box } from '@chakra-ui/react';
import React from 'react';
import YouTube from 'react-youtube';

class YouTubeVideo extends React.Component {
  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };

    return (
      <Center>
        <Box mt={10}>
          <YouTube videoId="_PUEoDYpUyQ" opts={opts} onReady={this._onReady} />
        </Box>
      </Center>
    )
  }

  _onReady(event: any) {
    // access to player in all event handlers via event.target
    event.target.play();
  }
}

export default YouTubeVideo