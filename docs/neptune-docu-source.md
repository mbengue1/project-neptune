# Neptune — Scalable System Design Documentation Pack (v1.0)

> **How to use this pack**: Each section below is a standalone doc you can copy into your codebase under `docs/`. Suggested filenames are provided. Adjust as you build; this is a living set.

---

# 1) docs/00-project-overview.md

## Vision

Neptune is a social, intelligence‑forward sportsbook delivering live odds, seamless betting, event chat, public bet sharing with leaderboards, and in‑app AI assistance. The product begins U.S.-focused, mobile-first (iOS/Android), with a desktop web target soon after. The design assumes current test data from The Odds API, while architecturally preparing for high-volume, low-latency feeds later.

## Core Tenets

* **Money safety first**: double‑entry ledger, idempotent bet placement, atomic settlement.
* **Fast reads, bounded writes**: Redis cache for odds & presence; Postgres for transactional truth; event-driven fanout.
* **Privacy-first social**: profiles private by default; public bets are opt‑in with stake redaction and live delay.
* **Built‑in observability**: tracing, metrics, structured logs; SLOs and runbooks.
* **Evolve gracefully**: modular monolith → services when traffic/teams require.

## Primary Personas & Journeys

* **Bettor**: browse → slip → place bet → settle → withdraw; follow public bettors; chat during games.
* **Public Bettor/Creator**: opt-in public profile; share slips; appear on leaderboards; gain followers.
* **Spectator**: join live rooms; react; follow creators; later convert to bettor.
* **Trading/Risk Ops**: monitor exposure, suspend/override markets, audit settlements.
* **Moderation/Support**: enforce chat rules; action reports; assist users.

## MVP Scope (Production v1)

* Pre-match + in-play markets across launch sports (with SGP + props constraints via provider).
* Odds ingestion → Redis cache → WS/API reads.
* Idempotent bet placement with atomic **HOLD** ledger entry; results ingestion; settlement.
* Social: public profiles (opt-in), public bets feed, follow, **Top‑30 leaderboards** (7/30d windows).
* Chat: event rooms, trending highlights, moderation tools, no DMs.
* AI chat (RAG): sports facts/stats Q&A + advisory suggestions (with disclaimers).
* Observability and security baselines (rate limits, WAF, secrets, audit logs).

---

# 2) docs/10-architecture-overview.md

## High-Level Architecture

* **Clients**: React Native mobile (iOS/Android), Web (responsive). WebSocket for live odds/chat; REST for control.
* **API Gateway/WAF** → **Neptune API** (stateless Node/TS): authZ, bet placement, wallets, social, feed, leaderboards, AI proxy.
* **Market Data Ingestion** workers: poll/stream vendor, normalize, populate Redis, snapshot to object storage, publish updates.
* **Chat Gateway**: WS termination, room sharding, presence, moderation.
* **Settlement Worker**: results ingestion, atomic settlement.
* **Payments Adapter**: Stripe first; webhook processor; idempotent.
* **Data Plane**: Postgres (primary + replicas), Redis, Object Storage, Event Bus (outbox→queue), Warehouse (later).
* **Observability**: OTel Collector, metrics, logs, dashboards, alerts.

## Deployment Stance

* Start as a modular monolith (API + workers in one repo) with clear module boundaries. Peel out **Ingestion**, **Chat**, **Payments Webhooks**, and **Settlement** as independent services as load/team grows.

## Service Responsibilities (Bounded Contexts)

* **Market Data**: odds/events normalization; Redis cache; WS publish.
* **Betting**: slip validation (incl. SGP constraints); price revalidation; idempotent bet create.
* **Wallet & Ledger**: accounts; double-entry; holds, credits/debits; audits.
* **Settlement**: result resolution; atomic release/credit.
* **Social**: profiles, public bets, follow graph, leaderboards.
* **Chat**: rooms, messages, presence, moderation, trending.
* **AI & ML**: AI chat (RAG); recommendation service (features, inference).
* **Admin/Trading**: exposure, suspensions, overrides, audits.

---

# 3) docs/20-datastores-and-modeling.md

## Datastore Choices

