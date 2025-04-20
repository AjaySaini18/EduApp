import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Video,ResizeMode } from 'expo-av';

const VideoPlayer = () => {
  return (
    <View style={styles.container}>
      <Video
        source={{ uri: 'https://www.w3schools.com/html/mov_bbb.mp4' }} // You can replace this with your own video URL
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay
        useNativeControls
        style={styles.video}
      />
    </View>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  video: {
    width: Dimensions.get('window').width,
    height: 250,
    alignSelf: 'center',
  },
});
