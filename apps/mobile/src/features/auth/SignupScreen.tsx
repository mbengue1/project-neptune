import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
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

  return (
    <View style={[AppStyles.container, styles.container]}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subheader}>Create an account so you can explore the available Sportsbook.</Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor={Colors.textLight}
          value={email}
          onChangeText={setEmail}
          style={[AppStyles.input, styles.input]}
          keyboardType="email-address"
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor={Colors.textLight}
          value={password}
          onChangeText={setPassword}
          style={[AppStyles.input, styles.input]}
          secureTextEntry
        />

        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor={Colors.textLight}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={[AppStyles.input, styles.input]}
          secureTextEntry
        />

        <Pressable style={[AppStyles.button, styles.button]}>
          <Text style={AppStyles.buttonText}>Sign up</Text>
        </Pressable>

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

        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={styles.alreadyHaveAccount}>Already have an account</Text>
        </Pressable>
      </View>
    </View>
  );
};