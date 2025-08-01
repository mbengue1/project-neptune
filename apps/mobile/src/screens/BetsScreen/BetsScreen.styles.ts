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
    justifyContent: 'center',
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
  headerTitle: {
    fontSize: 20,
    fontFamily: poppins.semiBold,
    color: Colors.textPrimary,
  },
  content: {
    flex: 1,
  },
  // Category tabs styles (matching CategoryTabs component)
  categoryTabsContainer: {
    backgroundColor: Colors.background,
    paddingVertical: 8,
    height: 50,
    maxHeight: 50,
  },
  categoryTabsContent: {
    paddingHorizontal: 12,
    height: 34,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: Colors.cardBackground,
    borderRadius: 20,
    marginHorizontal: 4,
    height: 34,
  },
  selectedCategoryTab: {
    backgroundColor: Colors.primary,
  },
  categoryTabText: {
    color: Colors.textPrimary,
    fontFamily: poppins.medium,
    fontSize: 12,
    marginLeft: 4,
  },
  selectedCategoryTabText: {
    color: Colors.buttonText,
  },
  // Featured Players container with no bottom spacing
  featuredPlayersContainer: {
    marginBottom: 0,
    paddingBottom: 0,
  },
  // Section headers
  sectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: poppins.semiBold,
    color: Colors.textPrimary,
  },
  // Sports categories filter
  sportsFilter: {
    paddingHorizontal: 12,
    marginVertical: 12,
  },
  sportCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: Colors.cardBackground,
  },
  selectedSportCategory: {
    backgroundColor: Colors.primary,
  },
  sportCategoryText: {
    fontSize: 14,
    fontFamily: poppins.medium,
    color: Colors.textPrimary,
    marginLeft: 6,
  },
  selectedSportCategoryText: {
    color: Colors.buttonText,
  },
  // League filter
  leagueFilter: {
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  leagueButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: Colors.cardBackground,
  },
  selectedLeague: {
    backgroundColor: Colors.primary,
  },
  leagueButtonText: {
    fontSize: 14,
    fontFamily: poppins.medium,
    color: Colors.textPrimary,
  },
  selectedLeagueText: {
    color: Colors.buttonText,
  },
  filterTabs: {
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  selectedFilter: {
    borderBottomColor: Colors.primary,
  },
  filterTabText: {
    fontSize: 14,
    fontFamily: poppins.medium,
    color: Colors.textSecondary,
  },
  selectedFilterText: {
    color: Colors.primary,
  },
  // New styles for bet status tabs
  betStatusTabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  betStatusTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  selectedBetStatusTab: {
    borderBottomColor: Colors.primary,
  },
  betStatusTabText: {
    fontSize: 16,
    fontFamily: poppins.medium,
    color: Colors.textSecondary,
  },
  selectedBetStatusTabText: {
    color: Colors.primary,
  },
  // Empty state styles
  emptyStateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    marginTop: 100,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontFamily: poppins.semiBold,
    color: Colors.textPrimary,
    marginTop: 16,
  },
  emptyStateSubtitle: {
    fontSize: 14,
    fontFamily: poppins.regular,
    color: Colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 4,
    marginTop: 24,
  },
  loginButtonText: {
    fontSize: 16,
    fontFamily: poppins.medium,
    color: Colors.buttonText,
  },
  // Info message styles
  infoMessageContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 8,
    backgroundColor: Colors.cardBackground,
  },
  infoMessageText: {
    fontSize: 14,
    fontFamily: poppins.regular,
    color: Colors.textSecondary,
  },
  // Selected bets styles
  selectedBetsContainer: {
    flex: 1,
  },
  selectedBetsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.primaryLight,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  selectedBetsTitle: {
    fontSize: 16,
    fontFamily: poppins.semiBold,
    color: Colors.textPrimary,
  },
  expandBetsButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  expandBetsButtonText: {
    fontSize: 12,
    fontFamily: poppins.medium,
    color: Colors.buttonText,
  },
  // Bet list section header styles
  betListSectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.background,
  },
  betListSectionTitle: {
    fontSize: 16,
    fontFamily: poppins.semiBold,
    color: Colors.textPrimary,
  },
}); 