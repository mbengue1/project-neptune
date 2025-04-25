// American Football match data
export const footballMatches = [
  // NFL Games
  { 
    id: 'nfl-1',
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
    tieOdds: '+2000'
  },
  { 
    id: 'nfl-2',
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
    id: 'nfl-3',
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
    id: 'nfl-4',
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
  },
  {
    id: 'nfl-5',
    league: 'NFL',
    date: 'SUN 1:00PM ET',
    homeTeam: {
      name: 'Baltimore Ravens',
      odds: '-160'
    },
    awayTeam: {
      name: 'Cleveland Browns',
      odds: '+140'
    },
    tieOdds: '+2000'
  },
  // College Football Games
  {
    id: 'ncaaf-1',
    league: 'NCAAF',
    date: 'SAT 3:30PM ET',
    homeTeam: {
      name: 'Alabama',
      odds: '-175'
    },
    awayTeam: {
      name: 'Georgia',
      odds: '+155'
    },
    tieOdds: '+2500'
  },
  {
    id: 'ncaaf-2',
    league: 'NCAAF',
    date: 'SAT 12:00PM ET',
    homeTeam: {
      name: 'Ohio State',
      odds: '-200'
    },
    awayTeam: {
      name: 'Michigan',
      odds: '+170'
    },
    tieOdds: '+2500'
  },
  {
    id: 'ncaaf-3',
    league: 'NCAAF',
    date: 'SAT 7:00PM ET',
    homeTeam: {
      name: 'LSU',
      odds: '-145'
    },
    awayTeam: {
      name: 'Florida',
      odds: '+125'
    },
    tieOdds: '+2500'
  },
  {
    id: 'ncaaf-4',
    league: 'NCAAF',
    date: 'SAT 8:00PM ET',
    homeTeam: {
      name: 'Clemson',
      odds: '-130'
    },
    awayTeam: {
      name: 'Florida State',
      odds: '+110'
    },
    tieOdds: '+2500'
  },
  // XFL Games
  {
    id: 'xfl-1',
    league: 'XFL',
    date: 'SAT 1:00PM ET',
    homeTeam: {
      name: 'DC Defenders',
      odds: '-135'
    },
    awayTeam: {
      name: 'St. Louis Battlehawks',
      odds: '+115'
    },
    tieOdds: '+1800'
  },
  {
    id: 'xfl-2',
    league: 'XFL',
    date: 'SUN 4:00PM ET',
    homeTeam: {
      name: 'Houston Roughnecks',
      odds: '-150'
    },
    awayTeam: {
      name: 'Seattle Sea Dragons',
      odds: '+130'
    },
    tieOdds: '+1800'
  }
];

