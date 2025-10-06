const OpenAI = require('openai');
const { getPlayerStats, getGameOdds, getInjuryReport, getTeamStats, getTrendingPlayers } = require('./sportsDataService');
const { getCachedData, setCachedData } = require('../../../../packages/cache/src/cacheService');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// System prompt for the AI assistant
const SYSTEM_PROMPT = `You are Neptune AI, an intelligent sports betting assistant for the Neptune Sportsbook platform. 

CORE PRINCIPLES:
1. NEVER guarantee outcomes or promise wins
2. Always use language like "edge," "lean," "confidence," "probability"
3. Cite all data sources with timestamps
4. Provide explainable insights based on data
5. Be helpful but responsible about gambling

AVAILABLE TOOLS:
- getPlayerStats(playerName, league, window) - Get player performance data
- getGameOdds(gameId, book) - Get current betting lines
- getInjuryReport(playerName, league) - Get injury status
- getTeamStats(teamName, league) - Get team performance data
- getTrendingPlayers(league, metric, window) - Get trending players

RESPONSE FORMAT:
- Write in clean, conversational text (NO markdown formatting like ##, **, etc.)
- Use simple bullet points with • instead of markdown lists
- Write as if speaking directly to the user
- Always provide data sources and timestamps
- Include confidence levels (low/medium/high)
- Explain your reasoning in plain language
- Suggest responsible betting practices

IMPORTANT: Your responses will be displayed in a mobile chat interface. Keep formatting clean and user-friendly. No markdown syntax, no code blocks, no special formatting characters.

Remember: You are providing insights, not guarantees. Always emphasize responsible gambling.`;

