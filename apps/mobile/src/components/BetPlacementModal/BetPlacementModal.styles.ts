import { StyleSheet } from 'react-native';
import { Colors } from '../../themes/colors';
import { poppins } from '../../utils/fonts';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: poppins.semiBold,
    color: Colors.textPrimary,
  },
  content: {
    paddingHorizontal: 20,
  },
  balanceSection: {
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    borderRadius: 12,
    marginVertical: 16,
  },
  balanceLabel: {
    fontSize: 14,
    fontFamily: poppins.regular,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 24,
    fontFamily: poppins.bold,
    color: Colors.primary,
  },
  betsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: poppins.semiBold,
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  betItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.cardBackground,
    borderRadius: 8,
    marginBottom: 8,
  },
  betInfo: {
    flex: 1,
  },
  betTitle: {
    fontSize: 14,
    fontFamily: poppins.semiBold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  betOption: {
    fontSize: 12,
    fontFamily: poppins.medium,
    color: Colors.primary,
    marginBottom: 2,
  },
  matchTitle: {
    fontSize: 11,
    fontFamily: poppins.regular,
    color: Colors.textSecondary,
  },
  oddsText: {
    fontSize: 14,
    fontFamily: poppins.semiBold,
    color: Colors.primary,
  },
  wagerSection: {
    marginBottom: 20,
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
    fontSize: 18,
    fontFamily: poppins.medium,
    color: Colors.textPrimary,
    marginRight: 8,
  },
  wagerInput: {
    flex: 1,
    fontSize: 18,
    fontFamily: poppins.medium,
    color: Colors.textPrimary,
  },
  potentialWinSection: {
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: Colors.success + '20',
    borderRadius: 12,
    marginBottom: 20,
  },
  potentialWinLabel: {
    fontSize: 14,
    fontFamily: poppins.regular,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  potentialWinAmount: {
    fontSize: 20,
    fontFamily: poppins.bold,
    color: Colors.success,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: Colors.cardBackground,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 14,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: poppins.medium,
    color: Colors.textPrimary,
  },
  placeButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: 'center',
  },
  placeButtonText: {
    fontSize: 16,
    fontFamily: poppins.medium,
    color: Colors.buttonText,
  },
  disabledButton: {
    opacity: 0.5,
  },
}); 