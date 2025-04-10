import React from 'react';
import { View, Text, Pressable, ScrollView, Image, StyleSheet } from 'react-native';
import { useAuth } from '../auth/AuthContext';
import { AppStyles } from '../../themes/styles';
import { Colors } from '../../themes/colors';
import { poppins } from '../../utils/fonts';

export const MainScreen = () => {
  const { logout, user, isLoading } = useAuth();

  return (
    <View style={AppStyles.container}>
      <Image 
        source={require('../../../assets/objects.png')} 
        style={AppStyles.backgroundImage} 
      />
      
      <ScrollView 
        style={AppStyles.contentContainer} 
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Welcome to Neptune!</Text>
          
          {user && (
            <View style={styles.userInfo}>
              <Text style={styles.userInfoText}>
                <Text style={styles.userInfoLabel}>Email: </Text>
                {user.email}
              </Text>
              
              {user.name && (
                <Text style={styles.userInfoText}>
                  <Text style={styles.userInfoLabel}>Name: </Text>
                  {user.name}
                </Text>
              )}
              
              <Text style={styles.userInfoText}>
                <Text style={styles.userInfoLabel}>User ID: </Text>
                {user.id}
              </Text>
            </View>
          )}
          
          <Text style={styles.description}>
            You have successfully logged in! This is a temporary main page for testing authentication.
          </Text>
          
          <Pressable 
            style={[AppStyles.button, styles.logoutButton]}
            onPress={logout}
            disabled={isLoading}
          >
            <Text style={AppStyles.buttonText}>Logout</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: poppins.semiBold,
    color: Colors.textPrimary,
    marginBottom: 30,
    textAlign: 'center',
  },
  userInfo: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 20,
    width: '100%',
    marginBottom: 30,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  userInfoText: {
    fontSize: 16,
    fontFamily: poppins.regular,
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  userInfoLabel: {
    fontFamily: poppins.medium,
    color: Colors.primary,
  },
  description: {
    fontSize: 18,
    fontFamily: poppins.regular,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 40,
  },
  logoutButton: {
    width: '100%',
    marginTop: 20,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
});