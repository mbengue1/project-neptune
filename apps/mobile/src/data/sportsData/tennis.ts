// Tennis match data
export const tennisMatches = [
  // Grand Slam Matches
  { 
    id: 'gs-1',
    league: 'Grand Slam',
    tournament: 'Australian Open',
    date: '3:00AM ET',
    homeTeam: {
      name: 'Novak Djokovic',
      odds: '-200'
    },
    awayTeam: {
      name: 'Carlos Alcaraz',
      odds: '+160'
    },
    tieOdds: '+1800'
  },
  { 
    id: 'gs-2',
    league: 'Grand Slam',
    tournament: 'French Open',
    date: 'WED 9:00AM ET',
    homeTeam: {
      name: 'Rafael Nadal',
      odds: '-150'
    },
    awayTeam: {
      name: 'Daniil Medvedev',
      odds: '+130'
    },
    tieOdds: '+1800'
  },
  {
    id: 'gs-3',
    league: 'Grand Slam',
    tournament: 'Wimbledon',
    date: 'THU 8:00AM ET',
    homeTeam: {
      name: 'Jannik Sinner',
      odds: '+110'
    },
    awayTeam: {
      name: 'Alexander Zverev',
      odds: '-130'
    },
    tieOdds: '+1800'
  },
  // ATP Masters 1000 Matches
  {
    id: 'atp-1',
    league: 'ATP',
    tournament: 'Miami Masters 1000',
    date: 'FRI 1:00PM ET',
    homeTeam: {
      name: 'Stefanos Tsitsipas',
      odds: '-125'
    },
    awayTeam: {
      name: 'Andrey Rublev',
      odds: '+105'
    },
    tieOdds: '+1800'
  },
  {
    id: 'atp-2',
    league: 'ATP',
    tournament: 'Indian Wells Masters 1000',
    date: 'SAT 4:00PM ET',
    homeTeam: {
      name: 'Taylor Fritz',
      odds: '+120'
    },
    awayTeam: {
      name: 'Casper Ruud',
      odds: '-140'
    },
    tieOdds: '+1800'
  },
  // WTA Matches
  {
    id: 'wta-1',
    league: 'WTA',
    tournament: 'WTA 1000 Madrid',
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
    id: 'wta-2',
    league: 'WTA',
    tournament: 'WTA 1000 Rome',
    date: 'FRI 10:00AM ET',
    homeTeam: {
      name: 'Elena Rybakina',
      odds: '-130'
    },
    awayTeam: {
      name: 'Coco Gauff',
      odds: '+110'
    },
    tieOdds: '+1800'
  },
  {
    id: 'wta-3',
    league: 'WTA',
    tournament: 'WTA 1000 Cincinnati',
    date: 'SAT 7:00PM ET',
    homeTeam: {
      name: 'Jessica Pegula',
      odds: '+105'
    },
    awayTeam: {
      name: 'Maria Sakkari',
      odds: '-125'
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
      description: 'Bet on who will win the match',
      sgp: true,
      options: [
        { label: 'HOME', value: '-200', team: 'Djokovic' },
        { label: 'AWAY', value: '+160', team: 'Alcaraz' }
      ]
    },
    {
      id: 'tennis-bet-2',
      title: 'Total Games',
      description: 'Bet on total games in the match',
      sgp: true,
      options: [
        { label: 'OVER 22.5', value: '-110' },
        { label: 'UNDER 22.5', value: '-110' }
      ]
    },
    {
      id: 'tennis-bet-3',
      title: 'Set Betting',
      description: 'Bet on the exact score in sets',
      sgp: true,
      options: [
        { label: 'HOME 2-0', value: '+120' },
        { label: 'HOME 2-1', value: '+250' },
        { label: 'AWAY 2-0', value: '+350' },
        { label: 'AWAY 2-1', value: '+400' }
      ]
    }
  ],
  set_props: [
    {
      id: 'tennis-bet-4',
      title: 'First Set Winner',
      description: 'Bet on who will win the first set',
      sgp: true,
      options: [
        { label: 'HOME', value: '-150' },
        { label: 'AWAY', value: '+130' }
      ]
    },
    {
      id: 'tennis-bet-5',
      title: 'First Set Score',
      description: 'Bet on the exact score of the first set',
      sgp: false,
      options: [
        { label: 'HOME 6-0', value: '+1000' },
        { label: 'HOME 6-1', value: '+800' },
        { label: 'HOME 6-2', value: '+600' },
        { label: 'HOME 6-3', value: '+400' },
        { label: 'HOME 6-4', value: '+350' },
        { label: 'HOME 7-5', value: '+400' },
        { label: 'HOME 7-6', value: '+500' }
      ]
    }
  ],
  game_props: [
    {
      id: 'tennis-bet-6',
      title: 'Total Games in Set 1',
      description: 'Bet on total games in the first set',
      sgp: true,
      options: [
        { label: 'OVER 9.5', value: '-110' },
        { label: 'UNDER 9.5', value: '-110' }
      ]
    },
    {
      id: 'tennis-bet-7',
      title: 'Games Handicap',
      description: 'Bet on the games handicap for the match',
      sgp: true,
      options: [
        { label: 'HOME -3.5', value: '+100' },
        { label: 'AWAY +3.5', value: '-120' }
      ]
    },
    {
      id: 'tennis-bet-8',
      title: 'Any Set to Nil',
      description: 'Bet on whether any set will be won 6-0',
      sgp: false,
      options: [
        { label: 'YES', value: '+400' },
        { label: 'NO', value: '-550' }
      ]
    }
  ],
  match_props: [
    {
      id: 'tennis-bet-9',
      title: 'Match to Go Distance',
      description: 'Bet on whether the match will go to final set',
      sgp: true,
      options: [
        { label: 'YES', value: '+200' },
        { label: 'NO', value: '-250' }
      ]
    },
    {
      id: 'tennis-bet-10',
      title: 'Total Tiebreaks',
      description: 'Bet on number of tiebreaks in the match',
      sgp: false,
      options: [
        { label: 'OVER 0.5', value: '+150' },
        { label: 'OVER 1.5', value: '+400' },
        { label: 'NONE', value: '-180' }
      ]
    }
  ]
}; 