import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { AppStyles } from '../../themes/styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Signup'>;
};

export const SignupScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View style={AppStyles.container}>
      <Text style={AppStyles.header}>Create Account</Text>
      <Text style={styles.subheader}>Create an account to explore the Sportsbook.</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#999999"
        value={email}
        onChangeText={setEmail}
        style={AppStyles.input}
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#999999"
        value={password}
        onChangeText={setPassword}
        style={AppStyles.input}
        secureTextEntry
      />

      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor="#999999"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={AppStyles.input}
        secureTextEntry
      />

      <Pressable style={AppStyles.button}>
        <Text style={AppStyles.buttonText}>Sign Up</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate('Login')}>
        <Text style={AppStyles.linkText}>Already have an account? Sign In</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  subheader: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 32,
  },
});