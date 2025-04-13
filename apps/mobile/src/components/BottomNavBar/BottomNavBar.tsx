import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './BottomNavBar.styles';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../themes/colors';

// navigation tabs with their respective icons
const tabs = [
  { name: 'Home', icon: 'home' },
  { name: 'AI', icon: 'analytics' },
  { name: 'Bets', icon: 'list' },
  { name: 'Stats', icon: 'stats-chart' },
  { name: 'Account', icon: 'person' },
];

// bottom navigation bar component
const BottomNavBar = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState('Home');
  
  // Update active tab based on current route
  useEffect(() => {
    // Set initial active tab based on the current screen
    const currentRouteName = navigation.getState()?.routes[navigation.getState()?.index]?.name;
    const currentParams = navigation.getState()?.routes[navigation.getState()?.index]?.params;
    
    if (currentRouteName === 'Main') {
      setActiveTab('Home');
    } else if (currentRouteName === 'Profile') {
      setActiveTab('Account');
    } else if (currentRouteName === 'Temporary' && currentParams?.screen) {
      setActiveTab(currentParams.screen);
    }
    
    // Listen for navigation state changes
    const unsubscribe = navigation.addListener('state', () => {
      const routeName = navigation.getState()?.routes[navigation.getState()?.index]?.name;
      const params = navigation.getState()?.routes[navigation.getState()?.index]?.params;
      
      if (routeName === 'Main') {
        setActiveTab('Home');
      } else if (routeName === 'Profile') {
        setActiveTab('Account');
      } else if (routeName === 'Temporary' && params?.screen) {
        setActiveTab(params.screen);
      }
    });
    
    return unsubscribe;
  }, [navigation]);

  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName);
    // Navigate to the corresponding screen
    if (tabName === 'Home') {
      navigation.navigate('Main');
    } else if (tabName === 'Account') {
      navigation.navigate('Profile');
    } else {
      navigation.navigate('Temporary', { screen: tabName });
    }
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          style={styles.tab}
          onPress={() => handleTabPress(tab.name)}
        >
          <Ionicons 
            name={activeTab === tab.name ? tab.icon : `${tab.icon}-outline`} 
            size={24} 
            color={activeTab === tab.name ? Colors.primary : Colors.textSecondary} 
          />
          <Text 
            style={[
              styles.tabText, 
              activeTab === tab.name && styles.activeTabText
            ]}
          >
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default BottomNavBar;
