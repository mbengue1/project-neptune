import React, { useState } from 'react';
import { 
  Modal, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../themes/colors';
import { styles } from './ChangePasswordModal.styles';

type ChangePasswordModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (currentPassword: string, newPassword: string) => Promise<void>;
};

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isVisible,
  onClose,
  onSubmit
}) => {
  const [step, setStep] = useState(1); // 1: Current password, 2: New password, 3: Confirm new password
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleNext = () => {
    setError(null);
    
    if (step === 1) {
      if (!currentPassword) {
        setError('Please enter your current password');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!newPassword) {
        setError('Please enter a new password');
        return;
      }
      if (newPassword.length < 8) {
        setError('Password must be at least 8 characters long');
        return;
      }
      if (newPassword === currentPassword) {
        setError('New password must be different from current password');
        return;
      }
      setStep(3);
    }
  };
  
  const handleSubmit = async () => {
    setError(null);
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    try {
      await onSubmit(currentPassword, newPassword);
      resetAndClose();
    } catch (err: any) {
      setError(err.message);
      
      // If it's a session expired or no user error, show a more helpful message
      if (err.message.includes('No user logged in') || 
          err.message.includes('Session expired') ||
          err.message.includes('log out and log in again')) {
        setError('Your session has expired. Please log out and log in again before changing your password.');
      }
      // If it's a current password error, go back to step 1
      else if (err.message.includes('Incorrect password')) {
        setStep(1);
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const resetAndClose = () => {
    setStep(1);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setError(null);
    onClose();
  };
  
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Text style={styles.title}>Enter Current Password</Text>
            <Text style={styles.subtitle}>
              Please enter your current password to continue
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Current Password"
              secureTextEntry
              value={currentPassword}
              onChangeText={setCurrentPassword}
              autoFocus
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={resetAndClose}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.nextButtonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </>
        );
      case 2:
        return (
          <>
            <Text style={styles.title}>Create New Password</Text>
            <Text style={styles.subtitle}>
              Your new password must be at least 8 characters long
            </Text>
            <TextInput
              style={styles.input}
              placeholder="New Password"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
              autoFocus
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setStep(1)}>
                <Text style={styles.cancelButtonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.nextButtonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </>
        );
      case 3:
        return (
          <>
            <Text style={styles.title}>Confirm New Password</Text>
            <Text style={styles.subtitle}>
              Please re-enter your new password to confirm
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Confirm New Password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              autoFocus
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setStep(2)}>
                <Text style={styles.cancelButtonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.nextButton, isLoading && styles.disabledButton]} 
                onPress={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color={Colors.buttonText} />
                ) : (
                  <Text style={styles.nextButtonText}>Update Password</Text>
                )}
              </TouchableOpacity>
            </View>
          </>
        );
      default:
        return null;
    }
  };
  
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={resetAndClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={Colors.textPrimary} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.modalContent}>
            {renderStep()}
            
            {error && (
              <Text style={styles.errorText}>{error}</Text>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};
