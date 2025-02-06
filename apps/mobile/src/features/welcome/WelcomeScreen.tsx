import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { AppStyles } from '../../themes/styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import NeptuneLogo from '../../../assets/Group.svg'; // Import the SVG

type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Welcome'>;
};

export const WelcomeScreen = ({ navigation }: Props) => {
  return (
    <View style={[AppStyles.container, styles.container]}>
      {/* Neptune Logo */}
      <NeptuneLogo width={200} height={200} style={styles.logo} />

      {/* Subtitle */}
      <Text style={styles.title}>Neptune Sportsbook</Text>
      <Text style={styles.subtitle}>Beat The Odds With AI Precision</Text>

      {/* Horizontal Buttons */}
      <View style={styles.buttonContainer}>
        <Pressable
          style={[AppStyles.button, styles.button]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={AppStyles.buttonText}>Login</Text>
        </Pressable>

        <Pressable
          style={[AppStyles.button, styles.button]}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={AppStyles.buttonText}>Register</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#4A90E2',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333333',
    marginTop: 16,
  },
  tagline: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 24,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
});