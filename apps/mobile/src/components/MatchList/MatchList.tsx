import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { styles } from './MatchList.styles';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../themes/colors';

// sample match data
const matches = [
  { 
    id: '1', 
    team1: 'Barcelona', 
    team2: 'Real Madrid', 
    date: 'Monday, 12 Feb 2021 02:30 am',
    league: 'League',
  },
  { 
    id: '2', 
    team1: 'Liverpool', 
    team2: 'Manchester United', 
    date: 'Tuesday, 13 Feb 2021 04:30 am',
    league: 'League',
  },
  { 
    id: '3', 
    team1: 'Bayern Munich', 
    team2: 'Dortmund', 
    date: 'Wednesday, 14 Feb 2021 06:30 am',
    league: 'League',
  },
];

const MatchList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Recommended Matches</Text>
      <FlatList
        data={matches}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.matchInfoContainer}>
              <View style={styles.teamsContainer}>
                <View style={styles.teamLogoContainer}>
                  <Ionicons name="football" size={20} color={Colors.textPrimary} />
                </View>
                <View style={styles.teamLogoContainer}>
                  <Ionicons name="football" size={20} color={Colors.textPrimary} />
                </View>
              </View>
              <View style={styles.matchDetails}>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>{item.team1} VS {item.team2}</Text>
                  <View style={styles.leagueTag}>
                    <Text style={styles.leagueText}>{item.league}</Text>
                  </View>
                </View>
                <Text style={styles.date}>{item.date}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Make Bet</Text>
            </TouchableOpacity>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default MatchList;
