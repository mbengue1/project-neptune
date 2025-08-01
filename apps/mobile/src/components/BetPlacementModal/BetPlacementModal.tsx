import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './BetPlacementModal.styles';
import { Colors } from '../../themes/colors';
import { poppins } from '../../utils/fonts';
import { useBetSelection, SelectedBet } from '../../features/betting/BetSelectionContext/BetSelectionContext';
import { useUserBalance } from '../../features/betting/UserBalanceContext/UserBalanceContext';

interface BetPlacementModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const BetPlacementModal: React.FC<BetPlacementModalProps> = ({
  isVisible,
  onClose,
  onSuccess,
}) => {
  const { selectedBets, clearBets } = useBetSelection();
  const { balance, placeBet, placeBetSlip } = useUserBalance();
  const [wager, setWager] = useState('');
  const [isPlacing, setIsPlacing] = useState(false);

  // Calculate total potential win for the slip
  const totalPotentialWin = selectedBets.reduce((total, bet) => {
    const odds = parseFloat(bet.odds.replace('+', '').replace('-', ''));
    const wagerAmount = parseFloat(wager) || 0;
    return total + (wagerAmount * odds / 100 + wagerAmount);
  }, 0);

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
      // Place all bets as a single slip with one wager amount
      const success = await placeBetSlip(selectedBets, wagerAmount);

      if (!success) {
        Alert.alert('Error', 'Failed to place bets. Please try again.');
        setIsPlacing(false);
        return;
      }

      // Clear selected bets
      clearBets();
      
      // Close modal and show success
      onClose();
      onSuccess();
      
      Alert.alert(
        'Bets Placed Successfully!',
        `Your bets have been placed with a wager of $${wagerAmount.toFixed(2)}.`,
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      setIsPlacing(false);
    }
  };

  const handleClose = () => {
    if (!isPlacing) {
      setWager('');
      onClose();
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Place Your Bets</Text>
            <TouchableOpacity onPress={handleClose} disabled={isPlacing}>
              <Ionicons name="close" size={24} color={Colors.textPrimary} />
            </TouchableOpacity>
          </View>

          {/* Bet Summary */}
          <ScrollView style={styles.content}>
            <View style={styles.balanceSection}>
              <Text style={styles.balanceLabel}>Available Balance</Text>
              <Text style={styles.balanceAmount}>${balance.toFixed(2)}</Text>
            </View>

            <View style={styles.betsSection}>
              <Text style={styles.sectionTitle}>Selected Bets ({selectedBets.length})</Text>
              {selectedBets.map((bet, index) => (
                <View key={bet.id} style={styles.betItem}>
                  <View style={styles.betInfo}>
                    <Text style={styles.betTitle}>{bet.betTitle}</Text>
                    <Text style={styles.betOption}>{bet.betOption}</Text>
                    <Text style={styles.matchTitle}>{bet.matchTitle}</Text>
                  </View>
                  <Text style={styles.oddsText}>{bet.odds}</Text>
                </View>
              ))}
            </View>

            {/* Wager Input */}
            <View style={styles.wagerSection}>
              <Text style={styles.sectionTitle}>Enter Wager Amount</Text>
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

            {/* Potential Win */}
            {wager && parseFloat(wager) > 0 && (
              <View style={styles.potentialWinSection}>
                <Text style={styles.potentialWinLabel}>Potential Win</Text>
                <Text style={styles.potentialWinAmount}>
                  ${totalPotentialWin.toFixed(2)}
                </Text>
              </View>
            )}
          </ScrollView>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.cancelButton, isPlacing && styles.disabledButton]}
              onPress={handleClose}
              disabled={isPlacing}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
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
                {isPlacing ? 'Placing...' : 'Place Bets'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BetPlacementModal; 