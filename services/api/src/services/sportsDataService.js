const axios = require('axios');
const { getCachedData, setCachedData } = require('../../../../packages/cache/src/cacheService');
const sportIntelService = require('./sportIntelService');

// Base configurations for different sports APIs
const API_CONFIGS = {
  odds: {
    baseURL: 'https://api.the-odds-api.com/v4',
    key: process.env.ODDS_API_KEY
  },
  sportradar: {
    baseURL: 'https://api.sportradar.us',
    key: process.env.SPORTRADAR_API_KEY
  },
  espn: {
    baseURL: 'https://site.api.espn.com/apis/site/v2/sports',
    key: process.env.ESPN_API_KEY
  }
};

// Cache TTL settings (in seconds)
const CACHE_TTL = {
  playerStats: 300, // 5 minutes
  gameOdds: 60,     // 1 minute
  injuryReport: 600, // 10 minutes
  teamStats: 300,   // 5 minutes
  trendingPlayers: 300 // 5 minutes
};

// Mock data for development (when APIs are not available)
const MOCK_DATA = {
  playerStats: {
    'LeBron James': {
      name: 'LeBron James',
      team: 'Lakers',
      league: 'NBA',
      stats: {
        points: 25.2,
        rebounds: 7.8,
        assists: 8.1,
        games: 15
      },
      recentGames: [
        { points: 28, rebounds: 8, assists: 9, date: '2024-01-20' },
        { points: 22, rebounds: 7, assists: 8, date: '2024-01-18' },
        { points: 31, rebounds: 9, assists: 7, date: '2024-01-16' }
      ],
      timestamp: new Date().toISOString()
    }
  },
  gameOdds: {
    'game123': {
      gameId: 'game123',
      homeTeam: 'Lakers',
      awayTeam: 'Warriors',
      odds: {
        draftkings: {
          spread: { home: -3.5, away: 3.5 },
          total: 225.5,
          moneyline: { home: -150, away: 130 }
        }
      },
      timestamp: new Date().toISOString()
    }
  },
  injuryReport: {
    'LeBron James': {
      player: 'LeBron James',
      status: 'Probable',
      injury: 'Ankle soreness',
      timestamp: new Date().toISOString()
    }
  }
};

// Get player statistics
const getPlayerStats = async (playerName, league, window = 10) => {
  try {
    console.log(`🏀 [SPORTS-DATA] Fetching player stats for ${playerName} in ${league} (last ${window} games)`);
    
    // Use the new sport-intel service for real API data
    const result = await sportIntelService.getPlayerRollingStats(playerName, league, '2024', window, 'points');
    
    if (!result.success) {
      // Fallback to mock data if API fails
      console.log(`⚠️  [SPORTS-DATA] API failed for ${playerName}, using mock data:`, result.error);
      console.log(`📊 [SPORTS-DATA] FALLBACK: Using mock data for ${playerName}`);
      return getMockPlayerStats(playerName, league, window);
    }

    const { player, rollingStats, gameLogs } = result.data;
    
    // Log successful API data retrieval
    console.log(`✅ [SPORTS-DATA] SUCCESS: Retrieved real API data for ${player.name}`);
    console.log(`📈 [SPORTS-DATA] Player: ${player.name} (ID: ${player.playerId})`);
    console.log(`📊 [SPORTS-DATA] Stats: ${rollingStats.mean} points avg over ${rollingStats.games} games`);
    console.log(`📅 [SPORTS-DATA] Date range: ${result.meta.dateRange?.start} to ${result.meta.dateRange?.end}`);
    console.log(`🔄 [SPORTS-DATA] Trend: ${rollingStats.recentTrend}`);
    console.log(`⏰ [SPORTS-DATA] Source: API-SPORTS.io, timestamp: ${result.meta.timestamp}`);
    
    // Format the response to match expected structure
    const playerData = {
      name: player.name,
      team: player.team,
      league: league,
      playerId: player.playerId,
      stats: {
        points: rollingStats.mean,
        rebounds: 0, // Will be calculated separately if needed
        assists: 0,  // Will be calculated separately if needed
        games: rollingStats.games,
        trend: rollingStats.recentTrend,
        min: rollingStats.min,
        max: rollingStats.max,
        stdDev: rollingStats.stdDev
      },
      recentGames: gameLogs.map(game => ({
        points: game.points,
        rebounds: game.rebounds,
        assists: game.assists,
        date: game.date,
        opponent: game.opponent,
        homeAway: game.homeAway
      })),
      timestamp: result.meta.timestamp,
      source: 'API-SPORTS.io'
    };

    console.log(`🎯 [SPORTS-DATA] Returning real API data for ${playerName}`);
    return playerData;

  } catch (error) {
    console.error('❌ [SPORTS-DATA] Error fetching player stats:', error);
    console.log(`📊 [SPORTS-DATA] FALLBACK: Using mock data due to error for ${playerName}`);
    // Fallback to mock data
    return getMockPlayerStats(playerName, league, window);
  }
};

