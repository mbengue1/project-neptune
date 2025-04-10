import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../themes/colors';
import { poppins } from '../../utils/fonts';

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingTop: height * 0.1,
    paddingBottom: height * 0.05,
  },
  topSection: {
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  middleSection: {
    alignItems: 'center',
    width: '100%',
  },
  titleContainer: {
    alignItems: 'center',
  },
  titlePrimary: {
    fontSize: 42,
    fontFamily: poppins.bold,
    color: Colors.primary,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  titleSecondary: {
    fontSize: 38,
    fontFamily: poppins.semiBold,
    color: Colors.primary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: poppins.regular,
    color: '#000000',
    marginTop: 12,
    textAlign: 'center',
  },
  bottomSection: {
    width: '100%',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 24,
    marginTop: -height * 0.05,
  },
  loginButton: {
    flex: 1,
    marginHorizontal: 8,
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    paddingVertical: 16,
    borderRadius: 8,
  },
  registerButton: {
    flex: 1,
    marginHorizontal: 8,
    backgroundColor: 'transparent',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerButtonText: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontFamily: poppins.semiBold,
  },
  loginButtonText: {
    color: Colors.buttonText,
    fontSize: 16,
    fontFamily: poppins.semiBold,
    textAlign: 'center',
  },
});