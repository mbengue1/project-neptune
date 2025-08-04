# Neptune Sportsbook - AI-Enhanced Sports Betting Platform

A modern, AI-powered sports betting application built with React Native and real-time odds integration. Our platform combines live sports data with intelligent insights to help users make informed betting decisions.

> **Current Status:** MVP with real-time odds integration and mock betting flow
> **Next Phase:** AI chat assistant and Machine Learning Model Integration with advanced analytics

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Current Features](#current-features)
4. [Project Structure](#project-structure)
5. [Setup Instructions](#setup-instructions)
6. [Development Guidelines](#development-guidelines)
7. [API Integration](#api-integration)
8. [Roadmap](#roadmap)
9. [Contributing](#contributing)

---

## Project Overview

Neptune Sportsbook is designed to be the next generation of sports betting platforms, combining:

- **Real-time odds** from professional sports APIs
- **AI-powered insights** and statistical analysis
- **Intelligent chat assistant** for sports data queries
- **Responsive mobile experience** with React Native
- **Machine Learning Model** for comm
- **Secure user management** with Firebase authentication Inprogres

Our goal is to provide users with comprehensive sports data, intelligent recommendations, and a seamless betting experience that goes beyond traditional sportsbooks.

---

## Tech Stack

### Frontend
- **React Native** - Cross-platform mobile development
- **TypeScript** - Type safety and better developer experience
- **Expo** - Development tools and deployment platform
- **React Navigation** - Screen navigation and routing

### Backend & APIs
- **Node.js/Express** - REST API server
- **MongoDB** - User data and session management
- **Firebase** - Authentication and real-time features
- **The Odds API** - Live sports odds and data

### State Management
- **React Context** - Global state management
- **Custom Hooks** - Reusable data fetching logic
- **AsyncStorage** - Local data persistence

### Development Tools
- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting
- **Git** - Version control with conventional commits

---

## Current Features

### ✅ Implemented
- **Real-time odds integration** with The Odds API
- **Multi-sport support** (Soccer, Football, Basketball, Hockey, Tennis)
- **User authentication** with Firebase
- **Bet selection and management** system
- **Responsive UI** with modern design
- **Fallback to mock data** when API is unavailable
- **Environment variable** configuration for API keys

### 🚧 In Development
- **AI chat assistant** for sports insights
- **Advanced statistics** and analytics
- **Real-time score updates**
- **Payment integration**

---

## Project Structure

```
apps/mobile/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── MatchList/      # Sports match display
│   │   ├── BetSlip/        # Betting interface
│   │   └── Header/         # Navigation components
│   ├── screens/            # Main app screens
│   │   ├── MainScreen/     # Home screen with sports
│   │   ├── ProfileScreen/  # User profile management
│   │   └── BetsScreen/     # Betting history
│   ├── services/           # API and external services
│   │   └── oddsApi.ts      # The Odds API integration
│   ├── hooks/              # Custom React hooks
│   │   └── useOddsApi.ts   # Sports data fetching
│   ├── contexts/           # Global state management
│   │   └── SportsDataContext.tsx
│   ├── features/           # Feature-specific code
│   │   ├── auth/          # Authentication
│   │   └── betting/       # Betting logic
│   ├── data/              # Mock data and types
│   │   └── sportsData/    # Sport-specific mock data
│   └── themes/            # Styling and design system
├── backend/               # Express.js API server
│   ├── routes/           # API endpoints
│   ├── models/           # Database models
│   └── middleware/       # Authentication middleware
└── assets/               # Images, fonts, and static files
```

---

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- MongoDB (for backend)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Project_Neptune
   ```

2. **Install dependencies**
   ```bash
   cd apps/mobile
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the `apps/mobile` directory:
   ```bash
   # The Odds API Configuration
   ODDS_API_KEY=your_api_key_here
   ODDS_API_BASE_URL=https://api.the-odds-api.com/v4
   
   # Firebase Configuration (if needed)
   EXPO_PUBLIC_FIREBASE_API_KEY=your_firebase_key
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   ```

4. **Start the backend server**
   ```bash
   cd backend
   npm install
   npm start
   ```

5. **Start the mobile app**
   ```bash
   cd apps/mobile
   npm start
   ```

6. **Run on device/simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app

### API Keys Required
- **The Odds API**: Get your free API key from [the-odds-api.com](https://the-odds-api.com)
- **Firebase**: Create a project at [firebase.google.com](https://firebase.google.com)

---

## Development Guidelines

### Code Style
- Use **TypeScript** for all new code
- Follow **conventional commits** format
- Use **functional components** with hooks
- Implement **proper error handling**

### Commit Message Format
```bash
git commit -m "feat: add new betting feature"
git commit -m "fix: resolve API integration issue"
git commit -m "docs: update setup instructions"
```

### Data Flow
1. **API Service** (`oddsApi.ts`) fetches data from The Odds API
2. **Custom Hooks** (`useOddsApi.ts`) manage data state and caching
3. **Context** (`SportsDataContext.tsx`) provides data to components
4. **Components** display data with proper loading states

### Error Handling
- **API failures** fall back to mock data
- **Network issues** show user-friendly messages
- **Loading states** provide feedback during data fetching

---

## API Integration

### The Odds API
We integrate with [The Odds API](https://the-odds-api.com) for real-time sports data:

- **Live odds** for multiple sports and bookmakers
- **Upcoming events** with detailed match information
- **Score updates** for completed games
- **Multiple markets** (moneyline, spreads, totals)

### Data Mapping
We map API responses to our internal data structure:
```typescript
interface MatchType {
  id: string;
  league: string;
  date: string;
  homeTeam: { name: string; odds: string };
  awayTeam: { name: string; odds: string };
  tieOdds?: string;
}
```

### ML Data Sources (Future)
- **Historical Odds Data**: Past betting lines and outcomes
- **Team Performance Metrics**: Win/loss records, scoring averages, defensive stats
- **Player Statistics**: Individual performance data, injury reports
- **Weather Data**: Impact on outdoor sports performance
- **Market Movement**: How odds change leading up to games
- **User Betting Patterns**: Anonymous betting behavior analysis

### Supported Sports
- **Soccer**: Premier League, La Liga, Serie A, Bundesliga
- **Football**: NFL, NCAA Football
- **Basketball**: NBA, NCAA Basketball
- **Hockey**: NHL
- **Tennis**: ATP, WTA

### Future ML Infrastructure
- **Data Pipeline**: Historical odds, team statistics, player performance data
- **Model Training**: Python-based ML models with TensorFlow/PyTorch
- **Real-time Inference**: API endpoints for live bet recommendations
- **Model Monitoring**: Track prediction accuracy and model performance
- **A/B Testing**: Compare different ML models for optimal recommendations

---

## Roadmap

### Phase 1: Core Platform (Current)
- ✅ Real-time odds integration
- ✅ User authentication
- ✅ Basic betting interface
- ✅ Multi-sport support

### Phase 2: AI Enhancement (Next)
- 🤖 **AI Chat Assistant**
  - Natural language queries about sports data
  - Statistical analysis and insights
  - Personalized recommendations
  - Historical performance analysis

- 📊 **Advanced Analytics**
  - Team and player statistics
  - Head-to-head analysis
  - Trend identification
  - Risk assessment tools

- 🧠 **Machine Learning Bet Recommendations**
  - **Smart Bet Suggestions**: ML models analyze historical data to suggest optimal bets
  - **Value Bet Detection**: Identify when bookmaker odds are favorable vs. statistical probability
  - **Risk Assessment**: Calculate bet risk levels based on team performance, injuries, and trends
  - **Popular Bet Analysis**: Track and analyze most common bets and their success rates
  - **Personalized Recommendations**: Learn from user betting history to suggest relevant bets
  - **Live Model Updates**: Continuously update predictions based on real-time game data

### Phase 3: Advanced Features
- 💳 **Payment Integration**
  - Secure payment processing
  - Multiple payment methods
  - Transaction history

- 📱 **Enhanced Mobile Experience**
  - Push notifications for live events
  - Offline mode with cached data
  - Performance optimizations

### Phase 4: Scale & Polish
- 🚀 **Production Deployment**
  - Cloud infrastructure setup
  - Monitoring and analytics
  - Performance optimization

- 🔒 **Security & Compliance**
  - Advanced security measures
  - Regulatory compliance
  - Data protection

---

## Contributing

### Getting Started
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Development Workflow
1. **Plan**: Create an issue describing the feature/fix
2. **Code**: Implement with proper testing
3. **Review**: Self-review before submitting PR
4. **Test**: Ensure all features work as expected
5. **Document**: Update documentation if needed

### Code Review Guidelines
- **Functionality**: Does the code work as intended?
- **Performance**: Are there any performance implications?
- **Security**: Are there any security concerns?
- **Maintainability**: Is the code easy to understand and maintain?

---

## Support & Resources

- **API Documentation**: [The Odds API Docs](https://the-odds-api.com/docs)
- **React Native**: [Official Documentation](https://reactnative.dev)
- **Expo**: [Development Tools](https://docs.expo.dev)
- **Firebase**: [Authentication Guide](https://firebase.google.com/docs/auth)

---

## Mouhamed Mbengue
