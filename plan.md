# Neptune Platform Restructuring Plan

**Date**: 2025-10-06  
**Type**: Documentation-Driven File Restructuring  
**Author**: Platform Engineering Team  

---

## 1. Architecture Understanding from neptune-docu.md

Based on comprehensive review of `neptune-docu.md`, here is the target architecture:

1. **Deployment Stance**: Start as a **modular monolith** with clear module boundaries; split into independent services (Ingestion, Chat Gateway, Settlement, Payments) only when load/team size demands it.

2. **Bounded Contexts**: Eight clear service responsibilities:
   - **Market Data**: Odds/events normalization, Redis cache, WebSocket publish
   - **Betting**: Slip validation, SGP constraints, price revalidation, idempotent bet creation
   - **Wallet & Ledger**: Double-entry accounting, holds, credits/debits, audits
   - **Settlement**: Result resolution, atomic release/credit operations
   - **Social**: Public profiles, public bets feed, follow graph, leaderboards
   - **Chat**: Event rooms, presence, moderation, trending highlights
   - **AI & ML**: RAG-based chat, recommendation inference
   - **Admin/Trading**: Exposure monitoring, market suspensions, overrides

3. **Datastore Choices**:
   - **PostgreSQL**: Source of truth for transactional/financial and social graph data (ACID, serializable transactions)
   - **Redis**: Hot odds cache (TTL + SWR), presence, rate limits, exposure aggregates
   - **Object Storage (S3/GCS)**: Append-only audit trail (odds snapshots, settlement logs)
   - **Event Bus (SQS/SNS → Kafka later)**: Domain events with outbox pattern

4. **API Design**:
   - **REST** for control plane with versioned endpoints (`Accept: application/vnd.neptune.v1+json`)
   - **WebSocket** for live odds updates and chat
   - **Idempotency-Key** header required for all mutations
   - Validation with Zod/TypeBox at boundaries

5. **Core Tenets**:
   - **Money safety first**: Double-entry ledger, atomic transactions, idempotent operations
   - **Fast reads, bounded writes**: Redis-backed reads, Postgres for transactional truth
   - **Privacy-first social**: Opt-in public profiles, stake redaction, live delay
   - **Built-in observability**: OTel tracing, structured logs, metrics, SLOs, runbooks

6. **Client Architecture**:
   - **Mobile-first**: React Native (iOS/Android)
   - **Web target**: Responsive web (later phase)
   - **Real-time**: WebSocket subscriptions for odds and chat

7. **Workers/Background Jobs**:
   - **Ingestion Worker**: Poll/stream vendor APIs, normalize, cache to Redis, publish events
   - **Settlement Worker**: Results ingestion, atomic settlement transactions
   - **Payments Webhook Processor**: Stripe webhooks, idempotent ledger updates

8. **Observability Stack**:
   - OTel Collector for distributed tracing
   - Metrics: bet success rates, Redis hit ratio, WS concurrency, settlement latency
   - Structured JSON logs with traceId correlation

9. **Scaling Strategy**:
   - Start with stateless API pods (HPA on CPU/RPS)
   - Redis primary/replica with circuit breakers
   - Postgres with read replicas, eventual sharding by `account_id`
   - Chat gateway sharding by `room_id` hash

10. **Security & Compliance**:
    - OIDC IdP (Firebase/Auth0/Cognito)
    - Secrets Manager for PSP keys and credentials
    - WAF, rate limits, CAPTCHA on abuse
    - Immutable audit logs with object lock

---

## 2. Old → New Path Mapping

### 2.1 Mobile Application

| Old Path | New Path | Rationale |
|----------|----------|-----------|
| `apps/mobile/` | `apps/mobile/` (stays) | Already correctly positioned; mobile app remains in apps/ |
| `apps/mobile/backend/` | → **SPLIT** (see services below) | Backend should not be nested inside mobile app |

### 2.2 Backend Services (splitting apps/mobile/backend/)

