import React from 'react';
import { StatusBar } from 'react-native';
import { AuthProvider } from './src/features/auth/AuthContext/AuthContext';
import { BetSelectionProvider } from './src/features/betting/BetSelectionContext/BetSelectionContext';
import GlobalBetSlip from './src/components/GlobalBetSlip/GlobalBetSlip';
import { AppNavigator } from './src/navigation/AppNavigator';
import { Colors } from './src/themes/colors';
import { useFonts } from 'expo-font';
import { poppins } from './src/utils/fonts';

export default function App() {
  const [fontsLoaded] = useFonts({
    [poppins.regular]: require('./assets/fonts/Poppins-Regular.ttf'),
    [poppins.medium]: require('./assets/fonts/Poppins-Medium.ttf'),
    [poppins.semiBold]: require('./assets/fonts/Poppins-SemiBold.ttf'),
    [poppins.bold]: require('./assets/fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <BetSelectionProvider>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
        <AppNavigator />
        <GlobalBetSlip />
      </BetSelectionProvider>
    </AuthProvider>
  );
}