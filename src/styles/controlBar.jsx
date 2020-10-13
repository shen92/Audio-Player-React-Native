import {StyleSheet} from "react-native";

export const controlBar = StyleSheet.create({
  controlBar: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },

  loop: {
    flex: 1,
    top: '7%',
  },

  step: {
    flex: 1,
    top: '6%',
  },

  play: {
    flex: 1,
    top: '3%',
  },

  add: {
    flex: 1,
    top: '7%',
  }
});