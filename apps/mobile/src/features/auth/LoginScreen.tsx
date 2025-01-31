import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
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
    <View style={styles.container}>
      <Text style={styles.header}>Welcome Back</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#666"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#666"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <Pressable style={styles.primaryButton}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.linkText}>New to Neptune? Create Account</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '700',
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#2E2E2E',
    color: '#FFFFFF',
    fontSize: 16,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  primaryButton: {
    backgroundColor: '#4A90E2',
    padding: 18,
    borderRadius: 8,
    marginVertical: 24,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  linkText: {
    color: '#4A90E2',
    textAlign: 'center',
    marginTop: 12,
    fontSize: 14,
  },
});