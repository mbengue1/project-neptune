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
  { id: 'live', name: 'Live', icon: 'radio-outline' },
  { id: 'soccer', name: 'Soccer', icon: 'football-outline' },
  { id: 'basketball', name: 'Basketball', icon: 'basketball-outline' },
  { id: 'football', name: 'Football', icon: 'american-football-outline' },
  { id: 'hockey', name: 'Hockey', icon: 'ice-cream-outline' },
  { id: 'tennis', name: 'Tennis', icon: 'tennisball-outline' },
];

// Sport-specific leagues
const leaguesBySport = {
  Soccer: [
    { id: 'premier', name: 'Premier League' },
    { id: 'laliga', name: 'La Liga' },
    { id: 'serieA', name: 'Serie A' },
    { id: 'bundesliga', name: 'Bundesliga' },
    { id: 'ligue1', name: 'Ligue 1' },
  ],
  Basketball: [
    { id: 'nba', name: 'NBA' },
    { id: 'wnba', name: 'WNBA' },
    { id: 'ncaa', name: 'NCAA' },
    { id: 'euroleague', name: 'Euroleague' },
  ],
  Football: [
    { id: 'nfl', name: 'NFL' },
    { id: 'ncaaFB', name: 'NCAA Football' },
  ],
  Hockey: [
    { id: 'nhl', name: 'NHL' },
    { id: 'khl', name: 'KHL' },
    { id: 'ncaaH', name: 'NCAA Hockey' },
  ],
  Tennis: [
    { id: 'atp', name: 'ATP' },
    { id: 'wta', name: 'WTA' },
    { id: 'grandSlam', name: 'Grand Slam' },
  ],
};

// Sport-specific betting options
const filtersBySport = {
  Soccer: [
    { id: 'games', name: 'Games' },
    { id: 'goals', name: 'Raining Goals' },
    { id: 'scorers', name: 'Top Scorers' },
    { id: 'assists', name: 'Assist Kings' },
    { id: 'corners', name: 'Corner Kicks' },
  ],
  Basketball: [
    { id: 'gameLines', name: 'Game Lines' },
    { id: 'spread', name: 'Spread' },
    { id: 'moneyline', name: 'Money Line' },
    { id: 'total', name: 'Total Points' },
    { id: 'firstBasket', name: 'First Basket' },
    { id: 'playerPoints', name: '10+ Points' },
    { id: 'threePointers', name: '2+ Threes' },
    { id: 'moreThrees', name: '4+ Threes' },
    { id: 'playerProps', name: 'Player Props' },
  ],
  Football: [
    { id: 'gameLines', name: 'Game Lines' },
    { id: 'spread', name: 'Spread' },
    { id: 'moneyline', name: 'Money Line' },
    { id: 'total', name: 'Total Points' },
    { id: 'touchdown', name: 'Anytime TD' },
    { id: 'firstTD', name: 'First TD' },
    { id: 'playerProps', name: 'Player Props' },
    { id: 'quarterProps', name: 'Quarter Props' },
  ],
  Hockey: [
    { id: 'gameLines', name: 'Game Lines' },
    { id: 'puckLine', name: 'Puck Line' },
    { id: 'moneyline', name: 'Money Line' },
    { id: 'total', name: 'Total Goals' },
    { id: 'anytimeGoal', name: 'Anytime Goal' },
    { id: 'firstGoal', name: 'First Goal' },
    { id: 'periods', name: 'First Period' },
    { id: 'playerProps', name: 'Player Props' },
  ],
  Tennis: [
    { id: 'matchLines', name: 'Match Lines' },
    { id: 'sets', name: 'Set Winner' },
    { id: 'games', name: 'Game Spread' },
    { id: 'totalGames', name: 'Total Games' },
    { id: 'aces', name: 'Total Aces' },
    { id: 'playerProps', name: 'Player Props' },
  ],
};

const BetsScreen = ({ route, navigation }: any) => {
  // Extract sportType from route params and use it as initial sport
  const { sportType = 'Soccer' } = route.params || {};
  const [selectedSport, setSelectedSport] = useState(sportType);
  const [selectedLeague, setSelectedLeague] = useState('all');
  const [selectedFilter, setSelectedFilter] = useState('games');
  const [selectedTab, setSelectedTab] = useState('view');
  const [leagues, setLeagues] = useState(leaguesBySport[sportType as keyof typeof leaguesBySport] || leaguesBySport.Soccer);
  const [filters, setFilters] = useState(filtersBySport[sportType as keyof typeof filtersBySport] || filtersBySport.Soccer);

  // Update leagues when sport changes
  useEffect(() => {
    setLeagues(leaguesBySport[selectedSport as keyof typeof leaguesBySport] || []);
    setSelectedLeague('all'); // Reset to "All" when changing sports
    setSelectedFilter('games');
  }, [selectedSport]);

  const handleSportChange = (sport: string) => {
    setSelectedSport(sport);
  };

  const renderSportContent = () => {
    return (
      <View style={styles.content}>
        {/* Sports categories filter */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.categoryTabsContainer}
          contentContainerStyle={styles.categoryTabsContent}
        >
          {sportsCategories.map(sport => (
            <TouchableOpacity
              key={sport.id}
              style={[
                styles.categoryTab,
                selectedSport === sport.name && styles.selectedCategoryTab
              ]}
              onPress={() => setSelectedSport(sport.name)}
            >
              <Ionicons 
                name={sport.icon as any} 
                size={20} 
                color={selectedSport === sport.name ? Colors.buttonText : Colors.textPrimary} 
              />
              <Text 
                style={[
                  styles.categoryTabText,
                  selectedSport === sport.name && styles.selectedCategoryTabText
                ]}
              >
                {sport.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <FeaturedPlayers sportType={selectedSport} noBottomSpacing={true} />

        {/* League Filter */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Leagues</Text>
        </View>
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
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Betting Options</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterTabs}
        >
          {filters.map(filter => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterTab,
                selectedFilter === filter.id && styles.selectedFilter
              ]}
              onPress={() => setSelectedFilter(filter.id)}
            >
              <Text style={[
                styles.filterTabText,
                selectedFilter === filter.id && styles.selectedFilterText
              ]}>
                {filter.name}
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
      </View>
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