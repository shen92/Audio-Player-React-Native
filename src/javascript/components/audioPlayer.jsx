import React, {Component} from 'react';
import {View} from 'react-native';
import {Audio} from 'expo-av';

import TitleBar from "./titleBar";
import LyricsPlayer from "./lyricsPlayer";
import SliderBar from "./sliderBar";
import ControlBar from "./controlBar";

import {asLRCArray, findLyricsTimeIndexOf, findTrackIndexOf, asSeconds} from "../util/util";
import {defaultPlaylist} from '../../../assets/playlist/playlist';

import {audioPlayer} from '../../styles/audioPlayer';

class AudioPlayer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      playlist: defaultPlaylist,
      currentTrack: {
        title: 'Unknown Track',
        artist: 'Unknown Artist',
        src: '',
        lrc: '',
      },
      duration: 0,
      currentPosition: 0,
      offset: 0,
      isLooping: false,
      isPlaying: false,
    };
    this.setNextTrack = this.setNextTrack.bind(this);
    this.setNextPosition = this.setNextPosition.bind(this);
    this.setOffset = this.setOffset.bind(this);
    this.setLooping = this.setLooping.bind(this);
    this.setPlaying = this.setPlaying.bind(this);
  }

  async componentDidMount() {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        shouldDuckAndroid: true,
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: true
      });
      this.player = new Audio.Sound();
    } catch (e) {
      console.log(e)
    }
  }

  async setNextTrack(nextTrack) {
    this.setState(prevState => ({
      currentTrack: {
        ...prevState.currentTrack,
        title: nextTrack.title,
        artist: nextTrack.artist,
        src: nextTrack.src,
        lrc: nextTrack.lrc,
        art: nextTrack.art,
      }
    }));
    try {
      await this.player.unloadAsync();
      const trackInfo = await this.player.loadAsync(this.state.currentTrack.src, {
        shouldPlay: false,
        progressUpdateIntervalMillis: 1000,
        isLooping: this.state.isLooping
      }, false);
      this.setState({duration: trackInfo.durationMillis});
      await this.player.setOnPlaybackStatusUpdate(status => {
            if (status.didJustFinish) {
              if (this.state.isLooping)
                return;
              const index = findTrackIndexOf(this.state.currentTrack, this.state.playlist) + 1;
              if (index < this.state.playlist.length) {
                this.setNextTrack(this.state.playlist[index])
              } else {
                this.setNextTrack(this.state.playlist[0])
              }
            }
            const currentPosition = status.positionMillis;
            this.setState({currentPosition});
            this.setOffset(currentPosition);
          }
      );
      this.setState({offset: 0});
      this.setPlaying(true)
    } catch (e) {
      console.log(e)
    }
  }

  setOffset(currentPosition) {
    const lrc = asLRCArray(this.state.currentTrack.lrc);
    const offsetFactor = findLyricsTimeIndexOf(asSeconds(currentPosition), lrc);
    if (offsetFactor > 0) {
      const offset = 50 * (offsetFactor + 1);
      this.setState({offset});
    }
  }

  async setNextPosition(nextPosition) {
    if (this.state.currentPosition === nextPosition)
      return;
    this.setState({currentPosition: nextPosition});
    try {
      await this.player.playFromPositionAsync(nextPosition);
    } catch (e) {
      console.log(e);
    }

  }

  async setLooping(isLooping) {
    try {
      await this.player.setIsLoopingAsync(isLooping);
      this.setState({isLooping});
    } catch (e) {
      console.log(e);
    }
  }

  async setPlaying(isPlaying) {
    try {
      if (isPlaying) {
        await this.player.playAsync();
      } else {
        await this.player.pauseAsync();
      }
      this.setState({isPlaying});
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const index = findTrackIndexOf(this.state.currentTrack, this.state.playlist);
    return (
        <View style={audioPlayer.layout}>
          <TitleBar
              currentTrack={this.state.currentTrack}
          />
          <LyricsPlayer
              currentTrack={this.state.currentTrack}
              duration={this.state.duration}
              offset={this.state.offset}
              currentPosition={this.state.currentPosition}
              setNextPostion={this.setNextPosition}
          />
          <SliderBar
              duration={this.state.duration}
              currentPosition={this.state.currentPosition}
              setNextPostion={this.setNextPosition}
          />
          <ControlBar
              playlist={this.state.playlist}
              index={index}
              currentTrack={this.state.currentTrack}
              setNextTrack={this.setNextTrack}
              isLooping={this.state.isLooping}
              setLooping={this.setLooping}
              isPlaying={this.state.isPlaying}
              setPlaying={this.setPlaying}
          />
        </View>
    );
  }

}

export default AudioPlayer;