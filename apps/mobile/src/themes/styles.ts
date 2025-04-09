import { StyleSheet } from 'react-native';
import { Colors } from './colors';
import { Typography } from './typography';

export const AppStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 24,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
  },
  input: {
    backgroundColor: Colors.inputBackground,
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: Colors.textPrimary,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  inputFocused: {
    borderColor: Colors.primary,
  },
  button: {
    backgroundColor: Colors.buttonBackground,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.buttonText,
    fontSize: 16,
    fontWeight: '600',
  },
  linkText: {
    color: Colors.link,
    textAlign: 'center',
  },
});