# 6) Bet Placement and Settlement

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

_See also: [Datastores & Modeling](./20-datastores-and-modeling.md), [Payments](./60-payments.md), [Observability](./100-observability-and-slos.md)_
