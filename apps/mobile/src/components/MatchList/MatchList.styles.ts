import { StyleSheet } from 'react-native';
import { Colors } from '../../themes/colors';
import { poppins } from '../../utils/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: poppins.semiBold,
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 8,
    marginBottom: 8,
    overflow: 'hidden',
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  leagueText: {
    fontSize: 12,
    fontFamily: poppins.medium,
    color: Colors.textSecondary,
  },
  dateText: {
    fontSize: 12,
    fontFamily: poppins.regular,
    color: Colors.textSecondary,
  },
  matchContent: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
  },
  teamsSection: {
    flex: 1,
    justifyContent: 'center',
  },
  teamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  teamName: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: poppins.regular,
    color: Colors.textPrimary,
  },
  oddsContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  oddsColumn: {
    alignItems: 'center',
  },
  oddsLabel: {
    fontSize: 10,
    fontFamily: poppins.medium,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  oddsButton: {
    width: 64,
    height: 36,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  oddsValue: {
    fontSize: 14,
    fontFamily: poppins.medium,
    color: Colors.primary,
  },
  viewMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    marginTop: 8,
  },
  viewMoreText: {
    fontSize: 14,
    fontFamily: poppins.medium,
    color: Colors.primary,
  },
});
