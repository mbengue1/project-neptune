# Neptune — Social Intelligence-Forward Sportsbook

> A modern, AI-powered sports betting platform combining live odds, seamless betting, event chat, public bet sharing with leaderboards, and in-app AI assistance.

[![License: UNLICENSED](https://img.shields.io/badge/license-UNLICENSED-red.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/typescript-%5E5.4.5-blue.svg)](https://www.typescriptlang.org/)

---

## 🎯 Vision

Neptune is designed to be the next generation of sports betting platforms:

- **💰 Money safety first**: Double-entry ledger, idempotent operations, atomic settlements
- **⚡ Fast & scalable**: Redis-backed reads, event-driven architecture, horizontal scaling
- **🔒 Privacy-first social**: Public profiles opt-in, stake redaction, configurable delays
- **📊 Built-in observability**: OTel tracing, metrics, structured logs, SLOs
- **🏗️ Evolve gracefully**: Modular monolith → microservices when needed

---

## 📁 Repository Structure

This is a **monorepo** organized as a **modular monolith with clear service boundaries**, designed to split into independent microservices as traffic and team size grow.

```
project-neptune/
├── apps/                          # Client applications
│   └── mobile/                    # React Native mobile app (iOS/Android)
│
├── services/                      # Backend services (modular monolith)
│   ├── api/                       # Main API gateway (Node/TypeScript)
│   ├── ingestion/                 # Market data ingestion worker
│   ├── settlement/                # Settlement worker (future)
│   └── chat-gateway/              # WebSocket chat gateway (future)
│
├── packages/                      # Shared packages
│   ├── types/                     # Shared TypeScript types & interfaces
│   ├── domain/                    # Domain validators & schemas (Zod)
│   ├── cache/                     # Shared cache utilities (Redis)
│   └── ui/                        # Shared UI primitives (future)
│
├── infra/                         # Infrastructure & deployment
│   ├── docker/                    # Dockerfiles & docker-compose
│   ├── terraform/                 # Infrastructure as Code (future)
│   └── local/                     # Local dev helpers & seed scripts
│
├── docs/                          # System design documentation
│   ├── 00-project-overview.md
│   ├── 10-architecture-overview.md
│   ├── 20-datastores-and-modeling.md
│   ├── 30-apis-and-contracts.md
│   ├── ...
│   └── 170-recommendations-and-tradeoffs.md
│
├── ops/                           # Operational documentation
│   └── runbooks/                  # Incident response runbooks
│
├── _misc/                         # Items needing review
│   └── mobile-backup-*/           # Backup folders
│
├── tsconfig.base.json             # Root TypeScript configuration
├── package.json                   # Root workspace configuration
├── pnpm-workspace.yaml            # PNPM workspace definition
└── plan.md                        # Restructuring plan & mapping
```

---

## 🏗️ Architecture Overview

### Deployment Stance

- **Now**: Modular monolith with clear bounded contexts
- **Later**: Split into independent services when metrics demand:
  - Market Data Ingestion
  - Chat Gateway (WebSocket)
  - Settlement Worker
  - Payments Webhook Processor

### Bounded Contexts

| Context | Responsibility |
|---------|---------------|
| **Market Data** | Odds/events normalization, Redis cache, WS publish |
| **Betting** | Slip validation, SGP constraints, idempotent bet creation |
| **Wallet & Ledger** | Double-entry accounting, holds, credits/debits |
| **Settlement** | Result resolution, atomic settlement transactions |
| **Social** | Public profiles, bets feed, follow graph, leaderboards |
| **Chat** | Event rooms, presence, moderation, trending |
| **AI & ML** | RAG-based chat, recommendation inference |
| **Admin/Trading** | Exposure monitoring, market suspensions, audits |

### Technology Stack

- **Frontend**: React Native (Expo), TypeScript
- **Backend**: Node.js/Express, TypeScript/JavaScript
- **Databases**: PostgreSQL (transactional truth), Redis (cache/presence)
- **Storage**: S3/GCS (audit logs, snapshots)
- **Events**: SQS/SNS (outbox pattern) → Kafka (later)
- **Observability**: OTel Collector, CloudWatch, Prometheus/Grafana

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 16.0.0
- **npm** >= 8.0.0 (or **pnpm** recommended)
- **Docker** & Docker Compose (for local services)
- **Expo CLI** (for mobile development)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/project-neptune.git
cd project-neptune

# Install dependencies (using pnpm workspaces)
pnpm install

# Or using npm
npm install
```

### Local Development

#### 1. Start Infrastructure Services

```bash
cd infra/docker
docker-compose up -d
```

This starts:
- PostgreSQL on `localhost:5432`
- Redis on `localhost:6379`
- API service on `localhost:3000`
- Ingestion worker

#### 2. Run Mobile App

```bash
cd apps/mobile
npm start

# Press 'i' for iOS simulator
# Press 'a' for Android emulator
# Scan QR code with Expo Go app
```

#### 3. Run API Service (standalone)

```bash
cd services/api
npm install
npm start
```

### Environment Variables

Create `.env` files in each service directory:

**services/api/.env**:
```bash
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://neptune:neptune_dev_password@localhost:5432/neptune
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret
ODDS_API_KEY=your_odds_api_key
```

**apps/mobile/.env**:
```bash
EXPO_PUBLIC_API_URL=http://localhost:3000
EXPO_PUBLIC_WS_URL=ws://localhost:3000
ODDS_API_KEY=your_api_key_here
EXPO_PUBLIC_FIREBASE_API_KEY=your_firebase_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
```

---

## 📚 Documentation

Comprehensive system design documentation is available in the [`docs/`](./docs/) directory:

### Core Documentation

- [**00 - Project Overview**](./docs/00-project-overview.md) - Vision, tenets, personas, MVP scope
- [**10 - Architecture Overview**](./docs/10-architecture-overview.md) - High-level architecture, service boundaries
- [**20 - Datastores & Modeling**](./docs/20-datastores-and-modeling.md) - Database schemas, Redis patterns
- [**30 - APIs & Contracts**](./docs/30-apis-and-contracts.md) - REST/WebSocket API specifications
- [**40 - Odds Ingestion**](./docs/40-odds-ingestion-and-caching.md) - Market data pipeline
- [**50 - Betting & Settlement**](./docs/50-bet-placement-and-settlement.md) - Bet placement flows
- [**60 - Payments**](./docs/60-payments.md) - Payment integration (Stripe)
- [**70 - Social & Leaderboards**](./docs/70-social-public-bets-and-leaderboards.md) - Social features
- [**80 - Chat & Trending**](./docs/80-chat-and-trending.md) - Chat architecture
- [**90 - AI & ML**](./docs/90-ai-and-ml.md) - AI chat (RAG) and ML recommendations

### Operations

- [**100 - Observability & SLOs**](./docs/100-observability-and-slos.md) - Metrics, tracing, logging
- [**110 - Security & Privacy**](./docs/110-security-and-privacy.md) - Auth, secrets, data protection
- [**120 - Scaling & Capacity**](./docs/120-scaling-and-capacity-planning.md) - Scaling strategies
- [**130 - Deployment & Operations**](./docs/130-deployment-and-operations.md) - CI/CD, environments
- [**140 - Testing & Quality**](./docs/140-testing-and-quality.md) - Testing strategy
- [**150 - Runbooks**](./docs/150-runbooks.md) - Operational runbooks index
- [**160 - Roadmap**](./docs/160-roadmap.md) - Product roadmap
- [**170 - Recommendations**](./docs/170-recommendations-and-tradeoffs.md) - Design decisions

### Runbooks

Operational runbooks for incident response:

- [Price Drift / Odds Stale](./ops/runbooks/price-drift.md)
- [Redis Outage](./ops/runbooks/redis-outage.md)
- [Payments Webhook Delay](./ops/runbooks/payments-webhook-delay.md)
- [Chat Flooding/Abuse](./ops/runbooks/chat-flooding.md)

### Additional Resources

- [**AI Page Design**](./docs/ai-page-design.md) - AI page specification
- [**Architecture Reference**](./docs/architecture-reference.md) - Microservices reference doc
- [**Restructuring Plan**](./plan.md) - Repository restructuring details

---

## 🛠️ Development Workflow

### Monorepo Commands

```bash
# Typecheck all packages
npm run typecheck

# Start mobile app
npm run mobile

# Start API service
npm run api

# Start ingestion worker
npm run ingestion

# Clean all node_modules
npm run clean
```

### Working with Packages

Shared packages can be imported using path aliases:

```typescript
// Import shared types
import { MatchType, BetType } from '@neptune/types';

// Import domain validators
import { validateBet } from '@neptune/domain';

// Import cache utilities
import { cacheService } from '@neptune/cache';
```

### Code Style

- Use **TypeScript** for all new code
- Follow **conventional commits** format
- Use **functional components** with hooks
- Implement **proper error handling**

### Commit Message Format

```bash
git commit -m "feat(api): add bet placement endpoint"
git commit -m "fix(mobile): resolve odds display issue"
git commit -m "docs: update architecture overview"
git commit -m "chore(infra): update docker-compose"
```

---

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e
```

---

## 🚢 Deployment

### Development

```bash
cd infra/docker
docker-compose up -d
```

### Production

```bash
cd infra/docker
docker-compose -f docker-compose.prod.yml up -d
```

### Cloud Deployment (Future)

```bash
cd infra/terraform/environments/prod
terraform init
terraform apply
```

---

## 🗺️ Roadmap

### Phase 1: Foundations ✅
- Schemas + idempotent bets & settlement
- Redis odds cache
- Outbox events
- CI/CD & observability baseline

### Phase 2: Realtime & Social 🚧
- WebSocket fanout
- Chat rooms + trending
- Public bets, follows, leaderboards

### Phase 3: Payments & Ops
- Stripe deposits/withdrawals
- Admin/trading tools
- Exposure limits

### Phase 4: Intelligence
- AI chat (RAG) hardening
- ML recommendations MVP
- Analytics pipeline

### Phase 5: Scale & Services
- Split services (Ingestion, Chat, Settlement)
- Kafka event bus
- Multi-region prep

---

## 🤝 Contributing

### Getting Started

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Development Guidelines

- **Plan**: Create an issue describing the feature/fix
- **Code**: Implement with proper testing
- **Review**: Self-review before submitting PR
- **Test**: Ensure all features work as expected
- **Document**: Update documentation if needed

---

## 📄 License

This project is proprietary and unlicensed. All rights reserved.

---

## 👥 Team

**Neptune Engineering Team**

For questions or support, contact: [support@neptune.example.com](mailto:support@neptune.example.com)

---

## 🙏 Acknowledgments

- [The Odds API](https://the-odds-api.com) - Live sports odds data
- [OpenAI](https://openai.com) - AI chat assistance
- React Native & Expo communities

---

_Last updated: October 6, 2025_