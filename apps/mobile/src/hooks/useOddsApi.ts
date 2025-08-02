import { useState, useEffect, useCallback } from 'react';
import { oddsApiService } from '../services/oddsApi';
import { MatchType } from '../types/matches';
import { 
  soccerMatches, 
  basketballMatches, 
  footballMatches, 
  hockeyMatches, 
  tennisMatches 
} from '../data/sportsData';

// Sport key mappings for API calls
const SPORT_KEYS = {
  soccer: ['soccer_epl', 'soccer_la_liga', 'soccer_serie_a', 'soccer_bundesliga'],
  basketball: ['basketball_nba', 'basketball_ncaab'],
  football: ['americanfootball_nfl', 'americanfootball_ncaaf'],
  hockey: ['icehockey_nhl'],
  tennis: ['tennis_atp_singles', 'tennis_wta_singles', 'tennis_atp_doubles', 'tennis_wta_doubles']
};

// Mock data fallback
const MOCK_DATA = {
  soccer: soccerMatches,
  basketball: basketballMatches,
  football: footballMatches,
  hockey: hockeyMatches,
  tennis: tennisMatches
};

interface UseOddsApiReturn {
  matches: MatchType[];
  isLoading: boolean;
  error: string | null;
  refreshData: () => void;
  quotaInfo: { remaining: number; used: number } | null;
}

export const useOddsApi = (sportType: string): UseOddsApiReturn => {
  const [matches, setMatches] = useState<MatchType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quotaInfo, setQuotaInfo] = useState<{ remaining: number; used: number } | null>(null);

  const fetchMatches = useCallback(async () => {
    console.log('🔄 Fetching matches for sport:', sportType);
    setIsLoading(true);
    setError(null);

    try {
      // Check API quota first
      console.log('📊 Checking API quota...');
      const quota = await oddsApiService.checkQuota();
      setQuotaInfo(quota);

      // If no quota remaining, use mock data
      if (quota.remaining === 0) {
        console.log('❌ API quota exhausted, using mock data');
        const mockMatches = MOCK_DATA[sportType as keyof typeof MOCK_DATA] || [];
        setMatches(mockMatches);
        setIsLoading(false);
        return;
      }

      // Get sport keys for this sport type
      const sportKeys = SPORT_KEYS[sportType as keyof typeof SPORT_KEYS];
      
      if (!sportKeys) {
        console.log(`No API sport keys found for ${sportType}, using mock data`);
        const mockMatches = MOCK_DATA[sportType as keyof typeof MOCK_DATA] || [];
        setMatches(mockMatches);
        setIsLoading(false);
        return;
      }

      // Fetch data from all available sport keys for this sport type
      const allMatches: MatchType[] = [];
      
      for (const sportKey of sportKeys) {
        try {
          const sportMatches = await oddsApiService.getOdds(sportKey);
          allMatches.push(...sportMatches);
        } catch (sportError) {
          console.warn(`Failed to fetch ${sportKey}:`, sportError);
          // Continue with other sport keys
        }
      }

      // If we got some data from API, use it
      if (allMatches.length > 0) {
        console.log(`✅ Successfully fetched ${allMatches.length} matches from API for ${sportType}`);
        setMatches(allMatches);
      } else {
        // Fallback to mock data if API failed
        console.log(`❌ No API data available for ${sportType}, using mock data`);
        const mockMatches = MOCK_DATA[sportType as keyof typeof MOCK_DATA] || [];
        setMatches(mockMatches);
      }
    } catch (apiError) {
      console.error(`Error fetching ${sportType} data:`, apiError);
      
      // Fallback to mock data on error
      const mockMatches = MOCK_DATA[sportType as keyof typeof MOCK_DATA] || [];
      setMatches(mockMatches);
      setError('Using offline data due to API error');
    } finally {
      setIsLoading(false);
    }
  }, [sportType]);

  const refreshData = useCallback(() => {
    fetchMatches();
  }, [fetchMatches]);

  // Fetch data on mount and when sport type changes
  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  return {
    matches,
    isLoading,
    error,
    refreshData,
    quotaInfo
  };
};

// Hook to get all sports data
export const useAllSportsData = () => {
  const [allMatches, setAllMatches] = useState<Record<string, MatchType[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const sports = ['soccer', 'basketball', 'football', 'hockey', 'tennis'];
      const matchesData: Record<string, MatchType[]> = {};

      for (const sport of sports) {
        try {
          const sportMatches = await oddsApiService.getOdds(SPORT_KEYS[sport as keyof typeof SPORT_KEYS]?.[0] || '');
          matchesData[sport] = sportMatches;
        } catch (sportError) {
          console.warn(`Failed to fetch ${sport} data:`, sportError);
          // Use mock data as fallback
          matchesData[sport] = MOCK_DATA[sport as keyof typeof MOCK_DATA] || [];
        }
      }

      setAllMatches(matchesData);
    } catch (error) {
      console.error('Error fetching all sports data:', error);
      setError('Failed to fetch sports data');
      
      // Fallback to all mock data
      setAllMatches(MOCK_DATA);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  return {
    allMatches,
    isLoading,
    error,
    refreshData: fetchAllData
  };
}; 