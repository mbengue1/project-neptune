import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// define types for our authentication state
type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
};

// user type definition
type User = {
  id: string;
  email: string;
  name?: string;
};

// auth context type includes state and methods
type AuthContextType = AuthState & {
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name?: string) => Promise<boolean>;
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
  login: async () => false,
  signup: async () => false,
  logout: async () => {},
  clearError: () => {},
});

// api base url - replace with your local ip address
const API_URL = 'http://10.5.160.122:3000/api';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AuthState>(initialState);

  // check for stored token on app start
  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await AsyncStorage.getItem('auth_token');
        const userData = await AsyncStorage.getItem('user_data');
        
        if (token && userData) {
          // set auth header for future requests
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          setState({
            isAuthenticated: true,
            token,
            user: JSON.parse(userData),
            isLoading: false,
            error: null,
          });
        } else {
          setState({
            ...initialState,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error('token loading error:', error);
        setState({
          ...initialState,
          isLoading: false,
        });
      }
    };
    
    loadToken();
  }, []);

  // clear any error messages
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // handle user login with email and password
  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      const { token, user } = response.data;
      
      // store token and user data in async storage
      await AsyncStorage.setItem('auth_token', token);
      await AsyncStorage.setItem('user_data', JSON.stringify(user));
      
      // set auth header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setState({
        isAuthenticated: true,
        token,
        user,
        isLoading: false,
        error: null,
      });
      
      return true;
    } catch (error: any) {
      console.error('login error:', error);
      
      setState({
        ...initialState,
        isLoading: false,
        error: error.response?.data?.message || 'failed to login. please try again.',
      });
      
      return false;
    }
  }, []);

  // handle new user registration
  const signup = useCallback(async (email: string, password: string, name?: string): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      console.log(`attempting to connect to: ${API_URL}/auth/register`);
      console.log('signup data:', { email, password: '***', name });
      
      const response = await axios.post(`${API_URL}/auth/register`, { email, password, name });
      
      console.log('signup response:', response.data);
      const { token, user } = response.data;
      
      // store token and user data in async storage
      await AsyncStorage.setItem('auth_token', token);
      await AsyncStorage.setItem('user_data', JSON.stringify(user));
      
      // set auth header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setState({
        isAuthenticated: true,
        token,
        user,
        isLoading: false,
        error: null,
      });
      
      return true;
    } catch (error: any) {
      console.error('signup error details:', error);
      
      if (error.response) {
        // the request was made and the server responded with a status code
        console.error('error response data:', error.response.data);
        console.error('error response status:', error.response.status);
        console.error('error response headers:', error.response.headers);
      } else if (error.request) {
        // the request was made but no response was received
        console.error('no response received:', error.request);
      } else {
        // something happened in setting up the request that triggered an error
        console.error('error message:', error.message);
      }
      
      setState({
        ...initialState,
        isLoading: false,
        error: error.response?.data?.message || 'network error. please check your connection and try again.',
      });
      
      return false;
    }
  }, []);

  // handle user logout and clear stored data
  const logout = useCallback(async (): Promise<void> => {
    try {
      // clear stored data from async storage
      await AsyncStorage.removeItem('auth_token');
      await AsyncStorage.removeItem('user_data');
      
      // clear auth header
      delete axios.defaults.headers.common['Authorization'];
      
      setState({
        ...initialState,
        isLoading: false,
      });
    } catch (error) {
      console.error('logout error:', error);
    }
  }, []);

  return (
    <AuthContext.Provider 
      value={{ 
        ...state, 
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