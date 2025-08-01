import { StyleSheet } from 'react-native';
import { Colors } from '../../themes/colors';
import { poppins } from '../../utils/fonts';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  betCount: {
    fontSize: 16,
    fontFamily: poppins.semiBold,
    color: Colors.textPrimary,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  statusText: {
    fontSize: 12,
    fontFamily: poppins.medium,
    marginLeft: 4,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 11,
    fontFamily: poppins.regular,
    color: Colors.textSecondary,
    marginRight: 8,
  },
  expandButton: {
    padding: 4,
  },
  betsContainer: {
    maxHeight: 300,
  },
  betsScroll: {
    paddingHorizontal: 16,
  },
  betItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  betInfo: {
    flex: 1,
    marginRight: 12,
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
  betActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  oddsText: {
    fontSize: 14,
    fontFamily: poppins.semiBold,
    color: Colors.primary,
    marginRight: 8,
  },
  removeButton: {
    padding: 2,
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  amountsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amountItem: {
    alignItems: 'center',
    flex: 1,
  },
  amountLabel: {
    fontSize: 10,
    fontFamily: poppins.regular,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  amountValue: {
    fontSize: 14,
    fontFamily: poppins.semiBold,
    color: Colors.textPrimary,
  },
  potentialWinValue: {
    fontSize: 14,
    fontFamily: poppins.semiBold,
    color: Colors.success,
  },
  placeButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  placeButtonText: {
    fontSize: 14,
    fontFamily: poppins.medium,
    color: Colors.buttonText,
  },
}); 