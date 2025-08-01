import { StyleSheet } from 'react-native';
import { Colors } from '../../themes/colors';
import { poppins } from '../../utils/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  sportSection: {
    marginBottom: 4,
  },
  sportTitle: {
    fontSize: 18,
    fontFamily: poppins.semiBold,
    color: Colors.textPrimary,
    paddingHorizontal: 16,
    marginTop: 2,
    marginBottom: 8,
  },
  liveMatches: {
    marginTop: 4,
  },
  liveMatchesTitle: {
    fontSize: 20,
    fontFamily: poppins.semiBold,
    color: Colors.primary,
    paddingHorizontal: 16,
    marginBottom: 6,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 16,
    fontFamily: poppins.medium,
    color: Colors.textSecondary,
    marginTop: 12,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 16,
    fontFamily: poppins.medium,
    color: Colors.error,
    textAlign: 'center',
    marginBottom: 8,
  },
  errorSubtext: {
    fontSize: 14,
    fontFamily: poppins.regular,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});