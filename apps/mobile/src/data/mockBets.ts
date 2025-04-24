// Define types for bet data
export type BetOption = {
  label: string;
  value: string;
  team?: string;
};

export type Bet = {
  id: string;
  title: string;
  description?: string;
  type?: string;
  sgp: boolean;
  options: BetOption[];
};

export type BetCategories = {
  [key: string]: Bet[];
};

// Mock bet data organized by category
export const mockBetsByCategory: BetCategories = {
  popular: [
    {
      id: '1',
      title: 'Moneyline (3-way)',
      description: 'Wager is graded on the result after 90 Minutes plus stoppage time.',
      type: '3-way',
      sgp: true,
      options: [
        { label: 'HOME', value: '-115', team: 'Man City' },
        { label: 'TIE', value: '+290' },
        { label: 'AWAY', value: '+290', team: 'Aston Villa' }
      ]
    },
    {
      id: '2',
      title: 'Both Teams To Score',
      sgp: true,
      options: [
        { label: 'YES', value: '-130' },
        { label: 'NO', value: '+105' }
      ]
    },
    {
      id: '3',
      title: 'Over/Under 2.5 Goals',
      sgp: true,
      options: [
        { label: 'OVER', value: '-135' },
        { label: 'UNDER', value: '+110' }
      ]
    },
    {
      id: '4',
      title: 'Double Chance',
      sgp: true,
      options: [
        { label: 'HOME/TIE', value: '-290' },
        { label: 'HOME/AWAY', value: '-200' },
        { label: 'TIE/AWAY', value: '+105' }
      ]
    },
    {
      id: '5',
      title: 'Correct Score',
      sgp: true,
      options: [
        { label: '1-0', value: '+650' },
        { label: '2-0', value: '+800' },
        { label: '2-1', value: '+850' },
        { label: '0-0', value: '+1200' },
        { label: '1-1', value: '+700' },
        { label: '0-1', value: '+1400' },
        { label: '0-2', value: '+2200' },
        { label: '1-2', value: '+1100' }
      ]
    }
  ],
  goal_scorers: [
    {
      id: '6',
      title: 'Anytime Goalscorer',
      sgp: true,
      options: [
        { label: 'Erling Haaland', value: '-120' },
        { label: 'Phil Foden', value: '+190' },
        { label: 'Ollie Watkins', value: '+200' },
        { label: 'Julian Alvarez', value: '+210' },
        { label: 'Jeremy Doku', value: '+250' },
        { label: 'Kevin De Bruyne', value: '+250' },
        { label: 'Leon Bailey', value: '+320' },
        { label: 'Jhon Duran', value: '+350' }
      ]
    },
    {
      id: '7',
      title: 'First Goalscorer',
      sgp: true,
      options: [
        { label: 'Erling Haaland', value: '+240' },
        { label: 'Phil Foden', value: '+550' },
        { label: 'Ollie Watkins', value: '+700' },
        { label: 'Julian Alvarez', value: '+650' },
        { label: 'Kevin De Bruyne', value: '+800' },
        { label: 'Leon Bailey', value: '+1100' }
      ]
    },
    {
      id: '8',
      title: 'Last Goalscorer',
      sgp: true,
      options: [
        { label: 'Erling Haaland', value: '+240' },
        { label: 'Phil Foden', value: '+550' },
        { label: 'Ollie Watkins', value: '+700' },
        { label: 'Julian Alvarez', value: '+650' },
        { label: 'Kevin De Bruyne', value: '+800' },
        { label: 'Leon Bailey', value: '+1100' }
      ]
    }
  ],
  specials: [
    {
      id: '9',
      title: 'Team to Score First',
      sgp: true,
      options: [
        { label: 'Man City', value: '-200' },
        { label: 'Aston Villa', value: '+250' },
        { label: 'No Goal', value: '+1200' }
      ]
    },
    {
      id: '10',
      title: 'Team to Score Last',
      sgp: true,
      options: [
        { label: 'Man City', value: '-175' },
        { label: 'Aston Villa', value: '+220' },
        { label: 'No Goal', value: '+1200' }
      ]
    },
    {
      id: '11',
      title: 'Winning Margin',
      sgp: true,
      options: [
        { label: 'Man City by 1', value: '+300' },
        { label: 'Man City by 2', value: '+350' },
        { label: 'Man City by 3+', value: '+350' },
        { label: 'Aston Villa by 1', value: '+700' },
        { label: 'Aston Villa by 2', value: '+1800' },
        { label: 'Aston Villa by 3+', value: '+3500' },
        { label: 'Draw', value: '+290' }
      ]
    }
  ],
  goals: [
    {
      id: '12',
      title: 'Total Goals',
      sgp: true,
      options: [
        { label: 'Over 1.5', value: '-350' },
        { label: 'Under 1.5', value: '+260' },
        { label: 'Over 2.5', value: '-135' },
        { label: 'Under 2.5', value: '+110' },
        { label: 'Over 3.5', value: '+175' },
        { label: 'Under 3.5', value: '-220' },
        { label: 'Over 4.5', value: '+400' },
        { label: 'Under 4.5', value: '-550' }
      ]
    },
    {
      id: '13',
      title: 'Man City Total Goals',
      sgp: true,
      options: [
        { label: 'Over 1.5', value: '-175' },
        { label: 'Under 1.5', value: '+140' },
        { label: 'Over 2.5', value: '+130' },
        { label: 'Under 2.5', value: '-160' }
      ]
    },
    {
      id: '14',
      title: 'Aston Villa Total Goals',
      sgp: true,
      options: [
        { label: 'Over 0.5', value: '-130' },
        { label: 'Under 0.5', value: '+105' },
        { label: 'Over 1.5', value: '+250' },
        { label: 'Under 1.5', value: '-320' }
      ]
    }
  ],
  shots_target: [
    {
      id: '15',
      title: 'Player to Have 1+ Shots on Target',
      sgp: true,
      options: [
        { label: 'Erling Haaland', value: '-450' },
        { label: 'Phil Foden', value: '-200' },
        { label: 'Ollie Watkins', value: '-175' },
        { label: 'Kevin De Bruyne', value: '-150' },
        { label: 'Leon Bailey', value: '+110' },
        { label: 'Jhon Duran', value: '+130' }
      ]
    },
    {
      id: '16',
      title: 'Player to Have 2+ Shots on Target',
      sgp: true,
      options: [
        { label: 'Erling Haaland', value: '-110' },
        { label: 'Phil Foden', value: '+180' },
        { label: 'Ollie Watkins', value: '+200' },
        { label: 'Kevin De Bruyne', value: '+220' }
      ]
    }
  ],
  corners: [
    {
      id: '17',
      title: 'Total Corners',
      sgp: true,
      options: [
        { label: 'Over 8.5', value: '-130' },
        { label: 'Under 8.5', value: '+105' },
        { label: 'Over 9.5', value: '+120' },
        { label: 'Under 9.5', value: '-150' }
      ]
    },
    {
      id: '18',
      title: 'Man City Corners',
      sgp: true,
      options: [
        { label: 'Over 5.5', value: '-120' },
        { label: 'Under 5.5', value: '-105' }
      ]
    },
    {
      id: '19',
      title: 'Aston Villa Corners',
      sgp: true,
      options: [
        { label: 'Over 2.5', value: '-140' },
        { label: 'Under 2.5', value: '+110' }
      ]
    }
  ],
  same_game: [
    {
      id: '20',
      title: 'Popular Same Game Parlays',
      sgp: true,
      options: [
        { label: 'Man City to win & Both teams to score', value: '+190' },
        { label: 'Man City to win & Over 2.5 goals', value: '+110' },
        { label: 'Haaland to score & Man City to win', value: '+120' },
        { label: 'Watkins to score & Over 2.5 goals', value: '+320' }
      ]
    }
  ]
};

