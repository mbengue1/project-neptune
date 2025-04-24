import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './MatchDetailsScreen.styles';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../themes/colors';
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar';
import { mockBetsByCategory, BetOption, Bet, BetCategories } from '../../data/mockBets';
import { 
  SoccerMatch, 
  BasketballMatch, 
  FootballMatch, 
  HockeyMatch, 
  TennisMatch 
} from '../../data/sportsBettingTypes';

// Define sport types
type SportType = 'Soccer' | 'Basketball' | 'Football' | 'Hockey' | 'Tennis';

// Define a union type for all possible match types
type MatchType = SoccerMatch | BasketballMatch | FootballMatch | HockeyMatch | TennisMatch;

interface RouteParams {
  match: MatchType;
}

interface MatchDetailsProps {
  route: { params: RouteParams };
  navigation: any;
}

// Define sport-specific betting categories
const betCategoriesBySport: Record<SportType, Array<{ id: string; name: string }>> = {
  Soccer: [
    { id: 'popular', name: 'Popular' },
    { id: 'same_game', name: 'Same Game Parlay™' },
    { id: 'specials', name: 'Specials' },
    { id: 'goal_scorers', name: 'Goal Scorers' },
    { id: 'goals', name: 'Goals' },
    { id: 'team_props', name: 'Team Props' },
    { id: 'shots_target', name: 'Shots on Target' },
    { id: 'shots', name: 'Shots' },
    { id: 'corners', name: 'Corners' },
  ],
  Basketball: [
    { id: 'popular', name: 'Popular' },
    { id: 'same_game', name: 'Same Game Parlay™' },
    { id: 'game_lines', name: 'Game Lines' },
    { id: 'alt_lines', name: 'Alt Lines' },
    { id: 'player_points', name: 'Player Points' },
    { id: 'player_rebounds', name: 'Player Rebounds' },
    { id: 'player_assists', name: 'Player Assists' },
    { id: 'player_threes', name: 'Player Threes' },
    { id: 'quarters', name: 'Quarters' },
    { id: 'race_to', name: 'Race To' },
  ],
  Football: [
    { id: 'popular', name: 'Popular' },
    { id: 'same_game', name: 'Same Game Parlay™' },
    { id: 'game_lines', name: 'Game Lines' },
    { id: 'alt_lines', name: 'Alt Lines' },
    { id: 'touchdown_scorers', name: 'TD Scorers' },
    { id: 'player_props', name: 'Player Props' },
    { id: 'team_props', name: 'Team Props' },
    { id: 'quarters', name: 'Quarters' },
    { id: 'halves', name: 'Halves' },
  ],
  Hockey: [
    { id: 'popular', name: 'Popular' },
    { id: 'same_game', name: 'Same Game Parlay™' },
    { id: 'game_lines', name: 'Game Lines' },
    { id: 'alt_lines', name: 'Alt Lines' },
    { id: 'periods', name: 'Periods' },
    { id: 'goal_scorers', name: 'Goal Scorers' },
    { id: 'player_shots', name: 'Player Shots' },
    { id: 'player_points', name: 'Player Points' },
    { id: 'team_props', name: 'Team Props' },
  ],
  Tennis: [
    { id: 'popular', name: 'Popular' },
    { id: 'match_lines', name: 'Match Lines' },
    { id: 'set_betting', name: 'Set Betting' },
    { id: 'games', name: 'Games' },
    { id: 'player_props', name: 'Player Props' },
    { id: 'set_props', name: 'Set Props' },
    { id: 'match_props', name: 'Match Props' },
  ],
};

const MatchDetailsScreen: React.FC<MatchDetailsProps> = ({ route, navigation }) => {
  const { match } = route.params;
  const [selectedCategory, setSelectedCategory] = useState('popular');
  const [expandedSections, setExpandedSections] = useState(new Set(['1'])); // Default first section open
  
  // Determine sport type based on match data
  const getSportType = (): SportType => {
    if ('tieOdds' in match) return 'Soccer';
    if ('totalPoints' in match) {
      return 'Basketball'; // Could be football too, but we'll default to basketball
    }
    if ('totalGoals' in match) return 'Hockey';
    if ('player1' in match) return 'Tennis';
    
    // Default to Soccer if can't determine
    return 'Soccer';
  };
  
  const sportType = getSportType();
  
  // Get categories based on sport type
  const betCategories = betCategoriesBySport[sportType] || betCategoriesBySport.Soccer;

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

  const renderBetSection = (bet: Bet) => {
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
              {bet.options.map((option: BetOption, index: number) => (
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

  // Choose appropriate icon based on sport type
  const getSportIcon = () => {
    switch(sportType) {
      case 'Basketball': return 'basketball';
      case 'Football': return 'american-football';
      case 'Hockey': return 'ice-cream';
      case 'Tennis': return 'tennisball';
      default: return 'football';
    }
  };

  const sportIcon = getSportIcon();
  
  // Render team/player names based on sport type
  const renderTeamPlayers = () => {
    if (sportType === 'Tennis' && 'player1' in match) {
      // Tennis match
      const tennisMatch = match as TennisMatch;
      return (
        <>
          <View style={styles.teamRow}>
            <Ionicons name={sportIcon} size={24} color={Colors.textPrimary} />
            <Text style={styles.teamName}>{tennisMatch.player1.name}</Text>
          </View>
          <View style={styles.teamRow}>
            <Ionicons name={sportIcon} size={24} color={Colors.textPrimary} />
            <Text style={styles.teamName}>{tennisMatch.player2.name}</Text>
          </View>
        </>
      );
    } else if ('homeTeam' in match) {
      // Team sports
      return (
        <>
          <View style={styles.teamRow}>
            <Ionicons name={sportIcon} size={24} color={Colors.textPrimary} />
            <Text style={styles.teamName}>{match.homeTeam.name}</Text>
          </View>
          <View style={styles.teamRow}>
            <Ionicons name={sportIcon} size={24} color={Colors.textPrimary} />
            <Text style={styles.teamName}>{match.awayTeam.name}</Text>
          </View>
        </>
      );
    }
    
    // Fallback if structure doesn't match expected
    return null;
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
          <Text style={styles.leagueTitle}>
            {'league' in match ? match.league : ('tournament' in match ? match.tournament : '')}
          </Text>
          <Text style={styles.gamesAvailable}>20 Games Available</Text>
        </View>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Teams Section */}
      <View style={styles.teamsContainer}>
        {renderTeamPlayers()}
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