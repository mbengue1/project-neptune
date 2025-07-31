import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  ScrollView, 
  Animated,
  Dimensions,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './GlobalBetSlipModal.styles';
import { Colors } from '../../themes/colors';
import { poppins } from '../../utils/fonts';
import { useBetSelection, SelectedBet } from '../../features/betting/BetSelectionContext/BetSelectionContext';

const { height: screenHeight } = Dimensions.get('window');
const NAVBAR_HEIGHT = 80; // Approximate height of bottom navigation bar
const SAFE_AREA_BOTTOM = Platform.OS === 'ios' ? 34 : 0; // Home indicator height for iOS

const GlobalBetSlipModal: React.FC = () => {
  const { selectedBets, removeBet, clearBets, getBetCount } = useBetSelection();
  const [isExpanded, setIsExpanded] = useState(false);
  const [slideAnim] = useState(new Animated.Value(0));
  const [isVisible, setIsVisible] = useState(false);

  const betCount = getBetCount();

  // Auto-show/hide modal based on bet count
  useEffect(() => {
    if (betCount > 0 && !isVisible) {
      setIsVisible(true);
    } else if (betCount === 0 && isVisible) {
      setIsVisible(false);
      setIsExpanded(false);
    }
  }, [betCount, isVisible]);

  // Always keep modal collapsed initially when bets are added
  useEffect(() => {
    if (betCount > 0 && isExpanded) {
      // If new bets are added while expanded, collapse the modal
      setIsExpanded(false);
    }
  }, [betCount]);

  // Animate the modal when expanded state changes
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isExpanded, slideAnim]);

  const modalHeight = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [60, screenHeight * 0.7], // From 60px to 70% of screen height
  });

  const modalBottom = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [NAVBAR_HEIGHT + SAFE_AREA_BOTTOM, SAFE_AREA_BOTTOM + 8], // Directly on top of navbar when collapsed, near bottom when expanded
  });

  // Ensure no gap by using exact positioning
  const collapsedBottom = NAVBAR_HEIGHT + SAFE_AREA_BOTTOM;
  const expandedBottom = SAFE_AREA_BOTTOM + 8;

  const handleToggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleRemoveBet = (betId: string) => {
    removeBet(betId);
  };

  const handleCloseModal = () => {
    if (isExpanded) {
      setIsExpanded(false);
    } else {
      // Only hide the modal if no bets are selected
      if (betCount === 0) {
        setIsVisible(false);
      }
    }
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
          {betCount} {betCount === 1 ? 'Bet' : 'Bets'}
        </Text>
      </View>
      <TouchableOpacity style={styles.expandButton} onPress={handleToggleExpanded}>
        <Ionicons name="chevron-up" size={20} color={Colors.textPrimary} />
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
      onRequestClose={handleCloseModal}
    >
      <View style={[
        styles.overlay,
        { pointerEvents: isExpanded ? 'auto' : 'box-none' }
      ]}>
        {isExpanded && (
          <TouchableOpacity 
            style={styles.backdrop} 
            activeOpacity={1} 
            onPress={handleCloseModal}
          />
        )}
                <Animated.View style={[
          styles.modalContainer, 
          { 
            height: modalHeight,
            bottom: isExpanded ? expandedBottom : collapsedBottom,
            pointerEvents: 'box-none' // Allow touches to pass through to navbar
          }
        ]}>
          {isExpanded ? renderExpandedView() : renderCollapsedView()}
        </Animated.View>
      </View>
    </Modal>
  );
};

export default GlobalBetSlipModal; 