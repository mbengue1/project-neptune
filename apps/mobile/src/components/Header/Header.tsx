import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './Header.styles';
import { Colors } from '../../themes/colors';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useUserBalance } from '../../features/betting/UserBalanceContext/UserBalanceContext';

// Props interface for the Header component
interface HeaderProps {
  balance?: number;
  onDepositPress?: () => void;
}

// Header component for the main screen
const Header: React.FC<HeaderProps> = ({ 
  balance: propBalance, 
  onDepositPress 
}) => {
  const navigation = useNavigation();
  const { balance } = useUserBalance();
  
  // Use prop balance if provided, otherwise use context balance
  const displayBalance = propBalance ?? balance;

  const handleDepositPress = () => {
    if (onDepositPress) {
      onDepositPress();
    } else {
      // Navigate directly to payment methods screen
      navigation.navigate('PaymentMethods' as never);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Neptune</Text>
      <View style={styles.balanceContainer}>
        <Ionicons name="cash-outline" size={18} color={Colors.success} style={styles.dollarIcon} />
        <Text style={styles.balance}>${displayBalance.toFixed(2)}</Text>
        <TouchableOpacity 
          style={styles.depositButton}
          onPress={handleDepositPress}
          activeOpacity={0.7}
        >
          <Text style={styles.depositText}>Deposit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
