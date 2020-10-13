import React from 'react';
import {View, Text, SafeAreaView, ScrollView, ImageBackground} from "react-native";

import {asMilliseconds, asSeconds} from "../util/util";

import {lyricsPlayer} from "../../styles/lyricsPlayer";

export default function LyricsPlayer(props) {

  function onLyricsPress(time) {
    props.setNextPostion(asMilliseconds(time));
  }

  function renderLyrics() {
    let lyrics = [];
    let index = 0;
    for (const line of Object.entries(props.currentTrack.lrc)) {
      const lineStyle = asSeconds(props.currentPosition) >= line[0] ?
          lyricsPlayer.lyricsPlayingLine : lyricsPlayer.lyricsLine;
      lyrics.push(
          <View style={lyricsPlayer.lyricsContainer} key={index}>
            <Text style={lineStyle} onPress={() => onLyricsPress(line[0])}>{line[1]}</Text>
          </View>
      );
      index++;
    }
    return lyrics;
  }

  return (
      <SafeAreaView style={lyricsPlayer.lyricsPlayerContainer}>
        <ImageBackground imageStyle={{opacity: 0.2}} blurRadius={5} style={lyricsPlayer.art}
                         source={props.currentTrack.art}>
          <ScrollView showsVerticalScrollIndicator={false} contentOffset={{y: props.offset}}>
            <View style={lyricsPlayer.lyricsContainerPadding}/>
            {renderLyrics()}
            <View style={lyricsPlayer.lyricsContainerPadding}/>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
  );

}