// Add mock bet data for basketball categories
export const basketballMockBets: BetCategories = {
  quick_bets: [
    {
      id: '1',
      title: 'Game Result',
      sgp: true,
      options: [
        { label: 'Knicks', value: '-118' },
        { label: 'Pistons', value: '+100' }
      ]
    },
    {
      id: '2',
      title: 'Over/Under Total Points',
      sgp: true,
      options: [
        { label: 'OVER 214', value: '-108' },
        { label: 'UNDER 214', value: '-112' }
      ]
    },
    {
      id: '3',
      title: 'Spread',
      sgp: true,
      options: [
        { label: 'Knicks -1', value: '-108' },
        { label: 'Pistons +1', value: '-112' }
      ]
    }
  ],
  player_points: [
    {
      id: '4',
      title: 'Jalen Brunson Points',
      sgp: true,
      options: [
        { label: 'Over 24.5', value: '-115' },
        { label: 'Under 24.5', value: '-105' }
      ]
    },
    {
      id: '5',
      title: 'Cade Cunningham Points',
      sgp: true,
      options: [
        { label: 'Over 22.5', value: '-110' },
        { label: 'Under 22.5', value: '-110' }
      ]
    },
    {
      id: '6',
      title: 'Josh Hart Points',
      sgp: true,
      options: [
        { label: 'Over 10.5', value: '-120' },
        { label: 'Under 10.5', value: '+100' }
      ]
    }
  ],
  player_threes: [
    {
      id: '7',
      title: 'Jalen Brunson Made Threes',
      sgp: true,
      options: [
        { label: 'Over 2.5', value: '+110' },
        { label: 'Under 2.5', value: '-130' }
      ]
    },
    {
      id: '8',
      title: 'Donte DiVincenzo Made Threes',
      sgp: true,
      options: [
        { label: 'Over 3.5', value: '+130' },
        { label: 'Under 3.5', value: '-150' }
      ]
    },
    {
      id: '9',
      title: 'Bojan Bogdanovic Made Threes',
      sgp: true,
      options: [
        { label: 'Over 1.5', value: '-145' },
        { label: 'Under 1.5', value: '+125' }
      ]
    }
  ],
  player_combos: [
    {
      id: '10',
      title: 'Jalen Brunson Pts+Reb+Ast',
      sgp: true,
      options: [
        { label: 'Over 33.5', value: '-115' },
        { label: 'Under 33.5', value: '-105' }
      ]
    },
    {
      id: '11',
      title: 'Cade Cunningham Pts+Reb+Ast',
      sgp: true,
      options: [
        { label: 'Over 35.5', value: '-120' },
        { label: 'Under 35.5', value: '+100' }
      ]
    }
  ],
  first_basket: [
    {
      id: '12',
      title: 'First Basket Scorer',
      sgp: false,
      options: [
        { label: 'Jalen Brunson', value: '+550' },
        { label: 'Cade Cunningham', value: '+600' },
        { label: 'Julius Randle', value: '+650' },
        { label: 'Jaden Ivey', value: '+700' },
        { label: 'OG Anunoby', value: '+800' },
        { label: 'Bojan Bogdanovic', value: '+850' }
      ]
    }
  ],
  player_rebounds: [
    {
      id: '13',
      title: 'Isaiah Hartenstein Rebounds',
      sgp: true,
      options: [
        { label: 'Over 9.5', value: '-130' },
        { label: 'Under 9.5', value: '+110' }
      ]
    },
    {
      id: '14',
      title: 'Jalen Duren Rebounds',
      sgp: true,
      options: [
        { label: 'Over 10.5', value: '-115' },
        { label: 'Under 10.5', value: '-105' }
      ]
    }
  ],
  player_assists: [
    {
      id: '15',
      title: 'Jalen Brunson Assists',
      sgp: true,
      options: [
        { label: 'Over 5.5', value: '-140' },
        { label: 'Under 5.5', value: '+120' }
      ]
    },
    {
      id: '16',
      title: 'Cade Cunningham Assists',
      sgp: true,
      options: [
        { label: 'Over 6.5', value: '+110' },
        { label: 'Under 6.5', value: '-130' }
      ]
    }
  ]
};

