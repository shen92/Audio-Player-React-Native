import {StyleSheet} from "react-native";

export const titleBar = StyleSheet.create({
  titleBar: {
    flex: 2,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    top: '15%',
    fontSize: 25
  },

  artist: {
    top: '15%',
    fontSize: 15
  }
});