// Available tools for the AI
const AVAILABLE_TOOLS = [
  {
    type: "function",
    function: {
      name: "getPlayerStats",
      description: "Get player performance statistics over a specified time window",
      parameters: {
        type: "object",
        properties: {
          playerName: {
            type: "string",
            description: "Name of the player"
          },
          league: {
            type: "string",
            enum: ["NBA", "NFL", "MLB", "NHL", "SOCCER"],
            description: "Sports league"
          },
          window: {
            type: "integer",
            description: "Number of recent games to analyze (default: 10)"
          }
        },
        required: ["playerName", "league"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "getGameOdds",
      description: "Get current betting odds for a specific game",
      parameters: {
        type: "object",
        properties: {
          gameId: {
            type: "string",
            description: "Unique identifier for the game"
          },
          book: {
            type: "string",
            description: "Sportsbook name (e.g., 'draftkings', 'fanduel')"
          }
        },
        required: ["gameId"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "getInjuryReport",
      description: "Get injury status for a player",
      parameters: {
        type: "object",
        properties: {
          playerName: {
            type: "string",
            description: "Name of the player"
          },
          league: {
            type: "string",
            enum: ["NBA", "NFL", "MLB", "NHL", "SOCCER"],
            description: "Sports league"
          }
        },
        required: ["playerName", "league"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "getTeamStats",
      description: "Get team performance statistics",
      parameters: {
        type: "object",
        properties: {
          teamName: {
            type: "string",
            description: "Name of the team"
          },
          league: {
            type: "string",
            enum: ["NBA", "NFL", "MLB", "NHL", "SOCCER"],
            description: "Sports league"
          }
        },
        required: ["teamName", "league"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "getTrendingPlayers",
      description: "Get players trending in specific metrics",
      parameters: {
        type: "object",
        properties: {
          league: {
            type: "string",
            enum: ["NBA", "NFL", "MLB", "NHL", "SOCCER"],
            description: "Sports league"
          },
          metric: {
            type: "string",
            description: "Metric to analyze (e.g., 'points', 'rebounds', 'assists')"
          },
          window: {
            type: "integer",
            description: "Number of recent games to analyze (default: 10)"
          }
        },
        required: ["league"]
      }
    }
  }
];

// Tool execution functions
const executeTool = async (toolName, args) => {
  try {
    console.log(`🔧 [AI-SERVICE] Executing tool: ${toolName} with args:`, args);
    
    let result;
    switch (toolName) {
      case 'getPlayerStats':
        result = await getPlayerStats(args.playerName, args.league, args.window || 10);
        break;
      
      case 'getGameOdds':
        result = await getGameOdds(args.gameId, args.book);
        break;
      
      case 'getInjuryReport':
        result = await getInjuryReport(args.playerName, args.league);
        break;
      
      case 'getTeamStats':
        result = await getTeamStats(args.teamName, args.league);
        break;
      
      case 'getTrendingPlayers':
        result = await getTrendingPlayers(args.league, args.metric, args.window || 10);
        break;
      
      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
    
    // Log the data source
    if (result && result.source) {
      if (result.source === 'API-SPORTS.io') {
        console.log(`✅ [AI-SERVICE] Tool ${toolName} returned REAL API data from ${result.source}`);
      } else if (result.source.includes('Mock')) {
        console.log(`🎭 [AI-SERVICE] Tool ${toolName} returned MOCK data: ${result.source}`);
      } else {
        console.log(`📊 [AI-SERVICE] Tool ${toolName} returned data from: ${result.source}`);
      }
    }
    
    return result;
    
  } catch (error) {
    console.error(`❌ [AI-SERVICE] Tool execution error for ${toolName}:`, error);
    return {
      error: `Failed to execute ${toolName}`,
      details: error.message
    };
  }
};

// Main chat function
const chatWithAI = async (message, context = {}, userId) => {
  try {
    // Check if we have OpenAI API key
    if (!process.env.OPENAI_API_KEY) {
      // Return a helpful message when API key is not configured
      return {
        content: "Hi! I'm Neptune AI, your sports betting assistant! 🏀⚽🏈\n\nI'm currently in development mode. To enable full AI capabilities, please configure your OpenAI API key.\n\nFor now, I can help you with:\n• Basic sports information\n• General betting guidance\n• App navigation help\n\nWhat would you like to know about sports betting?",
        sources: [],
        model: 'Neptune AI (Demo Mode)',
        confidence: 'medium',
        toolCalls: 0
      };
    }

    // Create the conversation messages
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: message }
    ];

    // Add context if provided
    if (context.previousMessages && context.previousMessages.length > 0) {
      // Add recent conversation history (limit to last 5 messages to avoid token limits)
      const recentHistory = context.previousMessages.slice(-5);
      messages.splice(1, 0, ...recentHistory);
    }

    console.log(`Sending request to OpenAI for user ${userId}`);

    // Make the API call with tool calling
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: messages,
      tools: AVAILABLE_TOOLS,
      tool_choice: "auto",
      max_tokens: parseInt(process.env.AI_MAX_TOKENS) || 2000,
      temperature: 0.7,
    });

    const responseMessage = completion.choices[0].message;
    
    // If the AI wants to use tools, execute them
    if (responseMessage.tool_calls && responseMessage.tool_calls.length > 0) {
      console.log(`AI requested ${responseMessage.tool_calls.length} tool calls`);
      
      // Execute all tool calls
      const toolResults = await Promise.all(
        responseMessage.tool_calls.map(async (toolCall) => {
          const toolName = toolCall.function.name;
          const toolArgs = JSON.parse(toolCall.function.arguments);
          
          console.log(`Executing tool: ${toolName} with args:`, toolArgs);
          
          const result = await executeTool(toolName, toolArgs);
          
          return {
            tool_call_id: toolCall.id,
            role: "tool",
            name: toolName,
            content: JSON.stringify(result)
          };
        })
      );

      // Add tool results to messages and get final response
      messages.push(responseMessage);
      messages.push(...toolResults);

      const finalCompletion = await openai.chat.completions.create({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        messages: messages,
        max_tokens: parseInt(process.env.AI_MAX_TOKENS) || 2000,
        temperature: 0.7,
      });

      const finalResponse = finalCompletion.choices[0].message;
      
      return {
        content: cleanResponse(finalResponse.content),
        sources: extractSources(toolResults),
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        confidence: calculateConfidence(toolResults),
        toolCalls: responseMessage.tool_calls.length
      };
    }

    // If no tools were called, return the direct response
    return {
      content: cleanResponse(responseMessage.content),
      sources: [],
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      confidence: "medium",
      toolCalls: 0
    };

  } catch (error) {
    console.error('AI Service error:', error);
    
    if (error.code === 'insufficient_quota') {
      throw new Error('OpenAI API quota exceeded');
    }
    
    if (error.code === 'rate_limit_exceeded') {
      throw new Error('OpenAI API rate limit exceeded');
    }
    
    throw new Error(`AI service error: ${error.message}`);
  }
};

// Clean response text to remove markdown formatting
const cleanResponse = (text) => {
  if (!text) return text;
  
  return text
    // Remove markdown headers
    .replace(/^#{1,6}\s+/gm, '')
    // Remove bold formatting
    .replace(/\*\*(.*?)\*\*/g, '$1')
    // Remove italic formatting
    .replace(/\*(.*?)\*/g, '$1')
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, '')
    // Remove inline code
    .replace(/`(.*?)`/g, '$1')
    // Remove markdown links but keep the text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Clean up extra whitespace
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .trim();
};

// Extract sources from tool results
const extractSources = (toolResults) => {
  const sources = [];
  toolResults.forEach(result => {
    if (result.content && !result.content.includes('error')) {
      sources.push({
        type: result.name,
        timestamp: new Date().toISOString(),
        data: JSON.parse(result.content)
      });
    }
  });
  return sources;
};

// Calculate confidence based on tool results
const calculateConfidence = (toolResults) => {
  if (toolResults.length === 0) return "low";
  
  const errorCount = toolResults.filter(result => 
    result.content && result.content.includes('error')
  ).length;
  
  const errorRate = errorCount / toolResults.length;
  
  if (errorRate === 0) return "high";
  if (errorRate < 0.3) return "medium";
  return "low";
};

module.exports = {
  chatWithAI,
  executeTool,
  AVAILABLE_TOOLS
};
