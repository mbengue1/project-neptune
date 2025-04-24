import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './BetsScreen.styles';
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar';
import MatchList from '../../components/MatchList/MatchList';
import FeaturedPlayers from '../../components/FeaturedPlayers/FeaturedPlayers';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../themes/colors';
import { getLeaguesBySport } from '../../data/sportsData/leagues';

// Tab types
const betStatusTabs = [
  { id: 'view', name: 'View' },
  { id: 'open', name: 'Open' },
  { id: 'settled', name: 'Settled' },
  { id: 'saved', name: 'Saved' },
];

// Sports categories
const sportsCategories = [
  { id: 'Soccer', name: 'Soccer', icon: 'football-outline' },
  { id: 'Basketball', name: 'Basketball', icon: 'basketball-outline' },
  { id: 'Football', name: 'Football', icon: 'american-football-outline' },
  { id: 'Hockey', name: 'Hockey', icon: 'ice-cream-outline' },
  { id: 'Tennis', name: 'Tennis', icon: 'tennisball-outline' },
];

const filterTabs = [
  { id: 'games', name: 'Games' },
  { id: 'raining_goals', name: 'Raining Goals' },
  { id: 'playoff_series', name: 'Top Scorers' },
  { id: 'west', name: 'Assists' },
];

const BetsScreen = ({ route, navigation }: any) => {
  const { sportType: initialSportType = 'Soccer' } = route.params || {};
  const [selectedSport, setSelectedSport] = useState(initialSportType);
  const [selectedLeague, setSelectedLeague] = useState('all');
  const [selectedFilter, setSelectedFilter] = useState('games');
  const [selectedTab, setSelectedTab] = useState('view');
  const [leagues, setLeagues] = useState(getLeaguesBySport(initialSportType));

  // Update leagues when sport changes
  useEffect(() => {
    setLeagues(getLeaguesBySport(selectedSport));
    setSelectedLeague('all'); // Reset to "All" when changing sports
  }, [selectedSport]);

  const handleSportChange = (sport: string) => {
    setSelectedSport(sport);
  };

  const renderSportContent = () => {
    return (
      <>
        {/* Sports Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.sportsFilter}
        >
          {sportsCategories.map(sport => (
            <TouchableOpacity
              key={sport.id}
              style={[
                styles.sportCategory,
                selectedSport === sport.id && styles.selectedSportCategory
              ]}
              onPress={() => handleSportChange(sport.id)}
            >
              <Ionicons 
                name={sport.icon as any} 
                size={20} 
                color={selectedSport === sport.id ? Colors.buttonText : Colors.textPrimary} 
              />
              <Text style={[
                styles.sportCategoryText,
                selectedSport === sport.id && styles.selectedSportCategoryText
              ]}>
                {sport.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <FeaturedPlayers sportType={selectedSport} />

        {/* League Filter */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.leagueFilter}
        >
          {leagues.map(league => (
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
        <MatchList 
          sportType={selectedSport} 
          showMoreLink={false} 
          showTitle={false}
        />
      </>
    );
  };

  const renderMainContent = () => {
    if (selectedTab === 'view') {
      return (
        <ScrollView style={styles.content}>
          {renderSportContent()}
        </ScrollView>
      );
    } else if (selectedTab === 'open') {
      return (
        <View style={styles.emptyStateContainer}>
          <Ionicons name="football" size={100} color={Colors.textSecondary} style={{ opacity: 0.5 }} />
          <Text style={styles.emptyStateTitle}>No active bets</Text>
          <Text style={styles.emptyStateSubtitle}>You must be logged in to see bets</Text>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Log in or join now</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      // Settled and Saved tabs
      return (
        <View style={styles.emptyStateContainer}>
          <Ionicons name="football" size={100} color={Colors.textSecondary} style={{ opacity: 0.5 }} />
          <Text style={styles.emptyStateTitle}>No {selectedTab} bets</Text>
          <Text style={styles.emptyStateSubtitle}>You must be logged in to see bets</Text>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Log in or join now</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Bets</Text>
      </View>

      {/* Bet Status Tabs */}
      <View style={styles.betStatusTabsContainer}>
        {betStatusTabs.map(tab => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.betStatusTab,
              selectedTab === tab.id && styles.selectedBetStatusTab
            ]}
            onPress={() => setSelectedTab(tab.id)}
          >
            <Text style={[
              styles.betStatusTabText,
              selectedTab === tab.id && styles.selectedBetStatusTabText
            ]}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {renderMainContent()}
      
      <BottomNavBar navigation={navigation} />
    </SafeAreaView>
  );
};

export default BetsScreen; 