| Old Path | New Path | Bounded Context |
|----------|----------|-----------------|
| `apps/mobile/backend/routes/auth.js` | `services/api/src/routes/auth.js` | Auth & User Service |
| `apps/mobile/backend/routes/users.js` | `services/api/src/routes/users.js` | Auth & User Service |
| `apps/mobile/backend/routes/sportIntel.js` | `services/api/src/routes/sportIntel.js` | Market Data (API proxy) |
| `apps/mobile/backend/routes/ai.js` | `services/api/src/routes/ai.js` | AI & ML (API proxy) |
| `apps/mobile/backend/routes/status.js` | `services/api/src/routes/status.js` | Health checks |
| `apps/mobile/backend/middleware/auth.js` | `services/api/src/middleware/auth.js` | Auth middleware |
| `apps/mobile/backend/models/User.js` | `services/api/src/models/User.js` | User domain model |
| `apps/mobile/backend/services/aiService.js` | `services/api/src/services/aiService.js` | AI service adapter |
| `apps/mobile/backend/services/apiSportsClient.js` | `services/ingestion/src/clients/apiSportsClient.js` | Ingestion worker client |
| `apps/mobile/backend/services/cacheService.js` | `packages/cache/src/cacheService.js` | Shared cache utility |
| `apps/mobile/backend/services/sportIntelService.js` | `services/api/src/services/sportIntelService.js` | Sports intel service |
| `apps/mobile/backend/services/sportsDataService.js` | `services/api/src/services/sportsDataService.js` | Sports data service |
| `apps/mobile/backend/utils/dbCheck.js` | `services/api/src/utils/dbCheck.js` | Database utility |
| `apps/mobile/backend/server.js` | `services/api/src/server.js` | Main API server |
| `apps/mobile/backend/package.json` | `services/api/package.json` | API service package |
| `apps/mobile/backend/API_RESEARCH_PLAN.md` | `docs/research/api-research-plan.md` | Research documentation |

### 2.3 Shared Packages (extracting from mobile/src)

| Old Path | New Path | Purpose |
|----------|----------|---------|
| `apps/mobile/src/types/` | `packages/types/src/` | Shared TypeScript types & interfaces |
| `apps/mobile/src/data/sportsBettingTypes.ts` | `packages/types/src/sportsBettingTypes.ts` | Betting domain types |
| `apps/mobile/src/data/mockBets.ts` | `packages/types/src/mockBets.ts` | Test fixtures |
| `apps/mobile/src/themes/` | `packages/ui/src/themes/` | Shared design system |
| (future validators) | `packages/domain/src/` | Domain validators/schemas (Zod) |

### 2.4 Infrastructure & Operations

| Old Path | New Path | Purpose |
|----------|----------|---------|
| (new) | `infra/docker/` | Dockerfiles, docker-compose.yml |
| (new) | `infra/terraform/` | Infrastructure as Code |
| (new) | `infra/local/` | Local development helpers |

### 2.5 Documentation

| Old Path | New Path | Purpose |
|----------|----------|---------|
| `documentation/neptune-docu.md` | `docs/00-project-overview.md` (and split) | System design docs (split into modular docs) |
| `documentation.md` | `docs/architecture-reference.md` | Architecture reference |
| `ai-page-documentation.md` | `docs/ai-page-design.md` | AI page design spec |
| (new from neptune-docu.md) | `docs/10-architecture-overview.md` | High-level architecture |
| (new from neptune-docu.md) | `docs/20-datastores-and-modeling.md` | Data layer design |
| (new from neptune-docu.md) | `docs/30-apis-and-contracts.md` | API contracts |
| (new from neptune-docu.md) | `docs/150-runbooks.md` | Operational runbooks |
| (new) | `ops/runbooks/` | Individual runbook files |

### 2.6 Mobile App Structure (internal reorganization - OPTIONAL)

The mobile app structure is already well-organized. No changes required for MVP restructuring. Future consideration: extract truly reusable UI components to `packages/ui/`.

---

## 3. New Directory Structure

