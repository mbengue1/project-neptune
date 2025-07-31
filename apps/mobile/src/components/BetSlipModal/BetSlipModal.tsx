import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  ScrollView, 
  Animated,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './BetSlipModal.styles';
import { Colors } from '../../themes/colors';
import { poppins } from '../../utils/fonts';
import { useBetSelection, SelectedBet } from '../../features/betting/BetSelectionContext/BetSelectionContext';

const { height: screenHeight } = Dimensions.get('window');

interface BetSlipModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const BetSlipModal: React.FC<BetSlipModalProps> = ({ isVisible, onClose }) => {
  const { selectedBets, removeBet, clearBets, getBetCount } = useBetSelection();
  const [isExpanded, setIsExpanded] = useState(false);
  const [slideAnim] = useState(new Animated.Value(0));

  // Auto-show modal when bets are selected
  React.useEffect(() => {
    if (getBetCount() > 0 && !isVisible) {
      // This will be handled by the parent component
      // We just need to ensure the modal is visible when bets are selected
    }
  }, [getBetCount(), isVisible]);

  const betCount = getBetCount();

  // Animate the modal when expanded state changes
  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isExpanded, slideAnim]);

  const modalHeight = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [80, screenHeight * 0.7], // From 80px to 70% of screen height
  });

  const handleToggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleRemoveBet = (betId: string) => {
    removeBet(betId);
  };

  const renderBetItem = (bet: SelectedBet) => (
    <View key={bet.id} style={styles.betItem}>
      <View style={styles.betInfo}>
        <Text style={styles.betTitle} numberOfLines={1}>
          {bet.betTitle}
        </Text>
        <Text style={styles.betOption} numberOfLines={1}>
          {bet.betOption}
        </Text>
        <Text style={styles.matchTitle} numberOfLines={1}>
          {bet.matchTitle}
        </Text>
      </View>
      <View style={styles.betActions}>
        <Text style={styles.oddsText}>{bet.odds}</Text>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemoveBet(bet.id)}
        >
          <Ionicons name="close-circle" size={20} color={Colors.error} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCollapsedView = () => (
    <View style={styles.collapsedContent}>
      <View style={styles.collapsedInfo}>
        <Text style={styles.betCountText}>
          {betCount} {betCount === 1 ? 'Bet' : 'Bets'} Selected
        </Text>
        <Text style={styles.tapToExpandText}>Tap to expand</Text>
      </View>
      <TouchableOpacity style={styles.expandButton} onPress={handleToggleExpanded}>
        <Ionicons name="chevron-up" size={24} color={Colors.textPrimary} />
      </TouchableOpacity>
    </View>
  );

  const renderExpandedView = () => (
    <View style={styles.expandedContent}>
      <View style={styles.expandedHeader}>
        <Text style={styles.expandedTitle}>
          {betCount} {betCount === 1 ? 'Bet' : 'Bets'} Selected
        </Text>
        <TouchableOpacity onPress={handleToggleExpanded}>
          <Ionicons name="chevron-down" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.betsList} showsVerticalScrollIndicator={false}>
        {selectedBets.length > 0 ? (
          selectedBets.map(renderBetItem)
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="football" size={48} color={Colors.textSecondary} />
            <Text style={styles.emptyStateText}>No bets selected</Text>
            <Text style={styles.emptyStateSubtext}>
              Select bets from matches to see them here
            </Text>
          </View>
        )}
      </ScrollView>
      
      {selectedBets.length > 0 && (
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={clearBets}
          >
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  if (betCount === 0) {
    return null; // Don't render modal when no bets are selected
  }

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity 
          style={styles.backdrop} 
          activeOpacity={1} 
          onPress={onClose}
        />
        <Animated.View style={[styles.modalContainer, { height: modalHeight }]}>
          {isExpanded ? renderExpandedView() : renderCollapsedView()}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default BetSlipModal; 