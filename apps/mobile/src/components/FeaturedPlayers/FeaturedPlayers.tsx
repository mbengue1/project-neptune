import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './FeaturedPlayers.styles';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../themes/colors';

const players = [
  { id: '1', name: 'Erling Haaland', team: 'Manchester City' },
  { id: '2', name: 'Mo Salah', team: 'Liverpool' },
  { id: '3', name: 'Bukayo Saka', team: 'Arsenal' },
  { id: '4', name: 'Harry Kane', team: 'Bayern Munich' },
  { id: '5', name: 'Jude Bellingham', team: 'Real Madrid' },
];

const FeaturedPlayers = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Featured Players</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {players.map(player => (
          <TouchableOpacity key={player.id} style={styles.playerCard}>
            <View style={styles.playerIcon}>
              <Ionicons name="person-circle" size={40} color={Colors.primary} />
            </View>
            <Text style={styles.playerName}>{player.name}</Text>
            <Text style={styles.teamName}>{player.team}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedPlayers; 