import { StyleSheet } from 'react-native';
import { Colors } from '../../themes/colors';
import { poppins } from '../../utils/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 0,
  },
  sectionHeader: {
    paddingVertical: 8,
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
    color: '#174be8',
  },
  oddsValueSmall: {
    fontSize: 10,
    fontFamily: poppins.medium,
    color: '#174be8',
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
  
  // Sport Specific Odds Styles (for Basketball/Football/Hockey/Tennis)
  sportOddsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 2,
  },
  sportOddsColumn: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  sportOddsButton: {
    width: '90%',
    height: 30,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
    marginVertical: 2,
  },
  oddsNumber: {
    fontSize: 13,
    fontFamily: poppins.medium,
    color: Colors.textPrimary,
  },
  
  // FanDuel style betting layout
  sportMatchContainer: {
    padding: 0,
  },
  sportColumnHeaders: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingVertical: 6,
    backgroundColor: '#f5f5f5',
  },
  teamNameColumn: {
    width: '38%',
    paddingLeft: 12,
  },
  teamColumnHeader: {
    fontSize: 10,
    fontFamily: poppins.medium,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
  },
  oddsColumnsContainer: {
    width: '62%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  oddsColumnHeader: {
    fontSize: 10,
    fontFamily: poppins.medium,
    color: Colors.textSecondary,
    width: '33.3%',
    textAlign: 'center',
  },
  sportTeamRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: '#ffffff',
  },
  sportTeamName: {
    fontSize: 15,
    fontFamily: poppins.medium,
    color: Colors.textPrimary,
    paddingLeft: 12,
  },
  
  // Old styles for betting layouts (keeping them for reference)
  headerLabels: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    width: '100%',
  },
  columnLabel: {
    fontSize: 10,
    fontFamily: poppins.medium,
    color: Colors.textSecondary,
    width: 64,
    textAlign: 'center',
    marginHorizontal: 2,
  },
  bettingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    width: '100%',
  },
  teamInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '40%',
  },
  bettingOptions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '60%',
  },
  betOption: {
    width: 64,
    height: 40,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
    marginHorizontal: 2,
  },
  betValue: {
    fontSize: 12,
    fontFamily: poppins.medium,
    color: Colors.textPrimary,
  },
  betOdds: {
    fontSize: 14,
    fontFamily: poppins.semiBold,
    color: Colors.primary,
  },
});
