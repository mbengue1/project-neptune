// Match types for different sports
export type Team = {
  name: string;
  odds: string;
};

export type MatchType = {
  id: string;
  league: string;
  date: string;
  homeTeam: Team;
  awayTeam: Team;
  tieOdds?: string;
};

export interface ExtendedMatch extends MatchType {
  tournament?: string;
}

// Bet option type
export type BetOption = {
  label: string;
  value: string;
  team?: string;
};

// Bet type
export type Bet = {
  id: string;
  title: string;
  description?: string;
  sgp: boolean;
  options: BetOption[];
};

// Bet categories
export type BetCategories = Record<string, Bet[]>; 