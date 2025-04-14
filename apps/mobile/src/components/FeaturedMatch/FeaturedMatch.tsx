import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './FeaturedMatch.styles';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../themes/colors';

// featured match component showing live score and odds
const FeaturedMatch = () => {
  return (
    <View style={styles.container}>
      <View style={styles.matchContainer}>
        <View style={styles.teamContainer}>
          <View style={styles.teamLogoContainer}>
            <Ionicons name="football" size={32} color={Colors.buttonText} />
          </View>
          <Text style={styles.teamName}>Nottingham{'\n'}Forest</Text>
          <View style={styles.oddsContainer}>
            <Text style={styles.oddsMultiplier}>1x</Text>
            <Text style={styles.odds}>1.12</Text>
            <Text style={styles.oddsValue}>-110</Text>
          </View>
        </View>
        
        <View style={styles.scoreContainer}>
          <Text style={styles.score}>43 : 22</Text>
          <Text style={styles.period}>0 - 2</Text>
          <View style={styles.middleOddsContainer}>
            <Text style={styles.oddsMultiplier}>2x</Text>
            <Text style={styles.odds}>2.03</Text>
            <Text style={styles.oddsValue}>+201</Text>
          </View>
        </View>
        
        <View style={styles.teamContainer}>
          <View style={styles.teamLogoContainer}>
            <Ionicons name="football" size={32} color={Colors.buttonText} />
          </View>
          <Text style={styles.teamName}>Manchester{'\n'}United</Text>
          <View style={styles.oddsContainer}>
            <Text style={styles.oddsMultiplier}>1x</Text>
            <Text style={styles.odds}>1.10</Text>
            <Text style={styles.oddsValue}>-323</Text>
          </View>
        </View>
      </View>
      
      
    </View>
  );
};

export default FeaturedMatch;