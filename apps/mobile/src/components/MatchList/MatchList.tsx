import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { styles } from './MatchList.styles';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../themes/colors';
import { useNavigation } from '@react-navigation/native';
import { useBetSelection } from '../../features/betting/BetSelectionContext/BetSelectionContext';
import { useSportsData } from '../../contexts/SportsDataContext';
import { getLeagueNameById } from '../../data/sportsData/leagues';
import type { MatchType } from '../../types/matches';

// Extended MatchType with optional tournament field
interface ExtendedMatch extends MatchType {
  tournament?: string;
}

// Icons for different sports
const sportIcons: Record<string, string> = {
  'Soccer': 'football',
  'Basketball': 'basketball',
  'Football': 'american-football',
  'Hockey': 'ice-cream', // Using this since there's no hockey icon
  'Tennis': 'tennisball'
};

type MatchListProps = {
  sportType?: string;
  showMoreLink?: boolean;
  maxMatches?: number;
  showTitle?: boolean;
  leagueFilter?: string;
};

const MatchList = ({ 
  sportType = 'Soccer', 
  showMoreLink = true, 
  maxMatches,
  showTitle = true,
  leagueFilter = 'all'
}: MatchListProps) => {
  const navigation = useNavigation<any>();
  const [matches, setMatches] = useState<ExtendedMatch[]>([]);
  const { addBet, removeBetByMatchAndOdds, isBetSelected } = useBetSelection();
  const { getMatchesBySport } = useSportsData();
  
  useEffect(() => {
    // Get sport-specific matches from API context
    let sportMatches: ExtendedMatch[] = getMatchesBySport(sportType);
    
    // Apply league filter
    if (leagueFilter !== 'all') {
      // Get the league name based on leagueFilter id
      const leagueName = getLeagueNameById(sportType, leagueFilter);
      
      sportMatches = sportMatches.filter(match => {
        // Check against league name
        if (match.league === leagueName) {
          console.log(`Match found for league: ${leagueName}`, match);
          return true;
        }
        
        // For grand slams in tennis, check against tournament names
        if (leagueFilter === 'grandslam' && match.tournament) {
          const isGrandSlam = ['Australian Open', 'French Open', 'Wimbledon', 'US Open'].some(
            slam => match.tournament && match.tournament.includes(slam)
          );
          if (isGrandSlam) {
            console.log(`Tennis Grand Slam match found`, match);
            return true;
          }
        }
        
        // For WTA/ATP events
        if ((leagueFilter === 'wta1000' || leagueFilter === 'masters1000') && match.tournament) {
          if (match.tournament.includes(leagueName)) {
            console.log(`Tennis tour match found for: ${leagueName}`, match);
            return true;
          }
        }
        
        return false;
      });
    }
    
    // If maxMatches is provided, limit the number of matches displayed
    if (maxMatches && sportMatches.length > maxMatches) {
      setMatches(sportMatches.slice(0, maxMatches));
    } else {
      setMatches(sportMatches);
    }
  }, [sportType, maxMatches, leagueFilter]);
  
  const navigateToSportBets = () => {
    // Navigate to Bets screen with current sport type
    navigation.navigate('Bets', { sportType });
  };
  
  const renderFooter = () => {
    // Only show the footer if showMoreLink is true
    if (!showMoreLink) return null;
    
    return (
      <TouchableOpacity 
        style={styles.viewMoreContainer} 
        onPress={navigateToSportBets}
      >
        <Text style={styles.viewMoreText}>More {sportType} </Text>
        <Ionicons name="chevron-forward" size={16} color={Colors.primary} />
      </TouchableOpacity>
    );
  };

  // Select the appropriate icon for the sport type
  const sportIcon = sportIcons[sportType] || 'football';

  // Render soccer match card (home/tie/away)
  const renderSoccerMatch = (item: MatchType) => (
    <View style={styles.card}>
      <View style={styles.matchHeader}>
        <Text style={styles.leagueText}>{item.league}</Text>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
      
      <View style={styles.matchContent}>
        {/* Teams Section */}
        <View style={styles.teamsSection}>
          <View style={styles.teamRow}>
            <Ionicons name={sportIcon as any} size={20} color={Colors.textPrimary} />
            <Text style={styles.teamName}>{item.homeTeam.name}</Text>
          </View>
          <View style={styles.teamRow}>
            <Ionicons name={sportIcon as any} size={20} color={Colors.textPrimary} />
            <Text style={styles.teamName}>{item.awayTeam.name}</Text>
          </View>
        </View>

        {/* Odds Section */}
        <View style={styles.oddsContainer}>
          <View style={styles.oddsColumn}>
            <Text style={styles.oddsLabel}>HOME</Text>
            <TouchableOpacity style={styles.oddsOnlyButton}>
              <Text style={styles.oddsOnlyValue}>{item.homeTeam.odds}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.oddsColumn}>
            <Text style={styles.oddsLabel}>TIE</Text>
            <TouchableOpacity style={styles.oddsOnlyButton}>
              <Text style={styles.oddsOnlyValue}>{item.tieOdds}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.oddsColumn}>
            <Text style={styles.oddsLabel}>AWAY</Text>
            <TouchableOpacity style={styles.oddsOnlyButton}>
              <Text style={styles.oddsOnlyValue}>{item.awayTeam.odds}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  // Since all our sports data models have been simplified to the basic MatchType,
  // we'll use the same rendering function for all sports
  const renderMatch = (item: ExtendedMatch) => {
    const handleBetSelection = (team: string, odds: string, betType: string) => {
      const betOption = `${team} ${betType}`;
      const isSelected = isBetSelected(item.id, odds);
      
      if (isSelected) {
        // If already selected, remove the bet
        removeBetByMatchAndOdds(item.id, odds);
      } else {
        // If not selected, add the bet
        addBet({
          matchId: item.id,
          matchTitle: `${item.homeTeam.name} vs ${item.awayTeam.name}`,
          betTitle: `${team} ${betType}`,
          betOption: team,
          odds: odds,
          team: team,
          sportType,
          league: item.league,
        });
      }
    };

    // Common rendering for all match types
    return (
      <View style={styles.card}>
        <View style={styles.matchHeader}>
          <Text style={styles.leagueText}>
            {item.tournament ? item.tournament : item.league}
          </Text>
          <Text style={styles.dateText}>{item.date}</Text>
        </View>
        
        <View style={styles.matchContent}>
          {/* Teams Section */}
          <View style={styles.teamsSection}>
            <View style={styles.teamRow}>
              <Ionicons name={sportIcon as any} size={20} color={Colors.textPrimary} />
              <Text style={styles.teamName}>{item.homeTeam.name}</Text>
            </View>
            <View style={styles.teamRow}>
              <Ionicons name={sportIcon as any} size={20} color={Colors.textPrimary} />
              <Text style={styles.teamName}>{item.awayTeam.name}</Text>
            </View>
          </View>

          {/* Odds Section */}
          <View style={styles.oddsContainer}>
            <View style={styles.oddsColumn}>
              <Text style={styles.oddsLabel}>HOME</Text>
              <TouchableOpacity 
                style={[
                  styles.oddsOnlyButton,
                  isBetSelected(item.id, item.homeTeam.odds) && styles.selectedOddsButton
                ]}
                onPress={() => handleBetSelection(item.homeTeam.name, item.homeTeam.odds, 'WIN')}
              >
                <Text style={[
                  styles.oddsOnlyValue,
                  isBetSelected(item.id, item.homeTeam.odds) && styles.selectedOddsValue
                ]}>
                  {item.homeTeam.odds}
                </Text>
              </TouchableOpacity>
            </View>
            {item.tieOdds && (
              <View style={styles.oddsColumn}>
                <Text style={styles.oddsLabel}>TIE</Text>
                <TouchableOpacity 
                  style={[
                    styles.oddsOnlyButton,
                    isBetSelected(item.id, item.tieOdds) && styles.selectedOddsButton
                  ]}
                  onPress={() => handleBetSelection('TIE', item.tieOdds || '', 'DRAW')}
                >
                  <Text style={[
                    styles.oddsOnlyValue,
                    isBetSelected(item.id, item.tieOdds || '') && styles.selectedOddsValue
                  ]}>
                    {item.tieOdds}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.oddsColumn}>
              <Text style={styles.oddsLabel}>AWAY</Text>
              <TouchableOpacity 
                style={[
                  styles.oddsOnlyButton,
                  isBetSelected(item.id, item.awayTeam.odds) && styles.selectedOddsButton
                ]}
                onPress={() => handleBetSelection(item.awayTeam.name, item.awayTeam.odds, 'WIN')}
              >
                <Text style={[
                  styles.oddsOnlyValue,
                  isBetSelected(item.id, item.awayTeam.odds) && styles.selectedOddsValue
                ]}>
                  {item.awayTeam.odds}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  // Render appropriate match card based on sport type
  const renderMatchCard = (item: ExtendedMatch) => {
    if (!item) return null;
    
    let matchCard;
    
    try {
      // Use the same render method for all sports since we've normalized the data structure
      matchCard = renderMatch(item);
    } catch (error) {
      console.error('Error rendering match card:', error);
      return null; // Return null if there's an error
    }
    
    return (
      <TouchableOpacity 
        onPress={() => navigation.navigate('MatchDetails', { match: item, sportType })}
      >
        {matchCard}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {showTitle && 
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended Matches</Text>
        </View>
      }
      {matches.length > 0 ? (
        <FlatList
          data={matches}
          keyExtractor={(item) => item?.id || Math.random().toString()}
          renderItem={({ item }) => renderMatchCard(item)}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderFooter}
        />
      ) : (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>No matches available for the selected league.</Text>
        </View>
      )}
    </View>
  );
};

export default MatchList;
