import { StyleSheet } from 'react-native';
import { Colors } from '../../themes/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: Colors.buttonText,
    flex: 1,
    marginHorizontal: 8,
    fontSize: 14,
  },
  button: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginRight: 8,
  },
  buttonText: {
    color: Colors.buttonText,
    fontSize: 12,
    fontWeight: '600',
  },
  closeButton: {
    padding: 4,
  }
}); 