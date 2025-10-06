const express = require('express');
const router = express.Router();
const sportIntelService = require('../services/sportIntelService');
const apiSportsClient = require('../../../../services/ingestion/src/clients/apiSportsClient');

// Get player ID by name
router.get('/players/search', async (req, res) => {
  try {
    const { name, league = 'NBA', season = '2024' } = req.query;

    if (!name) {
      return res.status(400).json({
        success: false,
        error: 'Player name is required',
        code: 'MISSING_PLAYER_NAME'
      });
    }

    console.log(`Searching for player: ${name} in ${league} ${season}`);

    const result = await sportIntelService.getPlayerIdByName(name, league, season);

    if (!result.success) {
      return res.status(404).json(result);
    }

    res.json(result);

  } catch (error) {
    console.error('Player search error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      code: 'INTERNAL_ERROR'
    });
  }
});

// Get player rolling stats
router.get('/players/:playerId/rolling', async (req, res) => {
  try {
    const { playerId } = req.params;
    const { league = 'NBA', season = '2024', window = 10, metric = 'points' } = req.query;

    console.log(`Getting rolling stats for player ${playerId}, window: ${window}, metric: ${metric}`);

    const result = await sportIntelService.getPlayerGameLogs(playerId, league, season, parseInt(window));

    if (!result.success) {
      return res.status(404).json(result);
    }

    // Compute rolling stats for the specified metric
    const rollingStats = sportIntelService.computeRollingStats(result.data, metric, parseInt(window));

    if (!rollingStats.success) {
      return res.status(400).json(rollingStats);
    }

    res.json({
      success: true,
      data: {
        playerId: playerId,
        metric: metric,
        window: parseInt(window),
        rollingStats: rollingStats.data,
        gameLogs: result.data
      },
      meta: {
        ...result.meta,
        calculation: 'rolling_stats'
      }
    });

  } catch (error) {
    console.error('Player rolling stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      code: 'INTERNAL_ERROR'
    });
  }
});

// Get player rolling stats by name (convenience endpoint)
router.get('/players/rolling', async (req, res) => {
  try {
    const { name, league = 'NBA', season = '2024', window = 10, metric = 'points' } = req.query;

    if (!name) {
      return res.status(400).json({
        success: false,
        error: 'Player name is required',
        code: 'MISSING_PLAYER_NAME'
      });
    }

    console.log(`Getting rolling stats for ${name}, window: ${window}, metric: ${metric}`);

    const result = await sportIntelService.getPlayerRollingStats(name, league, season, parseInt(window), metric);

    if (!result.success) {
      return res.status(404).json(result);
    }

    res.json(result);

  } catch (error) {
    console.error('Player rolling stats by name error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      code: 'INTERNAL_ERROR'
    });
  }
});

// Get upcoming games
router.get('/games/upcoming', async (req, res) => {
  try {
    const { league = 'NBA', season = '2024', days = 7 } = req.query;

    console.log(`Getting upcoming games for ${league}, next ${days} days`);

    const result = await sportIntelService.getUpcomingGames(league, season, parseInt(days));

    if (!result.success) {
      return res.status(404).json(result);
    }

    res.json(result);

  } catch (error) {
    console.error('Upcoming games error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      code: 'INTERNAL_ERROR'
    });
  }
});

// Get teams
router.get('/teams', async (req, res) => {
  try {
    const { league = 'NBA', season = '2024' } = req.query;

    console.log(`Getting teams for ${league} ${season}`);

    const result = await apiSportsClient.getTeams(league, season);

    if (!result.success) {
      return res.status(404).json(result);
    }

    res.json(result);

  } catch (error) {
    console.error('Teams error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      code: 'INTERNAL_ERROR'
    });
  }
});

// Health check for sport-intel service
router.get('/health', async (req, res) => {
  try {
    const healthCheck = await apiSportsClient.healthCheck();
    
    res.json({
      success: true,
      service: 'sport-intel',
      status: healthCheck.success ? 'healthy' : 'unhealthy',
      apiSports: healthCheck,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Health check error:', error);
    res.status(503).json({
      success: false,
      service: 'sport-intel',
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

module.exports = router;
