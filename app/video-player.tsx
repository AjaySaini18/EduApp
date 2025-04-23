import React from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useSubscription } from './context/SubscriptionContext';
import { router } from 'expo-router';

const VideoPlayer = () => {
  const { isSubscribed } = useSubscription();

  if (!isSubscribed) {
    return (
      <View style={styles.lockedContainer}>
        <Text style={styles.lockedText}>🔒 Premium content locked</Text>
        <TouchableOpacity
          style={styles.unlockButton}
          onPress={() => router.push('/SubscriptionPlan')}
        >
          <Text style={styles.unlockButtonText}>Unlock Premium Access</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Video
        source={{ uri: 'https://www.w3schools.com/html/mov_bbb.mp4' }}
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
  lockedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  lockedText: {
    fontSize: 20,
    marginBottom: 20,
    color: '#333',
  },
  unlockButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  unlockButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default VideoPlayer;