```
project-neptune/
├── apps/
│   └── mobile/                          # React Native mobile app (iOS/Android)
│       ├── src/
│       │   ├── components/              # Mobile-specific UI components
│       │   ├── screens/                 # App screens
│       │   ├── features/                # Feature modules (auth, betting, etc.)
│       │   ├── navigation/              # Navigation config
│       │   ├── contexts/                # React contexts
│       │   ├── hooks/                   # Custom hooks
│       │   ├── config/                  # App config (firebase, etc.)
│       │   └── services/                # Mobile-specific services (oddsApi bridge)
│       ├── assets/                      # Images, fonts, icons
│       ├── App.tsx
│       ├── package.json
│       ├── tsconfig.json
│       ├── metro.config.js
│       ├── babel.config.js
│       └── firebase.json
│
├── services/
│   ├── api/                             # Main API Gateway (Node/TypeScript)
│   │   ├── src/
│   │   │   ├── routes/                  # REST endpoints (auth, users, bets, etc.)
│   │   │   ├── middleware/              # Auth, rate-limit, validation
│   │   │   ├── models/                  # Database models (User, Bet, etc.)
│   │   │   ├── services/                # Business logic services
│   │   │   ├── utils/                   # Utilities
│   │   │   └── server.js                # Express server entry point
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── Dockerfile
│   │
│   ├── ingestion/                       # Market data ingestion worker
│   │   ├── src/
│   │   │   ├── clients/                 # External API clients (Odds API, etc.)
│   │   │   ├── workers/                 # Polling/streaming workers
│   │   │   ├── normalizers/             # Data normalization logic
│   │   │   └── publishers/              # Event publishing to Redis/queue
│   │   ├── package.json
│   │   └── Dockerfile
│   │
│   ├── settlement/                      # Settlement worker (future)
│   │   ├── src/
│   │   │   ├── workers/                 # Results ingestion & settlement
│   │   │   └── processors/              # Settlement logic
│   │   └── package.json
│   │
│   └── chat-gateway/                    # WebSocket gateway (future)
│       ├── src/
│       │   ├── gateway/                 # WS connection management
│       │   ├── rooms/                   # Room logic & sharding
│       │   └── presence/                # Presence tracking
│       └── package.json
│
├── packages/
│   ├── types/                           # Shared TypeScript types
│   │   ├── src/
│   │   │   ├── sportsBettingTypes.ts
│   │   │   ├── matches.ts
│   │   │   ├── mockBets.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── domain/                          # Domain validators & schemas (Zod)
│   │   ├── src/
│   │   │   ├── betting/                 # Bet validation schemas
│   │   │   ├── wallet/                  # Wallet validation schemas
│   │   │   └── index.ts
│   │   └── package.json
│   │
│   ├── cache/                           # Shared cache utilities
│   │   ├── src/
│   │   │   └── cacheService.js
│   │   └── package.json
│   │
│   └── ui/                              # Shared UI primitives (future)
│       ├── src/
│       │   └── themes/                  # Design tokens (colors, typography)
│       └── package.json
│
├── infra/
│   ├── docker/
│   │   ├── Dockerfile.api               # API service image
│   │   ├── Dockerfile.ingestion         # Ingestion worker image
│   │   ├── docker-compose.yml           # Local dev environment
│   │   └── docker-compose.prod.yml      # Production-like compose
│   │
│   ├── terraform/                       # Infrastructure as Code (future)
│   │   ├── environments/
│   │   │   ├── dev/
│   │   │   ├── staging/
│   │   │   └── prod/
│   │   └── modules/
│   │
│   └── local/                           # Local dev helpers
│       ├── seed-data.sql                # Database seed scripts
│       └── redis.conf                   # Redis config for local
│
├── docs/
│   ├── 00-project-overview.md           # Vision, tenets, personas, MVP scope
│   ├── 10-architecture-overview.md      # High-level architecture diagram
│   ├── 20-datastores-and-modeling.md    # Database schemas, Redis keys
│   ├── 30-apis-and-contracts.md         # REST/WS API contracts
│   ├── 40-odds-ingestion-and-caching.md # Ingestion workflow
│   ├── 50-bet-placement-and-settlement.md # Betting flows
│   ├── 60-payments.md                   # Payment integration
│   ├── 70-social-public-bets-and-leaderboards.md # Social features
│   ├── 80-chat-and-trending.md          # Chat architecture
│   ├── 90-ai-and-ml.md                  # AI/ML services
│   ├── 100-observability-and-slos.md    # Telemetry & SLOs
│   ├── 110-security-and-privacy.md      # Security posture
│   ├── 120-scaling-and-capacity-planning.md # Scaling paths
│   ├── 130-deployment-and-operations.md # Deployment strategy
│   ├── 140-testing-and-quality.md       # Testing strategy
│   ├── 150-runbooks.md                  # Runbook index
│   ├── 160-roadmap.md                   # Product roadmap
│   ├── 170-recommendations-and-tradeoffs.md # Design decisions
│   ├── architecture-reference.md        # Original microservices doc
│   ├── ai-page-design.md                # AI page specification
│   └── research/
│       └── api-research-plan.md         # API research notes
│
├── ops/
│   └── runbooks/                        # Operational runbooks
│       ├── redis-outage.md
│       ├── price-drift.md
│       ├── payments-webhook-delay.md
│       └── chat-flooding.md
│
├── _misc/                               # Items needing owner decision
│   └── mobile-backup-20250725-101006/   # Backup folder (preserve for now)
│
├── tsconfig.base.json                   # Root TypeScript config with path aliases
├── package.json                         # Root package.json (workspaces)
├── pnpm-workspace.yaml                  # PNPM workspace config (if using pnpm)
├── .gitignore
├── README.md                            # Updated root README
└── plan.md                              # This document

```

