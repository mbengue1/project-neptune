import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './CategoryTabs.styles';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../themes/colors';

// sports categories with their respective icons
const categories = [
  { name: 'Soccer', icon: 'football-outline' },
  { name: 'Basketball', icon: 'basketball-outline' },
  { name: 'Football', icon: 'american-football-outline' },
  { name: 'Hockey', icon: 'ice-cream-outline' },
  { name: 'Tennis', icon: 'tennisball-outline' },
];

const CategoryTabs = () => {
  const [selectedCategory, setSelectedCategory] = useState('Soccer');

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category.name}
          style={[
            styles.tab,
            selectedCategory === category.name && styles.selectedTab
          ]}
          onPress={() => setSelectedCategory(category.name)}
        >
          <Ionicons 
            name={category.icon as any} 
            size={20} 
            color={selectedCategory === category.name ? Colors.buttonText : Colors.textPrimary} 
          />
          <Text 
            style={[
              styles.tabText,
              selectedCategory === category.name && styles.selectedTabText
            ]}
          >
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default CategoryTabs;