// Add mock bet data for football categories
export const footballMockBets: BetCategories = {
  quick_bets: [
    {
      id: '1',
      title: 'Game Result',
      sgp: true,
      options: [
        { label: 'Chiefs', value: '-300' },
        { label: 'Raiders', value: '+250' }
      ]
    },
    {
      id: '2',
      title: 'Over/Under Total Points',
      sgp: true,
      options: [
        { label: 'OVER 47.5', value: '-110' },
        { label: 'UNDER 47.5', value: '-110' }
      ]
    },
    {
      id: '3',
      title: 'Spread',
      sgp: true,
      options: [
        { label: 'Chiefs -6.5', value: '-110' },
        { label: 'Raiders +6.5', value: '-110' }
      ]
    }
  ],
  player_passing: [
    {
      id: '4',
      title: 'Patrick Mahomes Passing Yards',
      sgp: true,
      options: [
        { label: 'Over 274.5', value: '-115' },
        { label: 'Under 274.5', value: '-105' }
      ]
    },
    {
      id: '5',
      title: 'Patrick Mahomes Passing TDs',
      sgp: true,
      options: [
        { label: 'Over 1.5', value: '-190' },
        { label: 'Under 1.5', value: '+160' },
        { label: 'Over 2.5', value: '+140' },
        { label: 'Under 2.5', value: '-170' }
      ]
    },
    {
      id: '6',
      title: 'Gardner Minshew Passing Yards',
      sgp: true,
      options: [
        { label: 'Over 229.5', value: '-110' },
        { label: 'Under 229.5', value: '-110' }
      ]
    }
  ],
  player_rushing: [
    {
      id: '7',
      title: 'Isiah Pacheco Rushing Yards',
      sgp: true,
      options: [
        { label: 'Over 72.5', value: '-115' },
        { label: 'Under 72.5', value: '-105' }
      ]
    },
    {
      id: '8',
      title: 'Josh Jacobs Rushing Yards',
      sgp: true,
      options: [
        { label: 'Over 54.5', value: '-110' },
        { label: 'Under 54.5', value: '-110' }
      ]
    },
    {
      id: '9',
      title: 'Patrick Mahomes Rushing Yards',
      sgp: true,
      options: [
        { label: 'Over 22.5', value: '-115' },
        { label: 'Under 22.5', value: '-105' }
      ]
    }
  ],
  player_receiving: [
    {
      id: '10',
      title: 'Travis Kelce Receiving Yards',
      sgp: true,
      options: [
        { label: 'Over 67.5', value: '-110' },
        { label: 'Under 67.5', value: '-110' }
      ]
    },
    {
      id: '11',
      title: 'Rashee Rice Receiving Yards',
      sgp: true,
      options: [
        { label: 'Over 59.5', value: '-115' },
        { label: 'Under 59.5', value: '-105' }
      ]
    },
    {
      id: '12',
      title: 'Davante Adams Receiving Yards',
      sgp: true,
      options: [
        { label: 'Over 74.5', value: '-110' },
        { label: 'Under 74.5', value: '-110' }
      ]
    }
  ],
  touchdown_scorers: [
    {
      id: '13',
      title: 'Anytime Touchdown Scorer',
      sgp: true,
      options: [
        { label: 'Isiah Pacheco', value: '-160' },
        { label: 'Travis Kelce', value: '+120' },
        { label: 'Rashee Rice', value: '+140' },
        { label: 'Josh Jacobs', value: '+100' },
        { label: 'Davante Adams', value: '+170' },
        { label: 'Jakobi Meyers', value: '+220' }
      ]
    },
    {
      id: '14',
      title: 'First Touchdown Scorer',
      sgp: false,
      options: [
        { label: 'Isiah Pacheco', value: '+500' },
        { label: 'Travis Kelce', value: '+650' },
        { label: 'Rashee Rice', value: '+750' },
        { label: 'Josh Jacobs', value: '+700' },
        { label: 'Davante Adams', value: '+850' },
        { label: 'Jakobi Meyers', value: '+1100' }
      ]
    }
  ],
  team_totals: [
    {
      id: '15',
      title: 'Chiefs Total Points',
      sgp: true,
      options: [
        { label: 'Over 26.5', value: '-120' },
        { label: 'Under 26.5', value: '+100' }
      ]
    },
    {
      id: '16',
      title: 'Raiders Total Points',
      sgp: true,
      options: [
        { label: 'Over 20.5', value: '+100' },
        { label: 'Under 20.5', value: '-120' }
      ]
    }
  ]
};

