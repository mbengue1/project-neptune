import { StyleSheet } from 'react-native';
import { Colors } from '../../themes/colors';
import { poppins } from '../../utils/fonts';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: Colors.cardBackground,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  // Collapsed view styles
  collapsedContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 80,
  },
  collapsedInfo: {
    flex: 1,
  },
  betCountText: {
    fontSize: 16,
    fontFamily: poppins.semiBold,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  tapToExpandText: {
    fontSize: 12,
    fontFamily: poppins.regular,
    color: Colors.textSecondary,
  },
  expandButton: {
    padding: 8,
  },
  // Expanded view styles
  expandedContent: {
    flex: 1,
  },
  expandedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  expandedTitle: {
    fontSize: 18,
    fontFamily: poppins.semiBold,
    color: Colors.textPrimary,
  },
  betsList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  betItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  betInfo: {
    flex: 1,
    marginRight: 12,
  },
  betTitle: {
    fontSize: 14,
    fontFamily: poppins.semiBold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  betOption: {
    fontSize: 12,
    fontFamily: poppins.medium,
    color: Colors.primary,
    marginBottom: 2,
  },
  matchTitle: {
    fontSize: 11,
    fontFamily: poppins.regular,
    color: Colors.textSecondary,
  },
  betActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  oddsText: {
    fontSize: 14,
    fontFamily: poppins.semiBold,
    color: Colors.primary,
    marginRight: 8,
  },
  removeButton: {
    padding: 4,
  },
  // Empty state styles
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    fontFamily: poppins.semiBold,
    color: Colors.textPrimary,
    marginTop: 12,
    marginBottom: 4,
  },
  emptyStateSubtext: {
    fontSize: 12,
    fontFamily: poppins.regular,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  // Action buttons styles
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  clearButton: {
    flex: 1,
    backgroundColor: Colors.cardBackground,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 14,
    fontFamily: poppins.medium,
    color: Colors.textPrimary,
  },
  continueButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 14,
    fontFamily: poppins.medium,
    color: Colors.buttonText,
  },
}); 