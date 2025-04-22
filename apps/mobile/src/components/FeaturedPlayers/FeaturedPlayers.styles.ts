import { StyleSheet } from 'react-native';
import { Colors } from '../../themes/colors';
import { poppins } from '../../utils/fonts';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: poppins.semiBold,
    color: Colors.textPrimary,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  scrollContent: {
    paddingHorizontal: 12,
  },
  playerCard: {
    alignItems: 'center',
    marginHorizontal: 4,
    width: 80,
  },
  playerIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  playerName: {
    fontSize: 12,
    fontFamily: poppins.medium,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  teamName: {
    fontSize: 10,
    fontFamily: poppins.regular,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
}); 