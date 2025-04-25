import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './MatchDetailsScreen.styles';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../themes/colors';
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar';
import { 
  basketballBetCategories,
  footballBetCategories,
  hockeyBetCategories,
  tennisBetCategories,
  soccerBetCategories
} from '../../data/sportsData';
import type { MatchType } from '../../types/matches';

// Extended MatchType with optional tournament field
interface ExtendedMatch extends MatchType {
  tournament?: string;
}

// Define sport types
type SportType = 'Soccer' | 'Basketball' | 'Football' | 'Hockey' | 'Tennis';

// Define bet option type
type BetOption = {
  label: string;
  value: string;
  team?: string;
};

// Define bet type
type Bet = {
  id: string;
  title: string;
  description?: string;
  sgp: boolean;
  options: BetOption[];
};

interface RouteParams {
  match: ExtendedMatch;
  sportType: SportType;
}

interface MatchDetailsProps {
  route: { params: RouteParams };
  navigation: any;
}

// Define sport-specific betting categories
const betCategoriesBySport: Record<SportType, Array<{ id: string; name: string }>> = {
  Soccer: [
    { id: 'popular', name: 'Popular' },
    { id: 'player_props', name: 'Player Props' },
    { id: 'game_props', name: 'Game Props' }
  ],
  Basketball: [
    { id: 'popular', name: 'Popular' },
    { id: 'player_props', name: 'Player Props' },
    { id: 'game_props', name: 'Game Props' }
  ],
  Football: [
    { id: 'popular', name: 'Popular' },
    { id: 'player_props', name: 'Player Props' },
    { id: 'game_props', name: 'Game Props' },
    { id: 'quarter_props', name: 'Quarter Props' }
  ],
  Hockey: [
    { id: 'popular', name: 'Popular' },
    { id: 'player_props', name: 'Player Props' },
    { id: 'game_props', name: 'Game Props' }
  ],
  Tennis: [
    { id: 'popular', name: 'Popular' },
    { id: 'set_props', name: 'Set Props' },
    { id: 'game_props', name: 'Game Props' },
    { id: 'match_props', name: 'Match Props' }
  ],
};

const MatchDetailsScreen: React.FC<MatchDetailsProps> = ({ route, navigation }) => {
  const { match, sportType } = route.params;
  const [selectedCategory, setSelectedCategory] = useState('popular');
  const [expandedSections, setExpandedSections] = useState(new Set(['1'])); // Default first section open
  const [betData, setBetData] = useState<Record<string, Bet[]>>({});
  
  // Get categories based on sport type
  const betCategories = betCategoriesBySport[sportType] || betCategoriesBySport.Soccer;
  
  useEffect(() => {
    // Set initial category to the first one in the list
    if (betCategories.length > 0) {
      setSelectedCategory(betCategories[0].id);
    }
    
    // Load appropriate bet data based on sport type
    switch(sportType) {
      case 'Basketball':
        setBetData(basketballBetCategories);
        break;
      case 'Football':
        setBetData(footballBetCategories);
        break;
      case 'Hockey':
        setBetData(hockeyBetCategories);
        break;
      case 'Tennis':
        setBetData(tennisBetCategories);
        break;
      case 'Soccer':
        setBetData(soccerBetCategories);
        break;
      default:
        // Default to soccer bets
        setBetData(soccerBetCategories);
    }
  }, [sportType]);

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

  // Get the bets for the selected category
  const categoryBets = betData[selectedCategory] || [];

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
  
  // Render team/player names
  const renderTeamPlayers = () => {
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
            {match.tournament || match.league}
          </Text>
          <Text style={styles.gamesAvailable}>{categoryBets.length} Bets Available</Text>
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
          {categoryBets.map(bet => renderBetSection(bet))}
        </ScrollView>
      </View>

      <BottomNavBar navigation={navigation} />
    </SafeAreaView>
  );
};

export default MatchDetailsScreen; 