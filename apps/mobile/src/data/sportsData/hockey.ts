// Hockey match data
export const hockeyMatches = [
  { 
    id: 'hockey-1',
    league: 'NHL',
    date: '7:00PM ET',
    homeTeam: {
      name: 'Toronto Maple Leafs',
      odds: '-125'
    },
    awayTeam: {
      name: 'Montreal Canadiens',
      odds: '+105'
    },
    tieOdds: '+310'  // Overtime possibility
  },
  { 
    id: 'hockey-2',
    league: 'NHL',
    date: 'WED 8:00PM ET',
    homeTeam: {
      name: 'Boston Bruins',
      odds: '-160'
    },
    awayTeam: {
      name: 'New York Rangers',
      odds: '+135'
    },
    tieOdds: '+300'
  },
  {
    id: 'hockey-3',
    league: 'NHL',
    date: 'THU 9:00PM ET',
    homeTeam: {
      name: 'Colorado Avalanche',
      odds: '-175'
    },
    awayTeam: {
      name: 'Vegas Golden Knights',
      odds: '+145'
    },
    tieOdds: '+320'
  },
  {
    id: 'hockey-4',
    league: 'NHL',
    date: 'SAT 7:30PM ET',
    homeTeam: {
      name: 'Tampa Bay Lightning',
      odds: '-130'
    },
    awayTeam: {
      name: 'Florida Panthers',
      odds: '+110'
    },
    tieOdds: '+280'
  }
];

// Hockey bet categories
export const hockeyBetCategories = {
  popular: [
    {
      id: 'hockey-bet-1',
      title: 'Moneyline (3-way)',
      description: 'Bet on the outcome including regulation time only.',
      sgp: true,
      options: [
        { label: 'HOME', value: '-125', team: 'Maple Leafs' },
        { label: 'TIE', value: '+310' },
        { label: 'AWAY', value: '+105', team: 'Canadiens' }
      ]
    },
    {
      id: 'hockey-bet-2',
      title: 'Puck Line',
      sgp: true,
      options: [
        { label: 'HOME -1.5', value: '+180' },
        { label: 'AWAY +1.5', value: '-220' }
      ]
    },
    {
      id: 'hockey-bet-3',
      title: 'Total Goals',
      sgp: true,
      options: [
        { label: 'OVER 5.5', value: '-120' },
        { label: 'UNDER 5.5', value: '+100' }
      ]
    }
  ]
}; 