// Export all sports data from a central location
import { basketballMatches, basketballBetCategories } from './basketball';
import { footballMatches, footballBetCategories } from './football';
import { hockeyMatches, hockeyBetCategories } from './hockey';
import { tennisMatches, tennisBetCategories } from './tennis';
import { MatchType } from '../../components/MatchList/MatchList';

// Soccer data is directly in the MatchList component, but we'll put it here as well
export const soccerMatches: MatchType[] = [
  { 
    id: '1',
    league: 'Premier League',
    date: '3:00PM ET',
    homeTeam: {
      name: 'Manchester City',
      odds: '-115'
    },
    awayTeam: {
      name: 'Aston Villa',
      odds: '+290'
    },
    tieOdds: '+290'
  },
  { 
    id: '2',
    league: 'Premier League',
    date: 'WED 3:00PM ET',
    homeTeam: {
      name: 'Arsenal',
      odds: '-270'
    },
    awayTeam: {
      name: 'Crystal Palace',
      odds: '+800'
    },
    tieOdds: '+370'
  },
  {
    id: '3',
    league: 'Premier League',
    date: 'WED 3:15PM ET',
    homeTeam: {
      name: 'Liverpool',
      odds: '-180'
    },
    awayTeam: {
      name: 'Chelsea',
      odds: '+450'
    },
    tieOdds: '+310'
  },
  {
    id: '4',
    league: 'La Liga',
    date: 'THU 4:00PM ET',
    homeTeam: {
      name: 'Barcelona',
      odds: '-150'
    },
    awayTeam: {
      name: 'Real Madrid',
      odds: '+320'
    },
    tieOdds: '+280'
  }
];

export {
  basketballMatches,
  basketballBetCategories,
  footballMatches,
  footballBetCategories,
  hockeyMatches,
  hockeyBetCategories,
  tennisMatches,
  tennisBetCategories
};

// Helper function to get matches by sport type
export const getMatchesBySport = (sportType: string): MatchType[] => {
  switch (sportType.toLowerCase()) {
    case 'soccer':
      return soccerMatches;
    case 'basketball':
      return basketballMatches;
    case 'football':
      return footballMatches;
    case 'hockey':
      return hockeyMatches;
    case 'tennis':
      return tennisMatches;
    default:
      return soccerMatches;
  }
};

// Helper function to get all matches for the main screen
export const getAllMatches = () => {
  return {
    Soccer: soccerMatches,
    Basketball: basketballMatches,
    Football: footballMatches,
    Hockey: hockeyMatches,
    Tennis: tennisMatches
  };
}; 