import {StyleSheet} from "react-native";

export const playlist = StyleSheet.create({
  playlist: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  scrollViewContainer: {
    height: '75%',
  },

  list: {
    top: '5%',
  },

  listName: {
    alignSelf: 'center',
    fontSize: 25,
    marginTop: '5%',
    marginBottom: '5%'
  },

  listItem: {
    alignSelf: 'center',
    width: '95%',
    borderColor: 'silver',
    borderStyle: 'solid',
    borderWidth: 1,
    marginTop: '1%',
  },

  titleFocus: {
    fontSize: 20,
    color: 'black'
  },

  artistFocus: {
    color: 'black'
  },

  title: {
    fontSize: 20,
    color: 'silver'
  },

  artist: {
    color: 'silver'
  },

  backButton: {
    marginTop: '10%',
    width: '50%',
    alignSelf: 'center',
  }
});