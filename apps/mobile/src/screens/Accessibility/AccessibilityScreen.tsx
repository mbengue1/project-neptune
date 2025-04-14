import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { styles } from './AccessibilityScreen.styles';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../themes/colors';
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar';

const AccessibilityScreen = ({ navigation }: any) => {
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [screenReader, setScreenReader] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Accessibility</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Display Settings</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Larger Text</Text>
              <Text style={styles.settingDescription}>Increase the text size for better readability</Text>
            </View>
            <Switch
              trackColor={{ false: Colors.border, true: Colors.primary }}
              thumbColor={Colors.buttonText}
              ios_backgroundColor={Colors.border}
              onValueChange={() => setLargeText(prev => !prev)}
              value={largeText}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>High Contrast</Text>
              <Text style={styles.settingDescription}>Enhance color contrast for better visibility</Text>
            </View>
            <Switch
              trackColor={{ false: Colors.border, true: Colors.primary }}
              thumbColor={Colors.buttonText}
              ios_backgroundColor={Colors.border}
              onValueChange={() => setHighContrast(prev => !prev)}
              value={highContrast}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interaction Settings</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Screen Reader Support</Text>
              <Text style={styles.settingDescription}>Optimize app for screen readers</Text>
            </View>
            <Switch
              trackColor={{ false: Colors.border, true: Colors.primary }}
              thumbColor={Colors.buttonText}
              ios_backgroundColor={Colors.border}
              onValueChange={() => setScreenReader(prev => !prev)}
              value={screenReader}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Reduce Motion</Text>
              <Text style={styles.settingDescription}>Minimize animations throughout the app</Text>
            </View>
            <Switch
              trackColor={{ false: Colors.border, true: Colors.primary }}
              thumbColor={Colors.buttonText}
              ios_backgroundColor={Colors.border}
              onValueChange={() => setReduceMotion(prev => !prev)}
              value={reduceMotion}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Responsible Gambling Tools</Text>
          <Text style={styles.paragraph}>
            We are committed to promoting responsible gambling. Our app includes several features to help you maintain control:
          </Text>
          
          <Text style={styles.subTitle}>Time Management</Text>
          <Text style={styles.paragraph}>
            • Set session time limits{'\n'}
            • Receive notifications when you've been playing for extended periods{'\n'}
            • Schedule breaks during gameplay
          </Text>
          
          <Text style={styles.subTitle}>Spending Controls</Text>
          <Text style={styles.paragraph}>
            • Set deposit limits (daily, weekly, or monthly){'\n'}
            • Set loss limits to control how much you can lose{'\n'}
            • Set wagering limits to control how much you can bet
          </Text>
          
          <Text style={styles.subTitle}>Self-Assessment</Text>
          <Text style={styles.paragraph}>
            • Take our self-assessment test to evaluate your gambling habits{'\n'}
            • View your gambling history and patterns{'\n'}
            • Receive personalized insights about your gambling behavior
          </Text>
          
          <Text style={styles.subTitle}>Self-Exclusion</Text>
          <Text style={styles.paragraph}>
            If you feel you need to take a break from gambling, you can use our self-exclusion feature to temporarily or permanently block access to your account.
          </Text>
          
          <TouchableOpacity style={styles.toolButton}>
            <Text style={styles.toolButtonText}>Access Responsible Gambling Tools</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support Resources</Text>
          <Text style={styles.paragraph}>
            If you or someone you know is struggling with gambling addiction, help is available:
          </Text>
          
          <View style={styles.resourceItem}>
            <Ionicons name="call" size={20} color={Colors.primary} />
            <Text style={styles.resourceText}>National Problem Gambling Helpline: 1-800-522-4700</Text>
          </View>
          
          <View style={styles.resourceItem}>
            <Ionicons name="globe" size={20} color={Colors.primary} />
            <Text style={styles.resourceText}>Gamblers Anonymous: www.gamblersanonymous.org</Text>
          </View>
          
          <View style={styles.resourceItem}>
            <Ionicons name="globe" size={20} color={Colors.primary} />
            <Text style={styles.resourceText}>National Council on Problem Gambling: www.ncpgambling.org</Text>
          </View>
        </View>
      </ScrollView>
      
      <BottomNavBar navigation={navigation} />
    </SafeAreaView>
  );
};

export default AccessibilityScreen;