// Add mock bet data for hockey categories
export const hockeyMockBets: BetCategories = {
  quick_bets: [
    {
      id: '1',
      title: 'Game Result',
      sgp: true,
      options: [
        { label: 'Rangers', value: '-140' },
        { label: 'Bruins', value: '+120' }
      ]
    },
    {
      id: '2',
      title: 'Over/Under Total Goals',
      sgp: true,
      options: [
        { label: 'OVER 5.5', value: '-115' },
        { label: 'UNDER 5.5', value: '-105' }
      ]
    },
    {
      id: '3',
      title: 'Puck Line',
      sgp: true,
      options: [
        { label: 'Rangers -1.5', value: '+170' },
        { label: 'Bruins +1.5', value: '-210' }
      ]
    }
  ],
  goal_scorers: [
    {
      id: '4',
      title: 'Anytime Goalscorer',
      sgp: true,
      options: [
        { label: 'Artemi Panarin', value: '+160' },
        { label: 'Mika Zibanejad', value: '+180' },
        { label: 'David Pastrnak', value: '+140' },
        { label: 'Brad Marchand', value: '+200' },
        { label: 'Chris Kreider', value: '+190' },
        { label: 'Charlie Coyle', value: '+280' }
      ]
    }
  ],
  first_goal: [
    {
      id: '5',
      title: 'First Goalscorer',
      sgp: false,
      options: [
        { label: 'Artemi Panarin', value: '+1000' },
        { label: 'Mika Zibanejad', value: '+1100' },
        { label: 'David Pastrnak', value: '+900' },
        { label: 'Brad Marchand', value: '+1200' },
        { label: 'Chris Kreider', value: '+1100' },
        { label: 'Charlie Coyle', value: '+1600' }
      ]
    }
  ],
  player_points: [
    {
      id: '6',
      title: 'Artemi Panarin Points',
      sgp: true,
      options: [
        { label: 'Over 1.5', value: '+130' },
        { label: 'Under 1.5', value: '-160' }
      ]
    },
    {
      id: '7',
      title: 'David Pastrnak Points',
      sgp: true,
      options: [
        { label: 'Over 1.5', value: '+120' },
        { label: 'Under 1.5', value: '-150' }
      ]
    }
  ],
  player_shots: [
    {
      id: '8',
      title: 'Artemi Panarin Shots on Goal',
      sgp: true,
      options: [
        { label: 'Over 3.5', value: '-115' },
        { label: 'Under 3.5', value: '-105' }
      ]
    },
    {
      id: '9',
      title: 'David Pastrnak Shots on Goal',
      sgp: true,
      options: [
        { label: 'Over 4.5', value: '-105' },
        { label: 'Under 4.5', value: '-115' }
      ]
    }
  ],
  player_saves: [
    {
      id: '10',
      title: 'Igor Shesterkin Saves',
      sgp: true,
      options: [
        { label: 'Over 29.5', value: '-115' },
        { label: 'Under 29.5', value: '-105' }
      ]
    },
    {
      id: '11',
      title: 'Jeremy Swayman Saves',
      sgp: true,
      options: [
        { label: 'Over 31.5', value: '-110' },
        { label: 'Under 31.5', value: '-110' }
      ]
    }
  ],
  periods: [
    {
      id: '12',
      title: '1st Period Result',
      sgp: true,
      options: [
        { label: 'Rangers', value: '+150' },
        { label: 'Tie', value: '+140' },
        { label: 'Bruins', value: '+200' }
      ]
    },
    {
      id: '13',
      title: '1st Period Total Goals',
      sgp: true,
      options: [
        { label: 'Over 1.5', value: '+110' },
        { label: 'Under 1.5', value: '-130' }
      ]
    }
  ]
};