// Fallback mock data function
const getMockPlayerStats = (playerName, league, window) => {
  console.log(`🎭 [SPORTS-DATA] MOCK: Using mock data for ${playerName}`);
  console.log(`⚠️  [SPORTS-DATA] WARNING: This is NOT real data - API unavailable or failed`);
  
  let playerData;
  
  if (league === 'NBA' && MOCK_DATA.playerStats[playerName]) {
    console.log(`🎭 [SPORTS-DATA] Using predefined mock data for ${playerName}`);
    playerData = MOCK_DATA.playerStats[playerName];
  } else {
    // Generate mock data for other players
    console.log(`🎭 [SPORTS-DATA] Generating random mock data for ${playerName}`);
    const mockPoints = Math.floor(Math.random() * 30) + 10;
    const mockRebounds = Math.floor(Math.random() * 15) + 5;
    const mockAssists = Math.floor(Math.random() * 10) + 3;
    
    playerData = {
      name: playerName,
      team: 'Mock Team',
      league: league,
      stats: {
        points: mockPoints,
        rebounds: mockRebounds,
        assists: mockAssists,
        games: window
      },
      recentGames: Array.from({ length: window }, (_, i) => ({
        points: Math.floor(Math.random() * 30) + 10,
        rebounds: Math.floor(Math.random() * 15) + 5,
        assists: Math.floor(Math.random() * 10) + 3,
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      })),
      timestamp: new Date().toISOString(),
      source: 'Mock Data (API unavailable)'
    };
    
    console.log(`🎭 [SPORTS-DATA] Generated mock stats: ${mockPoints} pts, ${mockRebounds} reb, ${mockAssists} ast`);
  }

  console.log(`🎭 [SPORTS-DATA] MOCK: Returning mock data for ${playerName}`);
  return playerData;
};

// Get game odds
const getGameOdds = async (gameId, book = 'draftkings') => {
  try {
    const cacheKey = `game_odds_${gameId}_${book}`;
    
    // Check cache first
    const cachedData = await getCachedData(cacheKey);
    if (cachedData) {
      console.log(`Cache hit for game odds: ${gameId}`);
      return cachedData;
    }

    console.log(`Fetching game odds for ${gameId} from ${book}`);
    
    // For now, return mock data
    let oddsData;
    
    if (MOCK_DATA.gameOdds[gameId]) {
      oddsData = MOCK_DATA.gameOdds[gameId];
    } else {
      // Generate mock odds data
      oddsData = {
        gameId: gameId,
        homeTeam: 'Home Team',
        awayTeam: 'Away Team',
        odds: {
          [book]: {
            spread: { home: -3.5, away: 3.5 },
            total: 225.5,
            moneyline: { home: -150, away: 130 }
          }
        },
        timestamp: new Date().toISOString()
      };
    }

    // Cache the result
    await setCachedData(cacheKey, oddsData, CACHE_TTL.gameOdds);
    
    return oddsData;

  } catch (error) {
    console.error('Error fetching game odds:', error);
    throw new Error(`Failed to fetch game odds: ${error.message}`);
  }
};

