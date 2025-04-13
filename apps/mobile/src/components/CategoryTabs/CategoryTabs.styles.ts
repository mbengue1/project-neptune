import { StyleSheet } from 'react-native';
import { Colors } from '../../themes/colors';
import { poppins } from '../../utils/fonts';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    paddingVertical: 8,
    height: 50,
    maxHeight: 50,
  },
  contentContainer: {
    paddingHorizontal: 12,
    height: 34,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: Colors.cardBackground,
    borderRadius: 20,
    marginHorizontal: 4,
    height: 34,
  },
  selectedTab: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    color: Colors.textPrimary,
    fontFamily: poppins.medium,
    fontSize: 12,
    marginLeft: 4,
  },
  selectedTabText: {
    color: Colors.buttonText,
  },
});
