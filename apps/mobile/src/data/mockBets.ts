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