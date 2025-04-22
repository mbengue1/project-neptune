import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator, TextInput, Alert } from 'react-native';
import { styles } from './ProfileDetailsScreen.styles';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../themes/colors';
import BottomNavBar from '../BottomNavBar/BottomNavBar';
import { useAuth } from '../../features/auth/AuthContext/AuthContext';
import { format } from 'date-fns';
import { PasswordConfirmModal } from '../PasswordConfirm/PasswordConfirmModal';
import { ChangePasswordModal } from '../ChangePassword/ChangePasswordModal';

const ProfileDetailsScreen = ({ navigation }: any) => {
  const { user, userData, isLoading, updateUsername, updateEmail, updatePassword } = useAuth();
  const [isEditing, setIsEditing] = useState<'username' | 'email' | null>(null);
  const [newValue, setNewValue] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingEmailVerification, setPendingEmailVerification] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

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

  const handleUpdateUsername = async () => {
    try {
      await updateUsername(newValue);
      setIsEditing(null);
      setNewValue('');
      setError(null);
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
      setError(null);
      
      // Show pending verification message
      setPendingEmailVerification(true);
      
      // Show success message
      Alert.alert(
        "Verification Email Sent",
        "A verification email has been sent to your new email address. Please check your inbox and follow the instructions to complete the email change.",
        [{ text: "OK" }]
      );
    } catch (err: any) {
      throw err;
    }
  };

  const handleCancel = () => {
    setIsEditing(null);
    setNewValue('');
    setError(null);
  };

  const handleChangePassword = async (currentPassword: string, newPassword: string) => {
    try {
      if (!user) {
        throw new Error('Please log out and log in again before changing your password');
      }
      
      await updatePassword(currentPassword, newPassword);
    } catch (err: any) {
      throw err; // This will be handled by the modal
    }
  };

  // Format date of birth if available
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Not set';
    
    try {
      const date = new Date(dateString);
      return format(date, 'MM/dd/yyyy');
    } catch (error) {
      return dateString;
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile Details</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.profileImageSection}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person-circle" size={100} color={Colors.primary} />
          </View>
          <TouchableOpacity style={styles.editButtonCam}>
            <Ionicons name="camera-outline" size={20} color={Colors.buttonText} />
            <Text style={styles.editCamButtonText}>Change Photo</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Information</Text>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Username</Text>
            <View style={styles.infoValueContainer}>
              {isEditing === 'username' ? (
                <>
                  <TextInput
                    style={styles.editInput}
                    value={newValue}
                    onChangeText={setNewValue}
                    autoCapitalize="none"
                    autoFocus
                  />
                  <TouchableOpacity onPress={handleSave} style={styles.editButton}>
                    <Text style={styles.editButtonText}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleCancel} style={styles.editButton}>
                    <Text style={styles.editButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text style={styles.infoValue}>{userData?.username || 'Not set'}</Text>
                  <TouchableOpacity onPress={() => handleEditPress('username')}>
                    <Ionicons name="create-outline" size={20} color={Colors.primary} />
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Email</Text>
            <View style={styles.infoValueContainer}>
              {isEditing === 'email' ? (
                <>
                  <TextInput
                    style={styles.editInput}
                    value={newValue}
                    onChangeText={setNewValue}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    autoFocus
                  />
                  <TouchableOpacity onPress={handleSave} style={styles.editButton}>
                    <Text style={styles.editButtonText}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleCancel} style={styles.editButton}>
                    <Text style={styles.editButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text style={styles.infoValue}>
                    {userData?.email || user?.email || 'Not set'}
                    {pendingEmailVerification && " (Verification pending)"}
                  </Text>
                  <TouchableOpacity onPress={() => handleEditPress('email')}>
                    <Ionicons name="create-outline" size={20} color={Colors.primary} />
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Full Name</Text>
            <View style={styles.infoValueContainer}>
              <Text style={styles.infoValue}>{userData?.fullName || 'Not set'}</Text>
            </View>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Date of Birth</Text>
            <View style={styles.infoValueContainer}>
              <Text style={styles.infoValue}>{formatDate(userData?.dateOfBirth)}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Phone Number</Text>
            <View style={styles.infoValueContainer}>
              <Text style={styles.infoValue}>{userData?.phoneNumber || 'Not set'}</Text>
              <TouchableOpacity>
                <Ionicons name="create-outline" size={20} color={Colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Country</Text>
            <View style={styles.infoValueContainer}>
              <Text style={styles.infoValue}>{userData?.country || 'Not set'}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Details</Text>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Member Since</Text>
            <View style={styles.infoValueContainer}>
              <Text style={styles.infoValue}>{userData?.joinDate || 'Not available'}</Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.passwordButton}
          onPress={() => setShowChangePasswordModal(true)}
        >
          <Ionicons name="lock-closed-outline" size={20} color={Colors.buttonText} />
          <Text style={styles.passwordButtonText}>Change Password</Text>
        </TouchableOpacity>
      </ScrollView>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
      
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
      
      <ChangePasswordModal
        isVisible={showChangePasswordModal}
        onClose={() => setShowChangePasswordModal(false)}
        onSubmit={handleChangePassword}
      />
      
      <BottomNavBar navigation={navigation} />
    </SafeAreaView>
  );
};

export default ProfileDetailsScreen;
