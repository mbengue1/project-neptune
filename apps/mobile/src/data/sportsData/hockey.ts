// Hockey match data
export const hockeyMatches = [
  // NHL Games
  { 
    id: 'nhl-1',
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
    tieOdds: '+310'
  },
  { 
    id: 'nhl-2',
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
    id: 'nhl-3',
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
    id: 'nhl-4',
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
  },
  {
    id: 'nhl-5',
    league: 'NHL',
    date: 'SAT 10:00PM ET',
    homeTeam: {
      name: 'Edmonton Oilers',
      odds: '-150'
    },
    awayTeam: {
      name: 'Calgary Flames',
      odds: '+130'
    },
    tieOdds: '+300'
  },
  // KHL Games
  {
    id: 'khl-1',
    league: 'KHL',
    date: '11:00AM ET',
    homeTeam: {
      name: 'SKA Saint Petersburg',
      odds: '-140'
    },
    awayTeam: {
      name: 'CSKA Moscow',
      odds: '+120'
    },
    tieOdds: '+290'
  },
  {
    id: 'khl-2',
    league: 'KHL',
    date: '1:00PM ET',
    homeTeam: {
      name: 'Ak Bars Kazan',
      odds: '-130'
    },
    awayTeam: {
      name: 'Dynamo Moscow',
      odds: '+110'
    },
    tieOdds: '+285'
  },
  {
    id: 'khl-3',
    league: 'KHL',
    date: '12:30PM ET',
    homeTeam: {
      name: 'Metallurg Magnitogorsk',
      odds: '-155'
    },
    awayTeam: {
      name: 'Lokomotiv Yaroslavl',
      odds: '+135'
    },
    tieOdds: '+295'
  },
  // SHL Games (Swedish Hockey League)
  {
    id: 'shl-1',
    league: 'SHL',
    date: '1:00PM ET',
    homeTeam: {
      name: 'Färjestad BK',
      odds: '-135'
    },
    awayTeam: {
      name: 'Frölunda HC',
      odds: '+115'
    },
    tieOdds: '+280'
  },
  {
    id: 'shl-2',
    league: 'SHL',
    date: '1:00PM ET',
    homeTeam: {
      name: 'Luleå HF',
      odds: '-145'
    },
    awayTeam: {
      name: 'Skellefteå AIK',
      odds: '+125'
    },
    tieOdds: '+290'
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
      description: 'Bet on the goal spread',
      sgp: true,
      options: [
        { label: 'HOME -1.5', value: '+180' },
        { label: 'AWAY +1.5', value: '-220' }
      ]
    },
    {
      id: 'hockey-bet-3',
      title: 'Total Goals',
      description: 'Bet on combined goals scored',
      sgp: true,
      options: [
        { label: 'OVER 5.5', value: '-120' },
        { label: 'UNDER 5.5', value: '+100' }
      ]
    }
  ],
  player_props: [
    {
      id: 'hockey-bet-4',
      title: 'Player Goals',
      description: 'Bet on player goal scoring',
      sgp: true,
      options: [
        { label: 'Auston Matthews Anytime Goal', value: '+110' },
        { label: 'Auston Matthews First Goal', value: '+800' }
      ]
    },
    {
      id: 'hockey-bet-5',
      title: 'Player Points',
      description: 'Bet on player points (goals + assists)',
      sgp: true,
      options: [
        { label: 'Connor McDavid OVER 1.5', value: '-130' },
        { label: 'Connor McDavid UNDER 1.5', value: '+110' }
      ]
    },
    {
      id: 'hockey-bet-6',
      title: 'Player Shots',
      description: 'Bet on player shots on goal',
      sgp: true,
      options: [
        { label: 'Nathan MacKinnon OVER 4.5', value: '-115' },
        { label: 'Nathan MacKinnon UNDER 4.5', value: '-105' }
      ]
    }
  ],
  game_props: [
    {
      id: 'hockey-bet-7',
      title: 'First Period Winner',
      description: 'Bet on who will win the first period',
      sgp: true,
      options: [
        { label: 'HOME', value: '+130' },
        { label: 'TIE', value: '+165' },
        { label: 'AWAY', value: '+185' }
      ]
    },
    {
      id: 'hockey-bet-8',
      title: 'First Goal',
      description: 'Bet on which team scores first',
      sgp: true,
      options: [
        { label: 'HOME', value: '-110' },
        { label: 'AWAY', value: '-110' }
      ]
    },
    {
      id: 'hockey-bet-9',
      title: 'Team Total Goals',
      description: 'Bet on total goals by one team',
      sgp: true,
      options: [
        { label: 'Maple Leafs OVER 3.5', value: '+105' },
        { label: 'Maple Leafs UNDER 3.5', value: '-125' }
      ]
    },
    {
      id: 'hockey-bet-10',
      title: 'Game to Overtime',
      description: 'Bet on whether the game will go to overtime',
      sgp: false,
      options: [
        { label: 'YES', value: '+310' },
        { label: 'NO', value: '-380' }
      ]
    }
  ]
}; 