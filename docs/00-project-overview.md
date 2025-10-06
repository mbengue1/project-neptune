# 1) Project Overview

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

_See also: [Architecture Overview](./10-architecture-overview.md), [Roadmap](./160-roadmap.md)_
