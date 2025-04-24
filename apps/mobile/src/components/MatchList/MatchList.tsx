import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { styles } from './MatchList.styles';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../themes/colors';
import { useNavigation } from '@react-navigation/native';
import { getMatchesBySport } from '../../data/sportsData';

// Define match type
export type MatchType = {
  id: string;
  league: string;
  date: string;
  homeTeam: {
    name: string;
    odds: string;
  };
  awayTeam: {
    name: string;
    odds: string;
  };
  tieOdds: string;
};

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
};

const MatchList = ({ 
  sportType = 'Soccer', 
  showMoreLink = true, 
  maxMatches,
  showTitle = true
}: MatchListProps) => {
  const navigation = useNavigation<any>();
  const [matches, setMatches] = useState<MatchType[]>([]);
  
  useEffect(() => {
    // Fetch matches based on sportType
    const sportMatches = getMatchesBySport(sportType);
    
    // If maxMatches is provided, limit the number of matches displayed
    if (maxMatches && sportMatches.length > maxMatches) {
      setMatches(sportMatches.slice(0, maxMatches));
    } else {
      setMatches(sportMatches);
    }
  }, [sportType, maxMatches]);
  
  const navigateToSportBets = () => {
    // This will navigate to the bets page with the specific sport type
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

  return (
    <View style={styles.container}>
      {showTitle && <Text style={styles.sectionTitle}>Recommended Matches</Text>}
      <FlatList
        data={matches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => navigation.navigate('MatchDetails', { match: item })}
          >
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
                    <TouchableOpacity style={styles.oddsButton}>
                      <Text style={styles.oddsValue}>{item.homeTeam.odds}</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.oddsColumn}>
                    <Text style={styles.oddsLabel}>TIE</Text>
                    <TouchableOpacity style={styles.oddsButton}>
                      <Text style={styles.oddsValue}>{item.tieOdds}</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.oddsColumn}>
                    <Text style={styles.oddsLabel}>AWAY</Text>
                    <TouchableOpacity style={styles.oddsButton}>
                      <Text style={styles.oddsValue}>{item.awayTeam.odds}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default MatchList;
