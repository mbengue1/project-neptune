import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator
} from 'react-native';
import { Colors } from '../../themes/colors';
import { styles } from './PasswordConfirmModal.styles';

interface PasswordConfirmModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (password: string) => Promise<void>;
  title: string;
  message: string;
}

export const PasswordConfirmModal = ({
  isVisible,
  onClose,
  onConfirm,
  title,
  message
}: PasswordConfirmModalProps) => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    if (!password.trim()) {
      setError('Please enter your password');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      await onConfirm(password);
      setPassword('');
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to verify password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor={Colors.textLight}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
          />
          
          {error && <Text style={styles.errorText}>{error}</Text>}
          
          <View style={styles.buttonContainer}>
            <Pressable 
              style={[styles.button, styles.cancelButton]} 
              onPress={onClose}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
            
            <Pressable 
              style={[styles.button, styles.confirmButton]} 
              onPress={handleConfirm}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={Colors.buttonText} size="small" />
              ) : (
                <Text style={styles.buttonText}>Confirm</Text>
              )}
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}; 