import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Image } from 'react-native';
import { AppStyles } from '../../themes/styles';
import { Colors } from '../../themes/colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './SignupScreen.styles';

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
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subheader}>Create an account so you can explore the available Sportsbook.</Text>
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

            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor={Colors.textLight}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={[
                AppStyles.input, 
                styles.input,
                focusedInput === 'confirmPassword' && AppStyles.inputFocused
              ]}
              secureTextEntry
              onFocus={() => setFocusedInput('confirmPassword')}
              onBlur={() => setFocusedInput(null)}
            />

            <Pressable style={[AppStyles.button, styles.button]}>
              <Text style={AppStyles.buttonText}>Sign up</Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text style={styles.alreadyHaveAccount}>Already have an account</Text>
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