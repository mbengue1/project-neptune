import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../../themes/colors';
import { poppins } from '../../../utils/fonts';

const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    paddingTop: height * 0.08, // Match LoginScreen padding
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
    marginBottom: height * 0.04, // Add space between header and steps
  },
  title: {
    fontSize: 36,
    fontFamily: 'Poppins-ExtraBold',
    color: Colors.primary,
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  subheader: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 24,
    maxWidth: '80%',
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.03,
  },
  step: {
    width: width * 0.2,
    height: 4,
    backgroundColor: Colors.border,
    marginHorizontal: 4,
    borderRadius: 2,
  },
  activeStep: {
    backgroundColor: Colors.primary,
  },
  formContainer: {
    width: '100%',
    marginTop: height * 0.02,
  },
  input: {
    marginBottom: 20,
    height: 60,
  },
  button: {
    marginTop: height * 0.02,
    marginBottom: height * 0.03,
    height: 56,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  backButtonText: {
    color: Colors.textSecondary,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    marginLeft: 8,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  alreadyHaveAccount: {
    color: Colors.primary,
    fontFamily: poppins.medium,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 16,
  },
  bottomSection: {
    alignItems: 'center',
  },
  orText: {
    color: Colors.textSecondary,
    fontFamily: poppins.regular,
    fontSize: 14,
    marginBottom: 16,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.socialButtonBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  nextButton: {
    flex: 1,
    marginLeft: 8,
  },
  dateInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 12,
  },
  dateText: {
    color: Colors.textPrimary,
    fontSize: 16,
  },
  placeholderText: {
    color: Colors.textLight,
    fontSize: 16,
  },
});