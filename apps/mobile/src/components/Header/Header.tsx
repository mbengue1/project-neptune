import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './Header.styles';
import { Colors } from '../../themes/colors';
import { Ionicons } from '@expo/vector-icons';

// header component for the main screen
const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Neptune</Text>
      <View style={styles.balanceContainer}>
        <Ionicons name="cash-outline" size={18} color={Colors.success} style={styles.dollarIcon} />
        <Text style={styles.balance}>30.23</Text>
        <TouchableOpacity style={styles.depositButton}>
          <Text style={styles.depositText}>Deposit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
