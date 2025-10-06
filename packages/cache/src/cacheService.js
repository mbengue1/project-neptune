const redis = require('redis');

// Redis client instance
let redisClient = null;

// Initialize Redis connection
const initializeRedis = async () => {
  try {
    if (redisClient) {
      return redisClient;
    }

    // If no Redis URL is configured, skip initialization
    if (!process.env.REDIS_URL) {
      console.log('Redis not configured, running without cache');
      return null;
    }

    const redisUrl = process.env.REDIS_URL;
    
    redisClient = redis.createClient({
      url: redisUrl,
      password: process.env.REDIS_PASSWORD || undefined,
      retry_strategy: (options) => {
        if (options.error && options.error.code === 'ECONNREFUSED') {
          console.error('Redis server connection refused');
          return new Error('Redis server connection refused');
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
          console.error('Redis retry time exhausted');
          return new Error('Retry time exhausted');
        }
        if (options.attempt > 10) {
          console.error('Redis max retry attempts reached');
          return undefined;
        }
        return Math.min(options.attempt * 100, 3000);
      }
    });

    redisClient.on('error', (err) => {
      console.error('Redis Client Error:', err);
    });

    redisClient.on('connect', () => {
      console.log('Redis Client Connected');
    });

    redisClient.on('ready', () => {
      console.log('Redis Client Ready');
    });

    redisClient.on('end', () => {
      console.log('Redis Client Disconnected');
    });

    await redisClient.connect();
    return redisClient;

  } catch (error) {
    console.error('Failed to initialize Redis:', error);
    // Return null to indicate Redis is not available
    return null;
  }
};

// Get data from cache
const getCachedData = async (key) => {
  try {
    const client = await initializeRedis();
    if (!client) {
      console.log('Redis not available, skipping cache');
      return null;
    }

    const data = await client.get(key);
    if (data) {
      return JSON.parse(data);
    }
    return null;

  } catch (error) {
    console.error('Error getting cached data:', error);
    return null;
  }
};

// Set data in cache
const setCachedData = async (key, data, ttlSeconds = 3600) => {
  try {
    const client = await initializeRedis();
    if (!client) {
      console.log('Redis not available, skipping cache');
      return false;
    }

    await client.setEx(key, ttlSeconds, JSON.stringify(data));
    return true;

  } catch (error) {
    console.error('Error setting cached data:', error);
    return false;
  }
};

// Delete data from cache
const deleteCachedData = async (key) => {
  try {
    const client = await initializeRedis();
    if (!client) {
      console.log('Redis not available, skipping cache');
      return false;
    }

    await client.del(key);
    return true;

  } catch (error) {
    console.error('Error deleting cached data:', error);
    return false;
  }
};

// Clear all cache (use with caution)
const clearAllCache = async () => {
  try {
    const client = await initializeRedis();
    if (!client) {
      console.log('Redis not available, skipping cache clear');
      return false;
    }

    await client.flushAll();
    return true;

  } catch (error) {
    console.error('Error clearing cache:', error);
    return false;
  }
};

// Get cache statistics
const getCacheStats = async () => {
  try {
    const client = await initializeRedis();
    if (!client) {
      return {
        connected: false,
        message: 'Redis not available'
      };
    }

    const info = await client.info('memory');
    const keyspace = await client.info('keyspace');
    
    return {
      connected: true,
      memory: info,
      keyspace: keyspace
    };

  } catch (error) {
    console.error('Error getting cache stats:', error);
    return {
      connected: false,
      error: error.message
    };
  }
};

// Close Redis connection
const closeRedisConnection = async () => {
  try {
    if (redisClient) {
      await redisClient.quit();
      redisClient = null;
      console.log('Redis connection closed');
    }
  } catch (error) {
    console.error('Error closing Redis connection:', error);
  }
};

module.exports = {
  initializeRedis,
  getCachedData,
  setCachedData,
  deleteCachedData,
  clearAllCache,
  getCacheStats,
  closeRedisConnection
};
