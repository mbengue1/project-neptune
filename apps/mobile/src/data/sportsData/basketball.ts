// Basketball match data
export const basketballMatches = [
  // NBA Games
  { 
    id: 'nba-1',
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
    tieOdds: '+1000'
  },
  { 
    id: 'nba-2',
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
    id: 'nba-3',
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
    id: 'nba-4',
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
  },
  {
    id: 'nba-5',
    league: 'NBA',
    date: 'FRI 8:00PM ET',
    homeTeam: {
      name: 'Phoenix Suns',
      odds: '-120'
    },
    awayTeam: {
      name: 'Dallas Mavericks',
      odds: '+100'
    },
    tieOdds: '+1100'
  },
  // EuroLeague Games
  {
    id: 'euro-1',
    league: 'EuroLeague',
    date: 'THU 2:00PM ET',
    homeTeam: {
      name: 'Real Madrid',
      odds: '-160'
    },
    awayTeam: {
      name: 'Barcelona',
      odds: '+140'
    },
    tieOdds: '+1000'
  },
  {
    id: 'euro-2',
    league: 'EuroLeague',
    date: 'FRI 1:45PM ET',
    homeTeam: {
      name: 'Olympiacos',
      odds: '-125'
    },
    awayTeam: {
      name: 'CSKA Moscow',
      odds: '+105'
    },
    tieOdds: '+1100'
  },
  {
    id: 'euro-3',
    league: 'EuroLeague',
    date: 'THU 3:00PM ET',
    homeTeam: {
      name: 'Fenerbahce',
      odds: '-140'
    },
    awayTeam: {
      name: 'Maccabi Tel Aviv',
      odds: '+120'
    },
    tieOdds: '+1000'
  },
  {
    id: 'euro-4',
    league: 'EuroLeague',
    date: 'FRI 2:30PM ET',
    homeTeam: {
      name: 'Bayern Munich',
      odds: '+110'
    },
    awayTeam: {
      name: 'Anadolu Efes',
      odds: '-130'
    },
    tieOdds: '+1100'
  },
  // NCAA Games
  {
    id: 'ncaa-1',
    league: 'NCAA',
    date: 'SAT 3:00PM ET',
    homeTeam: {
      name: 'Duke',
      odds: '-150'
    },
    awayTeam: {
      name: 'North Carolina',
      odds: '+130'
    },
    tieOdds: '+1200'
  },
  {
    id: 'ncaa-2',
    league: 'NCAA',
    date: 'SAT 5:00PM ET',
    homeTeam: {
      name: 'Kentucky',
      odds: '-135'
    },
    awayTeam: {
      name: 'Kansas',
      odds: '+115'
    },
    tieOdds: '+1200'
  },
  {
    id: 'ncaa-3',
    league: 'NCAA',
    date: 'SAT 7:00PM ET',
    homeTeam: {
      name: 'Gonzaga',
      odds: '-170'
    },
    awayTeam: {
      name: 'UCLA',
      odds: '+150'
    },
    tieOdds: '+1300'
  },
  {
    id: 'ncaa-4',
    league: 'NCAA',
    date: 'SUN 2:00PM ET',
    homeTeam: {
      name: 'Michigan',
      odds: '+105'
    },
    awayTeam: {
      name: 'Michigan State',
      odds: '-125'
    },
    tieOdds: '+1200'
  }
];

// Basketball bet categories
export const basketballBetCategories = {
  popular: [
    {
      id: 'bball-bet-1',
      title: 'Moneyline',
      description: 'Bet on which team will win the game',
      sgp: true,
      options: [
        { label: 'HOME', value: '-135', team: 'Lakers' },
        { label: 'AWAY', value: '+115', team: 'Celtics' }
      ]
    },
    {
      id: 'bball-bet-2',
      title: 'Point Spread',
      description: 'Bet on the margin of victory',
      sgp: true,
      options: [
        { label: 'HOME -4.5', value: '-110' },
        { label: 'AWAY +4.5', value: '-110' }
      ]
    },
    {
      id: 'bball-bet-3',
      title: 'Total Points',
      description: 'Bet on combined score of both teams',
      sgp: true,
      options: [
        { label: 'OVER 223.5', value: '-110' },
        { label: 'UNDER 223.5', value: '-110' }
      ]
    }
  ],
  player_props: [
    {
      id: 'bball-bet-4',
      title: 'Player Points',
      description: 'Bet on player scoring total',
      sgp: true,
      options: [
        { label: 'LeBron James OVER 27.5', value: '-115' },
        { label: 'LeBron James UNDER 27.5', value: '-105' }
      ]
    },
    {
      id: 'bball-bet-5',
      title: 'Player Rebounds',
      description: 'Bet on player rebounding total',
      sgp: true,
      options: [
        { label: 'Anthony Davis OVER 11.5', value: '-120' },
        { label: 'Anthony Davis UNDER 11.5', value: '+100' }
      ]
    },
    {
      id: 'bball-bet-6',
      title: 'Player Assists',
      description: 'Bet on player assist total',
      sgp: true,
      options: [
        { label: 'Jayson Tatum OVER 4.5', value: '-125' },
        { label: 'Jayson Tatum UNDER 4.5', value: '+105' }
      ]
    },
    {
      id: 'bball-bet-7',
      title: 'Player Threes',
      description: 'Bet on player three-pointers made',
      sgp: true,
      options: [
        { label: 'Stephen Curry OVER 4.5', value: '-130' },
        { label: 'Stephen Curry UNDER 4.5', value: '+110' }
      ]
    }
  ],
  game_props: [
    {
      id: 'bball-bet-8',
      title: 'First Quarter Winner',
      description: 'Bet on who will win the first quarter',
      sgp: true,
      options: [
        { label: 'HOME', value: '-120' },
        { label: 'AWAY', value: '+100' }
      ]
    },
    {
      id: 'bball-bet-9',
      title: 'First Half Winner',
      description: 'Bet on who will lead at halftime',
      sgp: true,
      options: [
        { label: 'HOME', value: '-125' },
        { label: 'AWAY', value: '+105' }
      ]
    },
    {
      id: 'bball-bet-10',
      title: 'Team Total Points',
      description: 'Bet on total points by one team',
      sgp: true,
      options: [
        { label: 'Lakers OVER 110.5', value: '-110' },
        { label: 'Lakers UNDER 110.5', value: '-110' }
      ]
    },
    {
      id: 'bball-bet-11',
      title: 'Race to Points',
      description: 'Bet on first team to reach point total',
      sgp: false,
      options: [
        { label: 'HOME to 20', value: '-115' },
        { label: 'AWAY to 20', value: '-105' }
      ]
    },
    {
      id: 'bball-bet-12',
      title: 'Margin of Victory',
      description: 'Bet on exact winning margin range',
      sgp: false,
      options: [
        { label: 'HOME 1-5', value: '+375' },
        { label: 'HOME 6-10', value: '+450' },
        { label: 'AWAY 1-5', value: '+400' },
        { label: 'AWAY 6-10', value: '+500' }
      ]
    }
  ]
}; 