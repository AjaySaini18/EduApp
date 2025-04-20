import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, ActivityIndicator } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
} from 'react-native-reanimated';

const LoadingScreen: React.FC = () => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);

  useEffect(() => {
    // Fade in effect for title
    opacity.value = withTiming(1, { duration: 1000 });

    // Pulsing animation for indicator
    scale.value = withRepeat(
      withTiming(1.2, {
        duration: 800,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true // reverse
    );
  }, []);

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const animatedLoaderStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <ImageBackground
      source={require('../assets/images/background.jpg')}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Animated.Text style={[styles.title, animatedTextStyle]}>EduApp</Animated.Text>
        <Animated.View style={animatedLoaderStyle}>
          <ActivityIndicator size="large" color="#ffffff" />
        </Animated.View>
      </View>
    </ImageBackground>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    letterSpacing: 2,
  },
});
