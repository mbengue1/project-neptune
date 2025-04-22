import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './BetsScreen.styles';
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar';
import MatchList from '../../components/MatchList/MatchList';
import FeaturedPlayers from '../../components/FeaturedPlayers/FeaturedPlayers';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../themes/colors';

const soccerLeagues = [
  { id: 'all', name: 'All' },
  { id: 'epl', name: 'Premier League' },
  { id: 'laliga', name: 'La Liga' },
  { id: 'bundesliga', name: 'Bundesliga' },
  { id: 'seriea', name: 'Serie A' },
];

const filterTabs = [
  { id: 'games', name: 'Games' },
  { id: 'raining_goals', name: 'Raining Goals' },
  { id: 'playoff_series', name: 'Top Scorers' },
  { id: 'west', name: 'Assists' },
];

const BetsScreen = ({ route, navigation }) => {
  const { sportType = 'All' } = route.params || {};
  const [selectedLeague, setSelectedLeague] = useState('all');
  const [selectedFilter, setSelectedFilter] = useState('games');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{sportType}</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <FeaturedPlayers />

        {/* League Filter */}
        {sportType === 'Soccer' && (
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.leagueFilter}
          >
            {soccerLeagues.map(league => (
              <TouchableOpacity
                key={league.id}
                style={[
                  styles.leagueButton,
                  selectedLeague === league.id && styles.selectedLeague
                ]}
                onPress={() => setSelectedLeague(league.id)}
              >
                <Text style={[
                  styles.leagueButtonText,
                  selectedLeague === league.id && styles.selectedLeagueText
                ]}>
                  {league.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* Filter Tabs */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterTabs}
        >
          {filterTabs.map(tab => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.filterTab,
                selectedFilter === tab.id && styles.selectedFilter
              ]}
              onPress={() => setSelectedFilter(tab.id)}
            >
              <Text style={[
                styles.filterTabText,
                selectedFilter === tab.id && styles.selectedFilterText
              ]}>
                {tab.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
          {/* Match List */}
        <MatchList sportType={sportType} showMoreLink={false} />
      </ScrollView>
      
      <BottomNavBar navigation={navigation} />
    </SafeAreaView>
  );
};

export default BetsScreen; 