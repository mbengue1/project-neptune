import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Image, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { AppStyles } from '../../themes/styles';
import { Colors } from '../../themes/colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './SignupScreen.styles';
import { useAuth } from './AuthContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Signup'>;
};

export const SignupScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState('United States');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date(2000, 0, 1));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const { signup, isLoading, error, clearError } = useAuth();

  // Clear any auth errors when component mounts or unmounts
  useEffect(() => {
    clearError();
    return () => clearError();
  }, []);

  // Show error alert if there's an authentication error
  useEffect(() => {
    if (error) {
      Alert.alert('Signup Failed', error, [
        { text: 'OK', onPress: clearError }
      ]);
    }
  }, [error]);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDateOfBirth(selectedDate);
    }
  };

  const formatPhoneNumber = (input: string): string => {
    // Remove all non-numeric characters
    const cleaned = input.replace(/\D/g, '');
    
    // Limit to 10 digits
    const truncated = cleaned.slice(0, 10);
    
    // Format the number
    if (truncated.length <= 3) {
      return truncated;
    } else if (truncated.length <= 6) {
      return `${truncated.slice(0, 3)}-${truncated.slice(3)}`;
    } else {
      return `${truncated.slice(0, 3)}-${truncated.slice(3, 6)}-${truncated.slice(6)}`;
    }
  };

  const validateStep1 = () => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return false;
    }

    // Username validation
    if (username.length < 4) {
      Alert.alert('Invalid Username', 'Username must be at least 4 characters long.');
      return false;
    }

    // Full name validation
    if (fullName.trim().length < 3) {
      Alert.alert('Invalid Name', 'Please enter your full name.');
      return false;
    }

    return true;
  };

  const validateStep2 = () => {
    // Phone number validation (must be in XXX-XXX-XXXX format)
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    if (!phoneRegex.test(phoneNumber)) {
      Alert.alert('Invalid Phone Number', 'Please enter a complete phone number.');
      return false;
    }

    // Age validation (must be at least 18 years old)
    const today = new Date();
    const age = today.getFullYear() - dateOfBirth.getFullYear();
    const monthDiff = today.getMonth() - dateOfBirth.getMonth();
    if (age < 18 || (age === 18 && monthDiff < 0)) {
      Alert.alert('Age Restriction', 'You must be at least 18 years old to register.');
      return false;
    }

    return true;
  };

  const validateStep3 = () => {
    // Password validation
    if (password.length < 8) {
      Alert.alert('Weak Password', 'Password must be at least 8 characters long.');
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match.');
      return false;
    }

    return true;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSignup = async () => {
    if (!validateStep3()) return;

    const userData = {
      email,
      username,
      fullName,
      phoneNumber,
      country,
      dateOfBirth: format(dateOfBirth, 'MM/dd/yyyy'),
      joinDate: format(new Date(), 'MMMM yyyy')
    };

    const success = await signup(email, password, userData);
    if (success) {
      // Navigation will be handled by the app navigator based on isAuthenticated state
      console.log('Signup successful');
    }
  };

  const renderStep1 = () => (
    <>
      <TextInput
        placeholder="Email"
        placeholderTextColor={Colors.textLight}
        value={email}
        onChangeText={setEmail}
        style={[
          AppStyles.input, 
          styles.input,
          focusedInput === 'email' && AppStyles.inputFocused
        ]}
        keyboardType="email-address"
        onFocus={() => setFocusedInput('email')}
        onBlur={() => setFocusedInput(null)}
        autoCapitalize="none"
        editable={!isLoading}
      />

      <TextInput
        placeholder="Username"
        placeholderTextColor={Colors.textLight}
        value={username}
        onChangeText={setUsername}
        style={[
          AppStyles.input, 
          styles.input,
          focusedInput === 'username' && AppStyles.inputFocused
        ]}
        onFocus={() => setFocusedInput('username')}
        onBlur={() => setFocusedInput(null)}
        autoCapitalize="none"
        editable={!isLoading}
      />

      <TextInput
        placeholder="Full Name"
        placeholderTextColor={Colors.textLight}
        value={fullName}
        onChangeText={setFullName}
        style={[
          AppStyles.input, 
          styles.input,
          focusedInput === 'fullName' && AppStyles.inputFocused
        ]}
        onFocus={() => setFocusedInput('fullName')}
        onBlur={() => setFocusedInput(null)}
        editable={!isLoading}
      />

      <Pressable 
        style={[
          AppStyles.button, 
          styles.button,
          isLoading && { opacity: 0.7 }
        ]}
        onPress={handleNextStep}
        disabled={isLoading}
      >
        <Text style={AppStyles.buttonText}>Next</Text>
      </Pressable>
    </>
  );

  const renderStep2 = () => (
    <>
      <TextInput
        placeholder="Phone Number"
        placeholderTextColor={Colors.textLight}
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(formatPhoneNumber(text))}
        style={[
          AppStyles.input, 
          styles.input,
          focusedInput === 'phoneNumber' && AppStyles.inputFocused
        ]}
        keyboardType="numeric"
        maxLength={12} // Account for the two hyphens
        onFocus={() => setFocusedInput('phoneNumber')}
        onBlur={() => setFocusedInput(null)}
        editable={!isLoading}
      />

      <TouchableOpacity
        style={[
          AppStyles.input, 
          styles.input,
          styles.dateInput,
          focusedInput === 'dateOfBirth' && AppStyles.inputFocused
        ]}
        onPress={() => setShowDatePicker(true)}
        disabled={isLoading}
      >
        <Text style={dateOfBirth ? styles.dateText : styles.placeholderText}>
          {format(dateOfBirth, 'MM/dd/yyyy')}
        </Text>
        <Ionicons name="calendar-outline" size={20} color={Colors.textLight} />
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={dateOfBirth}
          mode="date"
          display="default"
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )}

      <TextInput
        placeholder="Country"
        placeholderTextColor={Colors.textLight}
        value={country}
        onChangeText={setCountry}
        style={[
          AppStyles.input, 
          styles.input,
          focusedInput === 'country' && AppStyles.inputFocused
        ]}
        onFocus={() => setFocusedInput('country')}
        onBlur={() => setFocusedInput(null)}
        editable={!isLoading}
      />

      <View style={styles.navigationButtons}>
        <Pressable 
          style={[styles.backButton, isLoading && { opacity: 0.7 }]}
          onPress={handlePreviousStep}
          disabled={isLoading}
        >
          <Ionicons name="arrow-back" size={20} color={Colors.textPrimary} />
          <Text style={styles.backButtonText}>Back</Text>
        </Pressable>

        <Pressable 
          style={[
            AppStyles.button, 
            styles.nextButton,
            isLoading && { opacity: 0.7 }
          ]}
          onPress={handleNextStep}
          disabled={isLoading}
        >
          <Text style={AppStyles.buttonText}>Next</Text>
        </Pressable>
      </View>
    </>
  );

  const renderStep3 = () => (
    <>
      <TextInput
        placeholder="Password"
        placeholderTextColor={Colors.textLight}
        value={password}
        onChangeText={setPassword}
        style={[
          AppStyles.input, 
          styles.input,
          focusedInput === 'password' && AppStyles.inputFocused
        ]}
        secureTextEntry
        onFocus={() => setFocusedInput('password')}
        onBlur={() => setFocusedInput(null)}
        editable={!isLoading}
      />

      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor={Colors.textLight}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={[
          AppStyles.input, 
          styles.input,
          focusedInput === 'confirmPassword' && AppStyles.inputFocused
        ]}
        secureTextEntry
        onFocus={() => setFocusedInput('confirmPassword')}
        onBlur={() => setFocusedInput(null)}
        editable={!isLoading}
      />

      <View style={styles.navigationButtons}>
        <Pressable 
          style={[styles.backButton, isLoading && { opacity: 0.7 }]}
          onPress={handlePreviousStep}
          disabled={isLoading}
        >
          <Ionicons name="arrow-back" size={20} color={Colors.textPrimary} />
          <Text style={styles.backButtonText}>Back</Text>
        </Pressable>

        <Pressable 
          style={[
            AppStyles.button, 
            styles.nextButton,
            isLoading && { opacity: 0.7 }
          ]}
          onPress={handleSignup}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={Colors.buttonText} size="small" />
          ) : (
            <Text style={AppStyles.buttonText}>Sign up</Text>
          )}
        </Pressable>
      </View>
    </>
  );

  return (
    <View style={AppStyles.container}>
      <Image 
        source={require('../../../assets/objects.png')} 
        style={AppStyles.backgroundImage} 
      />
      
      <ScrollView 
        style={AppStyles.contentContainer}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          <View style={styles.topSection}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subheader}>Join us to start your sports betting journey</Text>
            
            <View style={styles.stepsContainer}>
              <View style={[styles.step, currentStep >= 1 && styles.activeStep]} />
              <View style={[styles.step, currentStep >= 2 && styles.activeStep]} />
              <View style={[styles.step, currentStep >= 3 && styles.activeStep]} />
            </View>
          </View>

          <View style={styles.formContainer}>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

            <Pressable onPress={() => navigation.navigate('Login')} disabled={isLoading}>
              <Text style={styles.alreadyHaveAccount}>Already have an account</Text>
            </Pressable>
          </View>

          <View style={styles.bottomSection}>
            <Text style={styles.orText}>Or continue with</Text>

            <View style={styles.socialButtons}>
              <Pressable style={styles.socialButton} disabled={isLoading}>
                <Ionicons name="logo-google" size={22} color={Colors.socialButtonIcon} />
              </Pressable>
              <Pressable style={styles.socialButton} disabled={isLoading}>
                <Ionicons name="logo-facebook" size={22} color={Colors.socialButtonIcon} />
              </Pressable>
              <Pressable style={styles.socialButton} disabled={isLoading}>
                <Ionicons name="logo-apple" size={22} color={Colors.socialButtonIcon} />
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};