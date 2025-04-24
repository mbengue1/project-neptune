import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { styles } from './MatchList.styles';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../themes/colors';
import { useNavigation } from '@react-navigation/native';
import { getMatchesBySport } from '../../data/sportsData';
import { getLeagueNameById } from '../../data/sportsData/leagues';
import { 
  SoccerMatch, 
  BasketballMatch, 
  FootballMatch, 
  HockeyMatch, 
  TennisMatch,
  basketballMatches,
  footballMatches,
  hockeyMatches,
  tennisMatches
} from '../../data/sportsBettingTypes';

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
  const [matches, setMatches] = useState<any[]>([]);
  
  useEffect(() => {
    // Get sport-specific matches
    let sportMatches: any[] = [];
    
    switch(sportType) {
      case 'Basketball':
        sportMatches = basketballMatches;
        break;
      case 'Football':
        sportMatches = footballMatches;
        break;
      case 'Hockey':
        sportMatches = hockeyMatches;
        break;
      case 'Tennis':
        sportMatches = tennisMatches;
        break;
      default: // Soccer or any other
        sportMatches = getMatchesBySport(sportType);
    }
    
    // Apply league filter
    if (leagueFilter !== 'all') {
      // Get the league name based on leagueFilter id
      // This is a simplified approach - in a real app you'd get this from a proper league mapping
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
            slam => match.tournament.includes(slam)
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
  const renderSoccerMatch = (item: SoccerMatch) => (
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

  // Render basketball/football match (spread, moneyline, total)
  const renderBasketballFootballMatch = (item: BasketballMatch | FootballMatch) => {
    // Safely get values with null checks
    const homeTeamName = item?.homeTeam?.name || '';
    const awayTeamName = item?.awayTeam?.name || '';
    
    // Safely access spread values
    const homeSpreadValue = item?.homeTeam?.spread?.value || '';
    const homeSpreadOdds = item?.homeTeam?.spread?.odds || '';
    const awaySpreadValue = item?.awayTeam?.spread?.value || '';
    const awaySpreadOdds = item?.awayTeam?.spread?.odds || '';
    
    // Safely access moneyline values
    const homeMoneyline = item?.homeTeam?.moneyline || '';
    const awayMoneyline = item?.awayTeam?.moneyline || '';
    
    // Safely access total values - check if it's basketball or hockey
    const totalValue = item?.totalPoints?.value || '';
    const overOdds = item?.totalPoints?.over || '';
    const underOdds = item?.totalPoints?.under || '';
    
    return (
      <View style={styles.card}>
        <View style={styles.matchHeader}>
          <Text style={styles.leagueText}>{item.league || ''}</Text>
          <Text style={styles.dateText}>{item.date || ''}</Text>
        </View>
        
        <View style={styles.matchContent}>
          {/* Teams and Odds Layout */}
          <View style={styles.teamsSection}>
            {/* Home Team Row */}
            <View style={styles.teamRow}>
              <Ionicons name={sportIcon as any} size={20} color={Colors.textPrimary} />
              <Text style={styles.teamName}>{homeTeamName}</Text>
            </View>
            
            {/* Away Team Row */}
            <View style={styles.teamRow}>
              <Ionicons name={sportIcon as any} size={20} color={Colors.textPrimary} />
              <Text style={styles.teamName}>{awayTeamName}</Text>
            </View>
          </View>

          {/* Odds Section */}
          <View style={styles.sportOddsContainer}>
            {/* Spread Column */}
            <View style={styles.sportOddsColumn}>
              <TouchableOpacity style={styles.sportOddsButton}>
                <Text style={styles.oddsNumber}>{homeSpreadValue}</Text>
                <Text style={styles.oddsValueSmall}>{homeSpreadOdds}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sportOddsButton}>
                <Text style={styles.oddsNumber}>{awaySpreadValue}</Text>
                <Text style={styles.oddsValueSmall}>{awaySpreadOdds}</Text>
              </TouchableOpacity>
            </View>
            
            {/* Money Column */}
            <View style={styles.sportOddsColumn}>
              <TouchableOpacity style={styles.oddsOnlyButton}>
                <Text style={styles.oddsOnlyValue}>{homeMoneyline}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.oddsOnlyButton}>
                <Text style={styles.oddsOnlyValue}>{awayMoneyline}</Text>
              </TouchableOpacity>
            </View>
            
            {/* Total Column */}
            <View style={styles.sportOddsColumn}>
              <TouchableOpacity style={styles.sportOddsButton}>
                <Text style={styles.oddsNumber}>O {totalValue}</Text>
                <Text style={styles.oddsValueSmall}>{overOdds}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sportOddsButton}>
                <Text style={styles.oddsNumber}>U {totalValue}</Text>
                <Text style={styles.oddsValueSmall}>{underOdds}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  // Render hockey match (puck line, moneyline, total)
  const renderHockeyMatch = (item: HockeyMatch) => {
    // Safely get values with null checks
    const homeTeamName = item?.homeTeam?.name || '';
    const awayTeamName = item?.awayTeam?.name || '';
    
    // Safely access puckLine values
    const homePuckLineValue = item?.homeTeam?.puckLine?.value || '';
    const homePuckLineOdds = item?.homeTeam?.puckLine?.odds || '';
    const awayPuckLineValue = item?.awayTeam?.puckLine?.value || '';
    const awayPuckLineOdds = item?.awayTeam?.puckLine?.odds || '';
    
    // Safely access moneyline values
    const homeMoneyline = item?.homeTeam?.moneyline || '';
    const awayMoneyline = item?.awayTeam?.moneyline || '';
    
    // Safely access total values
    const totalValue = item?.totalGoals?.value || '';
    const overOdds = item?.totalGoals?.over || '';
    const underOdds = item?.totalGoals?.under || '';
    
    return (
      <View style={styles.card}>
        <View style={styles.matchHeader}>
          <Text style={styles.leagueText}>{item.league || ''}</Text>
          <Text style={styles.dateText}>{item.date || ''}</Text>
        </View>
        
        <View style={styles.matchContent}>
          {/* Teams and Odds Layout */}
          <View style={styles.teamsSection}>
            {/* Home Team Row */}
            <View style={styles.teamRow}>
              <Ionicons name={sportIcon as any} size={20} color={Colors.textPrimary} />
              <Text style={styles.teamName}>{homeTeamName}</Text>
            </View>
            
            {/* Away Team Row */}
            <View style={styles.teamRow}>
              <Ionicons name={sportIcon as any} size={20} color={Colors.textPrimary} />
              <Text style={styles.teamName}>{awayTeamName}</Text>
            </View>
          </View>

          {/* Odds Section */}
          <View style={styles.sportOddsContainer}>
            {/* Puck Line Column */}
            <View style={styles.sportOddsColumn}>
              <TouchableOpacity style={styles.sportOddsButton}>
                <Text style={styles.oddsNumber}>{homePuckLineValue}</Text>
                <Text style={styles.oddsValueSmall}>{homePuckLineOdds}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sportOddsButton}>
                <Text style={styles.oddsNumber}>{awayPuckLineValue}</Text>
                <Text style={styles.oddsValueSmall}>{awayPuckLineOdds}</Text>
              </TouchableOpacity>
            </View>
            
            {/* Money Column */}
            <View style={styles.sportOddsColumn}>
              <TouchableOpacity style={styles.oddsOnlyButton}>
                <Text style={styles.oddsOnlyValue}>{homeMoneyline}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.oddsOnlyButton}>
                <Text style={styles.oddsOnlyValue}>{awayMoneyline}</Text>
              </TouchableOpacity>
            </View>
            
            {/* Total Column */}
            <View style={styles.sportOddsColumn}>
              <TouchableOpacity style={styles.sportOddsButton}>
                <Text style={styles.oddsNumber}>O {totalValue}</Text>
                <Text style={styles.oddsValueSmall}>{overOdds}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sportOddsButton}>
                <Text style={styles.oddsNumber}>U {totalValue}</Text>
                <Text style={styles.oddsValueSmall}>{underOdds}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  // Render tennis match (game spread, moneyline, total games)
  const renderTennisMatch = (item: TennisMatch) => {
    // Safely get values with null checks
    const player1Name = item?.player1?.name || '';
    const player2Name = item?.player2?.name || '';
    
    // Safely access game spread values
    const player1SpreadValue = item?.player1?.gameSpread?.value || '';
    const player1SpreadOdds = item?.player1?.gameSpread?.odds || '';
    const player2SpreadValue = item?.player2?.gameSpread?.value || '';
    const player2SpreadOdds = item?.player2?.gameSpread?.odds || '';
    
    // Safely access moneyline values
    const player1Moneyline = item?.player1?.moneyline || '';
    const player2Moneyline = item?.player2?.moneyline || '';
    
    // Safely access total values
    const totalValue = item?.totalGames?.value || '';
    const overOdds = item?.totalGames?.over || '';
    const underOdds = item?.totalGames?.under || '';
    
    return (
      <View style={styles.card}>
        <View style={styles.matchHeader}>
          <Text style={styles.leagueText}>{item.tournament || ''}</Text>
          <Text style={styles.dateText}>{item.date || ''}</Text>
        </View>
        
        <View style={styles.matchContent}>
          {/* Teams and Odds Layout */}
          <View style={styles.teamsSection}>
            {/* Player 1 Row */}
            <View style={styles.teamRow}>
              <Ionicons name={sportIcon as any} size={20} color={Colors.textPrimary} />
              <Text style={styles.teamName}>{player1Name}</Text>
            </View>
            
            {/* Player 2 Row */}
            <View style={styles.teamRow}>
              <Ionicons name={sportIcon as any} size={20} color={Colors.textPrimary} />
              <Text style={styles.teamName}>{player2Name}</Text>
            </View>
          </View>

          {/* Odds Section */}
          <View style={styles.sportOddsContainer}>
            {/* Game Spread Column */}
            <View style={styles.sportOddsColumn}>
              <TouchableOpacity style={styles.sportOddsButton}>
                <Text style={styles.oddsNumber}>{player1SpreadValue}</Text>
                <Text style={styles.oddsValueSmall}>{player1SpreadOdds}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sportOddsButton}>
                <Text style={styles.oddsNumber}>{player2SpreadValue}</Text>
                <Text style={styles.oddsValueSmall}>{player2SpreadOdds}</Text>
              </TouchableOpacity>
            </View>
            
            {/* Money Column */}
            <View style={styles.sportOddsColumn}>
              <TouchableOpacity style={styles.oddsOnlyButton}>
                <Text style={styles.oddsOnlyValue}>{player1Moneyline}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.oddsOnlyButton}>
                <Text style={styles.oddsOnlyValue}>{player2Moneyline}</Text>
              </TouchableOpacity>
            </View>
            
            {/* Total Column */}
            <View style={styles.sportOddsColumn}>
              <TouchableOpacity style={styles.sportOddsButton}>
                <Text style={styles.oddsNumber}>O {totalValue}</Text>
                <Text style={styles.oddsValueSmall}>{overOdds}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sportOddsButton}>
                <Text style={styles.oddsNumber}>U {totalValue}</Text>
                <Text style={styles.oddsValueSmall}>{underOdds}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  // Render appropriate match card based on sport type
  const renderMatchCard = (item: any) => {
    if (!item) return null;
    
    let matchCard;
    
    try {
      switch(sportType) {
        case 'Basketball':
          matchCard = renderBasketballFootballMatch(item as BasketballMatch);
          break;
        case 'Football':
          matchCard = renderBasketballFootballMatch(item as FootballMatch);
          break;
        case 'Hockey':
          matchCard = renderHockeyMatch(item as HockeyMatch);
          break;
        case 'Tennis':
          matchCard = renderTennisMatch(item as TennisMatch);
          break;
        default: // Soccer
          matchCard = renderSoccerMatch(item as SoccerMatch);
      }
    } catch (error) {
      console.error('Error rendering match card:', error);
      return null; // Return null if there's an error
    }
    
    return (
      <TouchableOpacity 
        onPress={() => navigation.navigate('MatchDetails', { match: item })}
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
