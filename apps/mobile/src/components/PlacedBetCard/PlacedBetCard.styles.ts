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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    fontFamily: poppins.medium,
    marginLeft: 4,
  },
  dateText: {
    fontSize: 11,
    fontFamily: poppins.regular,
    color: Colors.textSecondary,
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
  amountsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.background,
    borderRadius: 8,
  },
  oddsContainer: {
    alignItems: 'center',
    flex: 1,
  },
  oddsLabel: {
    fontSize: 10,
    fontFamily: poppins.regular,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  oddsValue: {
    fontSize: 14,
    fontFamily: poppins.semiBold,
    color: Colors.primary,
  },
  wagerContainer: {
    alignItems: 'center',
    flex: 1,
  },
  wagerLabel: {
    fontSize: 10,
    fontFamily: poppins.regular,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  wagerValue: {
    fontSize: 14,
    fontFamily: poppins.semiBold,
    color: Colors.textPrimary,
  },
  potentialContainer: {
    alignItems: 'center',
    flex: 1,
  },
  potentialLabel: {
    fontSize: 10,
    fontFamily: poppins.regular,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  potentialValue: {
    fontSize: 14,
    fontFamily: poppins.semiBold,
    color: Colors.success,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sportContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sportText: {
    fontSize: 11,
    fontFamily: poppins.medium,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  leagueText: {
    fontSize: 11,
    fontFamily: poppins.regular,
    color: Colors.textSecondary,
  },
}); 