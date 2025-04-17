const express = require('express');
const router = express.Router();
const { checkMongoConnection } = require('../utils/dbCheck');
const mongoose = require('mongoose');
const User = require('../models/User');

router.get('/', async (req, res) => {
  const mongoStatus = await checkMongoConnection();
  
  res.json({
    status: 'online',
    mongodb: mongoStatus ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

router.get('/test-mongo', async (req, res) => {
  try {
    // Check connection
    const isConnected = mongoose.connection.readyState === 1;
    
    // Get database info
    const dbName = mongoose.connection.name;
    const collections = await mongoose.connection.db.listCollections().toArray();
    
    // Try to count users
    const userCount = await User.countDocuments();
    
    // Get connection details (sanitized)
    const connString = process.env.MONGODB_URI || 'Not set';
    const sanitizedConnString = connString.replace(/:([^:@]+)@/, ':****@');
    
    res.json({
      connected: isConnected,
      database: dbName,
      collections: collections.map(c => c.name),
      userCount,
      connectionString: sanitizedConnString
    });
  } catch (err) {
    console.error('MongoDB test error:', err);
    res.status(500).json({ 
      error: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
  }
});

module.exports = router; 