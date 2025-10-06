# 4) APIs and Contracts

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

_See also: [Odds Ingestion](./40-odds-ingestion-and-caching.md), [Security & Privacy](./110-security-and-privacy.md)_
