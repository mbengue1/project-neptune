import { StyleSheet } from 'react-native';
import { Colors } from '../../themes/colors';
import { poppins } from '../../utils/fonts';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  title: {
    fontSize: 20,
    fontFamily: poppins.semiBold,
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    fontFamily: poppins.regular,
    color: Colors.textSecondary,
    marginBottom: 24,
  },
  input: {
    backgroundColor: Colors.inputBackground,
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    fontFamily: poppins.regular,
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  errorText: {
    color: Colors.error,
    fontSize: 14,
    fontFamily: poppins.regular,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: Colors.border,
  },
  confirmButton: {
    backgroundColor: Colors.primary,
  },
  buttonText: {
    color: Colors.buttonText,
    fontSize: 16,
    fontFamily: poppins.medium,
  },
}); 