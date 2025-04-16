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
const API_URL = 'http://10.5.160.122:3000/api';

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

      try {
        const userDocRef = doc(firestore, 'users', currentUser.uid);
        
        // First try to get from cache
        try {
          const cachedDoc = await getDoc(userDocRef);
          if (cachedDoc.exists() && isMounted) {
            console.log('Using cached user data');
            setUserData(cachedDoc.data() as UserData);
            setIsLoading(false);
          }
        } catch (cacheErr) {
          console.log('No cached data available:', cacheErr);
        }

        // Then try to get fresh data
        const freshDoc = await getDoc(userDocRef);
        if (freshDoc.exists() && isMounted) {
          console.log('Got fresh user data');
          setUserData(freshDoc.data() as UserData);
        } else {
          console.log('No user data found in Firestore');
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        // Don't set error state if we have cached data
        if (!userData) {
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
      // Validate email and username
      const emailLower = email.toLowerCase();
      const usernameLower = userData.username.toLowerCase();
      
      // Check if username already exists
      const usersRef = collection(firestore, 'users');
      const usernameQuery = query(usersRef, where('username', '==', usernameLower));
      const usernameSnapshot = await getDocs(usernameQuery);
      
      if (!usernameSnapshot.empty) {
        setError('Username already taken. Please choose another one.');
        return false;
      }
      
      // Create the user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, emailLower, password);
      const newUser = userCredential.user;
      
      // Prepare user data with proper formatting
      const userDataToStore = {
        ...userData,
        username: usernameLower,
        displayUsername: userData.username,
        email: emailLower,
        uid: newUser.uid,
        joinDate: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      };
      
      // Store user data in Firestore with retry mechanism
      const storeUserData = async (retries = 3): Promise<boolean> => {
        try {
          await setDoc(doc(firestore, 'users', newUser.uid), userDataToStore);
          return true;
        } catch (err) {
          if (retries > 0) {
            console.log(`Retrying data store. Attempts remaining: ${retries}`);
            await new Promise(resolve => setTimeout(resolve, 1000));
            return storeUserData(retries - 1);
          }
          throw err;
        }
      };

      // Store the data with retries
      await storeUserData();
      
      // Verify the data was stored
      const verifyDoc = await getDoc(doc(firestore, 'users', newUser.uid));
      if (!verifyDoc.exists()) {
        throw new Error('Failed to verify user data storage');
      }

      // Set local state
      setUserData(userDataToStore);
      setUser(newUser);
      setIsAuthenticated(true);
      
      console.log('Account created successfully:', {
        uid: newUser.uid,
        email: emailLower,
        username: usernameLower
      });
      
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
      } else if (err.message === 'Failed to verify user data storage') {
        errorMessage = 'Account created but failed to save profile data. Please try logging in again.';
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