import { StyleSheet } from 'react-native';
import { Colors } from '../../themes/colors';
import { poppins } from '../../utils/fonts';

export const styles = StyleSheet.create({
  container: {
    margin: 16,
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  matchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  teamContainer: {
    alignItems: 'center',
    flex: 1,
  },
  teamLogoContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  teamName: {
    color: Colors.buttonText,
    fontFamily: poppins.semiBold,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  scoreContainer: {
    alignItems: 'center',
    flex: 1,
  },
  score: {
    color: Colors.buttonText,
    fontFamily: poppins.bold,
    fontSize: 36,
  },
  period: {
    color: Colors.buttonText,
    fontFamily: poppins.medium,
    fontSize: 16,
    marginTop: 4,
  },
  oddsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
  },
  middleOddsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 12,
  },
  oddsMultiplier: {
    color: Colors.buttonText,
    fontFamily: poppins.medium,
    fontSize: 12,
    marginRight: 4,
  },
  odds: {
    color: Colors.buttonText,
    fontFamily: poppins.semiBold,
    fontSize: 14,
  },
  oddsValue: {
    color: Colors.buttonText,
    fontFamily: poppins.medium,
    fontSize: 12,
    marginLeft: 4,
  },
});
