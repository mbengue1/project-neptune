import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../themes/colors';

const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    paddingTop: height * 0.08,
    paddingBottom: height * 0.05,
  },
  contentContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    minHeight: height * 0.85,
    justifyContent: 'space-between',
  },
  topSection: {
    width: '100%',
    alignItems: 'center',
  },
  middleSection: {
    width: '100%',
    marginTop: height * 0.02,
  },
  bottomSection: {
    width: '100%',
    marginTop: height * 0.05,
  },
  title: {
    fontSize: 36,
    fontFamily: 'Poppins-ExtraBold',
    color: Colors.primary,
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  subheader: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 40,
    maxWidth: '70%',
  },
  input: {
    marginBottom: 24,
    height: 60,
  },
  forgotPassword: {
    color: Colors.link,
    textAlign: 'right',
    marginBottom: 24,
    fontFamily: 'Poppins-Regular',
  },
  button: {
    marginBottom: 24,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    height: 56,
  },
  orText: {
    textAlign: 'center',
    color: Colors.primary,
    marginBottom: 16,
    marginTop: 16,
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 24,
  },
  socialButton: {
    width: 70,
    height: 45,
    borderRadius: 12,
    backgroundColor: Colors.socialButtonBackground,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  createAccount: {
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
});