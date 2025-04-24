// This file defines the different betting structures for each sport type

export interface TeamOdds {
  name: string;
  odds: string;
}

export interface SoccerMatch {
  id: string;
  league: string;
  date: string;
  homeTeam: TeamOdds;
  awayTeam: TeamOdds;
  tieOdds: string;
}

export interface BasketballMatch {
  id: string;
  league: string;
  date: string;
  homeTeam: {
    name: string;
    spread: { value: string; odds: string };
    moneyline: string;
  };
  awayTeam: {
    name: string;
    spread: { value: string; odds: string };
    moneyline: string;
  };
  totalPoints: {
    value: string;
    over: string;
    under: string;
  };
}

export interface FootballMatch {
  id: string;
  league: string;
  date: string;
  homeTeam: {
    name: string;
    spread: { value: string; odds: string };
    moneyline: string;
  };
  awayTeam: {
    name: string;
    spread: { value: string; odds: string };
    moneyline: string;
  };
  totalPoints: {
    value: string;
    over: string;
    under: string;
  };
}

export interface HockeyMatch {
  id: string;
  league: string;
  date: string;
  homeTeam: {
    name: string;
    puckLine: { value: string; odds: string };
    moneyline: string;
  };
  awayTeam: {
    name: string;
    puckLine: { value: string; odds: string };
    moneyline: string;
  };
  totalGoals: {
    value: string;
    over: string;
    under: string;
  };
}

export interface TennisMatch {
  id: string;
  tournament: string;
  date: string;
  player1: {
    name: string;
    gameSpread: { value: string; odds: string };
    moneyline: string;
  };
  player2: {
    name: string;
    gameSpread: { value: string; odds: string };
    moneyline: string;
  };
  totalGames: {
    value: string;
    over: string;
    under: string;
  };
}

// Example mock data for basketball
export const basketballMatches: BasketballMatch[] = [
  {
    id: 'nba-1',
    league: 'NBA',
    date: 'Today, 7:00 PM',
    homeTeam: {
      name: 'Knicks',
      spread: { value: '-1', odds: '-108' },
      moneyline: '-118',
    },
    awayTeam: {
      name: 'Pistons',
      spread: { value: '+1', odds: '-112' },
      moneyline: '+100',
    },
    totalPoints: {
      value: '214',
      over: '-108',
      under: '-112',
    },
  },
  {
    id: 'nba-2',
    league: 'NBA',
    date: 'Today, 9:30 PM',
    homeTeam: {
      name: 'Grizzlies',
      spread: { value: '+8.5', odds: '-108' },
      moneyline: '+310',
    },
    awayTeam: {
      name: 'Thunder',
      spread: { value: '-8.5', odds: '-112' },
      moneyline: '-390',
    },
    totalPoints: {
      value: '227',
      over: '-110',
      under: '-110',
    },
  },
  {
    id: 'nba-3',
    league: 'NBA',
    date: 'Today, 10:00 PM',
    homeTeam: {
      name: 'Clippers',
      spread: { value: '-5', odds: '-114' },
      moneyline: '-220',
    },
    awayTeam: {
      name: 'Nuggets',
      spread: { value: '+5', odds: '-106' },
      moneyline: '+184',
    },
    totalPoints: {
      value: '213.5',
      over: '-110',
      under: '-110',
    },
  },
];

// Example mock data for hockey
export const hockeyMatches: HockeyMatch[] = [
  {
    id: 'nhl-1',
    league: 'NHL',
    date: 'Today, 7:00 PM',
    homeTeam: {
      name: 'Rangers',
      puckLine: { value: '-1.5', odds: '+170' },
      moneyline: '-140',
    },
    awayTeam: {
      name: 'Bruins',
      puckLine: { value: '+1.5', odds: '-210' },
      moneyline: '+120',
    },
    totalGoals: {
      value: '5.5',
      over: '-115',
      under: '-105',
    },
  },
  {
    id: 'nhl-2',
    league: 'NHL',
    date: 'Today, 8:00 PM',
    homeTeam: {
      name: 'Maple Leafs',
      puckLine: { value: '-1.5', odds: '+145' },
      moneyline: '-160',
    },
    awayTeam: {
      name: 'Flyers',
      puckLine: { value: '+1.5', odds: '-175' },
      moneyline: '+130',
    },
    totalGoals: {
      value: '6.5',
      over: '-110',
      under: '-110',
    },
  },
];

// Example mock data for football
export const footballMatches: FootballMatch[] = [
  {
    id: 'nfl-1',
    league: 'NFL',
    date: 'Sunday, 1:00 PM',
    homeTeam: {
      name: 'Chiefs',
      spread: { value: '-6.5', odds: '-110' },
      moneyline: '-300',
    },
    awayTeam: {
      name: 'Raiders',
      spread: { value: '+6.5', odds: '-110' },
      moneyline: '+250',
    },
    totalPoints: {
      value: '47.5',
      over: '-110',
      under: '-110',
    },
  },
  {
    id: 'nfl-2',
    league: 'NFL',
    date: 'Sunday, 4:25 PM',
    homeTeam: {
      name: 'Cowboys',
      spread: { value: '-3', odds: '-115' },
      moneyline: '-170',
    },
    awayTeam: {
      name: 'Eagles',
      spread: { value: '+3', odds: '-105' },
      moneyline: '+150',
    },
    totalPoints: {
      value: '51.5',
      over: '-110',
      under: '-110',
    },
  },
];

// Example mock data for tennis
export const tennisMatches: TennisMatch[] = [
  {
    id: 'tennis-1',
    tournament: 'US Open',
    date: 'Today, 2:00 PM',
    player1: {
      name: 'Djokovic',
      gameSpread: { value: '-4.5', odds: '-110' },
      moneyline: '-220',
    },
    player2: {
      name: 'Alcaraz',
      gameSpread: { value: '+4.5', odds: '-110' },
      moneyline: '+180',
    },
    totalGames: {
      value: '38.5',
      over: '-115',
      under: '-105',
    },
  },
  {
    id: 'tennis-2',
    tournament: 'Wimbledon',
    date: 'Tomorrow, 10:00 AM',
    player1: {
      name: 'Swiatek',
      gameSpread: { value: '-3.5', odds: '-120' },
      moneyline: '-200',
    },
    player2: {
      name: 'Sabalenka',
      gameSpread: { value: '+3.5', odds: '+100' },
      moneyline: '+170',
    },
    totalGames: {
      value: '21.5',
      over: '-110',
      under: '-110',
    },
  },
]; 