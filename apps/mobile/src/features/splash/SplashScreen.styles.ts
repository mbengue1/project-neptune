import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../themes/colors';
import { poppins } from '../../utils/fonts';

const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  backgroundImage: {
    position: 'absolute',
    width: width,
    height: height,
    resizeMode: 'cover',
  },
  logoContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontFamily: poppins.extraBold,
    color: Colors.primary,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 24,
    fontFamily: poppins.semiBold,
    color: Colors.textPrimary,
    marginTop: 8,
  },
  loadingContainer: {
    position: 'absolute',
    bottom: height * 0.15,
    alignItems: 'center',
  },
  loadingDots: {
    flexDirection: 'row',
    marginTop: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
    marginHorizontal: 5,
  },
});