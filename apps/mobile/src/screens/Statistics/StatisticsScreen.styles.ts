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
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: Colors.cardBackground,
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryLabel: {
    fontSize: 12,
    fontFamily: poppins.regular,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    fontFamily: poppins.semiBold,
    color: Colors.textPrimary,
  },
  profitValue: {
    color: Colors.success,
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
  timeframeSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  timeframeButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginHorizontal: 4,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activeTimeframeButton: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  timeframeButtonText: {
    fontSize: 14,
    fontFamily: poppins.medium,
    color: Colors.textPrimary,
  },
  activeTimeframeButtonText: {
    color: Colors.buttonText,
  },
  chartContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  chart: {
    borderRadius: 16,
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  activityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityDetails: {
    marginLeft: 12,
  },
  activityTitle: {
    fontSize: 16,
    fontFamily: poppins.medium,
    color: Colors.textPrimary,
  },
  activityDate: {
    fontSize: 12,
    fontFamily: poppins.regular,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  activityAmount: {
    fontSize: 16,
    fontFamily: poppins.semiBold,
  },
  depositAmount: {
    color: Colors.success,
  },
  withdrawalAmount: {
    color: Colors.error,
  },
  winningsAmount: {
    color: Colors.primary,
  },
  viewAllButton: {
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 8,
  },
  viewAllButtonText: {
    fontSize: 14,
    fontFamily: poppins.medium,
    color: Colors.primary,
  },
  performanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  performanceItem: {
    alignItems: 'center',
  },
  performanceCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 3,
    borderColor: Colors.primary,
  },
  performanceCircleText: {
    fontSize: 18,
    fontFamily: poppins.bold,
    color: Colors.primary,
  },
  performanceLabel: {
    fontSize: 14,
    fontFamily: poppins.medium,
    color: Colors.textSecondary,
  },
});
