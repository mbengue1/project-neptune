import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from './colors';
import { poppins } from '../utils/fonts';

const { width, height } = Dimensions.get('window');

export const AppStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  backgroundImage: {
    position: 'absolute',
    width: width,
    height: height,
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    padding: 24,
  },
  header: {
    fontSize: 24,
    fontFamily: poppins.bold,
    color: Colors.primary,
    textAlign: 'center',
  },
  input: {
    backgroundColor: Colors.inputBackground,
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: Colors.textPrimary,
    borderWidth: 1,
    borderColor: 'transparent',
    fontFamily: poppins.regular,
  },
  inputFocused: {
    borderColor: Colors.primary,
  },
  button: {
    backgroundColor: Colors.buttonBackground,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonText: {
    color: Colors.buttonText,
    fontSize: 16,
    fontFamily: poppins.semiBold,
  },
  linkText: {
    color: Colors.link,
    textAlign: 'center',
    fontFamily: poppins.regular,
  },
});