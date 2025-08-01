import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types for user balance and bets
export interface PlacedBet {
  id: string;
  userId: string;
  matchId: string;
  matchTitle: string;
  betTitle: string;
  betOption: string;
  odds: string;
  wager: number;
  potentialWin: number;
  status: 'pending' | 'active' | 'won' | 'lost' | 'cancelled';
  createdAt: number;
  sportType: string;
  league: string;
}

export interface BetSlip {
  id: string;
  userId: string;
  bets: PlacedBet[];
  totalWager: number;
  totalPotentialWin: number;
  status: 'pending' | 'active' | 'won' | 'lost' | 'cancelled';
  createdAt: number;
}

export interface UserBalance {
  userId: string;
  balance: number;
  lastUpdated: number;
}

interface UserBalanceContextType {
  balance: number;
  placedBets: PlacedBet[];
  betSlips: BetSlip[];
  placeBet: (bet: Omit<PlacedBet, 'id' | 'userId' | 'status' | 'createdAt'>, wager: number) => Promise<boolean>;
  placeBetSlip: (bets: any[], wager: number) => Promise<boolean>;
  updateBalance: (amount: number) => void;
  getPlacedBets: () => PlacedBet[];
  getBetSlips: () => BetSlip[];
  getBetById: (betId: string) => PlacedBet | undefined;
  updateBetStatus: (betId: string, status: PlacedBet['status']) => void;
}

const UserBalanceContext = createContext<UserBalanceContextType | undefined>(undefined);

interface UserBalanceProviderProps {
  children: ReactNode;
  userId?: string;
}

