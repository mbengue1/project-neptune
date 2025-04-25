// Soccer match data
export const soccerMatches = [
  // Premier League Games
  { 
    id: 'pl-1',
    league: 'Premier League',
    date: '3:00PM ET',
    homeTeam: {
      name: 'Manchester City',
      odds: '-115'
    },
    awayTeam: {
      name: 'Aston Villa',
      odds: '+290'
    },
    tieOdds: '+290'
  },
  { 
    id: 'pl-2',
    league: 'Premier League',
    date: 'WED 3:00PM ET',
    homeTeam: {
      name: 'Arsenal',
      odds: '-270'
    },
    awayTeam: {
      name: 'Crystal Palace',
      odds: '+800'
    },
    tieOdds: '+370'
  },
  {
    id: 'pl-3',
    league: 'Premier League',
    date: 'WED 3:15PM ET',
    homeTeam: {
      name: 'Liverpool',
      odds: '-180'
    },
    awayTeam: {
      name: 'Chelsea',
      odds: '+450'
    },
    tieOdds: '+310'
  },
  {
    id: 'pl-4',
    league: 'Premier League',
    date: 'SAT 12:30PM ET',
    homeTeam: {
      name: 'Manchester United',
      odds: '-140'
    },
    awayTeam: {
      name: 'Tottenham',
      odds: '+320'
    },
    tieOdds: '+280'
  },
  // La Liga Games
  {
    id: 'laliga-1',
    league: 'La Liga',
    date: 'THU 4:00PM ET',
    homeTeam: {
      name: 'Barcelona',
      odds: '-150'
    },
    awayTeam: {
      name: 'Real Madrid',
      odds: '+320'
    },
    tieOdds: '+280'
  },
  {
    id: 'laliga-2',
    league: 'La Liga',
    date: 'SAT 3:00PM ET',
    homeTeam: {
      name: 'Atletico Madrid',
      odds: '-180'
    },
    awayTeam: {
      name: 'Sevilla',
      odds: '+450'
    },
    tieOdds: '+310'
  },
  {
    id: 'laliga-3',
    league: 'La Liga',
    date: 'SUN 10:15AM ET',
    homeTeam: {
      name: 'Real Sociedad',
      odds: '-125'
    },
    awayTeam: {
      name: 'Athletic Bilbao',
      odds: '+340'
    },
    tieOdds: '+260'
  },
  // Serie A Games
  {
    id: 'seria-1',
    league: 'Serie A',
    date: 'SAT 9:00AM ET',
    homeTeam: {
      name: 'Inter Milan',
      odds: '-160'
    },
    awayTeam: {
      name: 'AC Milan',
      odds: '+400'
    },
    tieOdds: '+300'
  },
  {
    id: 'seria-2',
    league: 'Serie A',
    date: 'SUN 2:45PM ET',
    homeTeam: {
      name: 'Juventus',
      odds: '-130'
    },
    awayTeam: {
      name: 'Napoli',
      odds: '+350'
    },
    tieOdds: '+280'
  },
  // Bundesliga Games
  {
    id: 'bund-1',
    league: 'Bundesliga',
    date: 'SAT 9:30AM ET',
    homeTeam: {
      name: 'Bayern Munich',
      odds: '-200'
    },
    awayTeam: {
      name: 'Borussia Dortmund',
      odds: '+500'
    },
    tieOdds: '+350'
  },
  {
    id: 'bund-2',
    league: 'Bundesliga',
    date: 'SAT 12:30PM ET',
    homeTeam: {
      name: 'RB Leipzig',
      odds: '-140'
    },
    awayTeam: {
      name: 'Bayer Leverkusen',
      odds: '+360'
    },
    tieOdds: '+300'
  }
];

// Soccer bet categories
export const soccerBetCategories = {
  popular: [
    {
      id: 'soccer-bet-1',
      title: 'Match Result (3-way)',
      description: 'Bet on the match result after 90 minutes',
      sgp: true,
      options: [
        { label: 'HOME', value: '-115', team: 'Manchester City' },
        { label: 'TIE', value: '+290' },
        { label: 'AWAY', value: '+290', team: 'Aston Villa' }
      ]
    },
    {
      id: 'soccer-bet-2',
      title: 'Goal Line',
      description: 'Bet on the goal spread',
      sgp: true,
      options: [
        { label: 'HOME -1.5', value: '+130' },
        { label: 'AWAY +1.5', value: '-150' }
      ]
    },
    {
      id: 'soccer-bet-3',
      title: 'Total Goals',
      description: 'Bet on total goals scored in the match',
      sgp: true,
      options: [
        { label: 'OVER 2.5', value: '-120' },
        { label: 'UNDER 2.5', value: '+100' }
      ]
    }
  ],
  player_props: [
    {
      id: 'soccer-bet-4',
      title: 'Player Goals',
      description: 'Bet on player goal scoring',
      sgp: true,
      options: [
        { label: 'Erling Haaland Anytime Goal', value: '-120' },
        { label: 'Erling Haaland First Goal', value: '+275' },
        { label: 'Erling Haaland 2+ Goals', value: '+200' }
      ]
    },
    {
      id: 'soccer-bet-5',
      title: 'Player Shots',
      description: 'Bet on player shots on target',
      sgp: true,
      options: [
        { label: 'Kevin De Bruyne OVER 1.5', value: '-130' },
        { label: 'Kevin De Bruyne UNDER 1.5', value: '+110' }
      ]
    },
    {
      id: 'soccer-bet-6',
      title: 'Player Assists',
      description: 'Bet on player assists',
      sgp: true,
      options: [
        { label: 'Bruno Fernandes Anytime Assist', value: '+175' }
      ]
    }
  ],
  game_props: [
    {
      id: 'soccer-bet-7',
      title: 'Both Teams to Score',
      description: 'Bet on whether both teams will score',
      sgp: true,
      options: [
        { label: 'YES', value: '-110' },
        { label: 'NO', value: '-110' }
      ]
    },
    {
      id: 'soccer-bet-8',
      title: 'First Half Result',
      description: 'Bet on the result at half-time',
      sgp: true,
      options: [
        { label: 'HOME', value: '+150' },
        { label: 'TIE', value: '+110' },
        { label: 'AWAY', value: '+375' }
      ]
    },
    {
      id: 'soccer-bet-9',
      title: 'Team Total Goals',
      description: 'Bet on total goals by one team',
      sgp: true,
      options: [
        { label: 'Man City OVER 1.5', value: '-135' },
        { label: 'Man City UNDER 1.5', value: '+115' }
      ]
    },
    {
      id: 'soccer-bet-10',
      title: 'Correct Score',
      description: 'Bet on the exact final score',
      sgp: false,
      options: [
        { label: '1-0', value: '+600' },
        { label: '2-0', value: '+700' },
        { label: '2-1', value: '+800' },
        { label: '0-0', value: '+1000' }
      ]
    }
  ]
}; 