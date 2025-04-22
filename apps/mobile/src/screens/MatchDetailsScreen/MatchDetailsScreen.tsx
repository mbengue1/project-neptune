import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './MatchDetailsScreen.styles';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../themes/colors';
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar';
import { mockBetsByCategory, BetOption, Bet, BetCategories } from '../../data/mockBets';

const betCategories = [
  { id: 'popular', name: 'Popular' },
  { id: 'same_game', name: 'Same Game Parlay™' },
  { id: 'specials', name: 'Specials' },
  { id: 'goal_scorers', name: 'Goal Scorers' },
  { id: 'goals', name: 'Goals' },
  { id: 'team_props', name: 'Team Props' },
  { id: 'shots_target', name: 'Shots on Target' },
  { id: 'shots', name: 'Shots' },
  { id: 'corners', name: 'Corners' },
];

const MatchDetailsScreen = ({ route, navigation }) => {
  const { match } = route.params;
  const [selectedCategory, setSelectedCategory] = useState('popular');
  const [expandedSections, setExpandedSections] = useState(new Set(['1'])); // Default first section open

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const renderBetSection = (bet) => {
    const isExpanded = expandedSections.has(bet.id);

    return (
      <View key={bet.id} style={styles.betSection}>
        <TouchableOpacity 
          style={styles.betHeader}
          onPress={() => toggleSection(bet.id)}
        >
          <Text style={styles.betTitle}>{bet.title}</Text>
          <View style={styles.headerRight}>
            {bet.sgp && (
              <View style={styles.sgpBadge}>
                <Text style={styles.sgpText}>SGP</Text>
              </View>
            )}
            <Ionicons 
              name={isExpanded ? 'chevron-up' : 'chevron-down'} 
              size={20}
              color={Colors.textSecondary}
              style={styles.expandIcon}
            />
          </View>
        </TouchableOpacity>
        
        {isExpanded && (
          <>
            {bet.description && (
              <Text style={styles.betDescription}>{bet.description}</Text>
            )}
            <View style={styles.oddsContainer}>
              {bet.options.map((option, index) => (
                <View key={index} style={styles.oddsRow}>
                  <Text style={styles.oddsLabel}>{option.label}</Text>
                  <TouchableOpacity style={styles.oddsButton}>
                    <Text style={styles.oddsValue}>{option.value}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Match Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.matchInfo}>
          <Text style={styles.leagueTitle}>{match.league}</Text>
          <Text style={styles.gamesAvailable}>20 Games Available</Text>
        </View>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Teams Section */}
      <View style={styles.teamsContainer}>
        <View style={styles.teamRow}>
          <Ionicons name="football" size={24} color={Colors.textPrimary} />
          <Text style={styles.teamName}>{match.homeTeam.name}</Text>
        </View>
        <View style={styles.teamRow}>
          <Ionicons name="football" size={24} color={Colors.textPrimary} />
          <Text style={styles.teamName}>{match.awayTeam.name}</Text>
        </View>
        <Text style={styles.matchTime}>{match.date}</Text>
      </View>

      {/* Bet Categories and Sections Container */}
      <View style={{ flex: 1 }}>
        {/* Bet Categories */}
        <View style={styles.categoriesContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 8 }}
          >
            {betCategories.map(category => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryTab,
                  selectedCategory === category.id && styles.selectedCategory
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category.id && styles.selectedCategoryText
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Bet Sections */}
        <ScrollView style={styles.content}>
          {mockBetsByCategory[selectedCategory]?.map(bet => renderBetSection(bet))}
        </ScrollView>
      </View>

      <BottomNavBar navigation={navigation} />
    </SafeAreaView>
  );
};

export default MatchDetailsScreen; 