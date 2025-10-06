# 12) Security and Privacy

## Authentication & Authorization

* OIDC IdP (e.g., Firebase/Auth0/Cognito). Backend issues roles/scopes (user/admin/trader/moderator). Session tokens short-lived.

## Secrets & Access

* Cloud Secrets Manager; per-service IAM least privilege; rotate keys. PSP keys only in payments container.

## Data Protection

* PII isolation via reference + external vault; envelope encryption for any stored PII.
* Public bets opt-in; defaults to stake hidden and live delay. Easy opt‑out.

## Edge Protections

* WAF; bot rules; per-IP and per-account rate limits; CAPTCHA on abuse.

## Auditing

* Immutable admin audit logs (object lock); tamper-evident event streams.

---

_See also: [Architecture Overview](./10-architecture-overview.md), [Payments](./60-payments.md)_