---

## 4. Items Needing Owner Decision

### 4.1 Backup Folder
- **Path**: `apps/mobile-backup-20250725-101006/`
- **Action**: Moved to `_misc/mobile-backup-20250725-101006/`
- **Reason**: Appears to be a backup; should not be deleted without owner review
- **Decision needed**: Can this be safely removed? If yes, delete. If no, archive externally.

### 4.2 Design Asset
- **Path**: `neptune-design.pdf`
- **Current action**: Leave at root (design reference)
- **Decision needed**: Move to `docs/design/` or keep at root?

### 4.3 Mobile App Data Directory
- **Path**: `apps/mobile/src/data/`
- **Current**: Contains mock data and types mixed together
- **Suggestion**: 
  - Types → `packages/types/`
  - Mock data → `apps/mobile/src/__fixtures__/` or `packages/types/src/__fixtures__/`
- **Decision needed**: Confirm mock data location strategy

### 4.4 Mobile Themes
- **Path**: `apps/mobile/src/themes/`
- **Current**: Used only by mobile app
- **Future**: Extract to `packages/ui/src/themes/` when web app is added
- **Decision needed**: Extract now (for consistency) or wait until web app needs it?

### 4.5 Firebase Configuration
- **Files**: `apps/mobile/firebase.json`, `apps/mobile/firestore.rules`
- **Current action**: Keep in mobile app
- **Future**: May need to move to `infra/firebase/` when multiple apps use Firebase
- **Decision needed**: Keep in app or extract to infra now?

---

## 5. Configuration Changes Required

### 5.1 Root TypeScript Configuration

Create `tsconfig.base.json` with path aliases:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@neptune/types": ["packages/types/src"],
      "@neptune/types/*": ["packages/types/src/*"],
      "@neptune/domain": ["packages/domain/src"],
      "@neptune/domain/*": ["packages/domain/src/*"],
      "@neptune/cache": ["packages/cache/src"],
      "@neptune/cache/*": ["packages/cache/src/*"],
      "@neptune/ui": ["packages/ui/src"],
      "@neptune/ui/*": ["packages/ui/src/*"]
    }
  }
}
```

### 5.2 Workspace Configuration

Create root `package.json` with workspaces:

```json
{
  "name": "neptune-monorepo",
  "version": "1.0.0",
  "private": true,
  "workspaces": [
    "apps/*",
    "services/*",
    "packages/*"
  ],
  "scripts": {
    "build": "turbo run build",
    "test": "turbo run test",
    "lint": "turbo run lint",
    "typecheck": "turbo run typecheck"
  },
  "devDependencies": {
    "turbo": "^latest",
    "typescript": "^5.4.5"
  }
}
```

### 5.3 Service Package.json Files

Each service needs its own `package.json`:

**services/api/package.json**:
```json
{
  "name": "@neptune/api",
  "version": "1.0.0",
  "main": "src/server.js",
  "dependencies": {
    "@neptune/types": "*",
    "@neptune/cache": "*",
    "express": "^5.1.0",
    "mongoose": "^8.13.2",
    ...
  }
}
```

**services/ingestion/package.json**:
```json
{
  "name": "@neptune/ingestion",
  "version": "1.0.0",
  "main": "src/index.js",
  "dependencies": {
    "@neptune/types": "*",
    "@neptune/cache": "*",
    "axios": "^1.6.7",
    ...
  }
}
```

### 5.4 Package TypeScript Configurations

Each package needs `tsconfig.json` extending base:

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

---

## 6. Import Path Updates

### 6.1 Mobile App Import Updates

**Before**:
```typescript
import { MatchType } from '../types/matches';
import { colors } from '../themes/colors';
```

**After** (if extracting types/themes):
```typescript
import { MatchType } from '@neptune/types/matches';
import { colors } from '../themes/colors'; // Keep local for now
```

### 6.2 API Service Import Updates

**Before** (when in backend/):
```javascript
const cacheService = require('./services/cacheService');
```

**After**:
```javascript
const cacheService = require('@neptune/cache');
```

---

## 7. Verification Steps

### 7.1 Build Verification
```bash
# Install all dependencies
npm install  # or pnpm install