// Get injury report
const getInjuryReport = async (playerName, league) => {
  try {
    const cacheKey = `injury_report_${playerName}_${league}`;
    
    // Check cache first
    const cachedData = await getCachedData(cacheKey);
    if (cachedData) {
      console.log(`Cache hit for injury report: ${playerName}`);
      return cachedData;
    }

    console.log(`Fetching injury report for ${playerName} in ${league}`);
    
    // For now, return mock data
    let injuryData;
    
    if (MOCK_DATA.injuryReport[playerName]) {
      injuryData = MOCK_DATA.injuryReport[playerName];
    } else {
      // Generate mock injury data
      const statuses = ['Healthy', 'Probable', 'Questionable', 'Doubtful', 'Out'];
      const injuries = ['Ankle soreness', 'Knee contusion', 'Back spasms', 'Hamstring strain', 'Shoulder soreness'];
      
      injuryData = {
        player: playerName,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        injury: Math.random() > 0.7 ? injuries[Math.floor(Math.random() * injuries.length)] : 'None',
        timestamp: new Date().toISOString()
      };
    }

    // Cache the result
    await setCachedData(cacheKey, injuryData, CACHE_TTL.injuryReport);
    
    return injuryData;

  } catch (error) {
    console.error('Error fetching injury report:', error);
    throw new Error(`Failed to fetch injury report: ${error.message}`);
  }
};

// Get team statistics
const getTeamStats = async (teamName, league) => {
  try {
    const cacheKey = `team_stats_${teamName}_${league}`;
    
    // Check cache first
    const cachedData = await getCachedData(cacheKey);
    if (cachedData) {
      console.log(`Cache hit for team stats: ${teamName}`);
      return cachedData;
    }

    console.log(`Fetching team stats for ${teamName} in ${league}`);
    
    // Generate mock team data
    const teamData = {
      name: teamName,
      league: league,
      record: {
        wins: Math.floor(Math.random() * 50) + 20,
        losses: Math.floor(Math.random() * 30) + 10,
        winPercentage: Math.random() * 0.4 + 0.3
      },
      stats: {
        pointsPerGame: Math.floor(Math.random() * 20) + 100,
        pointsAllowed: Math.floor(Math.random() * 20) + 100,
        pace: Math.floor(Math.random() * 10) + 95
      },
      recentForm: Array.from({ length: 10 }, () => Math.random() > 0.5 ? 'W' : 'L'),
      timestamp: new Date().toISOString()
    };

    // Cache the result
    await setCachedData(cacheKey, teamData, CACHE_TTL.teamStats);
    
    return teamData;

  } catch (error) {
    console.error('Error fetching team stats:', error);
    throw new Error(`Failed to fetch team stats: ${error.message}`);
  }
};

// Get trending players
const getTrendingPlayers = async (league, metric = 'points', window = 10) => {
  try {
    const cacheKey = `trending_players_${league}_${metric}_${window}`;
    
    // Check cache first
    const cachedData = await getCachedData(cacheKey);
    if (cachedData) {
      console.log(`Cache hit for trending players: ${league} ${metric}`);
      return cachedData;
    }

    console.log(`Fetching trending players for ${league} in ${metric} (last ${window} games)`);
    
    // Generate mock trending players data
    const trendingData = {
      league: league,
      metric: metric,
      window: window,
      players: Array.from({ length: 10 }, (_, i) => ({
        name: `Player ${i + 1}`,
        team: `Team ${i + 1}`,
        currentAverage: Math.floor(Math.random() * 30) + 10,
        previousAverage: Math.floor(Math.random() * 25) + 8,
        trend: Math.random() > 0.5 ? 'up' : 'down',
        change: Math.floor(Math.random() * 5) + 1
      })),
      timestamp: new Date().toISOString()
    };

    // Cache the result
    await setCachedData(cacheKey, trendingData, CACHE_TTL.trendingPlayers);
    
    return trendingData;

  } catch (error) {
    console.error('Error fetching trending players:', error);
    throw new Error(`Failed to fetch trending players: ${error.message}`);
  }
};

module.exports = {
  getPlayerStats,
  getGameOdds,
  getInjuryReport,
  getTeamStats,
  getTrendingPlayers,
  API_CONFIGS
};
