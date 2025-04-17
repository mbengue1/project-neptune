import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { auth, firestore } from '../../config/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser
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

// user type definition
type User = {
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
});

// api base url - replace with your local ip address
const API_URL = 'http://localhost:3000/api';

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

  // Auth state listener
  useEffect(() => {
    let isMounted = true;
    let retryCount = 0;
    const maxRetries = 3;

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
          // Set basic auth state immediately
          setUser(currentUser);
          setIsAuthenticated(true);
          
          // Then fetch additional data with retry logic
          await fetchUserData(currentUser);
        } else {
          // No user is signed in
          setUser(null);
          setUserData(null);
          setIsAuthenticated(false);
          setIsLoading(false);
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
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// custom hook to use auth context
export const useAuth = () => useContext(AuthContext);