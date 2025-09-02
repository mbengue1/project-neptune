import React, { createContext, useContext, ReactNode } from 'react';
import { useAllSportsData } from '../hooks/useOddsApi';
import { MatchType } from '../types/matches';

interface SportsDataContextType {
  allMatches: Record<string, MatchType[]>;
  isLoading: boolean;
  error: string | null;
  refreshData: () => void;
  getMatchesBySport: (sportType: string) => MatchType[];
}

const SportsDataContext = createContext<SportsDataContextType | undefined>(undefined);

export const SportsDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { allMatches, isLoading, error, refreshData } = useAllSportsData();

  if (__DEV__) {
    console.log('🏈 SportsDataContext - allMatches keys:', Object.keys(allMatches));
    console.log('🏈 SportsDataContext - isLoading:', isLoading);
    console.log('🏈 SportsDataContext - error:', error);
  }

  const getMatchesBySport = (sportType: string): MatchType[] => {
    const sportKey = sportType.toLowerCase();
    const matches = allMatches && allMatches[sportKey] ? allMatches[sportKey] : [];
    if (__DEV__) {
      console.log(`🏈 Getting matches for ${sportType}:`, matches.length);
    }
    return matches;
  };

  const value: SportsDataContextType = {
    allMatches,
    isLoading,
    error,
    refreshData,
    getMatchesBySport
  };

  return (
    <SportsDataContext.Provider value={value}>
      {children}
    </SportsDataContext.Provider>
  );
};

export const useSportsData = (): SportsDataContextType => {
  const context = useContext(SportsDataContext);
  if (context === undefined) {
    throw new Error('useSportsData must be used within a SportsDataProvider');
  }
  return context;
}; 