* **PostgreSQL (managed)**: source of truth for financial/transactional and social graph data. ACID, strong constraints, serializable transactions for critical flows.
* **Redis (managed)**: hot odds cache (TTL + stale‑while‑revalidate), presence, rate limits, hot exposure aggregates, sequence clocks for ordered fanout.
* **Object Storage (S3/GCS)**: append-only audit trail (odds snapshots, settlement logs, admin audit).
* **Event Bus (SQS/SNS or Kafka later)**: decoupled domain events (`bet.placed`, `bet.settled`, `payments.succeeded`, `chat.message`, `odds.updated`). Publish via outbox pattern.
* **Search (later)**: OpenSearch for discovery; **Vector index** (pgvector or external) for AI RAG.

## Data Domains & Entities (field summaries)

### Wallet & Ledger (core)

* **Account**: `id`, `user_id`, `balance_cents`, `status`, `created_at`.
* **LedgerEntry** (double-entry): `id`, `account_id`, `amount_cents` (+/−), `type` (HOLD, RELEASE, CREDIT, DEBIT, FEE), `ref_type` (BET, SETTLEMENT, DEPOSIT, WITHDRAWAL), `ref_id`, `created_at`.
* **Idempotency**: `(account_id, key)` → `bet_id`, `created_at` (prevents duplicate processing).

### Betting

* **Bet**: `id`, `account_id`, `stake_cents`, `potential_payout_cents`, `status` (PENDING/SETTLED/VOID), `created_at`.
* **BetLeg**: `id`, `bet_id`, `event_id`, `market_id`, `outcome_id`, `price` (num/den or decimal scaled), `leg_type` (STRAIGHT/SGP/PROP), `attrs` (JSON: player id, alt lines, etc.).

### Market Data

* **Market Snapshot (Redis)**: `version`, `asOf`, `status`, `prices`, `suspensions`.
* Keys: `markets:{market_id}` (TTL 8–15s; SWR 2–3s; monotonic version updates; jittered expiries to avoid stampede).

### Users & Social

* **Profile**: `user_id`, `idp_user_id`, `handle`, `is_public`, `stake_visibility` (hidden/rounded/exact), `live_delay_sec`, `bio`, `created_at`.
* **PublicBet**: `bet_id`, `account_id`, `visible_from`, `stake_mode`, `created_at`.
* **Follow**: `(follower_id, followee_id)`, `created_at`.
* **LeaderboardRank**: `window` (7/30d), `metric` (ROI/win%), `rank`, `account_id`, `value`, `n_bets`, `updated_at`.

### Payments

* **Payment**: `id`, `account_id`, `direction` (DEPOSIT/WITHDRAWAL/CHARGEBACK/REFUND), `amount_cents`, `currency`, `psp` (stripe/adyen/…), `psp_customer`, `psp_txn_id`, `status`, `idempotency_key`, `created_at`.

### Chat

* **Message**: `room_id`, `ts`, `msg_id`, `user_id`, `text`, `reactions`, `flags`; **partitioned by time**; presence tracked in Redis.

### Compliance Hooks (future)

* **KYCStatus**: `user_id`, `status`, `provider_ref`, `updated_at`.
* **GeoCheck**: `user_id`, `event_id`, `check_ts`, `result`, `provider_ref`.

## Indexing & Partitions

* Time-based partitions for `chat.messages`; BTREE on `(account_id, created_at)` for `bets` and `ledger_entries`; unique `(account_id, idempotency_key)`; btree on `public_bets.visible_from`; composite indexes to satisfy list screens.

---

# 4) docs/30-apis-and-contracts.md

## API Style

* Versioned REST with explicit media types: `Accept: application/vnd.neptune.v1+json`.
* JSON payloads validated at ingress/egress (Zod/TypeBox). Consistent error envelope: `{ code, message, details, traceId }`.

## Key Endpoints (summarized)

