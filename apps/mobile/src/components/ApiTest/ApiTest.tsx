import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { oddsApiService } from '../../services/oddsApi';
import { styles } from './ApiTest.styles';

const ApiTest = () => {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testApi = async () => {
    setIsLoading(true);
    setTestResults([]);
    
    try {
      // Test 1: Check quota
      addResult('Testing API quota...');
      const quota = await oddsApiService.checkQuota();
      addResult(`Quota - Remaining: ${quota.remaining}, Used: ${quota.used}`);

      // Test 2: Get sports
      addResult('Fetching available sports...');
      const sports = await oddsApiService.getSports();
      addResult(`Found ${sports.length} active sports`);

      // Test 3: Get odds for soccer
      addResult('Fetching soccer odds...');
      const soccerOdds = await oddsApiService.getOdds('soccer_epl');
      addResult(`Found ${soccerOdds.length} soccer matches`);

      // Test 4: Get odds for basketball
      addResult('Fetching basketball odds...');
      const basketballOdds = await oddsApiService.getOdds('basketball_nba');
      addResult(`Found ${basketballOdds.length} basketball matches`);

      addResult('✅ All API tests completed successfully!');
    } catch (error) {
      addResult(`❌ API test failed: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>API Integration Test</Text>
      
      <TouchableOpacity 
        style={[styles.button, isLoading && styles.buttonDisabled]} 
        onPress={testApi}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Testing...' : 'Run API Tests'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.clearButton} onPress={clearResults}>
        <Text style={styles.clearButtonText}>Clear Results</Text>
      </TouchableOpacity>

      <ScrollView style={styles.resultsContainer}>
        {testResults.map((result, index) => (
          <Text key={index} style={styles.resultText}>
            {result}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
};

export default ApiTest; 