import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './BetsScreen.styles';
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar';
import MatchList from '../../components/MatchList/MatchList';
import FeaturedPlayers from '../../components/FeaturedPlayers/FeaturedPlayers';
import PlayerBets from '../../components/PlayerBets/PlayerBets';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../themes/colors';
import { getLeaguesBySport, getPlayerPropThresholds, getPropDisplayName, getLeagueNameById } from '../../data/sportsData/leagues';
import { getMatchesBySport } from '../../data/sportsData';
import { 
  basketballMatches, 
  footballMatches, 
  hockeyMatches, 
  tennisMatches,
  PlayerBet
} from '../../data/sportsBettingTypes';

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

// Sport-specific betting options
const filtersBySport = {
  Soccer: [
    { id: 'popular', name: 'Popular' },
    { id: 'games', name: 'Games' },
    { id: 'goals', name: 'Raining Goals' },
    { id: 'player_goals', name: 'Player Goals' },
    { id: 'player_assists', name: 'Player Assists' },
    { id: 'player_shots', name: 'Player Shots' },
    { id: 'scorers', name: 'Top Scorers' },
    { id: 'assists', name: 'Assist Kings' },
    { id: 'corners', name: 'Corner Kicks' },
    { id: 'player_passes', name: 'Player Passes' },
    { id: 'player_tackles', name: 'Player Tackles' },
    { id: 'specials', name: 'Specials' },
    { id: 'team_props', name: 'Team Props' },
  ],
  Basketball: [
    { id: 'popular', name: 'Popular' },
    { id: 'quick_bets', name: 'Quick Bets' },
    { id: 'game_lines', name: 'Game Lines' },
    { id: 'player_points', name: 'Player Points' },
    { id: 'player_combos', name: 'Player Combos' },
    { id: 'player_threes', name: '3-Pointers' },
    { id: 'first_basket', name: 'First Basket' },
    { id: 'player_rebounds', name: 'Rebounds' },
    { id: 'player_assists', name: 'Assists' },
    { id: 'alt_lines', name: 'Alt Lines' },
  ],
  Football: [
    { id: 'popular', name: 'Popular' },
    { id: 'quick_bets', name: 'Quick Bets' },
    { id: 'game_lines', name: 'Game Lines' },
    { id: 'player_passing', name: 'Passing' },
    { id: 'player_rushing', name: 'Rushing' },
    { id: 'player_receiving', name: 'Receiving' },
    { id: 'touchdown_scorers', name: 'TD Scorers' },
    { id: 'team_totals', name: 'Team Totals' },
    { id: 'alt_lines', name: 'Alt Lines' },
  ],
  Hockey: [
    { id: 'popular', name: 'Popular' },
    { id: 'quick_bets', name: 'Quick Bets' },
    { id: 'game_lines', name: 'Game Lines' },
    { id: 'puck_line', name: 'Puck Line' },
    { id: 'goal_scorers', name: 'Goal Scorers' },
    { id: 'first_goal', name: 'First Goal' },
    { id: 'player_points', name: 'Points' },
    { id: 'player_shots', name: 'Shots' },
    { id: 'player_saves', name: 'Goalie Saves' },
    { id: 'periods', name: 'Periods' },
  ],
  Tennis: [
    { id: 'popular', name: 'Popular' },
    { id: 'quick_bets', name: 'Quick Bets' },
    { id: 'match_lines', name: 'Match Lines' },
    { id: 'set_betting', name: 'Set Betting' },
    { id: 'set_score', name: 'Set Score' },
    { id: 'games', name: 'Games' },
    { id: 'aces', name: 'Aces' },
    { id: 'tie_break', name: 'Tie Breaks' },
    { id: 'alt_lines', name: 'Alt Lines' },
  ],
};