* **Markets & Events**: `GET /sports`, `GET /events/{id}/markets` (Redis-backed; ETag/Cache-Control short TTL).
* **Betting**: `POST /bets` (requires `Idempotency-Key` header), `GET /bets/{id}`, `GET /bets?cursor=…`.
* **Wallet**: `GET /wallet`; `POST /wallet/deposits`; `POST /wallet/withdrawals`.
* **Public Bets & Social**: `GET /public-bets?window=7d&sport=NBA`; `POST /follow/{accountId}`; `GET /leaderboards?metric=roi&window=30d`.
* **Chat**: `WS /chat?room=event:{id}`; admin moderation endpoints (`POST /admin/chat/{room}/mute`, ban, shadowban).
* **Admin/Trading**: `POST /admin/markets/{id}/suspend`; `POST /admin/prices/override`.
* **AI & Recs**: `POST /ai/chat`; `GET /recs?event=…`.

## Idempotency & Concurrency Controls

* All **mutations** accept `Idempotency-Key`; backend enforces uniqueness per account; retries return the same result.
* Bet placement, deposits/withdrawals, settlement run in transactions with row locks or SERIALIZABLE isolation as appropriate.

---

# 5) docs/40-odds-ingestion-and-caching.md

## Goals

* Keep user read paths hot and isolated from vendor latency and rate limits.
* Provide ordered, monotonic updates and reduce jitter.

## Ingestion Workflow

1. Poll/stream provider → normalize to internal event/market/outcome model.
2. Write to Redis key `markets:{market_id}` with `version`, `asOf`, `status`, `prices`.
3. Publish `odds.updated` event for WS gateway to coalesce and fan out.
4. Snapshot raw payloads to object storage for audit.

## Redis Policies

* **TTL**: 8–15s, **SWR**: 2–3s; **jitter** TTLs to avoid herd refresh.
* **Single-flight**: per-key mutex while refreshing; failed refresh keeps stale for SWR.
* **Monotonicity**: only overwrite if `incoming.version >= existing.version`.

## WS Fanout

* Gateway batches/coalesces updates per room; throttles to protect clients; backpressure drops non-critical deltas first.

---

# 6) docs/50-bet-placement-and-settlement.md

## Bet Placement (Happy Path)

1. Client constructs slip; sends `POST /bets` with `Idempotency-Key`.
2. API loads current prices/state from Redis; revalidates selections (incl. SGP constraints via provider); applies "accept price changes" flag or returns re-offer.
3. **Atomic DB transaction**:

   * Lock account row.
   * Insert **HOLD** ledger entry (negative amount).
   * Insert bet + legs.
   * Insert idempotency record.
   * Publish outbox `bet.placed`.
4. Return `bet_id` and current priced summary.

## Idempotent Retries

* If same key arrives again, return the original `bet_id`; no new ledger/bet rows.

## Settlement

1. Results feed maps outcomes; for each `PENDING` bet, compute result.
2. **Atomic transaction**:

   * Release HOLD (positive amount) and optionally CREDIT winnings.
   * Update bet status to `SETTLED`/`VOID`.
   * Publish `bet.settled`.

## Risk Controls

* Per-account and per-market limits; auto-suspend on volatility; price/eligibility constraints for SGP to avoid correlated mispricing.

---

# 7) docs/60-payments.md

## Strategy

* Adapter interface for PSPs; start with **Stripe** (cards + Apple/Google Pay; ACH later). Webhooks are the source of truth.

## Deposit Flow

1. Client → `POST /wallet/deposits` (amount, paymentMethodId, idempotency key).
2. Payments service calls Stripe `paymentIntent` (idempotent), stores `payments` row with `INITIATED`.
3. On Stripe webhook `SUCCEEDED`, atomically add **CREDIT** ledger entry and update balance; mark payment `SUCCEEDED`.

## Withdrawal Flow

* Validate KYC/limits; initiate payout; mark `PENDING`.
* On webhook `SUCCEEDED`, commit **DEBIT** ledger entry.

## Protections

* Dedupe by `(account_id, idempotency_key)`.
* Guardrails: daily caps, unsettled exposure checks, chargeback handling.

---

# 8) docs/70-social-public-bets-and-leaderboards.md

## Public Profiles & Privacy

* Default private; users can opt‑in to public profile.
* Stake visibility: hidden (default), rounded, exact.
* Live bet exposure: configurable delay (`live_delay_sec`; default e.g. 180s).

