import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { auth, firestore } from '../../config/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail as firebaseUpdateEmail,
  verifyBeforeUpdateEmail,
  sendEmailVerification
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  enableIndexedDbPersistence,
  connectFirestoreEmulator 
} from 'firebase/firestore';
import NetInfo from '@react-native-community/netinfo';
import { Platform, Alert } from 'react-native';

// Rename local user type definition to avoid conflict
type AppUser = { // Renamed from User
  id: string;
  email: string;
  name?: string;
};

// auth context type includes state and methods
type AuthContextType = AuthState & {
  userData: UserData | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, userData: UserData) => Promise<boolean>;
  logout: () => Promise<void>;
  clearError: () => void;
  updateUsername: (newUsername: string) => Promise<boolean>;
  updateEmail: (newEmail: string, password: string) => Promise<boolean>;
  reauthenticate: (email: string, password: string) => Promise<boolean>;
};

// initial state when app loads
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  isLoading: true, // start with loading true to check for stored token
  error: null,
};

// create context with default values
const AuthContext = createContext<AuthContextType>({
  ...initialState,
  userData: null,
  login: async () => false,
  signup: async () => false,
  logout: async () => {},
  clearError: () => {},
  updateUsername: async () => false,
  updateEmail: async () => false,
  reauthenticate: async () => false,
});

// Replace localhost with your computer's IP address if using a physical device
const API_URL = Platform.select({
  ios: 'http://localhost:3000/api',
  android: 'http://10.0.2.2:3000/api', // Android emulator localhost
  default: 'http://localhost:3000/api',
});

type UserData = {
  email: string;
  username: string;
  fullName: string;
  phoneNumber: string;
  country: string;
  dateOfBirth: string;
  joinDate: string;
};

type AuthState = {
  isAuthenticated: boolean;
  user: FirebaseUser | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
};

