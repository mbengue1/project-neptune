// Leagues data for different sports
export const leaguesByCategory = {
  Soccer: [
    { id: 'all', name: 'All' },
    { id: 'epl', name: 'Premier League' },
    { id: 'laliga', name: 'La Liga' },
    { id: 'bundesliga', name: 'Bundesliga' },
    { id: 'seriea', name: 'Serie A' },
    { id: 'ligue1', name: 'Ligue 1' },
  ],
  Basketball: [
    { id: 'all', name: 'All' },
    { id: 'nba', name: 'NBA' },
    { id: 'wnba', name: 'WNBA' },
    { id: 'ncaa', name: 'NCAA' },
    { id: 'euroleague', name: 'EuroLeague' },
  ],
  Football: [
    { id: 'all', name: 'All' },
    { id: 'nfl', name: 'NFL' },
    { id: 'ncaaf', name: 'NCAA Football' },
    { id: 'cfl', name: 'CFL' },
  ],
  Hockey: [
    { id: 'all', name: 'All' },
    { id: 'nhl', name: 'NHL' },
    { id: 'khl', name: 'KHL' },
    { id: 'shl', name: 'SHL' },
  ],
  Tennis: [
    { id: 'all', name: 'All' },
    { id: 'grandslam', name: 'Grand Slams' },
    { id: 'masters1000', name: 'Masters 1000' },
    { id: 'atp500', name: 'ATP 500' },
    { id: 'atp250', name: 'ATP 250' },
    { id: 'wta', name: 'WTA' },
  ],
};

// Get leagues for a specific sport
export const getLeaguesBySport = (sportType: string) => {
  const sportKey = sportType as keyof typeof leaguesByCategory;
  return leaguesByCategory[sportKey] || leaguesByCategory.Soccer;
}; 