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

// Icons for different sports
const sportIcons: Record<string, string> = {
  'Soccer': 'football',
  'Basketball': 'basketball',
  'Football': 'american-football',
  'Hockey': 'ice-cream', // Using this since there's no hockey icon
  'Tennis': 'tennisball',
  'default': 'person-circle'
};

interface FeaturedPlayersProps {
  sportType?: string;
}

const FeaturedPlayers = ({ sportType = 'Soccer' }: FeaturedPlayersProps) => {
  const players = playersByCategory[sportType as keyof typeof playersByCategory] || playersByCategory.Soccer;
  const sportIcon = sportIcons[sportType] || sportIcons.default;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Featured {sportType} Players</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {players.map(player => (
          <TouchableOpacity key={player.id} style={styles.playerCard}>
            <View style={styles.playerIcon}>
              <Ionicons name={sportIcon as any} size={40} color={Colors.primary} />
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