import { StyleSheet } from 'react-native';
import { Colors } from '../../themes/colors';
import { Fonts } from '../../themes/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: Fonts.Exo2_700Bold,
    fontSize: 18,
    color: Colors.textPrimary,
    marginBottom: 12,
    marginTop: 16,
    paddingHorizontal: 16,
  },
  playerCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  playerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerName: {
    fontFamily: Fonts.Exo2_700Bold,
    fontSize: 16,
    color: Colors.textPrimary,
    marginRight: 8,
  },
  teamName: {
    fontFamily: Fonts.Exo2_400Regular,
    fontSize: 14,
    color: Colors.textSecondary,
  },
  betRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.cardBorder,
  },
  betInfo: {
    flex: 1,
  },
  statLine: {
    fontFamily: Fonts.Exo2_700Bold,
    fontSize: 15,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  oddsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
  },
  oddsButton: {
    backgroundColor: Colors.buttonBackground,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginLeft: 10,
    minWidth: 90,
    alignItems: 'center',
  },
  oddsButtonActive: {
    backgroundColor: Colors.primaryBlue,
  },
  oddsType: {
    fontFamily: Fonts.Exo2_400Regular,
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  oddsValue: {
    fontFamily: Fonts.Exo2_700Bold,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  oddsValueActive: {
    color: Colors.buttonText,
  },
  noDataContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  noDataText: {
    fontFamily: Fonts.Exo2_400Regular,
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
}); 