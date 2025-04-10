import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { AppStyles } from '../../themes/styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import NeptuneLogo from '../../../assets/Group.svg';
import { styles } from './WelcomeScreen.styles';

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
    <View style={[AppStyles.container]}>
      <Image 
        source={require('../../../assets/objects.png')} 
        style={AppStyles.backgroundImage} 
      />
      
      <View style={[styles.container]}>
        <View style={styles.topSection}>
          <NeptuneLogo width={250} height={250} style={styles.logo} />
        </View>
        
        <View style={styles.middleSection}>
          <View style={styles.titleContainer}>
            <Text style={styles.titlePrimary}>Neptune</Text>
            <Text style={styles.titleSecondary}>Sportsbook</Text>
          </View>
          <Text style={styles.subtitle}>Beat The Odds With AI Precision</Text>
        </View>

        <View style={styles.bottomSection}>
          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.loginButton}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </Pressable>

            <Pressable
              style={styles.registerButton}
              onPress={() => navigation.navigate('Signup')}
            >
              <Text style={styles.registerButtonText}>Register</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};