## Public Bets Feed

* On qualifying bet placement, create `public_bets` with `visible_from` honoring delay.
* “Follow this bet” opens a prefilled slip for the follower (never auto‑place).

## Leaderboards

* Metrics: ROI and Win%.
* Windows: 7d, 30d.
* Eligibility: min sample size + volume; use Wilson score to reduce small-sample bias.
* Batch compute hourly; store top 30 per window/metric (+ per sport filter).

---

# 9) docs/80-chat-and-trending.md

## Rooms & Transport

* WS rooms per event + sport/global rooms; sticky connections by token; presence in Redis.
* Bounded per-socket queues; backpressure drops non-critical messages first (typing/reactions) and never system confirmations.

## Moderation & Safety

* Per-user/per-room rate limits; slow mode during spikes; profanity/abuse filters; mute/ban/shadowban; report workflow.
* Retention windows (e.g., 30–90 days), configurable.

## Trending Highlights

* Streaming consumer computes rolling z‑scores for `msgs/sec` and `reactions/sec` vs baseline per room; emits `chat.highlight` markers displayed inline.

---

# 10) docs/90-ai-and-ml.md

## AI Chat (RAG)

* Sources: licensed sports stats (box scores, recent averages), schedules, glossary.
* Pipeline: chunk → embed → vector index → retrieve top‑k → compose answer with disclaimers.
* Caching popular queries; p95 latency target 700–900ms.
* Safety: content filters, advisory language, no promises on outcomes.

## ML Recommendations

* Offline features (team form, player trends, price movement, user preferences) → training (GBM/logistic to start) → calibration checks.
* Online inference returns ranked suggestions with confidence and reason codes; respects user risk settings and privacy opt‑outs.

---

# 11) docs/100-observability-and-slos.md

## Telemetry

* **Tracing** (OTel): `/bets`, `/wallet/deposits`, `payments.webhook`, `odds.ingest`, `chat.send`, `ws.broadcast`.
* **Metrics**: bet success/error rates; price revalidation failures; Redis hit ratio; WS concurrent; msgs/sec per room; outbox lag; PSP webhook lag; settlement latency; p95 latencies per endpoint.
* **Logging**: structured (JSON) with `traceId` correlation; sensitive data redacted.

## SLOs (examples)

* **Availability**: User-facing 99.9% monthly; bet placement 99.95%.
* **Latency (p95)**: `GET odds ≤ 300ms`, `POST /bets ≤ 500ms`, chat send→deliver ≤ 200ms (regional).
* **Odds freshness**: 99% of reads ≤ 10s since provider `asOf`.

## Alerting & Dashboards

* Error budget alerts; saturation (Redis/DB connections), queue lags, WS disconnect spikes. Runbooks linked.

---

# 12) docs/110-security-and-privacy.md

## Authentication & Authorization

* OIDC IdP (e.g., Firebase/Auth0/Cognito). Backend issues roles/scopes (user/admin/trader/moderator). Session tokens short-lived.

## Secrets & Access

* Cloud Secrets Manager; per-service IAM least privilege; rotate keys. PSP keys only in payments container.

## Data Protection

* PII isolation via reference + external vault; envelope encryption for any stored PII.
* Public bets opt-in; defaults to stake hidden and live delay. Easy opt‑out.

## Edge Protections

* WAF; bot rules; per-IP and per-account rate limits; CAPTCHA on abuse.

## Auditing

* Immutable admin audit logs (object lock); tamper-evident event streams.

---

# 13) docs/120-scaling-and-capacity-planning.md

## Capacity Assumptions (launch target)

* 100k DAU; ~8k concurrent users at peak. Odds updates 1–2k/s bursts. Bets peak ~37/s. Chat baseline ~40 msgs/s; spikes ~400 msgs/s; fanout in the low thousands msgs/s.

## Scaling Paths

* **API**: stateless pods; HPA on CPU/RPS.
* **Redis**: primary/replica; client timeouts + circuit breakers; partition keys by sport/market if needed.
* **Postgres**: managed (Aurora/Cloud SQL) with read replicas; connection pooling; eventual sharding by `account_id` when write contention emerges.
* **Chat**: shard WS gateway by `room_id` hash; migrate message store to DynamoDB/Cassandra if write pressure grows.
* **Events**: SQS/SNS initially; migrate to Kafka for high-throughput streams.
* **Multi-region** (later): region-local WS; read-local odds; write-through for ledger with primary region + disaster recovery.

