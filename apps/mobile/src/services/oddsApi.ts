import { MatchType } from '../types/matches';
import { ODDS_API_KEY, ODDS_API_BASE_URL } from '@env';

// API Configuration
const API_BASE_URL = ODDS_API_BASE_URL || 'https://api.the-odds-api.com/v4';
const API_KEY = ODDS_API_KEY || '';

// Debug logging (can be removed in production)
if (__DEV__) {
  console.log('🔧 Environment Check:');
  console.log('API_KEY exists:', !!API_KEY);
  console.log('API_KEY length:', API_KEY?.length || 0);
}

// API Response Types
interface Sport {
  key: string;
  group: string;
  title: string;
  description: string;
  active: boolean;
  has_outrights: boolean;
}

interface Bookmaker {
  key: string;
  title: string;
  description: string;
  last_update: string;
  markets?: Market[];
}

interface Outcome {
  name: string;
  price: number;
}

interface Market {
  key: string;
  last_update: string;
  outcomes: Outcome[];
}

interface Event {
  id: string;
  sport_key: string;
  sport_title: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  bookmakers: Bookmaker[];
}

interface Score {
  id: string;
  sport_key: string;
  sport_title: string;
  commence_time: string;
  completed: boolean;
  home_team: string;
  away_team: string;
  scores: number[];
  last_update: string;
}

// Sport key mappings to our app's sport types
const SPORT_KEY_MAPPINGS = {
  'soccer_epl': 'Premier League',
  'soccer_la_liga': 'La Liga',
  'soccer_serie_a': 'Serie A',
  'soccer_bundesliga': 'Bundesliga',
  'soccer_ligue_1': 'Ligue 1',
  'basketball_nba': 'NBA',
  'basketball_ncaab': 'NCAA Basketball',
  'americanfootball_nfl': 'NFL',
  'americanfootball_ncaaf': 'NCAA Football',
  'icehockey_nhl': 'NHL',
  'tennis_atp_singles': 'ATP Tennis',
  'tennis_wta_singles': 'WTA Tennis',
};

// Helper function to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'America/New_York'
  };
  
  if (diffDays === 0) {
    return `TODAY ${date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true,
      timeZone: 'America/New_York'
    })} ET`;
  } else if (diffDays === 1) {
    return `TOMORROW ${date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true,
      timeZone: 'America/New_York'
    })} ET`;
  } else {
    return date.toLocaleDateString('en-US', options);
  }
};

// Helper function to convert American odds to string format
const formatOdds = (odds: number): string => {
  if (odds > 0) {
    return `+${odds}`;
  }
  return odds.toString();
};

// Helper function to find best odds from bookmakers
const findBestOdds = (bookmakers: Bookmaker[], marketKey: string, outcomeName: string): string => {
  let bestOdds = 0;
  
  for (const bookmaker of bookmakers) {
    const market = bookmaker.markets?.find(m => m.key === marketKey);
    if (market) {
      const outcome = market.outcomes.find(o => o.name === outcomeName);
      if (outcome && Math.abs(outcome.price) > Math.abs(bestOdds)) {
        bestOdds = outcome.price;
      }
    }
  }
  
  return formatOdds(bestOdds);
};

// Map API event to our MatchType
const mapEventToMatch = (event: Event): MatchType => {
  const homeOdds = findBestOdds(event.bookmakers, 'h2h', event.home_team);
  const awayOdds = findBestOdds(event.bookmakers, 'h2h', event.away_team);
  const tieOdds = findBestOdds(event.bookmakers, 'h2h', 'Draw');
  
  return {
    id: event.id,
    league: SPORT_KEY_MAPPINGS[event.sport_key as keyof typeof SPORT_KEY_MAPPINGS] || event.sport_title,
    date: formatDate(event.commence_time),
    homeTeam: {
      name: event.home_team,
      odds: homeOdds
    },
    awayTeam: {
      name: event.away_team,
      odds: awayOdds
    },
    tieOdds: tieOdds !== '+0' ? tieOdds : undefined
  };
};

