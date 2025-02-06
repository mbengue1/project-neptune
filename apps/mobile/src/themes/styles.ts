import { LightColors } from './colors';
import { Typography } from './typography';
import { StyleSheet } from 'react-native';

export const AppStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LightColors.background,
    padding: 24,
  },
  header: {
    ...Typography.header,
    color: LightColors.text,
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    backgroundColor: LightColors.inputBackground,
    color: LightColors.text,
    fontSize: 16,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#4A90E2',
    padding: 18,
    borderRadius: 8,
    alignItems: 'center' as const,
  },
  buttonText: {
    ...Typography.button,
    color: '#FFFFFF',
  },
  linkText: {
    ...Typography.link,
    textAlign: 'center',
    marginTop: 12,
  },
});