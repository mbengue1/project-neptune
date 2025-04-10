import React, { useEffect, useRef } from 'react';
import { View, Text, Image, Animated } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStyles } from '../../themes/styles';
import { styles } from './SplashScreen.styles';

type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Splash'>;
};

export const SplashScreen = ({ navigation }: Props) => {
  // Animation for the dots
  const dot1Opacity = useRef(new Animated.Value(0.3)).current;
  const dot2Opacity = useRef(new Animated.Value(0.3)).current;
  const dot3Opacity = useRef(new Animated.Value(0.3)).current;

  // Animation for the logo
  const logoScale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Animate the logo
    Animated.spring(logoScale, {
      toValue: 1,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start();

    // Animate the dots in sequence
    const animateDots = () => {
      Animated.sequence([
        // Dot 1
        Animated.timing(dot1Opacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        // Dot 2
        Animated.timing(dot2Opacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        // Dot 3
        Animated.timing(dot3Opacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        // Reset all dots
        Animated.parallel([
          Animated.timing(dot1Opacity, {
            toValue: 0.3,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot2Opacity, {
            toValue: 0.3,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot3Opacity, {
            toValue: 0.3,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        // Loop the animation
        animateDots();
      });
    };

    animateDots();

    // Navigate to Welcome screen after 2.5 seconds
    const timer = setTimeout(() => {
      navigation.navigate('Welcome');
    }, 2500);

    return () => {
      clearTimeout(timer);
      // Clean up animations
      dot1Opacity.stopAnimation();
      dot2Opacity.stopAnimation();
      dot3Opacity.stopAnimation();
      logoScale.stopAnimation();
    };
  }, [navigation, dot1Opacity, dot2Opacity, dot3Opacity, logoScale]);

  return (
    <View style={[AppStyles.container, styles.container]}>
      <Image 
        source={require('../../../assets/objects.png')} 
        style={styles.backgroundImage} 
      />
      
      <Animated.View style={[styles.logoContainer, { transform: [{ scale: logoScale }] }]}>
        <Text style={styles.title}>Neptune</Text>
        <Text style={styles.subtitle}>Sportsbook</Text>
      </Animated.View>

      <View style={styles.loadingContainer}>
        <View style={styles.loadingDots}>
          <Animated.View style={[styles.dot, { opacity: dot1Opacity }]} />
          <Animated.View style={[styles.dot, { opacity: dot2Opacity }]} />
          <Animated.View style={[styles.dot, { opacity: dot3Opacity }]} />
        </View>
      </View>
    </View>
  );
};