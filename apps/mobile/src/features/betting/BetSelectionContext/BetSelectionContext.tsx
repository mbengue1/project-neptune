import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types for selected bets
export interface SelectedBet {
  id: string;
  matchId: string;
  matchTitle: string;
  betTitle: string;
  betOption: string;
  odds: string;
  team?: string;
  sportType: string;
  league: string;
  timestamp: number;
}

interface BetSelectionContextType {
  selectedBets: SelectedBet[];
  addBet: (bet: Omit<SelectedBet, 'id' | 'timestamp'>) => void;
  removeBet: (betId: string) => void;
  removeBetByMatchAndOdds: (matchId: string, odds: string) => void;
  clearBets: () => void;
  isBetSelected: (matchId: string, odds: string) => boolean;
  getBetCount: () => number;
  hasBets: boolean;
}

const BetSelectionContext = createContext<BetSelectionContextType | undefined>(undefined);

interface BetSelectionProviderProps {
  children: ReactNode;
}

export const BetSelectionProvider: React.FC<BetSelectionProviderProps> = ({ children }) => {
  const [selectedBets, setSelectedBets] = useState<SelectedBet[]>([]);

  const addBet = (bet: Omit<SelectedBet, 'id' | 'timestamp'>) => {
    const newBet: SelectedBet = {
      ...bet,
      id: `${bet.matchId}-${bet.betOption}-${bet.odds}-${Date.now()}`,
      timestamp: Date.now(),
    };
    
    setSelectedBets(prev => {
      // Check if this exact bet is already selected
      const isDuplicate = prev.some(existingBet => 
        existingBet.matchId === bet.matchId && 
        existingBet.betOption === bet.betOption &&
        existingBet.odds === bet.odds
      );
      
      if (isDuplicate) {
        return prev; // Don't add duplicate
      }
      
      return [...prev, newBet];
    });
  };

  const removeBet = (betId: string) => {
    setSelectedBets(prev => prev.filter(bet => bet.id !== betId));
  };

  const removeBetByMatchAndOdds = (matchId: string, odds: string) => {
    setSelectedBets(prev => prev.filter(bet => 
      !(bet.matchId === matchId && bet.odds === odds)
    ));
  };

  const clearBets = () => {
    setSelectedBets([]);
  };

  const isBetSelected = (matchId: string, odds: string) => {
    return selectedBets.some(bet => 
      bet.matchId === matchId && bet.odds === odds
    );
  };

  const getBetCount = () => {
    return selectedBets.length;
  };

  const value: BetSelectionContextType = {
    selectedBets,
    addBet,
    removeBet,
    removeBetByMatchAndOdds,
    clearBets,
    isBetSelected,
    getBetCount,
    hasBets: selectedBets.length > 0,
  };

  return (
    <BetSelectionContext.Provider value={value}>
      {children}
    </BetSelectionContext.Provider>
  );
};

export const useBetSelection = () => {
  const context = useContext(BetSelectionContext);
  if (context === undefined) {
    throw new Error('useBetSelection must be used within a BetSelectionProvider');
  }
  return context;
}; 