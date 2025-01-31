import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from '../features/splash/SplashScreen';
import { LoginScreen } from '../features/auth/LoginScreen';
import { SignupScreen } from '../features/auth/SignupScreen';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Splash"
      component={SplashScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Signup"
      component={SignupScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