// Add these constants at the top of your file (outside the component)
const AUTH_PERSISTENCE_KEY = 'auth_persistence_state';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  // Initialize Firestore persistence
  useEffect(() => {
    const initializeFirestore = async () => {
      try {
        await enableIndexedDbPersistence(firestore);
      } catch (err: any) {
        if (err.code === 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled in one tab at a time
          console.warn('Multiple tabs open, persistence disabled');
        } else if (err.code === 'unimplemented') {
          // The current browser doesn't support persistence
          console.warn('Current browser doesn\'t support persistence');
        }
      }
    };

    initializeFirestore();
  }, []);

  // Save auth state to AsyncStorage whenever it changes
  useEffect(() => {
    const persistAuthState = async () => {
      if (user) {
        try {
          // Only store minimal info needed to restore session
          const persistData = {
            uid: user.uid,
            email: user.email,
            isAuthenticated: true
          };
          await AsyncStorage.setItem(AUTH_PERSISTENCE_KEY, JSON.stringify(persistData));
          console.log('Persisting auth state for user:', user.uid);
        } catch (err) {
          console.error('Failed to persist auth state:', err);
        }
      } else if (!isLoading) {
        // Clear persistence when logged out
        try {
          await AsyncStorage.removeItem(AUTH_PERSISTENCE_KEY);
          console.log('Auth state cleared');
        } catch (err) {
          console.error('Failed to clear auth state:', err);
        }
      }
    };

    persistAuthState();
  }, [user, isLoading]);

  // Auth state listener
  useEffect(() => {
    let isMounted = true;

    const checkPersistedAuth = async () => {
      try {
        const persistedAuthString = await AsyncStorage.getItem(AUTH_PERSISTENCE_KEY);
        
        console.log('Checking for persisted auth state...');
        if (persistedAuthString) {
          console.log('Found persisted auth state:', JSON.parse(persistedAuthString));
          
          // Parse the persisted data
          const persistedAuth = JSON.parse(persistedAuthString);
          
          // Set temporary auth state while we wait for Firebase to initialize
          if (persistedAuth.isAuthenticated) {
            setIsAuthenticated(true);
            setIsLoading(true); // Keep loading until Firebase confirms
            
            // Try to fetch user data based on persisted UID
            try {
              const response = await axios.get(`${API_URL}/users/${persistedAuth.uid}`);
              if (response.data) {
                console.log('Restored user data from MongoDB while waiting for Firebase');
                const userData = {
                  email: response.data.email,
                  username: response.data.username,
                  fullName: response.data.fullName,
                  phoneNumber: response.data.phoneNumber,
                  country: response.data.country,
                  dateOfBirth: response.data.dateOfBirth,
                  joinDate: response.data.joinDate
                };
                
                setUserData(userData);
              }
            } catch (err) {
              console.error('Failed to fetch user data during session restore:', err);
            }
          }
        } else if (!persistedAuthString && !auth.currentUser) {
          // No persisted auth and no current user
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Error checking persisted auth:', err);
        setIsLoading(false);
      }
    };

    checkPersistedAuth();

    const fetchUserData = async (currentUser: FirebaseUser) => {
      if (!isMounted) return;
      setIsLoading(true);
      
      try {
        // Try MongoDB first
        console.log('Fetching user data from MongoDB...');
        const response = await axios.get(`${API_URL}/users/${currentUser.uid}`);
        
        if (response.data) {
          console.log('Got data from MongoDB');
          const userData = {
            email: response.data.email,
            username: response.data.username,
            fullName: response.data.fullName,
            phoneNumber: response.data.phoneNumber,
            country: response.data.country,
            dateOfBirth: response.data.dateOfBirth,
            joinDate: response.data.joinDate
          };
          
          setUserData(userData);
          setIsLoading(false);
          return;
        }
      } catch (mongoErr) {
        console.error('MongoDB fetch error:', mongoErr);
        // Fall back to Firebase only if MongoDB fails
        try {
          const userDocRef = doc(firestore, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            console.log('Got data from Firebase fallback');
            const userData = userDoc.data() as UserData;
            setUserData(userData);
            
            // Sync to MongoDB for future queries
            try {
              await axios.post(`${API_URL}/users`, {
                firebaseUid: currentUser.uid,
                ...userData
              });
              console.log('Synced Firebase data to MongoDB');
            } catch (syncErr) {
              console.error('Failed to sync to MongoDB:', syncErr);
            }
          } else {
            console.log('No user data found in either database');
            setError('User profile not found. Please complete registration.');
          }
        } catch (firebaseErr) {
          console.error('Firebase fetch error:', firebaseErr);
          setError('Unable to fetch user data. Please check your connection.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!isMounted) return;

      try {
        if (currentUser) {
          // User is signed in
          setUser(currentUser);
          setIsAuthenticated(true);
          
          // Then fetch additional data
          await fetchUserData(currentUser);
        } else {
          // No user is signed in - check if we have persisted data
          try {
            const persistedAuthString = await AsyncStorage.getItem(AUTH_PERSISTENCE_KEY);
            if (persistedAuthString) {
              // We have persisted data but Firebase says we're logged out
              console.log('Persisted auth found but Firebase session expired, attempting to restore...');
              
              const persistedAuth = JSON.parse(persistedAuthString);
              
              // Instead of clearing the state, keep the user logged in with the persisted data
              // This is a temporary state until we can properly reauthenticate
              setIsAuthenticated(true);
              
              // Try to fetch user data based on persisted UID
              try {
                const response = await axios.get(`${API_URL}/users/${persistedAuth.uid}`);
                if (response.data) {
                  console.log('Restored user data from MongoDB');
                  const userData = {
                    email: response.data.email,
                    username: response.data.username,
                    fullName: response.data.fullName,
                    phoneNumber: response.data.phoneNumber,
                    country: response.data.country,
                    dateOfBirth: response.data.dateOfBirth,
                    joinDate: response.data.joinDate
                  };
                  
                  setUserData(userData);
                  
                  // We'll show a session expired message only if the user tries to perform
                  // an action that requires authentication
                  console.log('User session will need to be refreshed for secure operations');
                }
              } catch (err) {
                console.error('Failed to fetch user data during session restore:', err);
              } finally {
                setIsLoading(false);
              }
            } else {
              // No persisted auth - user is definitely logged out
              setUser(null);
              setUserData(null);
              setIsAuthenticated(false);
              setIsLoading(false);
            }
          } catch (err) {
            console.error('Error handling persisted auth:', err);
            setUser(null);
            setUserData(null);
            setIsAuthenticated(false);
            setIsLoading(false);
          }
        }
      } catch (err) {
        console.error('Auth state change error:', err);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  // Add a useEffect to monitor network state
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected ?? false);
    });
    
    return () => unsubscribe();
  }, []);

  // clear any error messages
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // handle user login with email and password
  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful:', userCredential.user.email);
      return true;
    } catch (err: any) {
      console.error('Login error:', err);
      let errorMessage = 'Failed to login. Please try again.';
      
      if (err.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email.';
      } else if (err.code === 'auth/wrong-password') {
        errorMessage = 'Invalid password.';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email format.';
      }
      
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // handle new user registration
  const signup = useCallback(async (email: string, password: string, userData: UserData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Create the user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email.toLowerCase(), password);
      const newUser = userCredential.user;
      
      // Send email verification
      await sendEmailVerification(newUser);
      
      // Prepare user data with proper formatting
      const userDataToStore = {
        ...userData,
        email: email.toLowerCase(),
        uid: newUser.uid,
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      };
      
      // Store in Firebase
      try {
        await setDoc(doc(firestore, 'users', newUser.uid), userDataToStore);
        console.log('User data stored in Firebase');
      } catch (firebaseErr) {
        console.error('Failed to store in Firebase:', firebaseErr);
        // Continue anyway to try MongoDB
      }
      
      // Store in MongoDB as backup
      try {
        await axios.post(`${API_URL}/users`, {
          firebaseUid: newUser.uid,
          email: userDataToStore.email,
          username: userDataToStore.username,
          fullName: userDataToStore.fullName,
          phoneNumber: userDataToStore.phoneNumber,
          country: userDataToStore.country,
          dateOfBirth: userDataToStore.dateOfBirth,
          joinDate: userDataToStore.joinDate
        });
        console.log('User data stored in MongoDB');
      } catch (mongoErr) {
        console.error('Failed to store in MongoDB:', mongoErr);
      }
      
      // Set local state
      setUserData(userDataToStore);
      setUser(newUser);
      setIsAuthenticated(true);
      
      // Show verification alert
      // Alert.alert(
      //   "Email Verification Required",
      //   "A verification email has been sent to your email address. Please check your inbox and verify your email to access all features.",
      //   [{ text: "OK" }]
      // );
      
      return true;
    } catch (err: any) {
      console.error('Signup error:', err);
      
      let errorMessage = 'Failed to create account. Please try again.';
      if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'Email already in use. Please use another email or login.';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email format.';
      } else if (err.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak. Please use a stronger password.';
      }
      
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // handle user logout and clear stored data
  const logout = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      await Promise.race([
        firebaseSignOut(auth),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Logout timeout')), 5000)
        )
      ]);
    } catch (err) {
      console.error('Error signing out:', err);
    } finally {
      setIsLoading(false);
      setUser(null);
      setUserData(null);
    }
  }, []);

  // Add these methods to your AuthContext
  const updateUsername = useCallback(async (newUsername: string): Promise<boolean> => {
    try {
      if (!user) throw new Error('No user logged in');
      
      const endpoint = `${API_URL}/users/${user.uid}`;
      console.log('Making request to:', endpoint);
      
      // First verify the user exists
      try {
        const checkUser = await axios.get(`${API_URL}/users/${user.uid}`);
        console.log('User exists:', checkUser.data);
      } catch (err) {
        console.error('User check failed:', err);
        throw new Error('User not found in database');
      }

      // Then update the username
      const response = await axios.put(`${API_URL}/users/${user.uid}`, {
        username: newUsername
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Response:', response.status, response.data);
      
      if (response.status === 200) {
        setUserData(prev => prev ? { ...prev, username: newUsername } : null);
        return true;
      }
      throw new Error('Failed to update username');
    } catch (err) {
      console.error('Error updating username:', err);
      if (axios.isAxiosError(err)) {
        console.error('Full error:', {
          status: err.response?.status,
          data: err.response?.data,
          url: err.config?.url
        });
      }
      throw err;
    }
  }, [user]);

  const updateEmail = useCallback(async (newEmail: string, password: string): Promise<boolean> => {
    try {
      if (!user) throw new Error('No user logged in');
      
      // First reauthenticate with Firebase
      try {
        const credential = EmailAuthProvider.credential(user.email!, password);
        await reauthenticateWithCredential(user, credential);
      } catch (authErr: any) {
        if (authErr.code === 'auth/invalid-credential') {
          throw new Error('Incorrect password. Please verify and try again.');
        }
        throw authErr;
      }
      
      // Validate email format
      if (!/^\S+@\S+\.\S+$/.test(newEmail)) {
        throw new Error('Please enter a valid email address');
      }
      
      // Send verification email to the new address
      await verifyBeforeUpdateEmail(user, newEmail);
      
      // Show alert immediately after sending verification email
      Alert.alert(
        "Email Change Requested",
        "A verification email has been sent to your new email address. After verification, you'll need to log in again with your new email.",
        [{ text: "OK" }]
      );
      
      return true;
    } catch (err: any) {
      console.error('Error updating email:', err);
      if (err.code === 'auth/requires-recent-login') {
        throw new Error('Please log out and log in again before changing your email');
      } else if (err.code === 'auth/email-already-in-use') {
        throw new Error('This email is already in use');
      } else if (err.code === 'auth/invalid-email') {
        throw new Error('Invalid email format');
      } else if (err.code === 'auth/operation-not-allowed') {
        throw new Error('A verification email has been sent to your new email address. Please verify before continuing.');
      }
      throw err;
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;
    
    // Check for email verification status on reload
    const checkEmailVerification = () => {
      if (user.emailVerified) {
        // If email is verified, update MongoDB with the new email
        const updateMongoDBEmail = async () => {
          try {
            // Check if the email in MongoDB is different from Firebase
            const userResponse = await axios.get(`${API_URL}/users/${user.uid}`);
            const mongoEmail = userResponse.data.email;
            
            if (mongoEmail !== user.email) {
              // Email has changed and been verified - update MongoDB
              await axios.put(`${API_URL}/users/${user.uid}`, {
                email: user.email
              });
              
              // Update local state
              setUserData(prev => prev ? { ...prev, email: user.email! } : null);
              
              console.log('Email updated in MongoDB after verification');
              
              // Show alert about the email change
              // Alert.alert(
              //   "Email Updated",
              //   "Your email has been successfully verified and updated. You'll need to log in again with your new email.",
              //   [
              //     { 
              //       text: "Log out now", 
              //       onPress: () => {
              //         logout();
              //       }
              //     },
              //     {
              //       text: "Later",
              //       style: "cancel"
              //     }
              //   ]
              // );
            }
          } catch (err) {
            console.error('Failed to update email in MongoDB after verification:', err);
          }
        };
        
        updateMongoDBEmail();
      }
    };
    
    // Check on mount and when user changes
    checkEmailVerification();
    
    // Also reload user occasionally to check verification status
    const interval = setInterval(() => {
      user.reload().then(() => {
        checkEmailVerification();
      }).catch(err => {
        console.error('Error reloading user:', err);
      });
    }, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [user, logout]);

  const reauthenticate = useCallback(async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setIsAuthenticated(true);
      
      // Refresh user data
      await fetchUserData(userCredential.user);
      
      return true;
    } catch (err) {
      console.error('Reauthentication error:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated,
        user,
        token: null,
        isLoading,
        error,
        userData,
        login, 
        signup, 
        logout,
        clearError,
        updateUsername,
        updateEmail,
        reauthenticate
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// custom hook to use auth context
export const useAuth = () => useContext(AuthContext);