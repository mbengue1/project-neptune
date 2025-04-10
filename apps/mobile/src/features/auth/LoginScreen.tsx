import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Image } from 'react-native';
import { AppStyles } from '../../themes/styles';
import { Colors } from '../../themes/colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './LoginScreen.styles';

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
              placeholder="Email"
              placeholderTextColor={Colors.textLight}
              value={email}
              onChangeText={setEmail}
              style={[
                AppStyles.input, 
                styles.input,
                focusedInput === 'email' && AppStyles.inputFocused
              ]}
              keyboardType="email-address"
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
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
            />

            <Pressable>
              <Text style={styles.forgotPassword}>Forgot your password?</Text>
            </Pressable>

            <Pressable style={[AppStyles.button, styles.button]}>
              <Text style={AppStyles.buttonText}>Sign in</Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.createAccount}>Create new account</Text>
            </Pressable>
          </View>

          <View style={styles.bottomSection}>
            <Text style={styles.orText}>Or continue with</Text>

            <View style={styles.socialButtons}>
              <Pressable style={styles.socialButton}>
                <Ionicons name="logo-google" size={22} color={Colors.socialButtonIcon} />
              </Pressable>
              <Pressable style={styles.socialButton}>
                <Ionicons name="logo-facebook" size={22} color={Colors.socialButtonIcon} />
              </Pressable>
              <Pressable style={styles.socialButton}>
                <Ionicons name="logo-apple" size={22} color={Colors.socialButtonIcon} />
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};