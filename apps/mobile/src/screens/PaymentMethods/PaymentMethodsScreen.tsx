import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';
import { styles } from './PaymentMethodsScreen.styles';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../themes/colors';
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar';

const PaymentMethodsScreen = ({ navigation }: any) => {
  // Mock data for saved payment methods
  const savedPaymentMethods = [
    { id: '1', type: 'visa', last4: '4582', expiry: '05/25' },
    { id: '2', type: 'mastercard', last4: '8790', expiry: '12/24' },
    { id: '3', type: 'paypal', email: 'user@example.com' },
  ];

  // Mock data for available payment methods
  const availablePaymentMethods = [
    { id: 'apple', name: 'Apple Pay', icon: 'logo-apple' },
    { id: 'google', name: 'Google Pay', icon: 'logo-google' },
    { id: 'bank', name: 'Bank Transfer', icon: 'business-outline' },
    { id: 'bitcoin', name: 'Bitcoin', icon: 'logo-bitcoin' },
  ];

  const getCardIcon = (type: string) => {
    switch (type) {
      case 'visa':
        return <Ionicons name="card" size={24} color="#1A1F71" />;
      case 'mastercard':
        return <Ionicons name="card" size={24} color="#EB001B" />;
      case 'paypal':
        return <Ionicons name="logo-paypal" size={24} color="#003087" />;
      default:
        return <Ionicons name="card-outline" size={24} color={Colors.textPrimary} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Methods</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView style={styles.scrollView}>
        {/* Balance Display */}
        <View style={styles.balanceSection}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>$1,250.00</Text>
        </View>
        
        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <TouchableOpacity style={styles.quickActionButton}>
            <Ionicons name="add-circle-outline" size={24} color={Colors.buttonText} />
            <Text style={styles.quickActionText}>Deposit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <Ionicons name="arrow-down-circle-outline" size={24} color={Colors.buttonText} />
            <Text style={styles.quickActionText}>Withdraw</Text>
          </TouchableOpacity>
        </View>

        {/* Available Payment Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add Payment Method</Text>
          
          <View style={styles.availableMethodsGrid}>
            {availablePaymentMethods.map((method) => (
              <TouchableOpacity key={method.id} style={styles.availableMethodCard}>
                <Ionicons name={method.icon} size={28} color={Colors.primary} />
                <Text style={styles.availableMethodName}>{method.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Saved Payment Methods */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Saved Payment Methods</Text>
            <TouchableOpacity style={styles.addButton}>
              <Ionicons name="add" size={20} color={Colors.primary} />
              <Text style={styles.addButtonText}>Add New</Text>
            </TouchableOpacity>
          </View>
          
          {savedPaymentMethods.map((method) => (
            <TouchableOpacity key={method.id} style={styles.paymentMethodCard}>
              <View style={styles.paymentMethodInfo}>
                {getCardIcon(method.type)}
                <View style={styles.paymentMethodDetails}>
                  {method.type === 'paypal' ? (
                    <Text style={styles.paymentMethodName}>PayPal</Text>
                  ) : (
                    <Text style={styles.paymentMethodName}>
                      {method.type.charAt(0).toUpperCase() + method.type.slice(1)}
                    </Text>
                  )}
                  {method.type === 'paypal' ? (
                    <Text style={styles.paymentMethodSubtext}>{method.email}</Text>
                  ) : (
                    <Text style={styles.paymentMethodSubtext}>
                      •••• {method.last4} | Expires {method.expiry}
                    </Text>
                  )}
                </View>
              </View>
              <View style={styles.paymentMethodActions}>
                <TouchableOpacity style={styles.editButton}>
                  <Ionicons name="create-outline" size={20} color={Colors.primary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton}>
                  <Ionicons name="trash-outline" size={20} color={Colors.error} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        
        
        {/* Payment Security Info */}
        <View style={styles.securityInfoContainer}>
          <View style={styles.securityHeader}>
            <Ionicons name="shield-checkmark-outline" size={20} color={Colors.textSecondary} />
            <Text style={styles.securityTitle}>Secure Payments</Text>
          </View>
          <Text style={styles.securityText}>
            All transactions are secured with SSL encryption. We never store your full card details on our servers.
          </Text>
        </View>
      </ScrollView>
      
      <BottomNavBar navigation={navigation} />
    </SafeAreaView>
  );
};

export default PaymentMethodsScreen;
