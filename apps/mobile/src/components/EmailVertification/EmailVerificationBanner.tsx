import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../themes/colors';
import { useAuth } from '../../features/auth/AuthContext/AuthContext';
import { sendEmailVerification } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { styles } from './EmailVerificationBanner.styles';

const EmailVerificationBanner = () => {
  const { user, checkEmailVerificationStatus } = useAuth();
  const [dismissed, setDismissed] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  
  useEffect(() => {
    const checkStatus = async () => {
      if (user && auth.currentUser) {
        try {
          const verified = await checkEmailVerificationStatus();
          setIsVerified(verified);
        } catch (err) {
          console.error('Error in banner when checking verification:', err);
        }
      }
    };
    
    checkStatus();
    
    if (auth.currentUser) {
      const interval = setInterval(checkStatus, 30000);
      return () => clearInterval(interval);
    }
    
    return undefined;
  }, [user, checkEmailVerificationStatus]);
  
  const handleResendVerification = async () => {
    if (!user) return;
    
    setIsResending(true);
    try {
      await sendEmailVerification(user);
      alert('Verification email sent! Please check your inbox.');
    } catch (err: any) {
      console.error('Error sending verification email:', err);
      if (err.code === 'auth/too-many-requests') {
        alert('Too many attempts. Please try again later.');
      } else {
        alert('Failed to send verification email. Please try again later.');
      }
    } finally {
      setIsResending(false);
    }
  };
  
  const handleDismiss = () => {
    setDismissed(true);
  };
  
  if (!user || !auth.currentUser || isVerified || dismissed) return null;
  
  return (
    <View style={styles.container}>
      <Ionicons name="mail-unread-outline" size={20} color={Colors.buttonText} />
      <Text style={styles.text}>
        Please verify your email address to access all features
      </Text>
      <TouchableOpacity 
        onPress={handleResendVerification} 
        style={styles.button}
        disabled={isResending}
      >
        <Text style={styles.buttonText}>
          {isResending ? 'Sending...' : 'Resend'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDismiss} style={styles.closeButton}>
        <Ionicons name="close" size={20} color={Colors.buttonText} />
      </TouchableOpacity>
    </View>
  );
};

export default EmailVerificationBanner; 