import React, {Component} from 'react';
import {View, Text} from 'react-native';

import AudioPlayer from "./src/javascript/components/audioPlayer";

class App extends Component {
  render() {
    return (
        <View style={{flex: 1}}>
          <AudioPlayer />
        </View>
    );
  }
}

export default App;