import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './FeaturedPlayers.styles';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../themes/colors';

// Featured players data for different sports
const playersByCategory = {
  Soccer: [
    { id: '1', name: 'Erling Haaland', team: 'Manchester City' },
    { id: '2', name: 'Mo Salah', team: 'Liverpool' },
    { id: '3', name: 'Bukayo Saka', team: 'Arsenal' },
    { id: '4', name: 'Harry Kane', team: 'Bayern Munich' },
    { id: '5', name: 'Jude Bellingham', team: 'Real Madrid' },
  ],
  Basketball: [
    { id: 'b1', name: 'LeBron James', team: 'Los Angeles Lakers' },
    { id: 'b2', name: 'Stephen Curry', team: 'Golden State Warriors' },
    { id: 'b3', name: 'Kevin Durant', team: 'Phoenix Suns' },
    { id: 'b4', name: 'Nikola Jokic', team: 'Denver Nuggets' },
    { id: 'b5', name: 'Giannis Antetokounmpo', team: 'Milwaukee Bucks' },
  ],
  Football: [
    { id: 'f1', name: 'Patrick Mahomes', team: 'Kansas City Chiefs' },
    { id: 'f2', name: 'Travis Kelce', team: 'Kansas City Chiefs' },
    { id: 'f3', name: 'Lamar Jackson', team: 'Baltimore Ravens' },
    { id: 'f4', name: 'Christian McCaffrey', team: 'San Francisco 49ers' },
    { id: 'f5', name: 'Jamarr Chase', team: 'Cincinnati Bengals' },
  ],
  Hockey: [
    { id: 'h1', name: 'Connor McDavid', team: 'Edmonton Oilers' },
    { id: 'h2', name: 'Auston Matthews', team: 'Toronto Maple Leafs' },
    { id: 'h3', name: 'Nathan MacKinnon', team: 'Colorado Avalanche' },
    { id: 'h4', name: 'Leon Draisaitl', team: 'Edmonton Oilers' },
    { id: 'h5', name: 'Cale Makar', team: 'Colorado Avalanche' },
  ],
  Tennis: [
    { id: 't1', name: 'Novak Djokovic', team: 'Serbia' },
    { id: 't2', name: 'Carlos Alcaraz', team: 'Spain' },
    { id: 't3', name: 'Iga Swiatek', team: 'Poland' },
    { id: 't4', name: 'Jannik Sinner', team: 'Italy' },
    { id: 't5', name: 'Aryna Sabalenka', team: 'Belarus' },
  ],
};

// Format name to show first initial and last name
const formatPlayerName = (fullName: string): string => {
  const nameParts = fullName.split(' ');
  if (nameParts.length < 2) return fullName;
  
  const firstName = nameParts[0];
  const lastName = nameParts[nameParts.length - 1];
  
  return `${firstName.charAt(0)}. ${lastName}`;
};

interface FeaturedPlayersProps {
  sportType?: string;
  noBottomSpacing?: boolean;
}

const FeaturedPlayers = ({ sportType = 'Soccer', noBottomSpacing = false }: FeaturedPlayersProps) => {
  const players = playersByCategory[sportType as keyof typeof playersByCategory] || playersByCategory.Soccer;

  return (
    <View style={[styles.container, noBottomSpacing && { paddingBottom: 0, marginBottom: 0 }]}>
      <Text style={styles.title}>Featured {sportType} Players</Text>
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
            <Text style={styles.playerName}>{formatPlayerName(player.name)}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedPlayers; 