export const UserBalanceProvider: React.FC<UserBalanceProviderProps> = ({ children, userId = 'default-user' }) => {
  const [balance, setBalance] = useState(1250.00); // Starting balance
  
  // Sample placed bets for demonstration
  const [placedBets, setPlacedBets] = useState<PlacedBet[]>([
    {
      id: 'sample-1',
      userId,
      matchId: 'match-1',
      matchTitle: 'Chelsea vs Arsenal',
      betTitle: 'Match Winner',
      betOption: 'Chelsea',
      odds: '+150',
      wager: 50.00,
      potentialWin: 125.00,
      status: 'active',
      createdAt: Date.now() - 86400000, // 1 day ago
      sportType: 'Soccer',
      league: 'Premier League',
    },
    {
      id: 'sample-2',
      userId,
      matchId: 'match-2',
      matchTitle: 'Lakers vs Warriors',
      betTitle: 'Total Points',
      betOption: 'Over 220.5',
      odds: '-110',
      wager: 75.00,
      potentialWin: 143.18,
      status: 'won',
      createdAt: Date.now() - 172800000, // 2 days ago
      sportType: 'Basketball',
      league: 'NBA',
    },
    {
      id: 'sample-3',
      userId,
      matchId: 'match-3',
      matchTitle: 'Patriots vs Bills',
      betTitle: 'Spread',
      betOption: 'Patriots -3.5',
      odds: '+105',
      wager: 100.00,
      potentialWin: 205.00,
      status: 'lost',
      createdAt: Date.now() - 259200000, // 3 days ago
      sportType: 'Football',
      league: 'NFL',
    },
  ]);
  // Sample bet slips for demonstration
  const [betSlips, setBetSlips] = useState<BetSlip[]>([
    {
      id: 'slip-1',
      userId,
      bets: [
        {
          id: 'bet-1',
          userId,
          matchId: 'match-1',
          matchTitle: 'Chelsea vs Arsenal',
          betTitle: 'Match Winner',
          betOption: 'Chelsea',
          odds: '+150',
          wager: 50.00,
          potentialWin: 125.00,
          status: 'active',
          createdAt: Date.now() - 86400000,
          sportType: 'Soccer',
          league: 'Premier League',
        },
        {
          id: 'bet-2',
          userId,
          matchId: 'match-4',
          matchTitle: 'Liverpool vs Manchester City',
          betTitle: 'Total Goals',
          betOption: 'Over 2.5',
          odds: '-110',
          wager: 50.00,
          potentialWin: 95.45,
          status: 'active',
          createdAt: Date.now() - 86400000,
          sportType: 'Soccer',
          league: 'Premier League',
        }
      ],
      totalWager: 50.00,
      totalPotentialWin: 220.45,
      status: 'active',
      createdAt: Date.now() - 86400000,
    },
    {
      id: 'slip-2',
      userId,
      bets: [
        {
          id: 'bet-3',
          userId,
          matchId: 'match-2',
          matchTitle: 'Lakers vs Warriors',
          betTitle: 'Total Points',
          betOption: 'Over 220.5',
          odds: '-110',
          wager: 75.00,
          potentialWin: 143.18,
          status: 'won',
          createdAt: Date.now() - 172800000,
          sportType: 'Basketball',
          league: 'NBA',
        }
      ],
      totalWager: 75.00,
      totalPotentialWin: 143.18,
      status: 'won',
      createdAt: Date.now() - 172800000,
    },
    {
      id: 'slip-3',
      userId,
      bets: [
        {
          id: 'bet-4',
          userId,
          matchId: 'match-3',
          matchTitle: 'Patriots vs Bills',
          betTitle: 'Spread',
          betOption: 'Patriots -3.5',
          odds: '+105',
          wager: 100.00,
          potentialWin: 205.00,
          status: 'lost',
          createdAt: Date.now() - 259200000,
          sportType: 'Football',
          league: 'NFL',
        },
        {
          id: 'bet-5',
          userId,
          matchId: 'match-5',
          matchTitle: 'Chiefs vs Raiders',
          betTitle: 'Moneyline',
          betOption: 'Chiefs',
          odds: '-140',
          wager: 100.00,
          potentialWin: 171.43,
          status: 'lost',
          createdAt: Date.now() - 259200000,
          sportType: 'Football',
          league: 'NFL',
        }
      ],
      totalWager: 100.00,
      totalPotentialWin: 376.43,
      status: 'lost',
      createdAt: Date.now() - 259200000,
    }
  ]);

  const updateBalance = (amount: number) => {
    setBalance(prev => {
      const newBalance = prev + amount;
      return Math.max(0, newBalance); // Ensure balance doesn't go negative
    });
  };

  const placeBet = async (bet: Omit<PlacedBet, 'id' | 'userId' | 'status' | 'createdAt'>, wager: number): Promise<boolean> => {
    // Validate wager amount
    if (wager <= 0) {
      console.error('Invalid wager amount');
      return false;
    }

    if (wager > balance) {
      console.error('Insufficient balance');
      return false;
    }

    try {
      // Create new bet
      const newBet: PlacedBet = {
        ...bet,
        id: `bet-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        userId,
        status: 'pending',
        createdAt: Date.now(),
        wager,
        potentialWin: wager * parseFloat(bet.odds.replace('+', '').replace('-', '')) / 100 + wager,
      };

      // Deduct wager from balance
      updateBalance(-wager);

      // Add bet to placed bets
      setPlacedBets(prev => [...prev, newBet]);

      // In a real app, you would call your backend API here
      // await api.placeBet(newBet);

      console.log('Bet placed successfully:', newBet);
      return true;
    } catch (error) {
      console.error('Error placing bet:', error);
      return false;
    }
  };

  const getPlacedBets = () => {
    return placedBets;
  };

  const getBetSlips = () => {
    return betSlips;
  };

  const placeBetSlip = async (bets: any[], wager: number): Promise<boolean> => {
    // Validate wager amount
    if (wager <= 0) {
      console.error('Invalid wager amount');
      return false;
    }

    if (wager > balance) {
      console.error('Insufficient balance');
      return false;
    }

    try {
      // Create placed bets for the slip
      const placedBetsForSlip: PlacedBet[] = bets.map(bet => ({
        ...bet,
        id: `bet-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        userId,
        status: 'pending',
        createdAt: Date.now(),
        wager,
        potentialWin: wager * parseFloat(bet.odds.replace('+', '').replace('-', '')) / 100 + wager,
      }));

      // Calculate total potential win
      const totalPotentialWin = placedBetsForSlip.reduce((sum, bet) => sum + bet.potentialWin, 0);

      // Create bet slip
      const newBetSlip: BetSlip = {
        id: `slip-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        userId,
        bets: placedBetsForSlip,
        totalWager: wager,
        totalPotentialWin,
        status: 'pending',
        createdAt: Date.now(),
      };

      // Deduct wager from balance
      updateBalance(-wager);

      // Add bets to placed bets
      setPlacedBets(prev => [...prev, ...placedBetsForSlip]);

      // Add bet slip
      setBetSlips(prev => [...prev, newBetSlip]);

      console.log('Bet slip placed successfully:', newBetSlip);
      return true;
    } catch (error) {
      console.error('Error placing bet slip:', error);
      return false;
    }
  };

  const getBetById = (betId: string) => {
    return placedBets.find(bet => bet.id === betId);
  };

  const updateBetStatus = (betId: string, status: PlacedBet['status']) => {
    setPlacedBets(prev => 
      prev.map(bet => 
        bet.id === betId ? { ...bet, status } : bet
      )
    );
  };

  const value: UserBalanceContextType = {
    balance,
    placedBets,
    betSlips,
    placeBet,
    placeBetSlip,
    updateBalance,
    getPlacedBets,
    getBetSlips,
    getBetById,
    updateBetStatus,
  };

  return (
    <UserBalanceContext.Provider value={value}>
      {children}
    </UserBalanceContext.Provider>
  );
};

export const useUserBalance = () => {
  const context = useContext(UserBalanceContext);
  if (context === undefined) {
    throw new Error('useUserBalance must be used within a UserBalanceProvider');
  }
  return context;
}; 