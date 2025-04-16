import { StyleSheet } from 'react-native';
import { Colors } from '../../themes/colors';
import { poppins } from '../../utils/fonts';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontFamily: poppins.semiBold,
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  subheader: {
    fontSize: 14,
    fontFamily: poppins.regular,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  step: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.border,
    marginHorizontal: 4,
  },
  activeStep: {
    backgroundColor: Colors.primary,
    width: 24,
  },
  middleSection: {
    width: '100%',
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  input: {
    marginBottom: 16,
  },
  dateInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    color: Colors.textPrimary,
    fontFamily: poppins.regular,
  },
  placeholderText: {
    color: Colors.textLight,
    fontFamily: poppins.regular,
  },
  button: {
    marginTop: 8,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  backButtonText: {
    color: Colors.textPrimary,
    fontFamily: poppins.medium,
    marginLeft: 4,
  },
  nextButton: {
    flex: 1,
    marginLeft: 16,
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
});