// Football bet categories
export const footballBetCategories = {
  popular: [
    {
      id: 'fb-bet-1',
      title: 'Moneyline',
      description: 'Bet on which team will win the game',
      sgp: true,
      options: [
        { label: 'HOME', value: '-145', team: 'Chiefs' },
        { label: 'AWAY', value: '+125', team: 'Bills' }
      ]
    },
    {
      id: 'fb-bet-2',
      title: 'Point Spread',
      description: 'Bet on the margin of victory',
      sgp: true,
      options: [
        { label: 'HOME -3.0', value: '-110' },
        { label: 'AWAY +3.0', value: '-110' }
      ]
    },
    {
      id: 'fb-bet-3',
      title: 'Total Points',
      description: 'Bet on combined score of both teams',
      sgp: true,
      options: [
        { label: 'OVER 48.5', value: '-110' },
        { label: 'UNDER 48.5', value: '-110' }
      ]
    }
  ],
  player_props: [
    {
      id: 'fb-bet-4',
      title: 'Passing Yards',
      description: 'Bet on quarterback passing yards',
      sgp: true,
      options: [
        { label: 'Patrick Mahomes OVER 285.5', value: '-115' },
        { label: 'Patrick Mahomes UNDER 285.5', value: '-105' }
      ]
    },
    {
      id: 'fb-bet-5',
      title: 'Rushing Yards',
      description: 'Bet on player rushing yards',
      sgp: true,
      options: [
        { label: 'Josh Allen OVER 45.5', value: '-110' },
        { label: 'Josh Allen UNDER 45.5', value: '-110' }
      ]
    },
    {
      id: 'fb-bet-6',
      title: 'Receiving Yards',
      description: 'Bet on player receiving yards',
      sgp: true,
      options: [
        { label: 'Travis Kelce OVER 75.5', value: '-120' },
        { label: 'Travis Kelce UNDER 75.5', value: '+100' }
      ]
    },
    {
      id: 'fb-bet-7',
      title: 'Touchdowns Scored',
      description: 'Bet on player touchdown scoring',
      sgp: true,
      options: [
        { label: 'Stefon Diggs Anytime TD', value: '+110' },
        { label: 'Stefon Diggs First TD', value: '+800' }
      ]
    },
    {
      id: 'fb-bet-8',
      title: 'Pass Attempts',
      description: 'Bet on quarterback pass attempts',
      sgp: true,
      options: [
        { label: 'Josh Allen OVER 35.5', value: '-115' },
        { label: 'Josh Allen UNDER 35.5', value: '-105' }
      ]
    },
    {
      id: 'fb-bet-9',
      title: 'Receptions',
      description: 'Bet on player reception total',
      sgp: true,
      options: [
        { label: 'Travis Kelce OVER 6.5', value: '-130' },
        { label: 'Travis Kelce UNDER 6.5', value: '+110' }
      ]
    }
  ],
  game_props: [
    {
      id: 'fb-bet-10',
      title: 'First Half Winner',
      description: 'Bet on who will lead at halftime',
      sgp: true,
      options: [
        { label: 'HOME', value: '-130' },
        { label: 'AWAY', value: '+110' }
      ]
    },
    {
      id: 'fb-bet-11',
      title: 'First Score Method',
      description: 'Bet on how the first points will be scored',
      sgp: false,
      options: [
        { label: 'Touchdown', value: '-150' },
        { label: 'Field Goal', value: '+130' },
        { label: 'Safety', value: '+2000' }
      ]
    },
    {
      id: 'fb-bet-12',
      title: 'Team Total Points',
      description: 'Bet on total points by one team',
      sgp: true,
      options: [
        { label: 'Chiefs OVER 27.5', value: '-110' },
        { label: 'Chiefs UNDER 27.5', value: '-110' }
      ]
    },
    {
      id: 'fb-bet-13',
      title: 'First Team to Score',
      description: 'Bet on which team scores first',
      sgp: true,
      options: [
        { label: 'HOME', value: '-115' },
        { label: 'AWAY', value: '-105' }
      ]
    },
    {
      id: 'fb-bet-14',
      title: 'Winning Margin',
      description: 'Bet on exact winning margin range',
      sgp: false,
      options: [
        { label: 'HOME 1-6', value: '+375' },
        { label: 'HOME 7-12', value: '+450' },
        { label: 'HOME 13+', value: '+500' },
        { label: 'AWAY 1-6', value: '+400' },
        { label: 'AWAY 7-12', value: '+500' },
        { label: 'AWAY 13+', value: '+600' }
      ]
    }
  ],
  quarter_props: [
    {
      id: 'fb-bet-15',
      title: 'Highest Scoring Quarter',
      description: 'Bet on which quarter will have most points',
      sgp: false,
      options: [
        { label: '1st Quarter', value: '+300' },
        { label: '2nd Quarter', value: '+200' },
        { label: '3rd Quarter', value: '+250' },
        { label: '4th Quarter', value: '+175' }
      ]
    },
    {
      id: 'fb-bet-16',
      title: 'First Quarter Total',
      description: 'Bet on total points in first quarter',
      sgp: true,
      options: [
        { label: 'OVER 10.5', value: '-110' },
        { label: 'UNDER 10.5', value: '-110' }
      ]
    }
  ]
}; 