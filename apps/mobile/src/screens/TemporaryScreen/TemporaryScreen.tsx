import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { Colors } from '../../themes/colors';
import { poppins } from '../../utils/fonts';
import { Ionicons } from '@expo/vector-icons';
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar';

// temporary screen for sections under development
const TemporaryScreen = ({ navigation, route }: any) => {
  const screenName = route.params?.screen || 'Feature';
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{screenName}</Text>
      </View>
      
      <View style={styles.content}>
        <Ionicons name="construct-outline" size={80} color={Colors.primary} />
        <Text style={styles.title}>Coming Soon</Text>
        <Text style={styles.message}>
          We're working hard to bring you the {screenName} feature.
          Check back soon!
        </Text>
      </View>
      
      <BottomNavBar navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: poppins.bold,
    color: Colors.textPrimary,
    marginTop: 20,
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    fontFamily: poppins.regular,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 40,
    maxWidth: '80%',
  },
});

export default TemporaryScreen;