# Typecheck all TypeScript
npm run typecheck

# Build all packages
npm run build

# Lint all code
npm run lint
```

### 7.2 Mobile App Verification
```bash
cd apps/mobile
npm install
npm start
# Verify app launches without errors
```

### 7.3 API Service Verification
```bash
cd services/api
npm install
npm test  # if tests exist
node src/server.js  # Verify server starts
```

### 7.4 Import Path Verification
```bash
# Search for any broken imports
grep -r "from '\.\./\.\./\.\./\.\." apps/ services/ packages/
grep -r "require('\.\./\.\./\.\./\.\." apps/ services/ packages/
```

---

## 8. Rollback Plan

All changes are reversible via git:

1. **Single revert**: All changes will be in one merge commit
   ```bash
   git revert <merge-commit-sha>
   ```

2. **Cherry-pick revert**: If individual commits need reverting
   ```bash
   git revert <commit-sha>
   ```

3. **Branch reset**: If on feature branch
   ```bash
   git checkout main
   git branch -D feature/restructure
   ```

4. **File restore**: Restore individual files
   ```bash
   git checkout HEAD~1 -- <file-path>
   ```

---

## 9. Migration Strategy

### Phase 1: Preparation (Commits 1-2)
- ✅ Create plan.md
- ✅ Create target directory structure
- ✅ Add .gitkeep files to empty directories

### Phase 2: Documentation (Commit 3)
- ✅ Move and split documentation files
- ✅ Create ops/runbooks/
- ✅ Update doc cross-references

### Phase 3: Backend Split (Commits 4-5)
- ✅ Move backend routes → services/api/
- ✅ Move backend services → services/api/ or services/ingestion/
- ✅ Move backend models, middleware, utils → services/api/

### Phase 4: Shared Packages (Commit 6)
- ✅ Extract types → packages/types/
- ✅ Extract cache utilities → packages/cache/
- ✅ Create placeholder packages/domain/ and packages/ui/

### Phase 5: Configuration (Commit 7)
- ✅ Create tsconfig.base.json with path aliases
- ✅ Create root package.json with workspaces
- ✅ Update service package.json files
- ✅ Update import paths

### Phase 6: Infrastructure (Commit 8)
- ✅ Create infra/docker/ with Dockerfiles and compose files
- ✅ Create infra/terraform/ placeholder
- ✅ Create infra/local/ with seed scripts

### Phase 7: Miscellaneous (Commit 9)
- ✅ Move backup folder → _misc/
- ✅ Update root README.md
- ✅ Verify all paths and imports

### Phase 8: Verification (Final)
- ✅ Run typecheck
- ✅ Run builds
- ✅ Run tests
- ✅ Manual smoke test of mobile app and API

---

## 10. Success Criteria

✅ **No code logic changes**: Only file moves and path updates  
✅ **No deletions**: All files preserved (moved to `_misc/` if unclear)  
✅ **Builds pass**: TypeScript compiles without errors  
✅ **Tests pass**: All existing tests still pass  
✅ **Clear boundaries**: Service/package boundaries align with neptune-docu.md  
✅ **Easy split**: Services can be extracted to separate repos with minimal effort  
✅ **Documentation complete**: Architecture docs in docs/, runbooks in ops/  
✅ **Reproducible**: Changes expressible as git mv operations  

---

## 11. Open Questions

1. **Workspace tool**: Use pnpm workspaces, npm workspaces, or Yarn workspaces?
   - **Recommendation**: pnpm for performance and strictness

2. **Turborepo**: Add Turborepo for build caching?
   - **Recommendation**: Yes, add in Phase 5 for better DX

3. **Linting**: ESLint config at root or per-package?
   - **Recommendation**: Root config with package overrides

4. **Testing**: Jest config at root or per-package?
   - **Recommendation**: Root config with package-specific overrides

5. **CI/CD paths**: GitHub Actions workflows need path updates?
   - **Recommendation**: Update in separate commit after restructure verified

---

## 12. Timeline Estimate

- **Phase 1-2** (Prep & Docs): 30 minutes
- **Phase 3-4** (Backend & Packages): 1 hour
- **Phase 5-6** (Config & Infra): 1 hour  
- **Phase 7** (Misc & README): 30 minutes
- **Phase 8** (Verification): 30 minutes
- **Total**: ~3.5 hours

---

**Status**: Ready for execution  
**Next Action**: Create target directory structure and begin file moves
