import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from './ProfileDetailsScreen.styles';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../themes/colors';
import BottomNavBar from '../BottomNavBar/BottomNavBar';
import { useAuth } from '../../features/auth/AuthContext';

const ProfileDetailsScreen = ({ navigation }: any) => {
  const { user } = useAuth();
  
  // Mock user data (will be replaced with real data later)
  const userData = {
    email: user?.email || 'user@example.com',
    username: 'SportsFan123',
    name: 'John Doe',
    dateOfBirth: '01/01/1990',
    phoneNumber: '+1 (555) 123-4567',
    country: 'United States',
    joinDate: 'January 2023'
  };

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
              <Text style={styles.infoValue}>{userData.username}</Text>
              <TouchableOpacity>
                <Ionicons name="create-outline" size={20} color={Colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Email</Text>
            <View style={styles.infoValueContainer}>
              <Text style={styles.infoValue}>{userData.email}</Text>
              <TouchableOpacity>
                <Ionicons name="create-outline" size={20} color={Colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Full Name</Text>
            <View style={styles.infoValueContainer}>
              <Text style={styles.infoValue}>{userData.name}</Text>
              <TouchableOpacity>
                <Ionicons name="create-outline" size={20} color={Colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Date of Birth</Text>
            <View style={styles.infoValueContainer}>
              <Text style={styles.infoValue}>{userData.dateOfBirth}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Phone Number</Text>
            <View style={styles.infoValueContainer}>
              <Text style={styles.infoValue}>{userData.phoneNumber}</Text>
              <TouchableOpacity>
                <Ionicons name="create-outline" size={20} color={Colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Country</Text>
            <View style={styles.infoValueContainer}>
              <Text style={styles.infoValue}>{userData.country}</Text>
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
              <Text style={styles.infoValue}>{userData.joinDate}</Text>
            </View>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>User ID</Text>
            <View style={styles.infoValueContainer}>
              <Text style={styles.infoValue}>{user?.uid || 'USR12345'}</Text>
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
