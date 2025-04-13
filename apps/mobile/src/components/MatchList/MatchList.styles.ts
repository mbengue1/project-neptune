import { StyleSheet } from 'react-native';
import { Colors } from '../../themes/colors';
import { poppins } from '../../utils/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: poppins.semiBold,
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  card: {
    padding: 12,
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  matchInfoContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  teamsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 12,
  },
  teamLogoContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
  },
  matchDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontFamily: poppins.medium,
    color: Colors.textPrimary,
    marginRight: 8,
  },
  leagueTag: {
    backgroundColor: Colors.textLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  leagueText: {
    fontSize: 12,
    fontFamily: poppins.medium,
    color: Colors.buttonText,
  },
  date: {
    fontSize: 14,
    fontFamily: poppins.regular,
    color: Colors.textSecondary,
  },
  button: {
    backgroundColor: Colors.background,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.textPrimary,
    fontFamily: poppins.medium,
    fontSize: 14,
  },
});
