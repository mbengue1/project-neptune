# Neptune System Documentation

This directory contains comprehensive system design documentation for the Neptune platform.

## Documentation Index

### Core System Design

1. [**00 - Project Overview**](./00-project-overview.md)  
   Vision, core tenets, personas, MVP scope

2. [**10 - Architecture Overview**](./10-architecture-overview.md)  
   High-level architecture, deployment stance, service responsibilities

3. [**20 - Datastores & Modeling**](./20-datastores-and-modeling.md)  
   Database choices, schemas, Redis patterns, indexing

4. [**30 - APIs & Contracts**](./30-apis-and-contracts.md)  
   REST/WebSocket APIs, idempotency, versioning

### Feature-Specific Design

5. [**40 - Odds Ingestion & Caching**](./40-odds-ingestion-and-caching.md)  
   Market data pipeline, Redis policies, WebSocket fanout

6. [**50 - Bet Placement & Settlement**](./50-bet-placement-and-settlement.md)  
   Betting workflows, idempotency, atomic transactions, risk controls

7. [**60 - Payments**](./60-payments.md)  
   Payment integration (Stripe), deposit/withdrawal flows

8. [**70 - Social, Public Bets & Leaderboards**](./70-social-public-bets-and-leaderboards.md)  
   Social features, privacy controls, leaderboard computation

9. [**80 - Chat & Trending**](./80-chat-and-trending.md)  
   Chat rooms, moderation, trending highlights

10. [**90 - AI & ML**](./90-ai-and-ml.md)  
    AI chat (RAG), ML recommendations

### Operations & Quality

11. [**100 - Observability & SLOs**](./100-observability-and-slos.md)  
    Telemetry, metrics, tracing, logging, SLOs, alerting

12. [**110 - Security & Privacy**](./110-security-and-privacy.md)  
    Authentication, authorization, secrets, data protection, auditing

13. [**120 - Scaling & Capacity Planning**](./120-scaling-and-capacity-planning.md)  
    Capacity assumptions, scaling paths, resilience

14. [**130 - Deployment & Operations**](./130-deployment-and-operations.md)  
    Environments, CI/CD, infrastructure, images

15. [**140 - Testing & Quality**](./140-testing-and-quality.md)  
    Testing strategy, test data, seeding

16. [**150 - Runbooks**](./150-runbooks.md)  
    Index of operational runbooks (see also: [`../ops/runbooks/`](../ops/runbooks/))

### Planning & Decisions

17. [**160 - Roadmap**](./160-roadmap.md)  
    Development phases, feature rollout plan

18. [**170 - Recommendations & Tradeoffs**](./170-recommendations-and-tradeoffs.md)  
    Key design decisions and rationale

---

## Additional Documentation

- [**AI Page Design**](./ai-page-design.md) - AI page specification and requirements
- [**Architecture Reference**](./architecture-reference.md) - Microservices reference document
- [**Research Notes**](./research/) - API research and planning documents

---

## Source Documents

- `neptune-docu-source.md` - Original comprehensive system design document (split into numbered docs above)

---

## How to Use This Documentation

1. **New team members**: Start with [00 - Project Overview](./00-project-overview.md) and [10 - Architecture Overview](./10-architecture-overview.md)

2. **Feature development**: Refer to feature-specific docs (40-90) for implementation guidance

3. **Operations**: Use [150 - Runbooks](./150-runbooks.md) for incident response

4. **Scaling decisions**: Review [120 - Scaling & Capacity Planning](./120-scaling-and-capacity-planning.md)

5. **Design decisions**: Check [170 - Recommendations & Tradeoffs](./170-recommendations-and-tradeoffs.md) for context on architectural choices

---

_This documentation is a living set. Update as the system evolves._
