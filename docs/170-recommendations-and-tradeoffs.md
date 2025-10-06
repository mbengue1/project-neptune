# 18) Recommendations and Tradeoffs

* **Postgres for transactional cores** over NoSQL: fewer edge cases, easier integrity.
* **Redis cache + SWR** beats direct vendor reads: protects UX and rate limits.
* **Public bets opt‑in with defaults** (stake hidden, live delay) reduces harm and abuse vectors.
* **SGP constraints via provider** early: prevents correlated exposure while you scale pricing capability.
* **Outbox + queue** over in-process async: durability and replay make operations simpler.
* **Monolith first, clear seams**: ship faster; split only when metrics demand.
* **Observability as a feature**: it's cheaper than outages and user churn.

---

_See also: [Architecture Overview](./10-architecture-overview.md), [Project Overview](./00-project-overview.md)_