const BetsScreen = ({ route, navigation }: any) => {
  // Extract sportType from route params and use it as initial sport
  const { sportType = 'Soccer' } = route.params || {};
  const [selectedSport, setSelectedSport] = useState(sportType);
  const [selectedLeague, setSelectedLeague] = useState('all');
  const [selectedFilter, setSelectedFilter] = useState('popular');
  const [selectedTab, setSelectedTab] = useState('view');
  const [leagues, setLeagues] = useState<any[]>([]);
  const [filters, setFilters] = useState(filtersBySport[sportType as keyof typeof filtersBySport] || filtersBySport.Soccer);
  const [playerBets, setPlayerBets] = useState<PlayerBet[]>([]);
  const [showPlayerBets, setShowPlayerBets] = useState(false);

  // Update leagues when sport changes
  useEffect(() => {
    // Use the getLeaguesBySport function from our updated leagues data
    const sportLeagues = getLeaguesBySport(selectedSport);
    setLeagues(sportLeagues);
    
    // Update filters for the selected sport
    setFilters(filtersBySport[selectedSport as keyof typeof filtersBySport] || filtersBySport.Soccer);
    
    // Reset selections
    setSelectedLeague('all');
    setSelectedFilter('popular');
    setShowPlayerBets(false);
  }, [selectedSport]);

  // We don't need the previous useEffect for filter and league changes anymore
  // Since we're handling this directly in handleFilterChange and handleLeagueChange

  // Check if selected filter is a player-specific stat
  const checkIfPlayerStatFilter = (filter: string): boolean => {
    const playerFilters = {
      Soccer: ['player_goals', 'player_assists', 'player_shots', 'player_passes', 'player_tackles'],
      Basketball: ['player_points', 'player_rebounds', 'player_assists', 'player_threes', 'player_combos', 'first_basket'],
      Football: ['player_passing', 'player_rushing', 'player_receiving', 'touchdown_scorers'],
      Hockey: ['goal_scorers', 'first_goal', 'hockey_shots', 'player_shots', 'player_saves'],
      Tennis: ['aces', 'double_faults', 'tie_break']
    };

    return playerFilters[selectedSport as keyof typeof playerFilters]?.includes(filter) || false;
  };

  // Extract player bets from matches based on filter
  const getPlayerBetsFromMatches = (matches: any[], filter: string): PlayerBet[] => {
    let bets: PlayerBet[] = [];
    
    matches.forEach(match => {
      if (!match.playerStats) return;
      
      // Simple mapping from filter ID to property name
      let propertyName = '';
      
      // Basketball
      if (filter === 'player_points') propertyName = 'points';
      else if (filter === 'player_rebounds') propertyName = 'rebounds';
      else if (filter === 'player_assists') propertyName = 'assists';
      else if (filter === 'player_threes') propertyName = 'threes';
      // Football
      else if (filter === 'player_passing') propertyName = 'passing';
      else if (filter === 'player_rushing') propertyName = 'rushing';
      else if (filter === 'player_receiving') propertyName = 'receiving';
      else if (filter === 'touchdown_scorers') propertyName = 'touchdowns';
      // Hockey
      else if (filter === 'goal_scorers' || filter === 'first_goal') propertyName = 'goals';
      else if (filter === 'player_shots' || filter === 'hockey_shots') propertyName = 'shots';
      else if (filter === 'player_saves') propertyName = 'saves';
      // Tennis
      else if (filter === 'aces') propertyName = 'aces';
      else if (filter === 'double_faults') propertyName = 'doubleFaults';
      // Soccer
      else if (filter === 'player_goals') propertyName = 'goals';
      else if (filter === 'player_assists') propertyName = 'assists';
      else if (filter === 'player_passes') propertyName = 'passes';
      else if (filter === 'player_tackles') propertyName = 'tackles';
      
      if (propertyName && match.playerStats[propertyName]) {
        // Get thresholds for this prop type
        const thresholds = getPlayerPropThresholds(selectedSport, selectedLeague, propertyName);
        
        // Filter player bets based on thresholds
        const playerBets = match.playerStats[propertyName];
        thresholds.forEach(threshold => {
          const filteredBets = playerBets.filter((bet: PlayerBet) => 
            parseFloat(bet.line) >= threshold
          );
          if (filteredBets.length > 0) {
            bets.push(...filteredBets.map((bet: PlayerBet) => ({
              ...bet,
              threshold: threshold
            })));
          }
        });
      }
    });
    
    return bets;
  };

  const handleSportChange = (sport: string) => {
    setSelectedSport(sport);
  };

  const handleLeagueChange = (leagueId: string) => {
    setSelectedLeague(leagueId);
    
    // Reset filter to popular if changing league
    setSelectedFilter('popular');
    
    // Update available filters based on league
    const selectedLeagueData = leagues.find(l => l.id === leagueId);
    
    // Generate sport-specific filters based on available player props
    if (selectedLeagueData && 'playerProps' in selectedLeagueData && leagueId !== 'all') {
      const leagueProps = selectedLeagueData.playerProps as Record<string, number[]>;
      const availableFilters = [...filtersBySport[selectedSport as keyof typeof filtersBySport]];
      
      // Only keep filters that have corresponding player props
      const updatedFilters = availableFilters.filter(filter => {
        // Always keep non-player stat filters
        if (!checkIfPlayerStatFilter(filter.id)) return true;
        
        // For player stats, check if the league has the corresponding prop
        const propMapping: Record<string, string> = {
          // Soccer
          'player_goals': 'goals',
          'player_assists': 'assists',
          'player_shots': 'shots',
          'player_passes': 'passes',
          'player_tackles': 'tackles',
          // Basketball
          'player_points': 'points',
          'player_rebounds': 'rebounds',
          'player_threes': 'threes',
          // Football
          'player_passing': 'passing',
          'player_rushing': 'rushing',
          'player_receiving': 'receiving',
          'touchdown_scorers': 'touchdowns',
          // Hockey
          'goal_scorers': 'goals',
          'first_goal': 'goals',
          'hockey_shots': 'shots', // Renamed to avoid duplicate
          'player_saves': 'saves',
          // Tennis
          'aces': 'aces',
          'double_faults': 'doubleFaults'
        };
        
        const propName = propMapping[filter.id];
        return propName && propName in leagueProps;
      });
      
      setFilters(updatedFilters);
    } else {
      // If 'all' leagues selected or no player props, use default filters
      setFilters(filtersBySport[selectedSport as keyof typeof filtersBySport] || filtersBySport.Soccer);
    }
  };

  const handleFilterChange = (filterId: string) => {
    setSelectedFilter(filterId);
    
    // If it's a player stat filter, make sure we get the right player bets
    const isPlayerStat = checkIfPlayerStatFilter(filterId);
    if (isPlayerStat) {
      // Get all matches for the selected sport
      let allMatches: any[] = [];
      
      switch(selectedSport) {
        case 'Basketball':
          allMatches = basketballMatches;
          break;
        case 'Football':
          allMatches = footballMatches;
          break;
        case 'Hockey':
          allMatches = hockeyMatches;
          break;
        case 'Tennis':
          allMatches = tennisMatches;
          break;
        case 'Soccer':
          allMatches = [...getMatchesBySport('Soccer')]; // Use soccer data
          break;
        default:
          allMatches = [];
      }
      
      // Filter matches by league if needed
      let filteredMatches = allMatches;
      if (selectedLeague !== 'all') {
        const leagueName = getLeagueNameById(selectedSport, selectedLeague);
        console.log(`Filtering for league: ${leagueName} (ID: ${selectedLeague})`);
        
        filteredMatches = allMatches.filter(match => {
          // Check against league name
          if (match.league === leagueName) {
            console.log(`Match found for league: ${leagueName}`, match);
            return true;
          }
          
          // For grand slams in tennis, check against tournament names
          if (selectedLeague === 'grandslam' && match.tournament) {
            const isGrandSlam = ['Australian Open', 'French Open', 'Wimbledon', 'US Open'].some(
              slam => match.tournament.includes(slam)
            );
            if (isGrandSlam) {
              console.log(`Tennis Grand Slam match found`, match);
              return true;
            }
          }
          
          // For WTA/ATP events
          if ((selectedLeague === 'wta1000' || selectedLeague === 'masters1000') && match.tournament) {
            if (match.tournament.includes(leagueName)) {
              console.log(`Tennis tour match found for: ${leagueName}`, match);
              return true;
            }
          }
          
          return false;
        });
      }
      
      console.log(`Found ${filteredMatches.length} matches after filtering`);
      
      // Get player bets from filtered matches based on filter
      const bets = getPlayerBetsFromMatches(filteredMatches, filterId);
      console.log(`Found ${bets.length} player bets for filter: ${filterId}`);
      
      setPlayerBets(bets);
      setShowPlayerBets(true);
    } else {
      setShowPlayerBets(false);
    }
  };

  const renderPlayerBets = () => {
    if (!showPlayerBets) return null;

    // Get property name based on selected filter
    let propType = '';
    
    // Basketball
    if (selectedFilter === 'player_points') propType = 'points';
    else if (selectedFilter === 'player_rebounds') propType = 'rebounds';
    else if (selectedFilter === 'player_assists') propType = 'assists';
    else if (selectedFilter === 'player_threes') propType = 'threes';
    // Football
    else if (selectedFilter === 'player_passing') propType = 'passing';
    else if (selectedFilter === 'player_rushing') propType = 'rushing';
    else if (selectedFilter === 'player_receiving') propType = 'receiving';
    else if (selectedFilter === 'touchdown_scorers') propType = 'touchdowns';
    // Hockey
    else if (selectedFilter === 'goal_scorers' || selectedFilter === 'first_goal') propType = 'goals';
    else if (selectedFilter === 'player_shots' || selectedFilter === 'hockey_shots') propType = 'shots';
    else if (selectedFilter === 'player_saves') propType = 'saves';
    // Tennis
    else if (selectedFilter === 'aces') propType = 'aces';
    else if (selectedFilter === 'double_faults') propType = 'doubleFaults';
    // Soccer
    else if (selectedFilter === 'player_goals') propType = 'goals';
    else if (selectedFilter === 'player_assists') propType = 'assists';
    else if (selectedFilter === 'player_passes') propType = 'passes';
    else if (selectedFilter === 'player_tackles') propType = 'tackles';

    if (!propType) return null;

    return (
      <PlayerBets 
        bets={playerBets} 
        title={`${getPropDisplayName(propType)} Bets`}
        statType={getPropDisplayName(propType)}
      />
    );
  };

  const renderSportContent = () => {
    // Determine if we should show featured players based on the sport
    const showFeaturedPlayers = ['Basketball', 'Football', 'Hockey'].includes(selectedSport);
    
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

        {/* Featured Players - only for select sports */}
        {showFeaturedPlayers && !showPlayerBets && (
          <FeaturedPlayers sportType={selectedSport} noBottomSpacing={true} />
        )}

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
              onPress={() => handleLeagueChange(league.id)}
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
              onPress={() => handleFilterChange(filter.id)}
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

        {/* Content Based on Filter */}
        {showPlayerBets ? (
          renderPlayerBets()
        ) : (
          <MatchList
            sportType={selectedSport}
            showMoreLink={false}
            showTitle={false}
            leagueFilter={selectedLeague}
          />
        )}
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