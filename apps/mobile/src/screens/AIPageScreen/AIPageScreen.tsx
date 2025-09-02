import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AIChat from '../../components/AIChat/AIChat';
import { Colors } from '../../themes/colors';

interface AIPageScreenProps {
  navigation?: any;
}

const AIPageScreen: React.FC<AIPageScreenProps> = ({ navigation }) => {
  const [showChat, setShowChat] = useState(false);
  const [selectedSport, setSelectedSport] = useState('NBA');

  const sports = [
    { id: 'NBA', name: 'Basketball', icon: '🏀' },
    { id: 'NFL', name: 'Football', icon: '🏈' },
    { id: 'MLB', name: 'Baseball', icon: '⚾' },
    { id: 'NHL', name: 'Hockey', icon: '🏒' },
    { id: 'SOCCER', name: 'Soccer', icon: '⚽' },
  ];

  const quickActions = [
    {
      id: 'player-stats',
      title: 'Player Stats',
      description: 'Get detailed player statistics',
      icon: '📊',
      prompt: `Show me the latest stats for a top ${selectedSport} player`
    },
    {
      id: 'injury-report',
      title: 'Injury Report',
      description: 'Check player injury status',
      icon: '🏥',
      prompt: `What are the latest injury updates for ${selectedSport}?`
    },
    {
      id: 'game-analysis',
      title: 'Game Analysis',
      description: 'Analyze upcoming games',
      icon: '🎯',
      prompt: `Analyze the upcoming ${selectedSport} games and give me insights`
    },
    {
      id: 'trending-players',
      title: 'Trending Players',
      description: 'See who\'s hot right now',
      icon: '🔥',
      prompt: `Who are the trending players in ${selectedSport} this week?`
    },
  ];

  const handleQuickAction = (action: typeof quickActions[0]) => {
    setShowChat(true);
    // The initial message will be set in the AIChat component
  };

  const handleBackToMain = () => {
    setShowChat(false);
  };

  if (showChat) {
    return (
      <SafeAreaView style={styles.container}>
        <AIChat 
          onClose={handleBackToMain}
          initialMessage=""
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation?.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Neptune AI</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Welcome to Neptune AI</Text>
          <Text style={styles.welcomeSubtitle}>
            Your intelligent sports betting assistant. Get insights, analyze games, and make informed decisions.
          </Text>
        </View>

        {/* Sport Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Sport</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.sportSelector}
          >
            {sports.map((sport) => (
              <TouchableOpacity
                key={sport.id}
                style={[
                  styles.sportCard,
                  selectedSport === sport.id && styles.sportCardSelected
                ]}
                onPress={() => setSelectedSport(sport.id)}
              >
                <Text style={styles.sportIcon}>{sport.icon}</Text>
                <Text style={[
                  styles.sportName,
                  selectedSport === sport.id && styles.sportNameSelected
                ]}>
                  {sport.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={styles.quickActionCard}
                onPress={() => handleQuickAction(action)}
              >
                <Text style={styles.quickActionIcon}>{action.icon}</Text>
                <Text style={styles.quickActionTitle}>{action.title}</Text>
                <Text style={styles.quickActionDescription}>{action.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Chat Button */}
        <TouchableOpacity
          style={styles.chatButton}
          onPress={() => setShowChat(true)}
        >
          <Ionicons name="chatbubble" size={24} color={Colors.buttonText} />
          <Text style={styles.chatButtonText}>Start AI Chat</Text>
        </TouchableOpacity>

        {/* Features Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Features</Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Ionicons name="analytics" size={20} color={Colors.primary} />
              <Text style={styles.featureText}>Advanced Analytics</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="trending-up" size={20} color={Colors.primary} />
              <Text style={styles.featureText}>Trend Analysis</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="shield-checkmark" size={20} color={Colors.primary} />
              <Text style={styles.featureText}>Injury Reports</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="bulb" size={20} color={Colors.primary} />
              <Text style={styles.featureText}>Smart Recommendations</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  welcomeSection: {
    padding: 24,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  sportSelector: {
    marginHorizontal: -16,
  },
  sportCard: {
    alignItems: 'center',
    padding: 16,
    marginRight: 12,
    backgroundColor: Colors.background,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    minWidth: 80,
  },
  sportCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  sportIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  sportName: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  sportNameSelected: {
    color: Colors.primary,
    fontWeight: '600',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: '48%',
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  quickActionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
    textAlign: 'center',
  },
  quickActionDescription: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 16,
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    marginHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  chatButtonText: {
    color: Colors.buttonText,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  featuresList: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  featureText: {
    fontSize: 14,
    color: Colors.textPrimary,
    marginLeft: 12,
  },
});

export default AIPageScreen;
