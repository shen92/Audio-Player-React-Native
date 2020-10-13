import React from 'react';
import {View, Text} from 'react-native';

import {titleBar} from "../../styles/titleBar";

export default function TitleBar(props) {

  return (
      <View style={titleBar.titleBar}>
        <Text style={titleBar.title}>{props.currentTrack.title}</Text>
        <Text style={titleBar.artist}>{props.currentTrack.artist}</Text>
      </View>
  );

}

