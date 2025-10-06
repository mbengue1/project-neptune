# 10) AI and ML

## AI Chat (RAG)

* Sources: licensed sports stats (box scores, recent averages), schedules, glossary.
* Pipeline: chunk → embed → vector index → retrieve top‑k → compose answer with disclaimers.
* Caching popular queries; p95 latency target 700–900ms.
* Safety: content filters, advisory language, no promises on outcomes.

## ML Recommendations

* Offline features (team form, player trends, price movement, user preferences) → training (GBM/logistic to start) → calibration checks.
* Online inference returns ranked suggestions with confidence and reason codes; respects user risk settings and privacy opt‑outs.

---

_See also: [AI Page Design](./ai-page-design.md), [API Contracts](./30-apis-and-contracts.md)_
