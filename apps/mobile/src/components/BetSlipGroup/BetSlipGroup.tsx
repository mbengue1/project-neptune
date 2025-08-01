import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './BetSlipGroup.styles';
import { Colors } from '../../themes/colors';
import { poppins } from '../../utils/fonts';
import { SelectedBet } from '../../features/betting/BetSelectionContext/BetSelectionContext';
import { PlacedBet } from '../../features/betting/UserBalanceContext/UserBalanceContext';
import { useUserBalance } from '../../features/betting/UserBalanceContext/UserBalanceContext';

interface BetSlipGroupProps {
  bets: SelectedBet[] | PlacedBet[];
  onRemoveBet: (betId: string) => void;
  onPlaceSlip?: () => void;
  isPlaced?: boolean;
  slipId?: string;
  wager?: number;
  potentialWin?: number;
  status?: 'pending' | 'active' | 'won' | 'lost' | 'cancelled';
  createdAt?: number;
}

const BetSlipGroup: React.FC<BetSlipGroupProps> = ({
  bets,
  onRemoveBet,
  onPlaceSlip,
  isPlaced = false,
  slipId,
  wager,
  potentialWin,
  status,
  createdAt,
}) => {
  const { balance } = useUserBalance();
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status?: string) => {
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

  const getStatusText = (status?: string) => {
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

  const getStatusIcon = (status?: string) => {
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

  const formatDate = (timestamp?: number) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const calculateTotalPotentialWin = () => {
    if (isPlaced && potentialWin) return potentialWin;
    
    // For pending bets, calculate based on average odds
    const totalOdds = bets.reduce((sum, bet) => {
      const odds = parseFloat(bet.odds.replace('+', '').replace('-', ''));
      return sum + odds;
    }, 0);
    const avgOdds = totalOdds / bets.length;
    return avgOdds; // This would need actual wager amount
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.betCount}>
            {bets.length} {bets.length === 1 ? 'Bet' : 'Bets'}
          </Text>
          {isPlaced && status && (
            <View style={styles.statusContainer}>
              <Ionicons 
                name={getStatusIcon(status) as any} 
                size={14} 
                color={getStatusColor(status)} 
              />
              <Text style={[styles.statusText, { color: getStatusColor(status) }]}>
                {getStatusText(status)}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.headerRight}>
          {isPlaced && createdAt && (
            <Text style={styles.dateText}>{formatDate(createdAt)}</Text>
          )}
          <TouchableOpacity 
            style={styles.expandButton}
            onPress={() => setIsExpanded(!isExpanded)}
          >
            <Ionicons 
              name={isExpanded ? 'chevron-up' : 'chevron-down'} 
              size={20} 
              color={Colors.textPrimary} 
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Bet Details */}
      {isExpanded && (
        <View style={styles.betsContainer}>
          <ScrollView style={styles.betsScroll} showsVerticalScrollIndicator={false}>
            {bets.map((bet, index) => (
              <View key={bet.id} style={styles.betItem}>
                <View style={styles.betInfo}>
                  <Text style={styles.betTitle}>{bet.betTitle}</Text>
                  <Text style={styles.betOption}>{bet.betOption}</Text>
                  <Text style={styles.matchTitle}>{bet.matchTitle}</Text>
                </View>
                <View style={styles.betActions}>
                  <Text style={styles.oddsText}>{bet.odds}</Text>
                  {!isPlaced && 'timestamp' in bet && (
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => onRemoveBet(bet.id)}
                    >
                      <Ionicons name="close-circle" size={16} color={Colors.error} />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Footer with amounts */}
      <View style={styles.footer}>
        {isPlaced && wager && (
          <View style={styles.amountsContainer}>
            <View style={styles.amountItem}>
              <Text style={styles.amountLabel}>Wager</Text>
              <Text style={styles.amountValue}>${wager.toFixed(2)}</Text>
            </View>
            <View style={styles.amountItem}>
              <Text style={styles.amountLabel}>Potential Win</Text>
              <Text style={styles.potentialWinValue}>
                ${(potentialWin || calculateTotalPotentialWin()).toFixed(2)}
              </Text>
            </View>
          </View>
        )}
        
        {!isPlaced && onPlaceSlip && (
          <TouchableOpacity 
            style={styles.placeButton}
            onPress={onPlaceSlip}
          >
            <Text style={styles.placeButtonText}>Place Bet Slip</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default BetSlipGroup; 