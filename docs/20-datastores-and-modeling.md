# 3) Datastores and Modeling

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

_See also: [API Contracts](./30-apis-and-contracts.md), [Betting & Settlement](./50-bet-placement-and-settlement.md)_
