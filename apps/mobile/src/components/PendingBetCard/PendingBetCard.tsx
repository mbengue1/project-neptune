import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './PendingBetCard.styles';
import { Colors } from '../../themes/colors';
import { poppins } from '../../utils/fonts';
import { SelectedBet } from '../../features/betting/BetSelectionContext/BetSelectionContext';
import { useUserBalance } from '../../features/betting/UserBalanceContext/UserBalanceContext';

interface PendingBetCardProps {
  bet: SelectedBet;
  onRemove: () => void;
  onPlace: () => void;
}

const PendingBetCard: React.FC<PendingBetCardProps> = ({ bet, onRemove, onPlace }) => {
  const { balance, placeBet } = useUserBalance();
  const [wager, setWager] = useState('');
  const [isPlacing, setIsPlacing] = useState(false);

  const calculatePotentialWin = (wagerAmount: number) => {
    const odds = parseFloat(bet.odds.replace('+', '').replace('-', ''));
    return wagerAmount * odds / 100 + wagerAmount;
  };

  const handlePlaceBet = async () => {
    const wagerAmount = parseFloat(wager);
    
    if (!wagerAmount || wagerAmount <= 0) {
      Alert.alert('Invalid Wager', 'Please enter a valid wager amount.');
      return;
    }

    if (wagerAmount > balance) {
      Alert.alert('Insufficient Balance', 'Your wager exceeds your available balance.');
      return;
    }

    setIsPlacing(true);

    try {
      const success = await placeBet(
        {
          matchId: bet.matchId,
          matchTitle: bet.matchTitle,
          betTitle: bet.betTitle,
          betOption: bet.betOption,
          odds: bet.odds,
          sportType: bet.sportType,
          league: bet.league,
        },
        wagerAmount
      );

      if (success) {
        onPlace();
        Alert.alert(
          'Bet Placed Successfully!',
          `Your bet has been placed with a wager of $${wagerAmount.toFixed(2)}.`,
          [{ text: 'OK' }]
        );
      } else {
        Alert.alert('Error', 'Failed to place bet. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setIsPlacing(false);
    }
  };

  const potentialWin = wager ? calculatePotentialWin(parseFloat(wager)) : 0;

  return (
    <View style={styles.container}>
      {/* Bet details */}
      <View style={styles.betDetails}>
        <Text style={styles.matchTitle}>{bet.matchTitle}</Text>
        <Text style={styles.betTitle}>{bet.betTitle}</Text>
        <Text style={styles.betOption}>{bet.betOption}</Text>
      </View>

      {/* Odds */}
      <View style={styles.oddsContainer}>
        <Text style={styles.oddsLabel}>Odds</Text>
        <Text style={styles.oddsValue}>{bet.odds}</Text>
      </View>

      {/* Wager input */}
      <View style={styles.wagerSection}>
        <Text style={styles.wagerLabel}>Enter Wager Amount</Text>
        <View style={styles.wagerInputContainer}>
          <Text style={styles.currencySymbol}>$</Text>
          <TextInput
            style={styles.wagerInput}
            value={wager}
            onChangeText={setWager}
            placeholder="0.00"
            keyboardType="decimal-pad"
            placeholderTextColor={Colors.textSecondary}
          />
        </View>
      </View>

      {/* Potential win */}
      {wager && parseFloat(wager) > 0 && (
        <View style={styles.potentialWinContainer}>
          <Text style={styles.potentialWinLabel}>Potential Win</Text>
          <Text style={styles.potentialWinValue}>${potentialWin.toFixed(2)}</Text>
        </View>
      )}

      {/* Action buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.removeButton}
          onPress={onRemove}
          disabled={isPlacing}
        >
          <Ionicons name="trash-outline" size={16} color={Colors.error} />
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.placeButton,
            (!wager || parseFloat(wager) <= 0 || parseFloat(wager) > balance || isPlacing) && styles.disabledButton
          ]}
          onPress={handlePlaceBet}
          disabled={!wager || parseFloat(wager) <= 0 || parseFloat(wager) > balance || isPlacing}
        >
          <Text style={styles.placeButtonText}>
            {isPlacing ? 'Placing...' : 'Place Bet'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PendingBetCard; 