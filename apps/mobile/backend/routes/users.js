const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');

// @route   POST /api/users
// @desc    Create or update user
// @access  Public (but requires Firebase UID)
router.post('/', async (req, res) => {
  console.log('Received user creation request:', req.body.email);
  
  try {
    const { 
      firebaseUid, 
      email, 
      username, 
      fullName, 
      phoneNumber, 
      country, 
      dateOfBirth, 
      joinDate 
    } = req.body;

    // Validate required fields
    if (!firebaseUid || !email || !username) {
      console.log('Missing required fields:', { firebaseUid, email, username });
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if user exists
    let user = await User.findOne({ firebaseUid });
    console.log('Existing user check:', user ? 'Found' : 'Not found');

    if (user) {
      // Update existing user
      console.log('Updating existing user:', email);
      user = await User.findOneAndUpdate(
        { firebaseUid },
        { 
          $set: { 
            email, 
            username, 
            fullName, 
            phoneNumber, 
            country, 
            dateOfBirth, 
            joinDate,
            lastUpdated: new Date()
          } 
        },
        { new: true }
      );
    } else {
      // Create new user
      console.log('Creating new user:', email);
      user = new User({
        firebaseUid,
        email,
        username,
        fullName,
        phoneNumber,
        country,
        dateOfBirth,
        joinDate,
        // Add a temporary password for MongoDB schema validation
        password: await bcrypt.hash(Math.random().toString(36), 10)
      });

      await user.save();
      console.log('User saved successfully with ID:', user._id);
    }

    res.json(user);
  } catch (err) {
    console.error('Error creating/updating user:', err.message);
    if (err.code === 11000) {
      console.error('Duplicate key error:', err);
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/users/:firebaseUid
// @desc    Get user by Firebase UID
// @access  Public (but requires Firebase UID)
router.get('/:firebaseUid', async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.params.firebaseUid });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add this route for testing
router.post('/test-create', async (req, res) => {
  try {
    const testUser = new User({
      firebaseUid: 'test-' + Date.now(),
      email: `test${Date.now()}@example.com`,
      username: `testuser${Date.now()}`,
      fullName: 'Test User',
      phoneNumber: '123-456-7890',
      country: 'Test Country',
      dateOfBirth: '01/01/1990',
      joinDate: new Date().toISOString(),
      password: 'password123'
    });
    
    await testUser.save();
    res.json({ 
      success: true, 
      message: 'Test user created successfully',
      user: testUser
    });
  } catch (err) {
    console.error('Test user creation error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 