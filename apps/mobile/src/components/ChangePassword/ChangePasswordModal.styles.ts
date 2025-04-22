import { StyleSheet } from 'react-native';
import { Colors } from '../../themes/colors';

export const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      width: '90%',
      backgroundColor: Colors.background,
      borderRadius: 12,
      overflow: 'hidden',
      maxWidth: 400,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      padding: 12,
    },
    closeButton: {
      padding: 4,
    },
    modalContent: {
      padding: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: Colors.textPrimary,
      marginBottom: 8,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 14,
      color: Colors.textSecondary,
      marginBottom: 24,
      textAlign: 'center',
    },
    input: {
      backgroundColor: Colors.inputBackground,
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      marginBottom: 20,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    cancelButton: {
      padding: 12,
      borderRadius: 8,
      flex: 1,
      marginRight: 8,
      alignItems: 'center',
    },
    cancelButtonText: {
      color: Colors.textPrimary,
      fontSize: 16,
      fontWeight: '600',
    },
    nextButton: {
      backgroundColor: Colors.primary,
      padding: 12,
      borderRadius: 8,
      flex: 1,
      marginLeft: 8,
      alignItems: 'center',
    },
    nextButtonText: {
      color: Colors.buttonText,
      fontSize: 16,
      fontWeight: '600',
    },
    disabledButton: {
      opacity: 0.7,
    },
    errorText: {
      color: Colors.error,
      marginTop: 16,
      textAlign: 'center',
    },
}); 