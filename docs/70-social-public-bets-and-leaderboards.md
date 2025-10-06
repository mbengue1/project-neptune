# 8) Social, Public Bets, and Leaderboards

## Public Profiles & Privacy

* Default private; users can opt‑in to public profile.
* Stake visibility: hidden (default), rounded, exact.
* Live bet exposure: configurable delay (`live_delay_sec`; default e.g. 180s).

## Public Bets Feed

* On qualifying bet placement, create `public_bets` with `visible_from` honoring delay.
* "Follow this bet" opens a prefilled slip for the follower (never auto‑place).

## Leaderboards

* Metrics: ROI and Win%.
* Windows: 7d, 30d.
* Eligibility: min sample size + volume; use Wilson score to reduce small-sample bias.
* Batch compute hourly; store top 30 per window/metric (+ per sport filter).

---

_See also: [Datastores & Modeling](./20-datastores-and-modeling.md), [API Contracts](./30-apis-and-contracts.md)_
