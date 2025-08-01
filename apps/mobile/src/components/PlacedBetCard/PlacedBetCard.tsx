import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './PlacedBetCard.styles';
import { Colors } from '../../themes/colors';
import { poppins } from '../../utils/fonts';
import { PlacedBet } from '../../features/betting/UserBalanceContext/UserBalanceContext';

interface PlacedBetCardProps {
  bet: PlacedBet;
  onPress?: () => void;
}

const PlacedBetCard: React.FC<PlacedBetCardProps> = ({ bet, onPress }) => {
  const getStatusColor = (status: PlacedBet['status']) => {
    switch (status) {
      case 'won':
        return Colors.success;
      case 'lost':
        return Colors.error;
      case 'active':
        return Colors.primary;
      case 'pending':
        return Colors.warning;
      default:
        return Colors.textSecondary;
    }
  };

  const getStatusText = (status: PlacedBet['status']) => {
    switch (status) {
      case 'won':
        return 'Won';
      case 'lost':
        return 'Lost';
      case 'active':
        return 'Active';
      case 'pending':
        return 'Pending';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };

  const getStatusIcon = (status: PlacedBet['status']) => {
    switch (status) {
      case 'won':
        return 'checkmark-circle';
      case 'lost':
        return 'close-circle';
      case 'active':
        return 'play-circle';
      case 'pending':
        return 'time';
      case 'cancelled':
        return 'close-circle';
      default:
        return 'help-circle';
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      {/* Header with status */}
      <View style={styles.header}>
        <View style={styles.statusContainer}>
          <Ionicons 
            name={getStatusIcon(bet.status) as any} 
            size={16} 
            color={getStatusColor(bet.status)} 
          />
          <Text style={[styles.statusText, { color: getStatusColor(bet.status) }]}>
            {getStatusText(bet.status)}
          </Text>
        </View>
        <Text style={styles.dateText}>{formatDate(bet.createdAt)}</Text>
      </View>

      {/* Bet details */}
      <View style={styles.betDetails}>
        <Text style={styles.matchTitle}>{bet.matchTitle}</Text>
        <Text style={styles.betTitle}>{bet.betTitle}</Text>
        <Text style={styles.betOption}>{bet.betOption}</Text>
      </View>

      {/* Odds and amounts */}
      <View style={styles.amountsContainer}>
        <View style={styles.oddsContainer}>
          <Text style={styles.oddsLabel}>Odds</Text>
          <Text style={styles.oddsValue}>{bet.odds}</Text>
        </View>
        <View style={styles.wagerContainer}>
          <Text style={styles.wagerLabel}>Wager</Text>
          <Text style={styles.wagerValue}>${bet.wager.toFixed(2)}</Text>
        </View>
        <View style={styles.potentialContainer}>
          <Text style={styles.potentialLabel}>Potential Win</Text>
          <Text style={styles.potentialValue}>${bet.potentialWin.toFixed(2)}</Text>
        </View>
      </View>

      {/* Sport and league info */}
      <View style={styles.footer}>
        <View style={styles.sportContainer}>
          <Ionicons name="football-outline" size={14} color={Colors.textSecondary} />
          <Text style={styles.sportText}>{bet.sportType}</Text>
        </View>
        <Text style={styles.leagueText}>{bet.league}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PlacedBetCard; 