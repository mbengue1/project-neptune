import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../features/auth/AuthContext/AuthContext';
import { SplashScreen } from '../features/auth/SplashScreen/SplashScreen';
import { WelcomeScreen } from '../features/welcome/WelcomeScreen';
import { LoginScreen } from '../features/auth/LoginScreen/LoginScreen';
import { SignupScreen } from '../features/auth/SignUpScreen/SignupScreen';
import MainScreen from '../screens/MainScreen/MainScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import ProfileDetailsScreen from '../components/ProfileDetails/ProfileDetailsScreen';
import HelpSupportScreen from '../screens/HelpSupport/HelpSupportScreen';
import AccessibilityScreen from '../screens/Accessibility/AccessibilityScreen';
import PaymentMethodsScreen from '../screens/PaymentMethods/PaymentMethodsScreen';
import StatisticsScreen from '../screens/Statistics/StatisticsScreen';
import TemporaryScreen from '../screens/TemporaryScreen/TemporaryScreen';
import BetsScreen from '../screens/BetsScreen/BetsScreen';
import MatchDetailsScreen from '../screens/MatchDetailsScreen/MatchDetailsScreen';
import AIPageScreen from '../screens/AIPageScreen/AIPageScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ 
          headerShown: false,
          animation: 'none',
          contentStyle: { backgroundColor: 'transparent' }
        }}
        initialRouteName={isAuthenticated ? 'Main' : 'Welcome'}
      >
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="ProfileDetails" component={ProfileDetailsScreen} />
            <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
            <Stack.Screen name="Accessibility" component={AccessibilityScreen} />
            <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
            <Stack.Screen name="Statistics" component={StatisticsScreen} />
            <Stack.Screen name="Temporary" component={TemporaryScreen} />
            <Stack.Screen name="Bets" component={BetsScreen} />
            <Stack.Screen name="MatchDetails" component={MatchDetailsScreen} />
            <Stack.Screen name="AIPage" component={AIPageScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};