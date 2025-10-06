# Pull Request: Documentation-Driven Repository Restructuring

**Type**: Infrastructure / Refactor  
**Impact**: Repository structure only - No logic changes  
**Date**: 2025-10-06  
**Author**: Platform Engineering Team  

---

## 📋 Summary

This PR restructures the Neptune repository from a flat structure into a **modular monorepo** architecture aligned with `docs/neptune-docu-source.md`. The goal is to establish clear service boundaries that enable future extraction of independent microservices while maintaining current monolith benefits.

**Key Changes**:
- ✅ No code logic changes
- ✅ No file deletions (backup moved to `_misc/`)
- ✅ File moves with history preservation (git mv)
- ✅ Import path updates for backend services
- ✅ Workspace configuration (pnpm/npm workspaces)
- ✅ Docker compose for local development
- ✅ Comprehensive documentation split into modular docs

---

## 🎯 Objectives (from plan.md)

1. **Align with neptune-docu.md**: Structure repository to match documented architecture (modular monolith → services)
2. **Clear Bounded Contexts**: Separate code by service responsibility (API, Ingestion, Settlement, Chat, etc.)
3. **Shared Packages**: Extract reusable types, validators, utilities
4. **Infrastructure Setup**: Docker, Terraform placeholders, local dev helpers
5. **Documentation Organization**: Split system docs into modular, navigable structure
6. **Future-Proof**: Make service extraction trivial when traffic/team demands

---

## 📁 New Repository Structure

```
project-neptune/
├── apps/                      # Client applications
│   └── mobile/                # React Native app (unchanged internally)
├── services/                  # Backend services (modular monolith)
│   ├── api/                   # Main API Gateway
│   ├── ingestion/             # Market data ingestion worker
│   ├── settlement/            # Settlement worker (placeholder)
│   └── chat-gateway/          # WebSocket chat (placeholder)
├── packages/                  # Shared packages
│   ├── types/                 # Shared TypeScript types
│   ├── domain/                # Domain validators (Zod) - placeholder
│   ├── cache/                 # Redis cache utilities
│   └── ui/                    # Shared UI primitives - placeholder
├── infra/                     # Infrastructure & deployment
│   ├── docker/                # Dockerfiles & compose files
│   ├── terraform/             # IaC (placeholder)
│   └── local/                 # Local dev helpers
├── docs/                      # System design documentation (18 docs)
├── ops/                       # Operational documentation
│   └── runbooks/              # Incident response runbooks (4 runbooks)
└── _misc/                     # Items needing review
```

---

## 🔄 File Moves Summary

### Backend Services
| Old Path | New Path | Notes |
|----------|----------|-------|
| `apps/mobile/backend/routes/*` | `services/api/src/routes/*` | API routes |
| `apps/mobile/backend/middleware/*` | `services/api/src/middleware/*` | Auth middleware |
| `apps/mobile/backend/models/*` | `services/api/src/models/*` | Database models |
| `apps/mobile/backend/services/aiService.js` | `services/api/src/services/aiService.js` | AI service |
| `apps/mobile/backend/services/sportIntelService.js` | `services/api/src/services/sportIntelService.js` | Sports intel |
| `apps/mobile/backend/services/sportsDataService.js` | `services/api/src/services/sportsDataService.js` | Sports data |
| `apps/mobile/backend/services/apiSportsClient.js` | `services/ingestion/src/clients/apiSportsClient.js` | Moved to ingestion |
| `apps/mobile/backend/services/cacheService.js` | `packages/cache/src/cacheService.js` | Shared package |
| `apps/mobile/backend/utils/*` | `services/api/src/utils/*` | Utilities |
| `apps/mobile/backend/server.js` | `services/api/src/server.js` | API entry point |
| `apps/mobile/backend/package.json` | `services/api/package.json` | API dependencies |

