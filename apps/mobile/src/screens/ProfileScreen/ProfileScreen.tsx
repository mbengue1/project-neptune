import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Switch, TextInput } from 'react-native';
import { styles } from './ProfileScreen.styles';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../themes/colors';
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar';
import { useAuth } from '../../features/auth/AuthContext/AuthContext';
import { PasswordConfirmModal } from '../../components/PasswordConfirm/PasswordConfirmModal';

const ProfileScreen = ({ navigation }: any) => {
  const { logout, userData, user, updateUsername, updateEmail } = useAuth();
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = React.useState(true);
  const [isEditing, setIsEditing] = useState<'username' | 'email' | null>(null);
  const [newValue, setNewValue] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    await logout();
  };

  const toggleDarkMode = () => setIsDarkMode(previousState => !previousState);
  const toggleNotifications = () => setIsNotificationsEnabled(previousState => !previousState);

  const handleUpdateUsername = async () => {
    try {
      await updateUsername(newValue);
      setIsEditing(null);
      setNewValue('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleUpdateEmail = async (password: string) => {
    try {
      await updateEmail(newValue, password);
      setIsEditing(null);
      setNewValue('');
      setShowPasswordModal(false);
    } catch (err: any) {
      throw err; // This will be handled by the modal
    }
  };

  const handleEditPress = (field: 'username' | 'email') => {
    setIsEditing(field);
    setNewValue(field === 'username' ? userData?.username || '' : userData?.email || '');
  };

  const handleSave = async () => {
    if (!newValue.trim()) {
      setError('Field cannot be empty');
      return;
    }

    try {
      if (isEditing === 'username') {
        await handleUpdateUsername();
      } else if (isEditing === 'email') {
        setShowPasswordModal(true);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleCancel = () => {
    setIsEditing(null);
    setNewValue('');
    setError(null);
  };

  // Log user ID for development purposes only
  console.log('User ID for development:', user?.uid);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Account</Text>
      </View>
      
      <ScrollView style={styles.scrollView}>
        {/* Profile & Balance Section */}
        <View style={styles.section}>
          <View style={styles.profileContainer}>
            <View style={styles.avatarContainer}>
              <Ionicons name="person-circle" size={80} color={Colors.primary} />
              <Text style={styles.username}>@{userData?.username || 'User'}</Text>
            </View>
            <View style={styles.balanceContainer}>
              <Text style={styles.balanceLabel}>Total Balance</Text>
              <Text style={styles.balanceAmount}>$1,250.00</Text>
            </View>
          </View>
          
          <View style={styles.paymentButtonsContainer}>
            <TouchableOpacity style={styles.paymentButton}>
              <Ionicons name="add-circle-outline" size={24} color={Colors.buttonText} />
              <Text style={styles.paymentButtonText}>Deposit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.paymentButton}>
              <Ionicons name="arrow-down-circle-outline" size={24} color={Colors.buttonText} />
              <Text style={styles.paymentButtonText}>Withdraw</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Profile Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile</Text>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('ProfileDetails')}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name="person-outline" size={24} color={Colors.textPrimary} />
              <Text style={styles.menuItemText}>
              {userData?.username || 'User'}
              </Text>
            </View>
            <View style={styles.menuItemRight}>
              <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
            </View>
          </TouchableOpacity>
        </View>
        
        {/* Payment Methods Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Methods</Text>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('PaymentMethods')}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name="card-outline" size={24} color={Colors.textPrimary} />
              <Text style={styles.menuItemText}>Manage Payment Methods</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
          
        </View>
        
        {/* Statistics Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Statistics</Text>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('Statistics')}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name="stats-chart" size={24} color={Colors.textPrimary} />
              <Text style={styles.menuItemText}>Activity & Winnings</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
          
        </View>
        
        {/* App Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          <View style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="moon-outline" size={24} color={Colors.textPrimary} />
              <Text style={styles.menuItemText}>Dark Mode</Text>
            </View>
            <Switch
              trackColor={{ false: Colors.border, true: Colors.primary }}
              thumbColor={Colors.buttonText}
              ios_backgroundColor={Colors.border}
              onValueChange={toggleDarkMode}
              value={isDarkMode}
            />
          </View>
          <View style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="notifications-outline" size={24} color={Colors.textPrimary} />
              <Text style={styles.menuItemText}>Notifications</Text>
            </View>
            <Switch
              trackColor={{ false: Colors.border, true: Colors.primary }}
              thumbColor={Colors.buttonText}
              ios_backgroundColor={Colors.border}
              onValueChange={toggleNotifications}
              value={isNotificationsEnabled}
            />
          </View>
        </View>
        
        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('HelpSupport')}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name="help-circle-outline" size={24} color={Colors.textPrimary} />
              <Text style={styles.menuItemText}>Help & Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => navigation.navigate('Accessibility')}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name="accessibility-outline" size={24} color={Colors.textPrimary} />
              <Text style={styles.menuItemText}>Accessibility</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>
        
        {/* Logout Section */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color={Colors.error} />
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
        
        {/* Version info with gambling support */}
        <View style={styles.footerContainer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
          <View style={styles.gamblingHelpContainer}>
            <Ionicons name="call-outline" size={16} color={Colors.textSecondary} />
            <Text style={styles.gamblingHelpText}>
              Need help with gambling? Call 1-800-522-4700
            </Text>
          </View>
          <View style={styles.gamblingHelpContainer}>
            <Ionicons name="time-outline" size={16} color={Colors.textSecondary} />
            <Text style={styles.gamblingHelpText}>
              National Problem Gambling Helpline - Available 24/7
            </Text>
          </View>
        </View>
      </ScrollView>
      
      <BottomNavBar navigation={navigation} />
      
      <PasswordConfirmModal
        isVisible={showPasswordModal}
        onClose={() => {
          setShowPasswordModal(false);
          setIsEditing(null);
          setNewValue('');
        }}
        onConfirm={handleUpdateEmail}
        title="Confirm Password"
        message="Please enter your password to update your email address"
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;
