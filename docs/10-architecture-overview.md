# 2) Architecture Overview

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

_See also: [Datastores & Modeling](./20-datastores-and-modeling.md), [API Contracts](./30-apis-and-contracts.md)_
