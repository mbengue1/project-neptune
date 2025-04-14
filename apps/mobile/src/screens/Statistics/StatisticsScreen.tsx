import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { styles } from './StatisticsScreen.styles';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../themes/colors';
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar';
import { LineChart } from 'react-native-chart-kit';

const StatisticsScreen = ({ navigation }: any) => {
  const [activeTimeframe, setActiveTimeframe] = useState('week');
  
  // Mock data for the charts
  const weeklyData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [50, 120, 80, 200, 150, 300, 250],
        color: (opacity = 1) => `rgba(46, 125, 50, ${opacity})`, // Green line
        strokeWidth: 2
      }
    ],
    legend: ["Deposits"]
  };
  
  const monthlyData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        data: [500, 800, 650, 950],
        color: (opacity = 1) => `rgba(46, 125, 50, ${opacity})`, // Green line
        strokeWidth: 2
      }
    ],
    legend: ["Deposits"]
  };
  
  const yearlyData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        data: [1200, 1500, 2000, 1800, 2500, 3000, 2800, 3200, 3500, 3800, 4000, 4500],
        color: (opacity = 1) => `rgba(46, 125, 50, ${opacity})`, // Green line
        strokeWidth: 2
      }
    ],
    legend: ["Deposits"]
  };
  
  const getActiveData = () => {
    switch (activeTimeframe) {
      case 'week':
        return weeklyData;
      case 'month':
        return monthlyData;
      case 'year':
        return yearlyData;
      default:
        return weeklyData;
    }
  };
  
  const chartConfig = {
    backgroundGradientFrom: Colors.cardBackground,
    backgroundGradientTo: Colors.cardBackground,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: Colors.primary
    }
  };
  
  const screenWidth = Dimensions.get("window").width - 32; // Account for padding
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Statistics</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView style={styles.scrollView}>
        {/* Summary Section */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total Deposits</Text>
            <Text style={styles.summaryValue}>$4,500.00</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total Withdrawals</Text>
            <Text style={styles.summaryValue}>$2,750.00</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Net Profit</Text>
            <Text style={[styles.summaryValue, styles.profitValue]}>+$1,750.00</Text>
          </View>
        </View>
        
        {/* Chart Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Deposit Activity</Text>
          
          {/* Timeframe Selector */}
          <View style={styles.timeframeSelector}>
            <TouchableOpacity 
              style={[
                styles.timeframeButton, 
                activeTimeframe === 'week' && styles.activeTimeframeButton
              ]}
              onPress={() => setActiveTimeframe('week')}
            >
              <Text style={[
                styles.timeframeButtonText,
                activeTimeframe === 'week' && styles.activeTimeframeButtonText
              ]}>Week</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.timeframeButton, 
                activeTimeframe === 'month' && styles.activeTimeframeButton
              ]}
              onPress={() => setActiveTimeframe('month')}
            >
              <Text style={[
                styles.timeframeButtonText,
                activeTimeframe === 'month' && styles.activeTimeframeButtonText
              ]}>Month</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[
                styles.timeframeButton, 
                activeTimeframe === 'year' && styles.activeTimeframeButton
              ]}
              onPress={() => setActiveTimeframe('year')}
            >
              <Text style={[
                styles.timeframeButtonText,
                activeTimeframe === 'year' && styles.activeTimeframeButtonText
              ]}>Year</Text>
            </TouchableOpacity>
          </View>
          
          {/* Chart */}
          <View style={styles.chartContainer}>
            <LineChart
              data={getActiveData()}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
            />
          </View>
        </View>
        
        {/* Activity History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          
          <View style={styles.activityItem}>
            <View style={styles.activityLeft}>
              <Ionicons name="add-circle" size={24} color={Colors.success} />
              <View style={styles.activityDetails}>
                <Text style={styles.activityTitle}>Deposit</Text>
                <Text style={styles.activityDate}>Jul 15, 2023 • 10:45 AM</Text>
              </View>
            </View>
            <Text style={[styles.activityAmount, styles.depositAmount]}>+$250.00</Text>
          </View>
          
          <View style={styles.activityItem}>
            <View style={styles.activityLeft}>
              <Ionicons name="trophy" size={24} color={Colors.primary} />
              <View style={styles.activityDetails}>
                <Text style={styles.activityTitle}>Winnings</Text>
                <Text style={styles.activityDate}>Jul 14, 2023 • 8:30 PM</Text>
              </View>
            </View>
            <Text style={[styles.activityAmount, styles.winningsAmount]}>+$350.00</Text>
          </View>
          
          <View style={styles.activityItem}>
            <View style={styles.activityLeft}>
              <Ionicons name="arrow-down-circle" size={24} color={Colors.error} />
              <View style={styles.activityDetails}>
                <Text style={styles.activityTitle}>Withdrawal</Text>
                <Text style={styles.activityDate}>Jul 12, 2023 • 2:15 PM</Text>
              </View>
            </View>
            <Text style={[styles.activityAmount, styles.withdrawalAmount]}>-$500.00</Text>
          </View>
          
          <View style={styles.activityItem}>
            <View style={styles.activityLeft}>
              <Ionicons name="add-circle" size={24} color={Colors.success} />
              <View style={styles.activityDetails}>
                <Text style={styles.activityTitle}>Deposit</Text>
                <Text style={styles.activityDate}>Jul 10, 2023 • 11:20 AM</Text>
              </View>
            </View>
            <Text style={[styles.activityAmount, styles.depositAmount]}>+$300.00</Text>
          </View>
          
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllButtonText}>View All Activity</Text>
          </TouchableOpacity>
        </View>
        
        {/* Betting Performance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Betting Performance</Text>
          
          <View style={styles.performanceContainer}>
            <View style={styles.performanceItem}>
              <View style={styles.performanceCircle}>
                <Text style={styles.performanceCircleText}>65%</Text>
              </View>
              <Text style={styles.performanceLabel}>Win Rate</Text>
            </View>
            
            <View style={styles.performanceItem}>
              <View style={styles.performanceCircle}>
                <Text style={styles.performanceCircleText}>42</Text>
              </View>
              <Text style={styles.performanceLabel}>Total Bets</Text>
            </View>
            
            <View style={styles.performanceItem}>
              <View style={styles.performanceCircle}>
                <Text style={styles.performanceCircleText}>$41</Text>
              </View>
              <Text style={styles.performanceLabel}>Avg. Bet</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <BottomNavBar navigation={navigation} />
    </SafeAreaView>
  );
};

export default StatisticsScreen;
