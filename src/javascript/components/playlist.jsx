import React, {Component} from 'react';
import {View, Text, Modal} from 'react-native';
import {Button, ListItem} from "react-native-elements";

import {playlist} from "../../styles/playlist";

export default function Playlist(props) {

  function onListItemPress(track) {
    props.onPlaylistStatusChange(false);
    props.setNextTrack(track);
  }

  function onBackButtonPress() {
    props.onPlaylistStatusChange(false);
  }

  function renderListItems() {
    if (props.playlist === null) {
      return;
    }
    return props.playlist.map((track, index) => {
      if (track === null) {
        return;
      }
      const isPlaying = track.title === props.currentTrack.title;
      const titleStyle = isPlaying ? playlist.titleFocus : playlist.title;
      const artistStyle = isPlaying ? playlist.artistFocus : playlist.artist;
      return (
          <ListItem key={index} style={playlist.listItem} onPress={() => onListItemPress(track)}>
            <ListItem.Content>
              <Text style={titleStyle}>{track.title}</Text>
              <Text style={artistStyle}>{track.artist}</Text>
            </ListItem.Content>
          </ListItem>
      )
    })
  }

  return (
      <Modal style={playlist.playlist} visible={props.showPlaylist}>
        <View style={playlist.list}>
          <Text style={playlist.listName}>Playlist</Text>
          {renderListItems()}
          <Button type="clear" style={playlist.backButton} onPress={() => onBackButtonPress()} title="Close"/>
        </View>
      </Modal>
  );

}
