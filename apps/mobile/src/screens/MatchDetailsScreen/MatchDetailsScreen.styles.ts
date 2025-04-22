import { StyleSheet } from 'react-native';
import { Colors } from '../../themes/colors';
import { poppins } from '../../utils/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    padding: 4,
  },
  searchButton: {
    padding: 4,
  },
  matchInfo: {
    alignItems: 'center',
  },
  leagueTitle: {
    fontSize: 18,
    fontFamily: poppins.semiBold,
    color: Colors.textPrimary,
  },
  gamesAvailable: {
    fontSize: 12,
    fontFamily: poppins.regular,
    color: Colors.textSecondary,
  },
  teamsContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  teamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  teamName: {
    marginLeft: 12,
    fontSize: 16,
    fontFamily: poppins.medium,
    color: Colors.textPrimary,
  },
  matchTime: {
    fontSize: 14,
    fontFamily: poppins.regular,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  categoriesContainer: {
    height: 44,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  categoryTab: {
    paddingHorizontal: 12,
    height: 44,
    marginHorizontal: 2,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 13,
    fontFamily: poppins.medium,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingBottom: 2,
  },
  selectedCategory: {
    borderBottomColor: Colors.primary,
  },
  selectedCategoryText: {
    color: Colors.primary,
  },
  content: {
    flex: 1,
  },
  betSection: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  betHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  betTitle: {
    fontSize: 14,
    fontFamily: poppins.medium,
    color: Colors.textPrimary,
    flex: 1,
  },
  sgpBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  sgpText: {
    color: Colors.buttonText,
    fontSize: 10,
    fontFamily: poppins.medium,
  },
  betDescription: {
    fontSize: 11,
    fontFamily: poppins.regular,
    color: Colors.textSecondary,
    marginBottom: 8,
    paddingHorizontal: 12,
  },
  oddsContainer: {
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  oddsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  oddsLabel: {
    flex: 1,
    fontSize: 13,
    fontFamily: poppins.regular,
    color: Colors.textPrimary,
  },
  oddsButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
    minWidth: 80,
    alignItems: 'center',
  },
  oddsValue: {
    fontSize: 13,
    fontFamily: poppins.medium,
    color: Colors.primary,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  expandIcon: {
    marginLeft: 4,
  },
}); 