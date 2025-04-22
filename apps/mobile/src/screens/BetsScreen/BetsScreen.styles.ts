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
  headerTitle: {
    fontSize: 20,
    fontFamily: poppins.semiBold,
    color: Colors.textPrimary,
  },
  content: {
    flex: 1,
  },
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
}); 