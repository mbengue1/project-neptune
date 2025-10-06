const mongoose = require('mongoose');

const checkMongoConnection = async () => {
  if (mongoose.connection.readyState !== 1) {
    console.log('MongoDB not connected. Current state:', mongoose.connection.readyState);
    return false;
  }
  
  try {
    // Try a simple operation to verify connection
    await mongoose.connection.db.admin().ping();
    console.log('MongoDB connection verified');
    return true;
  } catch (err) {
    console.error('MongoDB connection check failed:', err);
    return false;
  }
};

module.exports = { checkMongoConnection }; 