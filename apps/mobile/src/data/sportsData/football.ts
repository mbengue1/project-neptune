// American Football match data
export const footballMatches = [
  { 
    id: 'fb-1',
    league: 'NFL',
    date: 'SUN 1:00PM ET',
    homeTeam: {
      name: 'Kansas City Chiefs',
      odds: '-145'
    },
    awayTeam: {
      name: 'Buffalo Bills',
      odds: '+125'
    },
    tieOdds: '+2000'  // Ties are rare in NFL
  },
  { 
    id: 'fb-2',
    league: 'NFL',
    date: 'SUN 4:25PM ET',
    homeTeam: {
      name: 'Dallas Cowboys',
      odds: '-110'
    },
    awayTeam: {
      name: 'Philadelphia Eagles',
      odds: '-110'
    },
    tieOdds: '+2000'
  },
  {
    id: 'fb-3',
    league: 'NFL',
    date: 'MON 8:15PM ET',
    homeTeam: {
      name: 'San Francisco 49ers',
      odds: '-170'
    },
    awayTeam: {
      name: 'Seattle Seahawks',
      odds: '+150'
    },
    tieOdds: '+2000'
  },
  {
    id: 'fb-4',
    league: 'NFL',
    date: 'THU 8:20PM ET',
    homeTeam: {
      name: 'Green Bay Packers',
      odds: '+120'
    },
    awayTeam: {
      name: 'Detroit Lions',
      odds: '-140'
    },
    tieOdds: '+2000'
  }
];

// Football bet categories
export const footballBetCategories = {
  popular: [
    {
      id: 'fb-bet-1',
      title: 'Moneyline',
      description: 'Bet on which team will win the game.',
      sgp: true,
      options: [
        { label: 'HOME', value: '-145', team: 'Chiefs' },
        { label: 'AWAY', value: '+125', team: 'Bills' }
      ]
    },
    {
      id: 'fb-bet-2',
      title: 'Point Spread',
      sgp: true,
      options: [
        { label: 'HOME -3.0', value: '-110' },
        { label: 'AWAY +3.0', value: '-110' }
      ]
    },
    {
      id: 'fb-bet-3',
      title: 'Total Points',
      sgp: true,
      options: [
        { label: 'OVER 48.5', value: '-110' },
        { label: 'UNDER 48.5', value: '-110' }
      ]
    }
  ]
}; 