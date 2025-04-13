import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../themes/colors';
import { poppins } from '../utils/fonts';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../features/auth/AuthContext';
import BottomNavBar from '../components/BottomNavBar/BottomNavBar';

// temporary profile screen
const ProfileScreen = ({ navigation }: any) => {
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>Profile Screen</Text>
        <Text style={styles.message}>
          This is your profile page. Account settings and preferences will appear here.
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
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    fontFamily: poppins.regular,
    color: Colors.textSecondary,
    textAlign: 'center',
    maxWidth: '80%',
  },
});

export default ProfileScreen;
