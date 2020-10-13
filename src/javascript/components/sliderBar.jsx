import React from 'react';
import {Text, View} from "react-native";
import {Slider} from "react-native-elements";

import {asSeconds} from "../util/util";

import {sliderBar} from "../../styles/sliderBar";

export default function SliderBar(props) {

  function onSlidingComplete(value) {
    if (props.duration > 0)
      props.setNextPostion(props.duration * value / 100);
  }

  let sliderValue = 0;
  if (props.duration > 0 && props.currentPosition > 0) {
    sliderValue = 100 * props.currentPosition / props.duration;
  }

  return (
      <View style={sliderBar.sliderBar}>
        <Slider
            style={sliderBar.slider}
            maximumValue={100}
            minimumValue={0}
            value={sliderValue}
            trackStyle={sliderBar.sliderTrack}
            thumbStyle={sliderBar.sliderThumb}
            onSlidingComplete={(value) => onSlidingComplete(value)}
        />
        <Text>{asSeconds(props.currentPosition)}</Text>
      </View>
  );

}
