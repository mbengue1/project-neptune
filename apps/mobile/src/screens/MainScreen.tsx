import React from 'react';
import { View, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { styles } from './MainScreen.styles';
import Header from '../components/Header/Header';
import CategoryTabs from '../components/CategoryTabs/CategoryTabs';
import FeaturedMatch from '../components/FeaturedMatch/FeaturedMatch';
import MatchList from '../components/MatchList/MatchList';
import BottomNavBar from '../components/BottomNavBar/BottomNavBar';
import { Colors } from '../themes/colors';
import EmailVerificationBanner from '../components/EmailVerificationBanner';

// main screen of the app showing featured matches and recommendations
const MainScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      <EmailVerificationBanner />
      <Header />
      <CategoryTabs />
      <ScrollView style={styles.scrollView}>
        <FeaturedMatch />
        <MatchList />
      </ScrollView>
      <BottomNavBar navigation={navigation} />
    </SafeAreaView>
  );
};

export default MainScreen;