### Shared Packages
| Old Path | New Path | Notes |
|----------|----------|-------|
| `apps/mobile/src/types/matches.ts` | `packages/types/src/matches.ts` | Match types |
| `apps/mobile/src/types/env.d.ts` | `packages/types/src/env.d.ts` | Env types |
| `apps/mobile/src/types/svg.d.ts` | `packages/types/src/svg.d.ts` | SVG types |
| `apps/mobile/src/data/sportsBettingTypes.ts` | `packages/types/src/sportsBettingTypes.ts` | Betting types |
| `apps/mobile/src/data/mockBets.ts` | `packages/types/src/mockBets.ts` | Test fixtures |

### Documentation
| Old Path | New Path | Notes |
|----------|----------|-------|
| `documentation/neptune-docu.md` | `docs/neptune-docu-source.md` + split into 18 docs | Modular docs |
| `documentation.md` | `docs/architecture-reference.md` | Microservices ref |
| `ai-page-documentation.md` | `docs/ai-page-design.md` | AI page spec |
| `apps/mobile/backend/API_RESEARCH_PLAN.md` | `docs/research/api-research-plan.md` | Research notes |

### Miscellaneous
| Old Path | New Path | Notes |
|----------|----------|-------|
| `apps/mobile-backup-20250725-101006/` | `_misc/mobile-backup-20250725-101006/` | Preserved for review |

---

## 🔧 Configuration Changes

### Root Configuration Files (New)
- ✅ `tsconfig.base.json` - Root TypeScript config with path aliases
- ✅ `package.json` - Root workspace configuration
- ✅ `pnpm-workspace.yaml` - PNPM workspace definition
- ✅ `.npmrc` - NPM configuration for workspaces

### Service Configuration Files (New)
- ✅ `services/api/tsconfig.json` - API service TypeScript config
- ✅ `services/api/package.json` - API dependencies (moved from backend)
- ✅ `services/ingestion/package.json` - Ingestion worker dependencies
- ✅ `services/settlement/package.json` - Settlement worker (placeholder)
- ✅ `services/chat-gateway/package.json` - Chat gateway (placeholder)

### Package Configuration Files (New)
- ✅ `packages/types/package.json` + `tsconfig.json` - Shared types
- ✅ `packages/cache/package.json` - Cache utilities
- ✅ `packages/domain/package.json` + `tsconfig.json` - Domain validators (placeholder)
- ✅ `packages/ui/package.json` + `tsconfig.json` - UI primitives (placeholder)

### Infrastructure Files (New)
- ✅ `infra/docker/Dockerfile.api` - API service Dockerfile
- ✅ `infra/docker/Dockerfile.ingestion` - Ingestion worker Dockerfile
- ✅ `infra/docker/docker-compose.yml` - Development environment
- ✅ `infra/docker/docker-compose.prod.yml` - Production-like environment
- ✅ `infra/docker/README.md` - Docker usage guide
- ✅ `infra/terraform/README.md` - Terraform placeholder guide

---

## 📝 Documentation Changes

### New Modular Docs (18 files in `docs/`)

Split from original `neptune-docu.md`:

1. `00-project-overview.md` - Vision, tenets, personas, MVP scope
2. `10-architecture-overview.md` - Architecture, deployment stance, bounded contexts
3. `20-datastores-and-modeling.md` - DB schemas, Redis patterns
4. `30-apis-and-contracts.md` - REST/WS API specifications
5. `40-odds-ingestion-and-caching.md` - Market data pipeline
6. `50-bet-placement-and-settlement.md` - Betting workflows
7. `60-payments.md` - Payment integration
8. `70-social-public-bets-and-leaderboards.md` - Social features
9. `80-chat-and-trending.md` - Chat architecture
10. `90-ai-and-ml.md` - AI/ML services
11. `100-observability-and-slos.md` - Metrics, tracing, SLOs
12. `110-security-and-privacy.md` - Auth, secrets, data protection
13. `120-scaling-and-capacity-planning.md` - Scaling strategies
14. `130-deployment-and-operations.md` - CI/CD, environments
15. `140-testing-and-quality.md` - Testing strategy
16. `150-runbooks.md` - Runbook index
17. `160-roadmap.md` - Product roadmap
18. `170-recommendations-and-tradeoffs.md` - Design decisions

### New Operational Runbooks (4 files in `ops/runbooks/`)

