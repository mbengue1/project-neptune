const apiSportsClient = require('../../../../services/ingestion/src/clients/apiSportsClient');
const { getCachedData, setCachedData } = require('../../../../packages/cache/src/cacheService');

class SportIntelService {
  constructor() {
    this.cacheTTL = {
      playerSearch: parseInt(process.env.APISPORTS_PLAYER_CACHE_TTL) || 86400, // 24 hours
      playerStats: parseInt(process.env.APISPORTS_CACHE_TTL) || 60, // 1 minute
      games: parseInt(process.env.APISPORTS_CACHE_TTL) || 60, // 1 minute
      teams: parseInt(process.env.APISPORTS_PLAYER_CACHE_TTL) || 86400 // 24 hours
    };
  }

  // Get player ID by name with caching
  async getPlayerIdByName(name, league = 'NBA', season = '2024') {
    try {
      const cacheKey = `player_search_${name.toLowerCase()}_${league}_${season}`;
      
      // Check cache first
      const cachedData = await getCachedData(cacheKey);
      if (cachedData) {
        console.log(`💾 [SPORT-INTEL] Cache hit for player search: ${name}`);
        return cachedData;
      }

      console.log(`🔍 [SPORT-INTEL] Searching for player: ${name} in ${league} ${season}`);
      console.log(`🌐 [SPORT-INTEL] Making API call to API-SPORTS.io...`);
      
      const result = await apiSportsClient.searchPlayers(name, league, season);
      
      if (!result.success || !result.data || result.data.length === 0) {
        console.log(`❌ [SPORT-INTEL] Player not found: ${name} in ${league} ${season}`);
        return {
          success: false,
          error: `Player "${name}" not found in ${league} ${season}`,
          data: null,
          meta: result.meta
        };
      }

      console.log(`✅ [SPORT-INTEL] Found ${result.data.length} players matching "${name}"`);

      // Find the best match (exact name match preferred)
      const exactMatch = result.data.find(player => 
        player.firstname?.toLowerCase() === name.toLowerCase() ||
        player.lastname?.toLowerCase() === name.toLowerCase() ||
        `${player.firstname} ${player.lastname}`.toLowerCase() === name.toLowerCase()
      );

      const bestMatch = exactMatch || result.data[0];
      console.log(`🎯 [SPORT-INTEL] Selected player: ${bestMatch.firstname} ${bestMatch.lastname} (ID: ${bestMatch.id})`);
      
      const response = {
        success: true,
        data: {
          playerId: bestMatch.id,
          name: `${bestMatch.firstname} ${bestMatch.lastname}`,
          team: bestMatch.team?.name || 'Unknown',
          position: bestMatch.position || 'Unknown',
          height: bestMatch.height || null,
          weight: bestMatch.weight || null,
          birth: bestMatch.birth || null
        },
        meta: {
          ...result.meta,
          matchType: exactMatch ? 'exact' : 'fuzzy',
          totalResults: result.data.length
        }
      };

      // Cache the result
      await setCachedData(cacheKey, response, this.cacheTTL.playerSearch);
      
      return response;

    } catch (error) {
      console.error('Error in getPlayerIdByName:', error);
      return {
        success: false,
        error: error.message,
        data: null,
        meta: {
          source: 'API-SPORTS.io',
          timestamp: new Date().toISOString(),
          query: { name, league, season }
        }
      };
    }
  }

  // Get player game logs with caching
  async getPlayerGameLogs(playerId, league = 'NBA', season = '2024', lastN = null) {
    try {
      const cacheKey = `player_stats_${playerId}_${league}_${season}_${lastN || 'all'}`;
      
      // Check cache first
      const cachedData = await getCachedData(cacheKey);
      if (cachedData) {
        console.log(`💾 [SPORT-INTEL] Cache hit for player stats: ${playerId}`);
        return cachedData;
      }

      console.log(`📊 [SPORT-INTEL] Fetching game logs for player ${playerId}, last ${lastN || 'all'} games`);
      console.log(`🌐 [SPORT-INTEL] Making API call to API-SPORTS.io for player stats...`);
      
      const result = await apiSportsClient.getPlayerStats(playerId, league, season, lastN);
      
      if (!result.success) {
        console.log(`❌ [SPORT-INTEL] Failed to get player stats for ${playerId}:`, result.error);
        return result;
      }

      console.log(`✅ [SPORT-INTEL] Retrieved ${result.data.length} games for player ${playerId}`);
      console.log(`📊 [SPORT-INTEL] Processing and normalizing game data...`);

      // Process and normalize the stats data
      const processedStats = result.data.map(game => ({
        gameId: game.game?.id,
        date: game.game?.date,
        opponent: game.opponent?.name,
        homeAway: game.game?.home ? 'Home' : 'Away',
        minutes: game.minutes || 0,
        points: game.points || 0,
        rebounds: game.totReb || 0,
        assists: game.assists || 0,
        steals: game.steals || 0,
        blocks: game.blocks || 0,
        turnovers: game.turnovers || 0,
        fieldGoalsMade: game.fgm || 0,
        fieldGoalsAttempted: game.fga || 0,
        threePointersMade: game.tpm || 0,
        threePointersAttempted: game.tpa || 0,
        freeThrowsMade: game.ftm || 0,
        freeThrowsAttempted: game.fta || 0,
        fieldGoalPercentage: game.fgp || 0,
        threePointPercentage: game.tpp || 0,
        freeThrowPercentage: game.ftp || 0
      }));

      const response = {
        success: true,
        data: processedStats,
        meta: {
          ...result.meta,
          totalGames: processedStats.length,
          dateRange: processedStats.length > 0 ? {
            start: processedStats[processedStats.length - 1]?.date,
            end: processedStats[0]?.date
          } : null
        }
      };

      // Cache the result
      await setCachedData(cacheKey, response, this.cacheTTL.playerStats);
      
      return response;

    } catch (error) {
      console.error('Error in getPlayerGameLogs:', error);
      return {
        success: false,
        error: error.message,
        data: [],
        meta: {
          source: 'API-SPORTS.io',
          timestamp: new Date().toISOString(),
          query: { playerId, league, season, lastN }
        }
      };
    }
  }

