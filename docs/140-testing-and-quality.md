# 15) Testing and Quality

## Testing Strategy

* **Unit**: services (bet math, SGP validation), ledger rules, cache policies.
* **Contract**: schema compatibility (shared package for types); backward/forward tests.
* **Integration**: DB + Redis + payments webhook happy/edge paths.
* **E2E**: place bet → settle; price change re-offer; insufficient funds; deposit/withdraw.
* **Load**: odds read RPS; WS fanout; `/bets` bursts with idempotent retries.

## Test Data & Seeding

* Deterministic fixtures for markets, events, users; scripts to seed local/staging.

---

_See also: [Deployment & Operations](./130-deployment-and-operations.md)_
