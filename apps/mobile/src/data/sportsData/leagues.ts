// Leagues data for different sports
export const leaguesByCategory = {
  Soccer: [
    { id: 'all', name: 'All' },
    { 
      id: 'epl', 
      name: 'Premier League', 
      country: 'England', 
      logo: 'epl',
      playerProps: {
        goals: [1, 2, 3],
        assists: [1, 2],
        shots: [2, 3, 4],
        passes: [30, 40, 50],
        tackles: [2, 3, 4],
        saves: [2, 3, 4, 5] // For goalkeepers
      }
    },
    { 
      id: 'laliga', 
      name: 'La Liga', 
      country: 'Spain', 
      logo: 'laliga',
      playerProps: {
        goals: [1, 2, 3],
        assists: [1, 2],
        shots: [2, 3, 4],
        passes: [30, 40, 50],
        tackles: [2, 3, 4]
      }
    },
    { 
      id: 'bundesliga', 
      name: 'Bundesliga', 
      country: 'Germany', 
      logo: 'bundesliga',
      playerProps: {
        goals: [1, 2, 3],
        assists: [1, 2],
        shots: [2, 3, 4],
        passes: [30, 40, 50],
        tackles: [2, 3, 4]
      }
    },
    { 
      id: 'seriea', 
      name: 'Serie A', 
      country: 'Italy', 
      logo: 'seriea',
      playerProps: {
        goals: [1, 2, 3],
        assists: [1, 2],
        shots: [2, 3, 4],
        passes: [30, 40, 50],
        tackles: [2, 3, 4]
      }
    },
    { 
      id: 'ligue1', 
      name: 'Ligue 1', 
      country: 'France', 
      logo: 'ligue1',
      playerProps: {
        goals: [1, 2, 3],
        assists: [1, 2],
        shots: [2, 3, 4],
        passes: [30, 40, 50],
        tackles: [2, 3, 4]
      }
    },
    { 
      id: 'mls', 
      name: 'MLS', 
      country: 'USA', 
      logo: 'mls',
      playerProps: {
        goals: [1, 2],
        assists: [1, 2],
        shots: [2, 3, 4],
        passes: [25, 35, 45],
        tackles: [2, 3, 4]
      }
    },
    { 
      id: 'champions', 
      name: 'Champions League', 
      region: 'Europe', 
      logo: 'ucl',
      playerProps: {
        goals: [1, 2, 3],
        assists: [1, 2],
        shots: [2, 3, 4, 5],
        passes: [35, 45, 55],
        tackles: [2, 3, 4, 5]
      }
    },
  ],
  Basketball: [
    { id: 'all', name: 'All' },
    { 
      id: 'nba', 
      name: 'NBA', 
      country: 'USA', 
      logo: 'nba',
      playerProps: {
        points: [10, 15, 20, 25, 30, 35, 40],
        rebounds: [5, 8, 10, 12, 15],
        assists: [5, 8, 10, 12, 15],
        threes: [2, 3, 4, 5, 6],
        steals: [1, 2, 3],
        blocks: [1, 2, 3]
      }
    },
    { 
      id: 'euroleague', 
      name: 'EuroLeague', 
      region: 'Europe', 
      logo: 'euroleague',
      playerProps: {
        points: [10, 15, 20],
        rebounds: [5, 8, 10],
        assists: [3, 5, 7],
        threes: [2, 3, 4],
        steals: [1, 2],
        blocks: [1, 2]
      }
    },
    { 
      id: 'ncaa', 
      name: 'NCAA', 
      country: 'USA', 
      logo: 'ncaam',
      playerProps: {
        points: [10, 15, 20, 25],
        rebounds: [5, 8, 10],
        assists: [3, 5, 7],
        threes: [2, 3, 4],
        steals: [1, 2],
        blocks: [1, 2]
      }
    },
    { 
      id: 'wnba', 
      name: 'WNBA', 
      country: 'USA', 
      logo: 'wnba',
      playerProps: {
        points: [10, 15, 20, 25],
        rebounds: [5, 8, 10, 12],
        assists: [3, 5, 7, 9],
        threes: [2, 3, 4],
        steals: [1, 2, 3],
        blocks: [1, 2, 3]
      }
    },
  ],
  Football: [
    { id: 'all', name: 'All' },
    { 
      id: 'nfl', 
      name: 'NFL', 
      country: 'USA', 
      logo: 'nfl',
      playerProps: {
        passing: [150, 200, 250, 300, 350],
        rushing: [25, 50, 75, 100, 125],
        receiving: [25, 50, 75, 100],
        touchdowns: [1, 2, 3],
        receptions: [3, 5, 7],
        tackles: [5, 8, 10],
        sacks: [1, 2],
        interceptions: [1, 2]
      }
    },
    { 
      id: 'ncaaf', 
      name: 'NCAAF', 
      country: 'USA', 
      logo: 'ncaaf',
      playerProps: {
        passing: [150, 200, 250, 300],
        rushing: [25, 50, 75, 100],
        receiving: [25, 50, 75],
        touchdowns: [1, 2],
        receptions: [3, 5],
        tackles: [5, 8],
        sacks: [1, 2],
        interceptions: [1]
      }
    },
    { 
      id: 'xfl', 
      name: 'XFL', 
      country: 'USA', 
      logo: 'xfl',
      playerProps: {
        passing: [125, 175, 225, 275],
        rushing: [20, 40, 60, 80],
        receiving: [20, 40, 60],
        touchdowns: [1, 2],
        receptions: [2, 4, 6],
        tackles: [4, 6, 8],
        sacks: [1, 2],
        interceptions: [1]
      }
    }
  ],
  Hockey: [
    { id: 'all', name: 'All' },
    { 
      id: 'nhl', 
      name: 'NHL', 
      country: 'USA/Canada', 
      logo: 'nhl',
      playerProps: {
        goals: [1, 2],
        assists: [1, 2],
        hockeyPoints: [1, 2, 3],
        shots: [2, 3, 4, 5],
        saves: [20, 25, 30, 35],
        blocks: [1, 2, 3],
        hits: [2, 3, 4],
        faceoffWins: [5, 8, 10]
      }
    },
    { 
      id: 'khl', 
      name: 'KHL', 
      country: 'Russia', 
      logo: 'khl',
      playerProps: {
        goals: [1, 2],
        assists: [1, 2],
        hockeyPoints: [1, 2],
        shots: [2, 3, 4],
        saves: [20, 25, 30],
        blocks: [1, 2],
        hits: [2, 3],
        faceoffWins: [5, 8]
      }
    },
    { 
      id: 'shl', 
      name: 'SHL', 
      country: 'Sweden', 
      logo: 'shl',
      playerProps: {
        goals: [1, 2],
        assists: [1, 2],
        hockeyPoints: [1, 2],
        shots: [2, 3, 4],
        saves: [18, 22, 26],
        blocks: [1, 2],
        hits: [2, 3],
        faceoffWins: [4, 7]
      }
    }
  ],
  Tennis: [
    { id: 'all', name: 'All' },
    { 
      id: 'grandslam', 
      name: 'Grand Slams', 
      type: 'Major',
      tournaments: ['Australian Open', 'French Open', 'Wimbledon', 'US Open'],
      playerProps: {
        aces: [5, 8, 10, 12, 15],
        doubleFaults: [2, 3, 4],
        games: [10, 12, 15, 18],
        sets: [2, 3],
        totalPoints: [15, 20, 25],
        breakPoints: [2, 3, 4]
      }
    },
    { 
      id: 'masters1000', 
      name: 'Masters 1000', 
      type: 'ATP',
      tournaments: ['Miami Masters 1000', 'Indian Wells Masters 1000'],
      playerProps: {
        aces: [5, 8, 10, 12],
        doubleFaults: [2, 3, 4],
        games: [10, 12, 15],
        sets: [2],
        totalPoints: [15, 20],
        breakPoints: [2, 3]
      }
    },
    { 
      id: 'wta1000', 
      name: 'WTA 1000', 
      type: 'WTA',
      tournaments: ['WTA 1000 Madrid', 'WTA 1000 Rome', 'WTA 1000 Cincinnati'],
      playerProps: {
        aces: [3, 5, 7],
        doubleFaults: [2, 3, 4],
        games: [8, 10, 12],
        sets: [2],
        totalPoints: [12, 15, 18],
        breakPoints: [2, 3, 4]
      }
    }
  ],
};

