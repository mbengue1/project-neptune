const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { chatWithAI } = require('../services/aiService');
const authenticateToken = require('../middleware/auth');

// Rate limiting for AI chat
const aiChatLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.AI_CHAT_RATE_LIMIT) || 50, // limit each IP to 50 requests per windowMs
  message: 'Too many AI chat requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// AI Chat endpoint (temporarily without auth for testing)
router.post('/chat', aiChatLimiter, async (req, res) => {
  try {
    const { message, context = {} } = req.body;
    const userId = req.user?.id || 'demo-user';

    if (!message || message.trim().length === 0) {
      return res.status(400).json({ 
        error: 'Message is required',
        code: 'MISSING_MESSAGE'
      });
    }

    if (message.length > 1000) {
      return res.status(400).json({ 
        error: 'Message too long (max 1000 characters)',
        code: 'MESSAGE_TOO_LONG'
      });
    }

    console.log(`AI Chat request from user ${userId}: ${message}`);

    const response = await chatWithAI(message, context, userId);

    res.json({
      success: true,
      response: response.content,
      sources: response.sources,
      timestamp: new Date().toISOString(),
      model: response.model,
      confidence: response.confidence
    });

  } catch (error) {
    console.error('AI Chat error:', error);
    
    // Handle different types of errors
    if (error.code === 'RATE_LIMIT_EXCEEDED') {
      return res.status(429).json({ 
        error: 'Rate limit exceeded. Please try again later.',
        code: 'RATE_LIMIT_EXCEEDED'
      });
    }
    
    if (error.code === 'OPENAI_ERROR') {
      return res.status(503).json({ 
        error: 'AI service temporarily unavailable. Please try again later.',
        code: 'AI_SERVICE_UNAVAILABLE'
      });
    }

    res.status(500).json({ 
      error: 'Internal server error',
      code: 'INTERNAL_ERROR'
    });
  }
});

// Get AI chat history for a user (temporarily without auth for testing)
router.get('/chat/history', async (req, res) => {
  try {
    const userId = req.user?.id || 'demo-user';
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;

    // TODO: Implement chat history retrieval from database
    // For now, return empty array
    res.json({
      success: true,
      history: [],
      pagination: {
        limit,
        offset,
        total: 0
      }
    });

  } catch (error) {
    console.error('Chat history error:', error);
    res.status(500).json({ 
      error: 'Failed to retrieve chat history',
      code: 'HISTORY_ERROR'
    });
  }
});

// Health check for AI services
router.get('/health', async (req, res) => {
  try {
    // TODO: Add health checks for OpenAI, Redis, etc.
    res.json({
      success: true,
      services: {
        openai: 'healthy',
        redis: 'healthy',
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      error: 'AI services unhealthy',
      services: {
        openai: 'unhealthy',
        redis: 'unhealthy'
      }
    });
  }
});

module.exports = router;
