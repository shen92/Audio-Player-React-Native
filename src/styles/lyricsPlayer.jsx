import {StyleSheet} from "react-native";

export const lyricsPlayer = StyleSheet.create({
  lyricsPlayerContainer: {
    flex: 8,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'silver'
  },

  lyricsContainer: {
    flex: 1,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
  },

  lyricsContainerPadding: {
    flex: 1,
    height: 300,
  },

  lyricsLine: {
    fontSize: 18,
    color: 'grey',
    textAlign: 'center',
  },

  lyricsPlayingLine: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },

  art: {
    width: '100%',
    height: '100%',
    resizeMode: "cover",
  }
});