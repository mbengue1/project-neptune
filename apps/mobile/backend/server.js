const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware setup
app.use(cors({
  origin: '*', // Allow all origins during development
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON request body
app.use(express.json());



// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => {
    console.error('MongoDB Connection Error:', err);
    process.exit(1); // Exit with failure
  });

// Define routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/status', require('./routes/status'));

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Neptune Sportsbook API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Add this near the top of your server.js to check ports
const PORT = process.env.PORT || 3000;
console.log(`Server attempting to start on port ${PORT}`);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on:`);
  console.log(`- http://localhost:${PORT}`);
  console.log(`- http://${require('os').hostname()}:${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please try another port.`);
  } else {
    console.error('Server error:', err);
  }
});