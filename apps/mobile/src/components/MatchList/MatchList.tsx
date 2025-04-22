import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { styles } from './MatchList.styles';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../themes/colors';
import { useNavigation } from '@react-navigation/native';

// Updated sample match data with more matches
const matches = [
  { 
    id: '1',
    league: 'Premier League',
    date: '3:00PM ET',
    homeTeam: {
      name: 'Manchester City',
      odds: '-115'
    },
    awayTeam: {
      name: 'Aston Villa',
      odds: '+290'
    },
    tieOdds: '+290'
  },
  { 
    id: '2',
    league: 'Premier League',
    date: 'WED 3:00PM ET',
    homeTeam: {
      name: 'Arsenal',
      odds: '-270'
    },
    awayTeam: {
      name: 'Crystal Palace',
      odds: '+800'
    },
    tieOdds: '+370'
  },
  {
    id: '3',
    league: 'Premier League',
    date: 'WED 3:15PM ET',
    homeTeam: {
      name: 'Liverpool',
      odds: '-180'
    },
    awayTeam: {
      name: 'Chelsea',
      odds: '+450'
    },
    tieOdds: '+310'
  },
  {
    id: '4',
    league: 'La Liga',
    date: 'THU 4:00PM ET',
    homeTeam: {
      name: 'Barcelona',
      odds: '-150'
    },
    awayTeam: {
      name: 'Real Madrid',
      odds: '+320'
    },
    tieOdds: '+280'
  }
];

const MatchList = ({ sportType = 'Soccer', showMoreLink = true }) => {
  const navigation = useNavigation();
  
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

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Recommended Matches</Text>
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
                    <Ionicons name="football" size={20} color={Colors.textPrimary} />
                    <Text style={styles.teamName}>{item.homeTeam.name}</Text>
                  </View>
                  <View style={styles.teamRow}>
                    <Ionicons name="football" size={20} color={Colors.textPrimary} />
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
