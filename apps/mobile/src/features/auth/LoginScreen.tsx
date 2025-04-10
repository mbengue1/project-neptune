import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Image, ActivityIndicator, Alert } from 'react-native';
import { AppStyles } from '../../themes/styles';
import { Colors } from '../../themes/colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './LoginScreen.styles';
import { useAuth } from './AuthContext';

// define navigation types
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
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const { login, isLoading, error, clearError } = useAuth();

  // clear any auth errors when component mounts or unmounts
  useEffect(() => {
    clearError();
    return () => clearError();
  }, []);

  // show error alert if there's an authentication error
  useEffect(() => {
    if (error) {
      Alert.alert('Login Failed', error, [
        { text: 'OK', onPress: clearError }
      ]);
    }
  }, [error]);

  // handle login form submission
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing Information', 'Please enter both email and password.');
      return;
    }

    // basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    const success = await login(email, password);
    if (success) {
      // navigation will be handled by the app navigator based on isAuthenticated state
      console.log('Login successful');
    }
  };

  return (
    <View style={AppStyles.container}>
      <Image 
        source={require('../../../assets/objects.png')} 
        style={AppStyles.backgroundImage} 
      />
      
      <ScrollView 
        style={AppStyles.contentContainer} 
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          <View style={styles.topSection}>
            <Text style={styles.title}>Login here</Text>
            <Text style={styles.subheader}>Welcome back you've{'\n'}been missed!</Text>
          </View>

          <View style={styles.middleSection}>
            <TextInput
              style={[
                AppStyles.input,
                styles.input,
                focusedInput === 'email' && AppStyles.inputFocused,
              ]}
              placeholder="Email"
              placeholderTextColor={Colors.placeholder}
              value={email}
              onChangeText={setEmail}
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isLoading}
              textContentType="emailAddress"
            />

            <TextInput
              placeholder="Password"
              placeholderTextColor={Colors.textLight}
              value={password}
              onChangeText={setPassword}
              style={[
                AppStyles.input, 
                styles.input,
                focusedInput === 'password' && AppStyles.inputFocused
              ]}
              secureTextEntry
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput(null)}
              editable={!isLoading}
            />

            <Pressable>
              <Text style={styles.forgotPassword}>Forgot your password?</Text>
            </Pressable>

            <Pressable 
              style={[
                AppStyles.button, 
                styles.button,
                isLoading && { opacity: 0.7 }
              ]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={Colors.buttonText} size="small" />
              ) : (
                <Text style={AppStyles.buttonText}>Sign in</Text>
              )}
            </Pressable>

            <Pressable onPress={() => navigation.navigate('Signup')} disabled={isLoading}>
              <Text style={styles.createAccount}>Create new account</Text>
            </Pressable>
          </View>

          <View style={styles.bottomSection}>
            <Text style={styles.orText}>Or continue with</Text>

            <View style={styles.socialButtons}>
              <Pressable style={styles.socialButton} disabled={isLoading}>
                <Ionicons name="logo-google" size={22} color={Colors.socialButtonIcon} />
              </Pressable>
              <Pressable style={styles.socialButton} disabled={isLoading}>
                <Ionicons name="logo-facebook" size={22} color={Colors.socialButtonIcon} />
              </Pressable>
              <Pressable style={styles.socialButton} disabled={isLoading}>
                <Ionicons name="logo-apple" size={22} color={Colors.socialButtonIcon} />
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};