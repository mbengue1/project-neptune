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
  playerStats?: {
    points?: PlayerBet[];
    rebounds?: PlayerBet[];
    assists?: PlayerBet[];
    threes?: PlayerBet[];
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
  playerStats?: {
    passing?: PlayerBet[];
    rushing?: PlayerBet[];
    receiving?: PlayerBet[];
    touchdowns?: PlayerBet[];
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
  playerStats?: {
    goals?: PlayerBet[];
    assists?: PlayerBet[];
    shots?: PlayerBet[];
    saves?: PlayerBet[];
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
  playerStats?: {
    aces?: PlayerBet[];
    doubleFaults?: PlayerBet[];
    firstServe?: PlayerBet[];
  };
}

export interface PlayerBet {
  player: string;
  team: string;
  line: string;
  over: string;
  under: string;
  threshold?: number;
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
    playerStats: {
      points: [
        { player: 'Jalen Brunson', team: 'Knicks', line: '24.5', over: '-115', under: '-105' },
        { player: 'Cade Cunningham', team: 'Pistons', line: '22.5', over: '-110', under: '-110' },
        { player: 'Julius Randle', team: 'Knicks', line: '20.5', over: '-118', under: '-102' },
        { player: 'Jaden Ivey', team: 'Pistons', line: '16.5', over: '-112', under: '-108' },
        { player: 'OG Anunoby', team: 'Knicks', line: '14.5', over: '-105', under: '-115' },
        { player: 'Bojan Bogdanovic', team: 'Pistons', line: '17.5', over: '-110', under: '-110' }
      ],
      rebounds: [
        { player: 'Isaiah Hartenstein', team: 'Knicks', line: '9.5', over: '-130', under: '+110' },
        { player: 'Jalen Duren', team: 'Pistons', line: '10.5', over: '-115', under: '-105' },
        { player: 'Julius Randle', team: 'Knicks', line: '8.5', over: '-120', under: '+100' },
        { player: 'Cade Cunningham', team: 'Pistons', line: '5.5', over: '-125', under: '+105' }
      ],
      assists: [
        { player: 'Jalen Brunson', team: 'Knicks', line: '5.5', over: '-140', under: '+120' },
        { player: 'Cade Cunningham', team: 'Pistons', line: '6.5', over: '+110', under: '-130' },
        { player: 'Josh Hart', team: 'Knicks', line: '4.5', over: '-115', under: '-105' },
        { player: 'Jaden Ivey', team: 'Pistons', line: '4.5', over: '-105', under: '-115' }
      ],
      threes: [
        { player: 'Jalen Brunson', team: 'Knicks', line: '2.5', over: '+110', under: '-130' },
        { player: 'Donte DiVincenzo', team: 'Knicks', line: '3.5', over: '+130', under: '-150' },
        { player: 'Bojan Bogdanovic', team: 'Pistons', line: '1.5', over: '-145', under: '+125' },
        { player: 'Cade Cunningham', team: 'Pistons', line: '1.5', over: '-135', under: '+115' }
      ]
    }
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
    playerStats: {
      points: [
        { player: 'Shai Gilgeous-Alexander', team: 'Thunder', line: '30.5', over: '-115', under: '-105' },
        { player: 'Ja Morant', team: 'Grizzlies', line: '26.5', over: '-110', under: '-110' },
        { player: 'Jalen Williams', team: 'Thunder', line: '18.5', over: '-118', under: '-102' },
        { player: 'Jaren Jackson Jr.', team: 'Grizzlies', line: '19.5', over: '-112', under: '-108' }
      ],
      rebounds: [
        { player: 'Chet Holmgren', team: 'Thunder', line: '7.5', over: '-130', under: '+110' },
        { player: 'Jaren Jackson Jr.', team: 'Grizzlies', line: '6.5', over: '-115', under: '-105' },
        { player: 'Shai Gilgeous-Alexander', team: 'Thunder', line: '5.5', over: '-120', under: '+100' },
        { player: 'Ja Morant', team: 'Grizzlies', line: '5.5', over: '-125', under: '+105' }
      ],
      assists: [
        { player: 'Ja Morant', team: 'Grizzlies', line: '7.5', over: '-140', under: '+120' },
        { player: 'Shai Gilgeous-Alexander', team: 'Thunder', line: '6.5', over: '+110', under: '-130' }
      ],
      threes: [
        { player: 'Desmond Bane', team: 'Grizzlies', line: '3.5', over: '+110', under: '-130' },
        { player: 'Isaiah Joe', team: 'Thunder', line: '2.5', over: '+130', under: '-150' }
      ]
    }
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
    playerStats: {
      points: [
        { player: 'Nikola Jokic', team: 'Nuggets', line: '26.5', over: '-115', under: '-105' },
        { player: 'James Harden', team: 'Clippers', line: '21.5', over: '-110', under: '-110' },
        { player: 'Kawhi Leonard', team: 'Clippers', line: '24.5', over: '-118', under: '-102' },
        { player: 'Jamal Murray', team: 'Nuggets', line: '19.5', over: '-112', under: '-108' }
      ],
      rebounds: [
        { player: 'Nikola Jokic', team: 'Nuggets', line: '12.5', over: '-130', under: '+110' },
        { player: 'Ivica Zubac', team: 'Clippers', line: '8.5', over: '-115', under: '-105' }
      ],
      assists: [
        { player: 'Nikola Jokic', team: 'Nuggets', line: '9.5', over: '-140', under: '+120' },
        { player: 'James Harden', team: 'Clippers', line: '8.5', over: '+110', under: '-130' },
        { player: 'Jamal Murray', team: 'Nuggets', line: '5.5', over: '-115', under: '-105' }
      ],
      threes: [
        { player: 'Michael Porter Jr.', team: 'Nuggets', line: '2.5', over: '+110', under: '-130' },
        { player: 'James Harden', team: 'Clippers', line: '3.5', over: '+130', under: '-150' }
      ]
    }
  },
  {
    id: 'euroleague-1',
    league: 'EuroLeague',
    date: 'Tomorrow, 2:00 PM',
    homeTeam: {
      name: 'Real Madrid',
      spread: { value: '-5.5', odds: '-110' },
      moneyline: '-240',
    },
    awayTeam: {
      name: 'Barcelona',
      spread: { value: '+5.5', odds: '-110' },
      moneyline: '+200',
    },
    totalPoints: {
      value: '160.5',
      over: '-110',
      under: '-110',
    },
    playerStats: {
      points: [
        { player: 'Facundo Campazzo', team: 'Real Madrid', line: '12.5', over: '-115', under: '-105' },
        { player: 'Nikola Mirotic', team: 'Barcelona', line: '15.5', over: '-110', under: '-110' }
      ],
      rebounds: [
        { player: 'Walter Tavares', team: 'Real Madrid', line: '6.5', over: '-130', under: '+110' },
        { player: 'Nikola Mirotic', team: 'Barcelona', line: '5.5', over: '-115', under: '-105' }
      ]
    }
  },
  {
    id: 'ncaam-1',
    league: 'NCAA Men',
    date: 'Tomorrow, 7:00 PM',
    homeTeam: {
      name: 'Duke',
      spread: { value: '-7.5', odds: '-110' },
      moneyline: '-320',
    },
    awayTeam: {
      name: 'North Carolina',
      spread: { value: '+7.5', odds: '-110' },
      moneyline: '+260',
    },
    totalPoints: {
      value: '152.5',
      over: '-110',
      under: '-110',
    },
    playerStats: {
      points: [
        { player: 'Kyle Filipowski', team: 'Duke', line: '16.5', over: '-115', under: '-105' },
        { player: 'RJ Davis', team: 'North Carolina', line: '18.5', over: '-110', under: '-110' }
      ]
    }
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
    playerStats: {
      goals: [
        { player: 'Artemi Panarin', team: 'Rangers', line: '0.5', over: '+160', under: '-180' },
        { player: 'David Pastrnak', team: 'Bruins', line: '0.5', over: '+140', under: '-160' },
        { player: 'Chris Kreider', team: 'Rangers', line: '0.5', over: '+190', under: '-230' },
        { player: 'Brad Marchand', team: 'Bruins', line: '0.5', over: '+200', under: '-240' }
      ],
      shots: [
        { player: 'Artemi Panarin', team: 'Rangers', line: '3.5', over: '-115', under: '-105' },
        { player: 'David Pastrnak', team: 'Bruins', line: '4.5', over: '-105', under: '-115' }
      ],
      saves: [
        { player: 'Igor Shesterkin', team: 'Rangers', line: '29.5', over: '-115', under: '-105' },
        { player: 'Jeremy Swayman', team: 'Bruins', line: '31.5', over: '-110', under: '-110' }
      ]
    }
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
    playerStats: {
      goals: [
        { player: 'Auston Matthews', team: 'Maple Leafs', line: '0.5', over: '-150', under: '+130' },
        { player: 'Mitch Marner', team: 'Maple Leafs', line: '0.5', over: '+180', under: '-220' },
        { player: 'Travis Konecny', team: 'Flyers', line: '0.5', over: '+170', under: '-200' }
      ],
      shots: [
        { player: 'Auston Matthews', team: 'Maple Leafs', line: '4.5', over: '-125', under: '+105' },
        { player: 'Travis Konecny', team: 'Flyers', line: '3.5', over: '-105', under: '-115' }
      ]
    }
  },
  {
    id: 'khl-1',
    league: 'KHL',
    date: 'Tomorrow, 12:00 PM',
    homeTeam: {
      name: 'CSKA Moscow',
      puckLine: { value: '-1.5', odds: '+150' },
      moneyline: '-130',
    },
    awayTeam: {
      name: 'SKA St. Petersburg',
      puckLine: { value: '+1.5', odds: '-180' },
      moneyline: '+110',
    },
    totalGoals: {
      value: '4.5',
      over: '-110',
      under: '-110',
    }
  }
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
    playerStats: {
      passing: [
        { player: 'Patrick Mahomes', team: 'Chiefs', line: '274.5', over: '-115', under: '-105' },
        { player: 'Gardner Minshew', team: 'Raiders', line: '229.5', over: '-110', under: '-110' }
      ],
      rushing: [
        { player: 'Isiah Pacheco', team: 'Chiefs', line: '72.5', over: '-115', under: '-105' },
        { player: 'Josh Jacobs', team: 'Raiders', line: '54.5', over: '-110', under: '-110' },
        { player: 'Patrick Mahomes', team: 'Chiefs', line: '22.5', over: '-115', under: '-105' }
      ],
      receiving: [
        { player: 'Travis Kelce', team: 'Chiefs', line: '67.5', over: '-110', under: '-110' },
        { player: 'Rashee Rice', team: 'Chiefs', line: '59.5', over: '-115', under: '-105' },
        { player: 'Davante Adams', team: 'Raiders', line: '74.5', over: '-110', under: '-110' }
      ],
      touchdowns: [
        { player: 'Isiah Pacheco', team: 'Chiefs', line: '0.5', over: '-160', under: '+130' },
        { player: 'Travis Kelce', team: 'Chiefs', line: '0.5', over: '+120', under: '-140' },
        { player: 'Rashee Rice', team: 'Chiefs', line: '0.5', over: '+140', under: '-160' },
        { player: 'Josh Jacobs', team: 'Raiders', line: '0.5', over: '+100', under: '-120' },
        { player: 'Davante Adams', team: 'Raiders', line: '0.5', over: '+170', under: '-190' }
      ]
    }
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
    playerStats: {
      passing: [
        { player: 'Dak Prescott', team: 'Cowboys', line: '284.5', over: '-115', under: '-105' },
        { player: 'Jalen Hurts', team: 'Eagles', line: '247.5', over: '-110', under: '-110' }
      ],
      rushing: [
        { player: 'Jalen Hurts', team: 'Eagles', line: '45.5', over: '-115', under: '-105' },
        { player: 'Tony Pollard', team: 'Cowboys', line: '62.5', over: '-110', under: '-110' },
        { player: 'Saquon Barkley', team: 'Eagles', line: '74.5', over: '-115', under: '-105' }
      ],
      receiving: [
        { player: 'CeeDee Lamb', team: 'Cowboys', line: '96.5', over: '-110', under: '-110' },
        { player: 'A.J. Brown', team: 'Eagles', line: '82.5', over: '-115', under: '-105' },
        { player: 'DeVonta Smith', team: 'Eagles', line: '64.5', over: '-110', under: '-110' }
      ],
      touchdowns: [
        { player: 'CeeDee Lamb', team: 'Cowboys', line: '0.5', over: '-130', under: '+110' },
        { player: 'Jalen Hurts', team: 'Eagles', line: '0.5', over: '+110', under: '-130' }
      ]
    }
  },
  {
    id: 'ncaaf-1',
    league: 'NCAA Football',
    date: 'Saturday, 3:30 PM',
    homeTeam: {
      name: 'Alabama',
      spread: { value: '-10.5', odds: '-110' },
      moneyline: '-400',
    },
    awayTeam: {
      name: 'LSU',
      spread: { value: '+10.5', odds: '-110' },
      moneyline: '+320',
    },
    totalPoints: {
      value: '52.5',
      over: '-110',
      under: '-110',
    },
    playerStats: {
      passing: [
        { player: 'Jalen Milroe', team: 'Alabama', line: '225.5', over: '-115', under: '-105' },
        { player: 'Garrett Nussmeier', team: 'LSU', line: '260.5', over: '-110', under: '-110' }
      ],
      rushing: [
        { player: 'Jalen Milroe', team: 'Alabama', line: '65.5', over: '-115', under: '-105' }
      ]
    }
  }
];