  // Compute rolling statistics for a specific metric
  computeRollingStats(stats, metric, window = 10) {
    if (!stats || stats.length === 0) {
      return {
        success: false,
        error: 'No stats data provided',
        data: null
      };
    }

    const values = stats.slice(-window).map(game => game[metric]).filter(val => val !== null && val !== undefined);
    
    if (values.length === 0) {
      return {
        success: false,
        error: `No valid ${metric} data found`,
        data: null
      };
    }

    const sorted = [...values].sort((a, b) => a - b);
    const sum = values.reduce((acc, val) => acc + val, 0);
    const mean = sum / values.length;
    
    // Calculate standard deviation
    const variance = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / values.length;
    const stdDev = Math.sqrt(variance);

    // Calculate median
    const median = sorted.length % 2 === 0 
      ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
      : sorted[Math.floor(sorted.length / 2)];

    return {
      success: true,
      data: {
        metric: metric,
        window: window,
        games: values.length,
        mean: Math.round(mean * 100) / 100,
        median: Math.round(median * 100) / 100,
        min: Math.min(...values),
        max: Math.max(...values),
        stdDev: Math.round(stdDev * 100) / 100,
        values: values,
        recentTrend: this.calculateTrend(values)
      },
      meta: {
        source: 'API-SPORTS.io',
        timestamp: new Date().toISOString(),
        calculation: 'rolling_stats'
      }
    };
  }

  // Calculate trend direction (improving, declining, stable)
  calculateTrend(values) {
    if (values.length < 3) return 'insufficient_data';
    
    const recent = values.slice(-3);
    const earlier = values.slice(0, 3);
    
    const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;
    const earlierAvg = earlier.reduce((a, b) => a + b, 0) / earlier.length;
    
    const change = ((recentAvg - earlierAvg) / earlierAvg) * 100;
    
    if (change > 5) return 'improving';
    if (change < -5) return 'declining';
    return 'stable';
  }

  // Get player rolling stats (convenience method)
  async getPlayerRollingStats(playerName, league = 'NBA', season = '2024', window = 10, metric = 'points') {
    try {
      // First get player ID
      const playerResult = await this.getPlayerIdByName(playerName, league, season);
      if (!playerResult.success) {
        return playerResult;
      }

      // Then get game logs
      const statsResult = await this.getPlayerGameLogs(playerResult.data.playerId, league, season, window);
      if (!statsResult.success) {
        return statsResult;
      }

      // Compute rolling stats
      const rollingStats = this.computeRollingStats(statsResult.data, metric, window);
      if (!rollingStats.success) {
        return rollingStats;
      }

      return {
        success: true,
        data: {
          player: playerResult.data,
          rollingStats: rollingStats.data,
          gameLogs: statsResult.data
        },
        meta: {
          source: 'API-SPORTS.io',
          timestamp: new Date().toISOString(),
          query: { playerName, league, season, window, metric }
        }
      };

    } catch (error) {
      console.error('Error in getPlayerRollingStats:', error);
      return {
        success: false,
        error: error.message,
        data: null,
        meta: {
          source: 'API-SPORTS.io',
          timestamp: new Date().toISOString(),
          query: { playerName, league, season, window, metric }
        }
      };
    }
  }

  // Get upcoming games
  async getUpcomingGames(league = 'NBA', season = '2024', days = 7) {
    try {
      const cacheKey = `upcoming_games_${league}_${season}_${days}`;
      
      // Check cache first
      const cachedData = await getCachedData(cacheKey);
      if (cachedData) {
        console.log(`Cache hit for upcoming games: ${league}`);
        return cachedData;
      }

      console.log(`Fetching upcoming games for ${league} in next ${days} days`);
      
      const result = await apiSportsClient.getGames(league, season);
      
      if (!result.success) {
        return result;
      }

      // Filter for upcoming games
      const now = new Date();
      const futureDate = new Date(now.getTime() + (days * 24 * 60 * 60 * 1000));
      
      const upcomingGames = result.data.filter(game => {
        const gameDate = new Date(game.date);
        return gameDate > now && gameDate <= futureDate;
      });

      const response = {
        success: true,
        data: upcomingGames.map(game => ({
          gameId: game.id,
          date: game.date,
          homeTeam: game.teams?.home?.name,
          awayTeam: game.teams?.away?.name,
          homeTeamId: game.teams?.home?.id,
          awayTeamId: game.teams?.away?.id,
          status: game.status?.long || 'Scheduled',
          league: game.league?.name
        })),
        meta: {
          ...result.meta,
          totalGames: upcomingGames.length,
          dateRange: { start: now.toISOString(), end: futureDate.toISOString() }
        }
      };

      // Cache the result
      await setCachedData(cacheKey, response, this.cacheTTL.games);
      
      return response;

    } catch (error) {
      console.error('Error in getUpcomingGames:', error);
      return {
        success: false,
        error: error.message,
        data: [],
        meta: {
          source: 'API-SPORTS.io',
          timestamp: new Date().toISOString(),
          query: { league, season, days }
        }
      };
    }
  }
}

// Export singleton instance
module.exports = new SportIntelService();