// Add mock bet data for tennis categories
export const tennisMockBets: BetCategories = {
  quick_bets: [
    {
      id: '1',
      title: 'Match Winner',
      sgp: true,
      options: [
        { label: 'Novak Djokovic', value: '-250' },
        { label: 'Carlos Alcaraz', value: '+210' }
      ]
    },
    {
      id: '2',
      title: 'Game Spread',
      sgp: true,
      options: [
        { label: 'Djokovic -3.5', value: '-115' },
        { label: 'Alcaraz +3.5', value: '-105' }
      ]
    }
  ],
  set_betting: [
    {
      id: '3',
      title: 'Match Result & Total Sets',
      sgp: true,
      options: [
        { label: 'Djokovic 3-0', value: '+350' },
        { label: 'Djokovic 3-1', value: '+300' },
        { label: 'Djokovic 3-2', value: '+450' },
        { label: 'Alcaraz 3-0', value: '+800' },
        { label: 'Alcaraz 3-1', value: '+700' },
        { label: 'Alcaraz 3-2', value: '+650' }
      ]
    }
  ],
  set_score: [
    {
      id: '4',
      title: '1st Set Score',
      sgp: true,
      options: [
        { label: 'Djokovic 6-3', value: '+500' },
        { label: 'Djokovic 6-4', value: '+450' },
        { label: 'Djokovic 7-5', value: '+600' },
        { label: 'Djokovic 7-6', value: '+650' },
        { label: 'Alcaraz 6-3', value: '+800' },
        { label: 'Alcaraz 6-4', value: '+750' },
        { label: 'Alcaraz 7-5', value: '+900' },
        { label: 'Alcaraz 7-6', value: '+850' }
      ]
    }
  ],
  games: [
    {
      id: '5',
      title: 'Total Games',
      sgp: true,
      options: [
        { label: 'Over 38.5', value: '-115' },
        { label: 'Under 38.5', value: '-105' }
      ]
    },
    {
      id: '6',
      title: 'Djokovic Games Won',
      sgp: true,
      options: [
        { label: 'Over 18.5', value: '-125' },
        { label: 'Under 18.5', value: '+105' }
      ]
    },
    {
      id: '7',
      title: 'Alcaraz Games Won',
      sgp: true,
      options: [
        { label: 'Over 16.5', value: '-110' },
        { label: 'Under 16.5', value: '-110' }
      ]
    }
  ],
  aces: [
    {
      id: '8',
      title: 'Djokovic Total Aces',
      sgp: true,
      options: [
        { label: 'Over 7.5', value: '-110' },
        { label: 'Under 7.5', value: '-110' }
      ]
    },
    {
      id: '9',
      title: 'Alcaraz Total Aces',
      sgp: true,
      options: [
        { label: 'Over 9.5', value: '-115' },
        { label: 'Under 9.5', value: '-105' }
      ]
    }
  ],
  tie_break: [
    {
      id: '10',
      title: 'Any Set to Have a Tie Break',
      sgp: true,
      options: [
        { label: 'Yes', value: '-160' },
        { label: 'No', value: '+130' }
      ]
    },
    {
      id: '11',
      title: 'Number of Tie Breaks',
      sgp: true,
      options: [
        { label: 'Over 1.5', value: '+130' },
        { label: 'Under 1.5', value: '-160' }
      ]
    }
  ]
}; 