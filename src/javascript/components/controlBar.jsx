import React, {Component} from 'react';
import {View} from 'react-native';
import {Button, Icon} from 'react-native-elements';

import Playlist from "./playlist";

import {controlBar} from "../../styles/controlBar";

class ControlBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showPlaylist: false,
    };
    this.onLoopButtonPress = this.onLoopButtonPress.bind(this);
    this.onPrevButtonPress = this.onPrevButtonPress.bind(this);
    this.onPlayButtonPress = this.onPlayButtonPress.bind(this);
    this.onNextButtonPress = this.onNextButtonPress.bind(this);
    this.onAddButtonPress = this.onAddButtonPress.bind(this);
    this.onPlaylistStatusChange = this.onPlaylistStatusChange.bind(this);
  }

  onLoopButtonPress() {
    this.props.setLooping(!this.props.isLooping);
  }

  onPrevButtonPress() {
    if (this.props.isLooping) {
      this.props.setNextTrack(this.props.playlist[this.props.index]);
      return;
    }
    const prev = --this.props.index;
    if (prev >= 0 && prev < this.props.playlist.length - 1) {
      this.props.setNextTrack(this.props.playlist[prev]);
    } else {
      this.props.setNextTrack(this.props.playlist[this.props.playlist.length - 1]);
    }
  }

  onPlayButtonPress() {
    this.props.setPlaying(!this.props.isPlaying);
  }

  onNextButtonPress() {
    if (this.props.isLooping) {
      this.props.setNextTrack(this.props.playlist[this.props.index]);
      return;
    }
    const next = ++this.props.index;
    if (next >= 0 && next < this.props.playlist.length) {
      this.props.setNextTrack(this.props.playlist[next]);
    } else {
      this.props.setNextTrack(this.props.playlist[0]);
    }
  }

  onAddButtonPress() {
    const showPlaylist = !this.state.showPlaylist;
    this.setState({showPlaylist});
  }

  onPlaylistStatusChange(showPlaylist) {
    this.setState({showPlaylist});
  }

  renderButton(style, icon, size, onPress) {
    let defaultColor = 'black';
    if (style === 'loop' && this.props.isLooping === false)
      defaultColor = 'silver';
    return (
        <View style={controlBar[style]}>
          <Button
              type={'clear'}
              icon={<Icon name={icon} type='simple-line-icon' size={size} color={defaultColor}/>}
              onPress={onPress}
          />
        </View>
    );
  }

  render() {
    let playIcon = this.props.isPlaying ? 'control-pause' : 'control-play';
    return (
        <View style={controlBar.controlBar}>
          {this.renderButton('loop', 'loop', 25, this.onLoopButtonPress)}
          {this.renderButton('step', 'control-start', 30, this.onPrevButtonPress)}
          {this.renderButton('play', playIcon, 50, this.onPlayButtonPress)}
          {this.renderButton('step', 'control-end', 30, this.onNextButtonPress)}
          {this.renderButton('add', 'plus', 25, this.onAddButtonPress)}
          <Playlist
              playlist={this.props.playlist}
              showPlaylist={this.state.showPlaylist}
              currentTrack={this.props.currentTrack}
              setNextTrack={this.props.setNextTrack}
              onPlaylistStatusChange={this.onPlaylistStatusChange}
          />
        </View>
    );
  }
}

export default ControlBar;