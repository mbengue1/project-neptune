import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { styles } from './ProfileDetailsScreen.styles';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../themes/colors';
import BottomNavBar from '../BottomNavBar/BottomNavBar';
import { useAuth } from '../../features/auth/AuthContext';
import { format } from 'date-fns';

const ProfileDetailsScreen = ({ navigation }: any) => {
  const { user, userData, isLoading } = useAuth();
  
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
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="camera-outline" size={20} color={Colors.buttonText} />
            <Text style={styles.editButtonText}>Change Photo</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Information</Text>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Username</Text>
            <View style={styles.infoValueContainer}>
              <Text style={styles.infoValue}>{userData?.username || 'Not set'}</Text>
              <TouchableOpacity>
                <Ionicons name="create-outline" size={20} color={Colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Email</Text>
            <View style={styles.infoValueContainer}>
              <Text style={styles.infoValue}>{userData?.email || user?.email || 'Not set'}</Text>
              <TouchableOpacity>
                <Ionicons name="create-outline" size={20} color={Colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Full Name</Text>
            <View style={styles.infoValueContainer}>
              <Text style={styles.infoValue}>{userData?.fullName || 'Not set'}</Text>
              <TouchableOpacity>
                <Ionicons name="create-outline" size={20} color={Colors.primary} />
              </TouchableOpacity>
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
              <TouchableOpacity>
                <Ionicons name="create-outline" size={20} color={Colors.primary} />
              </TouchableOpacity>
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
        
        <TouchableOpacity style={styles.passwordButton}>
          <Ionicons name="lock-closed-outline" size={20} color={Colors.buttonText} />
          <Text style={styles.passwordButtonText}>Change Password</Text>
        </TouchableOpacity>
      </ScrollView>
      
      <BottomNavBar navigation={navigation} />
    </SafeAreaView>
  );
};

export default ProfileDetailsScreen;
