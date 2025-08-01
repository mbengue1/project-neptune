import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  Animated,
  Dimensions,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './GlobalBetSlip.styles';
import { Colors } from '../../themes/colors';
import { poppins } from '../../utils/fonts';
import { useBetSelection, SelectedBet } from '../../features/betting/BetSelectionContext/BetSelectionContext';
import { useBottomSheet } from '../../features/betting/BottomSheetContext/BottomSheetContext';
import BetPlacementModal from '../BetPlacementModal/BetPlacementModal';

const { height: screenHeight } = Dimensions.get('window');
const NAVBAR_HEIGHT = 60; // Actual content height (without padding)
const NAVBAR_PADDING = 20; // Total vertical padding (10px top + 10px bottom)
const SAFE_AREA_BOTTOM = Platform.OS === 'ios' ? 34 : 0; // Home indicator height for iOS

const GlobalBetSlip: React.FC = () => {
  const { selectedBets, removeBet, clearBets, getBetCount } = useBetSelection();
  const { isBottomSheetVisible } = useBottomSheet();
  const [isExpanded, setIsExpanded] = useState(false);
  const [slideAnim] = useState(new Animated.Value(0));
  const [isVisible, setIsVisible] = useState(false);
  const [showBetPlacement, setShowBetPlacement] = useState(false);

  const betCount = getBetCount();

  // Auto-show/hide based on bet count and bottom sheet visibility
  useEffect(() => {
    if (betCount > 0 && !isVisible && isBottomSheetVisible) {
      setIsVisible(true);
    } else if ((betCount === 0 && isVisible) || !isBottomSheetVisible) {
      setIsVisible(false);
      setIsExpanded(false);
    }
  }, [betCount, isVisible, isBottomSheetVisible]);

  // Always keep collapsed initially when bets are added
  useEffect(() => {
    if (betCount > 0 && isExpanded) {
      setIsExpanded(false);
    }
  }, [betCount]);

  // Animate the sheet when expanded state changes
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isExpanded, slideAnim]);

  const sheetHeight = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [60, screenHeight * 0.7], // From 60px to 70% of screen height
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
          {betCount} {betCount === 1 ? 'Bet Selected' : 'Bets Selected'}
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
          {betCount} {betCount === 1 ? 'Bet Selected' : 'Bets Selected'}
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
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={() => setShowBetPlacement(true)}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  if (betCount === 0) {
    return null; // Don't render when no bets are selected
  }

  return (
    <>
      <Animated.View style={[
        styles.container,
        { 
          height: sheetHeight,
          bottom: NAVBAR_HEIGHT + NAVBAR_PADDING + SAFE_AREA_BOTTOM
        }
      ]}>
        {isExpanded ? renderExpandedView() : renderCollapsedView()}
      </Animated.View>
      
      <BetPlacementModal
        isVisible={showBetPlacement}
        onClose={() => setShowBetPlacement(false)}
        onSuccess={() => {
          setShowBetPlacement(false);
          setIsExpanded(false);
        }}
      />
    </>
  );
};

export default GlobalBetSlip; 