## Resilience

* Multi-AZ; PITR for DB; backups for object store; chaos testing; backpressure and load shedding on non-critical streams first.

---

# 14) docs/130-deployment-and-operations.md

## Environments

* **Dev**: docker-compose; Postgres/Redis local; localstack S3/SQS; stripe-cli.
* **Staging**: managed serverless DB/cache free tiers where possible; one small compute node; real S3.
* **Prod**: ECS Fargate or EKS; ALB + WAF; Aurora Postgres; ElastiCache; S3; SNS/SQS.

## CI/CD

* GitHub Actions: lint → typecheck → unit → contract → build images → SBOM → security scan; ephemeral compose for API tests; nightly E2E.
* CD: Blue/green or canary; feature flags for risky paths; infra via Terraform.

## Images & Runtime

* Multi-stage Docker; distroless base; non-root; read-only FS; drop Linux caps.

---

# 15) docs/140-testing-and-quality.md

## Testing Strategy

* **Unit**: services (bet math, SGP validation), ledger rules, cache policies.
* **Contract**: schema compatibility (shared package for types); backward/forward tests.
* **Integration**: DB + Redis + payments webhook happy/edge paths.
* **E2E**: place bet → settle; price change re-offer; insufficient funds; deposit/withdraw.
* **Load**: odds read RPS; WS fanout; `/bets` bursts with idempotent retries.

## Test Data & Seeding

* Deterministic fixtures for markets, events, users; scripts to seed local/staging.

---

# 16) docs/150-runbooks.md

## Price Drift / Odds Stale

* Symptom: frequent re-offers; low Redis hit; provider lag.
* Checks: Redis hit ratio, `asOf` age, ingestion error logs.
* Actions: increase SWR window; reduce fanout frequency; scale ingestion; temporarily suspend volatile markets.

## Redis Outage

* Symptom: latency spikes; cache misses; WS stale.
* Checks: connection errors, failovers.
* Actions: flip API to stale reads; circuit-break vendor calls; restart ingestion after Redis healthy.

## Payments Webhook Delay

* Symptom: deposits stuck in `INITIATED`.
* Checks: webhook delivery logs; outbox lag.
* Actions: replay webhooks; manual reconcile via PSP dashboard; notify affected users.

## Chat Flooding/Abuse

* Symptom: msgs/sec spike; moderation backlog.
* Actions: enable slow mode; raise rate-limit strictness; apply shadowbans; temporarily freeze reactions.

---

# 17) docs/160-roadmap.md

## Phase 1 (Foundations)

* Schemas + idempotent bets & settlement; Redis odds cache; outbox events; CI/CD; observability baseline.

## Phase 2 (Realtime & Social)

* WS fanout; chat rooms + trending; public bets, follows, leaderboards.

## Phase 3 (Payments & Ops)

* Stripe deposits/withdrawals; webhook truth; admin/trading tools; exposure limits.

## Phase 4 (Intelligence)

* AI chat (RAG) hardening; ML recs MVP; analytics pipeline to warehouse; explainability.

## Phase 5 (Scale & Services)

* Split Ingestion, Chat gateway, Payments webhook, Settlement; enable autoscaling; consider Kafka; prep multi-region.

---

# 18) docs/170-recommendations-and-tradeoffs.md

* **Postgres for transactional cores** over NoSQL: fewer edge cases, easier integrity.
* **Redis cache + SWR** beats direct vendor reads: protects UX and rate limits.
* **Public bets opt‑in with defaults** (stake hidden, live delay) reduces harm and abuse vectors.
* **SGP constraints via provider** early: prevents correlated exposure while you scale pricing capability.
* **Outbox + queue** over in-process async: durability and replay make operations simpler.
* **Monolith first, clear seams**: ship faster; split only when metrics demand.
* **Observability as a feature**: it’s cheaper than outages and user churn.

---
