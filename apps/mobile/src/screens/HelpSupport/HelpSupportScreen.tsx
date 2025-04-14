import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from './HelpSupportScreen.styles';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../themes/colors';
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar';

const HelpSupportScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Responsible Gambling</Text>
          <Text style={styles.paragraph}>
            Gambling should be an enjoyable form of entertainment, but for some people, it can become a problem. It's important to be aware of the risks and to gamble responsibly.
          </Text>
          
          <Text style={styles.subTitle}>Signs of Problem Gambling</Text>
          <Text style={styles.paragraph}>
            • Spending more money and time on gambling than you can afford{'\n'}
            • Finding it hard to manage or stop your gambling{'\n'}
            • Having arguments with family or friends about money and gambling{'\n'}
            • Losing interest in your usual activities or hobbies{'\n'}
            • Always thinking or talking about gambling{'\n'}
            • Lying about your gambling or hiding it from other people{'\n'}
            • Chasing losses or gambling to get out of financial trouble{'\n'}
            • Gambling until all your money is gone{'\n'}
            • Borrowing money, selling possessions or not paying bills in order to fund gambling{'\n'}
            • Gambling to escape from problems or feelings of helplessness, guilt, anxiety or depression
          </Text>
          
          <Text style={styles.subTitle}>Tools for Responsible Gambling</Text>
          <Text style={styles.paragraph}>
            Our app provides several tools to help you stay in control of your gambling:
          </Text>
          <Text style={styles.paragraph}>
            • <Text style={styles.bold}>Deposit Limits:</Text> Set daily, weekly, or monthly limits on how much you can deposit.{'\n'}
            • <Text style={styles.bold}>Time Limits:</Text> Set reminders to alert you when you've been using the app for a certain period.{'\n'}
            • <Text style={styles.bold}>Self-Exclusion:</Text> Take a break from gambling for a period of your choosing.{'\n'}
            • <Text style={styles.bold}>Reality Checks:</Text> Set up notifications that remind you how long you've been playing.
          </Text>
          
          <Text style={styles.subTitle}>Getting Help</Text>
          <Text style={styles.paragraph}>
            If you're concerned about your gambling habits or those of someone close to you, there are organizations that can help:
          </Text>
          <Text style={styles.paragraph}>
            • <Text style={styles.bold}>National Problem Gambling Helpline:</Text> 1-800-522-4700{'\n'}
            • <Text style={styles.bold}>Gamblers Anonymous:</Text> www.gamblersanonymous.org{'\n'}
            • <Text style={styles.bold}>GamCare:</Text> www.gamcare.org.uk{'\n'}
            • <Text style={styles.bold}>BeGambleAware:</Text> www.begambleaware.org
          </Text>
          <Text style={styles.paragraph}>
            These services are confidential and available 24/7. They can provide information, support, and counseling to help you or your loved ones.
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <Text style={styles.paragraph}>
            Our support team is available 24/7 to assist you with any questions or concerns you may have.
          </Text>
          
          <View style={styles.contactItem}>
            <Ionicons name="mail-outline" size={24} color={Colors.primary} />
            <Text style={styles.contactText}>support@sportsapp.com</Text>
          </View>
          
          <View style={styles.contactItem}>
            <Ionicons name="call-outline" size={24} color={Colors.primary} />
            <Text style={styles.contactText}>1-800-SPORTS-APP</Text>
          </View>
          
          <View style={styles.contactItem}>
            <Ionicons name="chatbubble-outline" size={24} color={Colors.primary} />
            <Text style={styles.contactText}>Live Chat (Available in the app)</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>FAQs</Text>
          <TouchableOpacity style={styles.faqItem}>
            <Text style={styles.faqQuestion}>How do I place a bet?</Text>
            <Ionicons name="chevron-down" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.faqItem}>
            <Text style={styles.faqQuestion}>How do I deposit funds?</Text>
            <Ionicons name="chevron-down" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.faqItem}>
            <Text style={styles.faqQuestion}>How do I withdraw my winnings?</Text>
            <Ionicons name="chevron-down" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.faqItem}>
            <Text style={styles.faqQuestion}>What payment methods are accepted?</Text>
            <Ionicons name="chevron-down" size={20} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      <BottomNavBar navigation={navigation} />
    </SafeAreaView>
  );
};

export default HelpSupportScreen;
