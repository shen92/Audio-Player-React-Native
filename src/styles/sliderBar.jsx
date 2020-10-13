import {StyleSheet} from "react-native";

export const sliderBar = StyleSheet.create({
  sliderBar: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  slider: {
    width: '90%',
  },

  sliderTrack: {
    width: '100%',
    height: '10%',
    color: 'black',
  },

  sliderThumb: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
  },
});