// Tennis match data
export const tennisMatches = [
  { 
    id: 'tennis-1',
    league: 'ATP/WTA',
    date: '12:00PM ET',
    homeTeam: {
      name: 'Novak Djokovic',
      odds: '-200'
    },
    awayTeam: {
      name: 'Carlos Alcaraz',
      odds: '+160'
    },
    tieOdds: '+1800'  // Not common in tennis betting, but keeping for UI consistency
  },
  { 
    id: 'tennis-2',
    league: 'ATP',
    date: 'WED 2:00PM ET',
    homeTeam: {
      name: 'Daniil Medvedev',
      odds: '+110'
    },
    awayTeam: {
      name: 'Jannik Sinner',
      odds: '-130'
    },
    tieOdds: '+1800'
  },
  {
    id: 'tennis-3',
    league: 'WTA',
    date: 'THU 11:00AM ET',
    homeTeam: {
      name: 'Iga Swiatek',
      odds: '-175'
    },
    awayTeam: {
      name: 'Aryna Sabalenka',
      odds: '+145'
    },
    tieOdds: '+1800'
  },
  {
    id: 'tennis-4',
    league: 'ATP',
    date: 'FRI 1:00PM ET',
    homeTeam: {
      name: 'Rafael Nadal',
      odds: '+120'
    },
    awayTeam: {
      name: 'Alexander Zverev',
      odds: '-140'
    },
    tieOdds: '+1800'
  }
];

// Tennis bet categories
export const tennisBetCategories = {
  popular: [
    {
      id: 'tennis-bet-1',
      title: 'Match Winner',
      description: 'Bet on who will win the match.',
      sgp: true,
      options: [
        { label: 'HOME', value: '-200', team: 'Djokovic' },
        { label: 'AWAY', value: '+160', team: 'Alcaraz' }
      ]
    },
    {
      id: 'tennis-bet-2',
      title: 'Total Games',
      sgp: true,
      options: [
        { label: 'OVER 22.5', value: '-110' },
        { label: 'UNDER 22.5', value: '-110' }
      ]
    },
    {
      id: 'tennis-bet-3',
      title: 'Set Betting',
      sgp: true,
      options: [
        { label: 'HOME 2-0', value: '+120' },
        { label: 'HOME 2-1', value: '+250' },
        { label: 'AWAY 2-0', value: '+350' },
        { label: 'AWAY 2-1', value: '+400' }
      ]
    }
  ]
}; 