// Example mock data for tennis
export const tennisMatches: TennisMatch[] = [
  {
    id: 'tennis-1',
    tournament: 'ATP Australian Open',
    date: 'Today, 11:00 AM',
    player1: {
      name: 'Novak Djokovic',
      gameSpread: { value: '-3.5', odds: '-115' },
      moneyline: '-250',
    },
    player2: {
      name: 'Carlos Alcaraz',
      gameSpread: { value: '+3.5', odds: '-105' },
      moneyline: '+210',
    },
    totalGames: {
      value: '38.5',
      over: '-115',
      under: '-105',
    },
    playerStats: {
      aces: [
        { player: 'Novak Djokovic', team: 'N/A', line: '7.5', over: '-110', under: '-110' },
        { player: 'Carlos Alcaraz', team: 'N/A', line: '9.5', over: '-115', under: '-105' }
      ],
      doubleFaults: [
        { player: 'Novak Djokovic', team: 'N/A', line: '1.5', over: '-150', under: '+130' },
        { player: 'Carlos Alcaraz', team: 'N/A', line: '2.5', over: '-115', under: '-105' }
      ]
    }
  },
  {
    id: 'tennis-2',
    tournament: 'WTA 1000 Madrid',
    date: 'Tomorrow, 1:00 PM',
    player1: {
      name: 'Iga Swiatek',
      gameSpread: { value: '-4.5', odds: '-120' },
      moneyline: '-300',
    },
    player2: {
      name: 'Aryna Sabalenka',
      gameSpread: { value: '+4.5', odds: '+100' },
      moneyline: '+250',
    },
    totalGames: {
      value: '21.5',
      over: '-110',
      under: '-110',
    },
    playerStats: {
      aces: [
        { player: 'Iga Swiatek', team: 'N/A', line: '3.5', over: '+120', under: '-140' },
        { player: 'Aryna Sabalenka', team: 'N/A', line: '6.5', over: '-115', under: '-105' }
      ],
      doubleFaults: [
        { player: 'Iga Swiatek', team: 'N/A', line: '2.5', over: '-110', under: '-110' },
        { player: 'Aryna Sabalenka', team: 'N/A', line: '4.5', over: '-130', under: '+110' }
      ]
    }
  }
]; 