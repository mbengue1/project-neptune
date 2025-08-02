import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StatusBar, ScrollView, Text, ActivityIndicator } from 'react-native';
import { styles } from './MainScreen.styles';
import Header from '../../components/Header/Header';
import CategoryTabs from '../../components/CategoryTabs/CategoryTabs';
import FeaturedMatch from '../../components/FeaturedMatch/FeaturedMatch';
import MatchList from '../../components/MatchList/MatchList';
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar';
import { Colors } from '../../themes/colors';
import EmailVerificationBanner from '../../components/EmailVertification/EmailVerificationBanner';
import { useAllSportsData } from '../../hooks/useOddsApi';

// main screen of the app showing featured matches and recommendations
const MainScreen = ({ navigation }: any) => {
  const [selectedSport, setSelectedSport] = useState('All');
  const [showLiveOnly, setShowLiveOnly] = useState(false);
  
  // Use the API hook to get all sports data
  const { allMatches, isLoading, error, refreshData } = useAllSportsData();

  const handleCategoryChange = (category: string) => {
    // Handle special cases
    if (category === 'Live') {
      setShowLiveOnly(true);
      setSelectedSport('All'); // Show all sports but only live matches
    } else {
      setShowLiveOnly(false);
      setSelectedSport(category);
    }
  };

  const renderMatchLists = () => {
    // Show loading state
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Loading live odds...</Text>
        </View>
      );
    }

    // Show error state
    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Text style={styles.errorSubtext}>Using offline data</Text>
        </View>
      );
    }

    // For Live selection, we would filter matches that are live
    if (showLiveOnly) {
      return (
        <View style={styles.liveMatches}>
          <Text style={styles.liveMatchesTitle}>Live Matches</Text>
          <MatchList sportType="Soccer" showMoreLink={true} showTitle={false} />
        </View>
      );
    }

    // If a specific sport is selected, show only that sport's matches
    if (selectedSport !== 'All') {
      return <MatchList sportType={selectedSport} showMoreLink={true} />;
    }

    // For 'All', show 3 matches from each sport
    const sportTypes = ['Soccer', 'Basketball', 'Football', 'Hockey', 'Tennis'];
    return (
      <>
        {sportTypes.map((sport) => (
          <View key={sport} style={styles.sportSection}>
            <Text style={styles.sportTitle}>{sport}</Text>
            <MatchList 
              sportType={sport} 
              showMoreLink={true} 
              maxMatches={3} 
              showTitle={false} 
            />
          </View>
        ))}
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <EmailVerificationBanner />
      <Header />
      <CategoryTabs onCategoryChange={handleCategoryChange} />
      <ScrollView style={styles.scrollView}>
        {!showLiveOnly && <FeaturedMatch />}
        {renderMatchLists()}
      </ScrollView>
      <BottomNavBar navigation={navigation} />
    </SafeAreaView>
  );
};

export default MainScreen;
