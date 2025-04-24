// Basketball match data
export const basketballMatches = [
  { 
    id: 'bball-1',
    league: 'NBA',
    date: '8:00PM ET',
    homeTeam: {
      name: 'Los Angeles Lakers',
      odds: '-135'
    },
    awayTeam: {
      name: 'Boston Celtics',
      odds: '+115'
    },
    tieOdds: '+1000'  // Much less common in basketball
  },
  { 
    id: 'bball-2',
    league: 'NBA',
    date: 'WED 7:30PM ET',
    homeTeam: {
      name: 'Milwaukee Bucks',
      odds: '-180'
    },
    awayTeam: {
      name: 'Philadelphia 76ers',
      odds: '+160'
    },
    tieOdds: '+1200'
  },
  {
    id: 'bball-3',
    league: 'NBA',
    date: 'THU 8:00PM ET',
    homeTeam: {
      name: 'Brooklyn Nets',
      odds: '+110'
    },
    awayTeam: {
      name: 'Miami Heat',
      odds: '-130'
    },
    tieOdds: '+1100'
  },
  {
    id: 'bball-4',
    league: 'NBA',
    date: 'FRI 10:30PM ET',
    homeTeam: {
      name: 'Golden State Warriors',
      odds: '-145'
    },
    awayTeam: {
      name: 'Denver Nuggets',
      odds: '+125'
    },
    tieOdds: '+1000'
  }
];

// Basketball bet categories
export const basketballBetCategories = {
  popular: [
    {
      id: 'bball-bet-1',
      title: 'Moneyline',
      description: 'Bet on which team will win the game.',
      sgp: true,
      options: [
        { label: 'HOME', value: '-135', team: 'Lakers' },
        { label: 'AWAY', value: '+115', team: 'Celtics' }
      ]
    },
    {
      id: 'bball-bet-2',
      title: 'Point Spread',
      sgp: true,
      options: [
        { label: 'HOME -4.5', value: '-110' },
        { label: 'AWAY +4.5', value: '-110' }
      ]
    },
    {
      id: 'bball-bet-3',
      title: 'Total Points',
      sgp: true,
      options: [
        { label: 'OVER 223.5', value: '-110' },
        { label: 'UNDER 223.5', value: '-110' }
      ]
    }
  ]
}; 