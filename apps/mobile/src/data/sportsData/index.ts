// Export all sports data from a central location
import { basketballMatches, basketballBetCategories } from './basketball';
import { footballMatches, footballBetCategories } from './football';
import { hockeyMatches, hockeyBetCategories } from './hockey';
import { tennisMatches, tennisBetCategories } from './tennis';
import { soccerMatches, soccerBetCategories } from './soccer';
import type { MatchType } from '../../types/matches';

export {
  basketballMatches,
  basketballBetCategories,
  footballMatches,
  footballBetCategories,
  hockeyMatches,
  hockeyBetCategories,
  tennisMatches,
  tennisBetCategories,
  soccerMatches,
  soccerBetCategories
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