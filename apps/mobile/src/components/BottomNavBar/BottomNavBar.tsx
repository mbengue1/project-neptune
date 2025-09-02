import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './BottomNavBar.styles';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../themes/colors';

// navigation tabs with their respective icons
const tabs = [
  { name: 'Home', icon: 'home' },
  { name: 'AI', icon: 'analytics' },
  { name: 'My Bets', icon: 'list' },
  { name: 'Stats', icon: 'stats-chart' },
  { name: 'Account', icon: 'person' },
];

// bottom navigation bar component
const BottomNavBar = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState('Home');
  
  // Update active tab based on current route
  useEffect(() => {
    const unsubscribe = navigation.addListener('state', (e: any) => {
      const routes = e.data.state.routes;
      const currentRoute = routes[routes.length - 1];
      const routeName = currentRoute.name;
      const params = currentRoute.params;
      
      updateActiveTab(routeName, params);
    });

    return unsubscribe;
  }, [navigation]);

  const updateActiveTab = (routeName: string, params: any) => {
    if (routeName === 'Main') {
      setActiveTab('Home');
    } else if (routeName === 'Bets') {
      setActiveTab('My Bets');
    } else if (routeName === 'AIPage') {
      setActiveTab('AI');
    } else if (routeName === 'Statistics') {
      setActiveTab('Stats');
    } else if (
      routeName === 'Profile' || 
      routeName === 'ProfileDetails' || 
      routeName === 'HelpSupport' || 
      routeName === 'Accessibility' ||
      routeName === 'PaymentMethods'
    ) {
      setActiveTab('Account');
    } else if (routeName === 'Temporary' && params?.screen) {
      setActiveTab(params.screen);
    }
  };

  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName);
    // Navigate to the corresponding screen
    if (tabName === 'Home') {
      navigation.navigate('Main');
    } else if (tabName === 'AI') {
      navigation.navigate('AIPage');
    } else if (tabName === 'My Bets') {
      navigation.navigate('Bets', { sportType: 'All' });
    } else if (tabName === 'Stats') {
      navigation.navigate('Statistics');
    } else if (tabName === 'Account') {
      navigation.navigate('Profile');
    } else {
      // For other tabs, navigate to a temporary screen with the tab name as a parameter
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
            name={(activeTab === tab.name ? tab.icon : `${tab.icon}-outline`) as any} 
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
