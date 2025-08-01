import { StyleSheet } from 'react-native';
import { Colors } from '../../themes/colors';
import { poppins } from '../../utils/fonts';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  betDetails: {
    marginBottom: 12,
  },
  matchTitle: {
    fontSize: 14,
    fontFamily: poppins.semiBold,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  betTitle: {
    fontSize: 13,
    fontFamily: poppins.medium,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  betOption: {
    fontSize: 12,
    fontFamily: poppins.regular,
    color: Colors.primary,
  },
  oddsContainer: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.background,
    borderRadius: 8,
    marginBottom: 12,
  },
  oddsLabel: {
    fontSize: 10,
    fontFamily: poppins.regular,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  oddsValue: {
    fontSize: 16,
    fontFamily: poppins.semiBold,
    color: Colors.primary,
  },
  wagerSection: {
    marginBottom: 12,
  },
  wagerLabel: {
    fontSize: 12,
    fontFamily: poppins.medium,
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  wagerInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.inputBackground,
  },
  currencySymbol: {
    fontSize: 16,
    fontFamily: poppins.medium,
    color: Colors.textPrimary,
    marginRight: 8,
  },
  wagerInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: poppins.medium,
    color: Colors.textPrimary,
  },
  potentialWinContainer: {
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: Colors.success + '20',
    borderRadius: 8,
    marginBottom: 12,
  },
  potentialWinLabel: {
    fontSize: 12,
    fontFamily: poppins.regular,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  potentialWinValue: {
    fontSize: 16,
    fontFamily: poppins.semiBold,
    color: Colors.success,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  removeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.error,
  },
  removeButtonText: {
    fontSize: 12,
    fontFamily: poppins.medium,
    color: Colors.error,
    marginLeft: 4,
  },
  placeButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  placeButtonText: {
    fontSize: 12,
    fontFamily: poppins.medium,
    color: Colors.buttonText,
  },
  disabledButton: {
    opacity: 0.5,
  },
}); 