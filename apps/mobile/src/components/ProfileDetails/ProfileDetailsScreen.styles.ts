import { StyleSheet } from 'react-native';
import { Colors } from '../../themes/colors';
import { poppins } from '../../utils/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: Colors.textSecondary,
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
  headerTitle: {
    fontSize: 18,
    fontFamily: poppins.semiBold,
    color: Colors.textPrimary,
  },
  backButton: {
    padding: 4,
  },
  placeholder: {
    width: 24, // Same width as the back button icon for balance
  },
  scrollView: {
    flex: 1,
  },
  profileImageSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  editButtonCam: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editCamButtonText: {
    alignSelf: 'center',

    color: Colors.buttonText,
    fontFamily: poppins.medium,
    fontSize: 14,
    marginLeft: 8,
  },
  section: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: poppins.semiBold,
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  infoItem: {
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: poppins.regular,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  infoValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoValue: {
    fontSize: 16,
    fontFamily: poppins.medium,
    color: Colors.textPrimary,
  },
  passwordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    marginHorizontal: 16,
    marginVertical: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  passwordButtonText: {
    color: Colors.buttonText,
    fontFamily: poppins.medium,
    fontSize: 16,
    marginLeft: 8,
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
    paddingHorizontal: 16,
  },
});
