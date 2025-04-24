import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../themes/colors';
import { poppins } from '../../utils/fonts';
import { PlayerBet } from '../../data/sportsBettingTypes';

interface PlayerBetsProps {
  bets: PlayerBet[];
  title: string;
  statType?: string;
}

const PlayerBets = ({ bets, title, statType = 'Points' }: PlayerBetsProps) => {
  const [expandedThreshold, setExpandedThreshold] = useState<number | null>(null);

  // Group bets by their thresholds
  const groupedBets = bets.reduce((acc, bet) => {
    const threshold = bet.threshold;
    if (!acc[threshold]) {
      acc[threshold] = [];
    }
    acc[threshold].push(bet);
    return acc;
  }, {} as Record<number, PlayerBet[]>);

  const toggleThreshold = (threshold: number) => {
    if (expandedThreshold === threshold) {
      setExpandedThreshold(null);
    } else {
      setExpandedThreshold(threshold);
    }
  };

  const renderPlayerRow = (bet: PlayerBet) => {
    return (
      <View style={styles.playerRow}>
        <View style={styles.playerInfo}>
          <Text style={styles.playerName}>{bet.player}</Text>
          <Text style={styles.teamName}>{bet.team}</Text>
        </View>
        <TouchableOpacity style={styles.oddsButton}>
          <Text style={styles.oddsValue}>{bet.over}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderThresholdCard = (threshold: number, players: PlayerBet[]) => {
    const isExpanded = expandedThreshold === threshold;

    return (
      <View style={styles.thresholdCard} key={threshold}>
        <TouchableOpacity 
          style={styles.thresholdHeader} 
          onPress={() => toggleThreshold(threshold)}
        >
          <View style={styles.thresholdInfo}>
            <Text style={styles.thresholdTitle}>{`To Score ${threshold}+ ${statType}`}</Text>
            <Text style={styles.sgpLabel}>SGP</Text>
          </View>
          <Ionicons 
            name={isExpanded ? 'chevron-up' : 'chevron-down'} 
            size={20} 
            color={Colors.textSecondary}
          />
        </TouchableOpacity>
        
        {isExpanded && (
          <View style={styles.playersContainer}>
            {players.map((bet, index) => (
              <View key={index}>
                {renderPlayerRow(bet)}
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {Object.entries(groupedBets)
        .sort(([a], [b]) => Number(b) - Number(a)) // Sort thresholds in descending order
        .map(([threshold, players]) => renderThresholdCard(Number(threshold), players))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: poppins.semiBold,
    color: Colors.textPrimary,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  thresholdCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 8,
    marginBottom: 8,
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  thresholdHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  thresholdInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thresholdTitle: {
    fontSize: 16,
    fontFamily: poppins.medium,
    color: Colors.textPrimary,
    marginRight: 8,
  },
  sgpLabel: {
    fontSize: 12,
    fontFamily: poppins.medium,
    color: Colors.primary,
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  playersContainer: {
    padding: 8,
  },
  playerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 14,
    fontFamily: poppins.medium,
    color: Colors.textPrimary,
  },
  teamName: {
    fontSize: 12,
    fontFamily: poppins.regular,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  oddsButton: {
    width: 70,
    height: 36,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  oddsValue: {
    fontSize: 14,
    fontFamily: poppins.medium,
    color: '#174be8',
  },
});

export default PlayerBets; 