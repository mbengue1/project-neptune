const axios = require('axios');

class APISportsClient {
  constructor() {
    this.apiKey = process.env.APISPORTS_KEY;
    this.baseURL = process.env.APISPORTS_BASE_URL || 'https://v1.basketball.api-sports.io';
    this.timeout = 10000; // 10 seconds
    
    if (!this.apiKey) {
      console.warn('APISPORTS_KEY not configured. API calls will fail.');
    }

    // Create axios instance with default config
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: this.timeout,
      headers: {
        'x-apisports-key': this.apiKey,
        'Content-Type': 'application/json',
        'User-Agent': 'Neptune-Sportsbook/1.0'
      }
    });

    // Add request interceptor for logging
    this.client.interceptors.request.use(
      (config) => {
        console.log(`API-SPORTS Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('API-SPORTS Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => {
        console.log(`API-SPORTS Response: ${response.status} ${response.config.url}`);
        return response;
      },
      (error) => {
        console.error('API-SPORTS Response Error:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          url: error.config?.url,
          message: error.message
        });
        return Promise.reject(this.handleAPIError(error));
      }
    );
  }

  // Handle API errors and convert to standardized format
  handleAPIError(error) {
    if (error.response) {
      // API returned an error response
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          return new Error('API-SPORTS: Invalid API key');
        case 403:
          return new Error('API-SPORTS: Access forbidden - check API key permissions');
        case 429:
          return new Error('API-SPORTS: Rate limit exceeded - too many requests');
        case 500:
          return new Error('API-SPORTS: Internal server error');
        default:
          return new Error(`API-SPORTS: HTTP ${status} - ${data?.message || 'Unknown error'}`);
      }
    } else if (error.request) {
      // Network error
      return new Error('API-SPORTS: Network error - unable to reach API');
    } else {
      // Other error
      return new Error(`API-SPORTS: ${error.message}`);
    }
  }

  // Search for players by name
  async searchPlayers(name, league = 'NBA', season = '2024') {
    try {
      const response = await this.client.get('/players', {
        params: {
          search: name,
          league: league,
          season: season
        }
      });

      return {
        success: true,
        data: response.data.response || [],
        meta: {
          source: 'API-SPORTS.io',
          timestamp: new Date().toISOString(),
          query: { name, league, season }
        }
      };
    } catch (error) {
      console.error('Error searching players:', error);
      return {
        success: false,
        error: error.message,
        data: [],
        meta: {
          source: 'API-SPORTS.io',
          timestamp: new Date().toISOString(),
          query: { name, league, season }
        }
      };
    }
  }

  // Get player statistics for a specific season
  async getPlayerStats(playerId, league = 'NBA', season = '2024', lastN = null) {
    try {
      const params = {
        id: playerId,
        league: league,
        season: season
      };

      const response = await this.client.get('/players/statistics', { params });

      let stats = response.data.response || [];
      
      // If lastN is specified, limit to last N games
      if (lastN && stats.length > lastN) {
        stats = stats.slice(-lastN);
      }

      return {
        success: true,
        data: stats,
        meta: {
          source: 'API-SPORTS.io',
          timestamp: new Date().toISOString(),
          query: { playerId, league, season, lastN }
        }
      };
    } catch (error) {
      console.error('Error getting player stats:', error);
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

  // Get games/fixtures for a league and season
  async getGames(league = 'NBA', season = '2024', date = null, teamId = null) {
    try {
      const params = {
        league: league,
        season: season
      };

      if (date) {
        params.date = date;
      }
      if (teamId) {
        params.team = teamId;
      }

      const response = await this.client.get('/games', { params });

      return {
        success: true,
        data: response.data.response || [],
        meta: {
          source: 'API-SPORTS.io',
          timestamp: new Date().toISOString(),
          query: { league, season, date, teamId }
        }
      };
    } catch (error) {
      console.error('Error getting games:', error);
      return {
        success: false,
        error: error.message,
        data: [],
        meta: {
          source: 'API-SPORTS.io',
          timestamp: new Date().toISOString(),
          query: { league, season, date, teamId }
        }
      };
    }
  }

  // Get team information
  async getTeams(league = 'NBA', season = '2024') {
    try {
      const response = await this.client.get('/teams', {
        params: {
          league: league,
          season: season
        }
      });

      return {
        success: true,
        data: response.data.response || [],
        meta: {
          source: 'API-SPORTS.io',
          timestamp: new Date().toISOString(),
          query: { league, season }
        }
      };
    } catch (error) {
      console.error('Error getting teams:', error);
      return {
        success: false,
        error: error.message,
        data: [],
        meta: {
          source: 'API-SPORTS.io',
          timestamp: new Date().toISOString(),
          query: { league, season }
        }
      };
    }
  }

  // Health check method
  async healthCheck() {
    try {
      const response = await this.client.get('/status');
      return {
        success: true,
        status: 'healthy',
        data: response.data,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        success: false,
        status: 'unhealthy',
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }
}

// Export singleton instance
module.exports = new APISportsClient();
