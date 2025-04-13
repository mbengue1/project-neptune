import { StyleSheet } from 'react-native';
import { Colors } from '../../themes/colors';
import { poppins } from '../../utils/fonts';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 28,
    color: Colors.primary,
    fontFamily: poppins.bold,
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dollarIcon: {
    marginRight: 4,
  },
  balance: {
    fontSize: 18,
    color: Colors.textPrimary,
    fontFamily: poppins.medium,
    marginRight: 12,
  },
  depositButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  depositText: {
    color: Colors.buttonText,
    fontFamily: poppins.medium,
    fontSize: 14,
  },
});
