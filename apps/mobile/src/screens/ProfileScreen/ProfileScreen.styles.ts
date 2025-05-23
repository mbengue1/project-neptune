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
  headerTitle: {
    fontSize: 18,
    fontFamily: poppins.semiBold,
    color: Colors.textPrimary,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: poppins.semiBold,
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  profileContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    marginBottom: 16,
    alignItems: 'center',
  },
  balanceContainer: {
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 14,
    fontFamily: poppins.regular,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 24,
    fontFamily: poppins.bold,
    color: Colors.textPrimary,
  },
  paymentButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.48,
  },
  paymentButtonText: {
    color: Colors.buttonText,
    fontFamily: poppins.medium,
    fontSize: 14,
    marginLeft: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  menuItemText: {
    fontSize: 16,
    fontFamily: poppins.medium,
    color: Colors.textPrimary,
    marginLeft: 12,
  },
  menuItemValue: {
    color: Colors.textSecondary,
    fontFamily: poppins.regular,
    fontSize: 16,
    marginRight: 8,
  },
  paymentMethodsPreview: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  paymentMethodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  paymentMethodText: {
    fontSize: 14,
    fontFamily: poppins.medium,
    color: Colors.textPrimary,
    marginLeft: 6,
  },
  statsPreviewContainer: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statsPreviewItem: {
    alignItems: 'center',
    flex: 1,
  },
  statsPreviewLabel: {
    fontSize: 12,
    fontFamily: poppins.regular,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  statsPreviewValue: {
    fontSize: 16,
    fontFamily: poppins.semiBold,
    color: Colors.textPrimary,
  },
  profitValue: {
    color: Colors.success,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: poppins.medium,
    color: Colors.error,
    marginLeft: 8,
  },
  footerContainer: {
    marginVertical: 24,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  versionText: {
    fontSize: 12,
    fontFamily: poppins.regular,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  gamblingHelpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  gamblingHelpText: {
    fontSize: 12,
    fontFamily: poppins.medium,
    color: Colors.textSecondary,
    marginLeft: 6,
    textAlign: 'center',
  },
  username: {
    fontFamily: poppins.medium,
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  editInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    color: Colors.textPrimary,
    fontFamily: poppins.regular,
  },
  editButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: Colors.primary,
    marginLeft: 8,
  },
  editButtonText: {
    color: Colors.buttonText,
    fontFamily: poppins.medium,
    fontSize: 14,
  },
  errorText: {
    color: Colors.error,
    fontFamily: poppins.regular,
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
});
