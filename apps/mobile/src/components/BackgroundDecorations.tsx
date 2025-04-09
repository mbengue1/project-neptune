import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../themes/colors';

export const BackgroundDecorations = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topRightCircle} />
      <View style={styles.bottomLeftCircle} />
      <View style={styles.topLeftRectangle} />
      <View style={styles.bottomRightRectangle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
    overflow: 'hidden',
  },
  topRightCircle: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: Colors.primary + '10', // 10% opacity
    top: -50,
    right: -50,
  },
  bottomLeftCircle: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: Colors.secondary + '15', // 15% opacity
    bottom: -30,
    left: -30,
  },
  topLeftRectangle: {
    position: 'absolute',
    width: 100,
    height: 100,
    transform: [{ rotate: '45deg' }],
    backgroundColor: Colors.primary + '08', // 8% opacity
    top: 100,
    left: -20,
  },
  bottomRightRectangle: {
    position: 'absolute',
    width: 80,
    height: 80,
    transform: [{ rotate: '30deg' }],
    backgroundColor: Colors.secondary + '10', // 10% opacity
    bottom: 100,
    right: -10,
  },
});