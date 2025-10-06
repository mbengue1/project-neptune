# 7) Payments

## Strategy

* Adapter interface for PSPs; start with **Stripe** (cards + Apple/Google Pay; ACH later). Webhooks are the source of truth.

## Deposit Flow

1. Client → `POST /wallet/deposits` (amount, paymentMethodId, idempotency key).
2. Payments service calls Stripe `paymentIntent` (idempotent), stores `payments` row with `INITIATED`.
3. On Stripe webhook `SUCCEEDED`, atomically add **CREDIT** ledger entry and update balance; mark payment `SUCCEEDED`.

## Withdrawal Flow

* Validate KYC/limits; initiate payout; mark `PENDING`.
* On webhook `SUCCEEDED`, commit **DEBIT** ledger entry.

## Protections

* Dedupe by `(account_id, idempotency_key)`.
* Guardrails: daily caps, unsettled exposure checks, chargeback handling.

---

_See also: [Bet Placement & Settlement](./50-bet-placement-and-settlement.md), [Security & Privacy](./110-security-and-privacy.md)_