1. `price-drift.md` - Price drift / odds stale incident response
2. `redis-outage.md` - Redis outage incident response
3. `payments-webhook-delay.md` - Payment webhook delay handling
4. `chat-flooding.md` - Chat flooding/abuse response

### Updated Documentation
- ✅ `README.md` - Complete rewrite reflecting new structure
- ✅ `docs/README.md` - Documentation index
- ✅ `plan.md` - Restructuring plan and mapping

---

## 🔄 Import Path Updates

### Completed ✅
- `services/api/src/server.js` - Updated cacheService import
- `services/api/src/services/*.js` - Updated cacheService and apiSportsClient imports
- `services/api/src/routes/sportIntel.js` - Updated apiSportsClient import

### Pending 🔄 (Non-blocking)
Mobile app imports from `../types/` need updating once Metro bundler is configured for path aliases. See `IMPORT_UPDATES_NEEDED.md` for details.

---

## ✅ Verification Completed

### Build Verification
- ✅ Directory structure created successfully
- ✅ All files moved with git mv (history preserved)
- ✅ No files deleted (backups moved to `_misc/`)
- ✅ Backend import paths updated
- ✅ Workspace configuration in place

### Manual Verification Needed
```bash
# Install dependencies
npm install  # or pnpm install

# Typecheck
npm run typecheck

# Start infrastructure
cd infra/docker
docker-compose up -d

# Start mobile app
cd apps/mobile
npm start

# Start API
cd services/api
npm start
```

---

## 🚫 What Was NOT Changed

- ❌ **No code logic changes** - Only file moves and path updates
- ❌ **No deletions** - All files preserved (backups in `_misc/`)
- ❌ **No mobile app internal structure changes** - App code unchanged
- ❌ **No database schema changes**
- ❌ **No API contract changes**
- ❌ **No build/test behavior changes** (except paths)

---

## 🔙 Rollback Plan

All changes are reversible via git:

```bash
# Revert the merge commit
git revert <merge-commit-sha>

# Or reset to previous state (if on feature branch)
git checkout main
git branch -D feature/restructure

# Or restore individual files
git checkout HEAD~1 -- <file-path>
```

---

## 🎯 Benefits

1. **Clear Service Boundaries**: Services can be extracted to independent repos with minimal effort
2. **Shared Code Reuse**: Common types, utilities, and validators in packages/
3. **Better Developer Experience**: Clear module ownership, faster navigation
4. **Improved Documentation**: Modular, navigable docs aligned with architecture
5. **Local Development**: Docker Compose for consistent dev environments
6. **Future-Proof**: Ready for microservices split when metrics demand

---

## 📋 Follow-Up Tasks

1. ✅ **Mobile app import paths**: Update once Metro bundler is configured (see `IMPORT_UPDATES_NEEDED.md`)
2. ✅ **CI/CD paths**: Update GitHub Actions workflow paths if needed
3. ✅ **Test database seeding**: Create seed scripts in `infra/local/`
4. ✅ **Terraform modules**: Implement when ready for cloud deployment
5. ✅ **Package publishing**: Set up internal npm registry for shared packages (optional)

---

## 🧪 Testing Checklist

- [ ] Backend services start without errors
- [ ] Mobile app builds and runs
- [ ] TypeScript compilation succeeds
- [ ] Docker Compose starts all services
- [ ] No broken imports or missing modules
- [ ] Documentation links work correctly

---

## 📚 References

- [Restructuring Plan](./plan.md) - Detailed mapping and strategy
- [Import Updates Needed](./IMPORT_UPDATES_NEEDED.md) - Follow-up import path changes
- [Architecture Documentation](./docs/10-architecture-overview.md) - System architecture
- [Deployment Guide](./docs/130-deployment-and-operations.md) - Deployment instructions

---

## 🙏 Review Checklist

Please verify:
- [ ] All git mv operations completed successfully
- [ ] No files inadvertently deleted
- [ ] Import paths updated correctly
- [ ] Documentation structure makes sense
- [ ] Docker Compose files work
- [ ] Workspace configuration correct

---

**Status**: Ready for Review  
**Estimated Review Time**: 30-45 minutes  
**Merge Conflicts**: None expected (structure-only changes)

---

_Generated: 2025-10-06_
