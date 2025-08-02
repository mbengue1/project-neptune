import { StyleSheet } from 'react-native';
import { Colors } from '../../themes/colors';
import { poppins } from '../../utils/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 24,
    fontFamily: poppins.bold,
    color: Colors.textPrimary,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonDisabled: {
    backgroundColor: Colors.textSecondary,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: poppins.semiBold,
    textAlign: 'center',
  },
  clearButton: {
    backgroundColor: Colors.error,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginBottom: 20,
  },
  clearButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: poppins.medium,
    textAlign: 'center',
  },
  resultsContainer: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: 12,
  },
  resultText: {
    fontSize: 12,
    fontFamily: poppins.regular,
    color: Colors.textPrimary,
    marginBottom: 4,
    lineHeight: 16,
  },
}); 