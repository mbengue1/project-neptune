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
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

export const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={AppStyles.container}>
      <Text style={AppStyles.header}>Welcome back</Text>
      <Text style={styles.subheader}>You've been missed!</Text>

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

      <Pressable style={AppStyles.button}>
        <Text style={AppStyles.buttonText}>Sign In</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate('Signup')}>
        <Text style={AppStyles.linkText}>Create new account</Text>
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