// Get leagues for a specific sport
export const getLeaguesBySport = (sportType: string) => {
  const sportKey = sportType as keyof typeof leaguesByCategory;
  return leaguesByCategory[sportKey] || leaguesByCategory.Soccer;
};

// Get player prop thresholds for a specific league
export const getPlayerPropThresholds = (sportType: string, leagueId: string, propType: string) => {
  const leagues = leaguesByCategory[sportType as keyof typeof leaguesByCategory];
  const league = leagues?.find(l => l.id === leagueId);
  
  if (league && 'playerProps' in league) {
    const props = league.playerProps as Record<string, number[]>;
    return props[propType] || [];
  }
  
  return [];
};

// Get the display name for a prop type
export const getPropDisplayName = (propType: string): string => {
  const displayNames: Record<string, string> = {
    // Soccer
    goals: 'Goals',
    assists: 'Assists',
    shots: 'Shots',
    passes: 'Passes',
    tackles: 'Tackles',
    saves: 'Saves',
    
    // Basketball
    points: 'Points',
    rebounds: 'Rebounds',
    threes: '3-Pointers',
    steals: 'Steals',
    blocks: 'Blocks',
    
    // Football
    passing: 'Passing Yards',
    rushing: 'Rushing Yards',
    receiving: 'Receiving Yards',
    touchdowns: 'Touchdowns',
    receptions: 'Receptions',
    interceptions: 'Interceptions',
    sacks: 'Sacks',
    
    // Hockey
    hockeyPoints: 'Points',
    faceoffWins: 'Faceoff Wins',
    hits: 'Hits',
    
    // Tennis
    aces: 'Aces',
    doubleFaults: 'Double Faults',
    games: 'Games Won',
    sets: 'Sets Won',
    totalPoints: 'Total Points',
    breakPoints: 'Break Points'
  };
  
  return displayNames[propType] || propType;
};

// Helper function to get league name by ID
export const getLeagueNameById = (sportType: string, leagueId: string): string => {
  // Comprehensive mapping from league IDs to display names
  const leagueMap: Record<string, string> = {
    // Soccer
    'epl': 'Premier League',
    'laliga': 'La Liga',
    'bundesliga': 'Bundesliga',
    'seriea': 'Serie A',
    'ligue1': 'Ligue 1',
    'mls': 'MLS',
    'champions': 'Champions League',
    
    // Basketball
    'nba': 'NBA',
    'wnba': 'WNBA',
    'ncaa': 'NCAA',
    'euroleague': 'EuroLeague',
    
    // Football
    'nfl': 'NFL',
    'ncaaf': 'NCAAF',
    'xfl': 'XFL',
    
    // Hockey
    'nhl': 'NHL',
    'khl': 'KHL',
    'shl': 'SHL',
    
    // Tennis
    'grandslam': 'Grand Slam',
    'masters1000': 'Masters 1000',
    'wta1000': 'WTA 1000'
  };
  
  // Return the league name, or fallback to the ID if not found
  return leagueMap[leagueId] || leagueId;
}; 