// API Service Class
export class OddsApiService {
  private static instance: OddsApiService;
  private sportsCache: Sport[] = [];
  private lastSportsFetch: number = 0;
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  private constructor() {}

  static getInstance(): OddsApiService {
    if (!OddsApiService.instance) {
      OddsApiService.instance = new OddsApiService();
    }
    return OddsApiService.instance;
  }

  // Get available sports
  async getSports(): Promise<Sport[]> {
    // Check if API key is configured
    if (!API_KEY) {
      throw new Error('ODDS_API_KEY is not configured. Please add it to your .env file.');
    }

    const now = Date.now();
    
    // Return cached data if still valid
    if (this.sportsCache.length > 0 && (now - this.lastSportsFetch) < this.CACHE_DURATION) {
      return this.sportsCache;
    }

    try {
      console.log('🌐 Making API call to:', `${API_BASE_URL}/sports?apiKey=${API_KEY.substring(0, 10)}...`);
      const response = await fetch(`${API_BASE_URL}/sports?apiKey=${API_KEY}`);
      
      console.log('📡 API Response status:', response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const sports: Sport[] = await response.json();
      
      // Cache the results
      this.sportsCache = sports.filter(sport => sport.active);
      this.lastSportsFetch = now;
      
      console.log('Fetched sports:', this.sportsCache.length);
      return this.sportsCache;
    } catch (error) {
      console.error('Error fetching sports:', error);
      throw new Error('Failed to fetch sports data');
    }
  }

  // Get odds for a specific sport
  async getOdds(sportKey: string): Promise<MatchType[]> {
    // Check if API key is configured
    if (!API_KEY) {
      throw new Error('ODDS_API_KEY is not configured. Please add it to your .env file.');
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/sports/${sportKey}/odds?apiKey=${API_KEY}&regions=us&markets=h2h,spreads,totals&oddsFormat=american`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const events: Event[] = await response.json();
      
      // Map events to our MatchType format
      const matches = events.map(mapEventToMatch);
      
      console.log(`Fetched ${matches.length} matches for ${sportKey}`);
      return matches;
    } catch (error) {
      console.error(`Error fetching odds for ${sportKey}:`, error);
      throw new Error(`Failed to fetch odds for ${sportKey}`);
    }
  }

  // Get scores for a specific sport
  async getScores(sportKey: string, daysFrom: number = 1): Promise<Score[]> {
    // Check if API key is configured
    if (!API_KEY) {
      throw new Error('ODDS_API_KEY is not configured. Please add it to your .env file.');
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/sports/${sportKey}/scores?apiKey=${API_KEY}&daysFrom=${daysFrom}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const scores: Score[] = await response.json();
      
      console.log(`Fetched ${scores.length} scores for ${sportKey}`);
      return scores;
    } catch (error) {
      console.error(`Error fetching scores for ${sportKey}:`, error);
      throw new Error(`Failed to fetch scores for ${sportKey}`);
    }
  }

  // Get all available sports with their keys
  getAvailableSports(): { key: string; title: string; group: string }[] {
    return this.sportsCache.map(sport => ({
      key: sport.key,
      title: sport.title,
      group: sport.group
    }));
  }

  // Check API quota
  async checkQuota(): Promise<{ remaining: number; used: number }> {
    // Check if API key is configured
    if (!API_KEY) {
      throw new Error('ODDS_API_KEY is not configured. Please add it to your .env file.');
    }

    try {
      const response = await fetch(`${API_BASE_URL}/sports?apiKey=${API_KEY}`);
      
      const remaining = response.headers.get('x-requests-remaining');
      const used = response.headers.get('x-requests-used');
      
      return {
        remaining: remaining ? parseInt(remaining) : 0,
        used: used ? parseInt(used) : 0
      };
    } catch (error) {
      console.error('Error checking quota:', error);
      return { remaining: 0, used: 0 };
    }
  }
}

// Export singleton instance
export const oddsApiService = OddsApiService.getInstance(); 