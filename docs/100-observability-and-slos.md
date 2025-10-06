# 11) Observability and SLOs

## Telemetry

* **Tracing** (OTel): `/bets`, `/wallet/deposits`, `payments.webhook`, `odds.ingest`, `chat.send`, `ws.broadcast`.
* **Metrics**: bet success/error rates; price revalidation failures; Redis hit ratio; WS concurrent; msgs/sec per room; outbox lag; PSP webhook lag; settlement latency; p95 latencies per endpoint.
* **Logging**: structured (JSON) with `traceId` correlation; sensitive data redacted.

## SLOs (examples)

* **Availability**: User-facing 99.9% monthly; bet placement 99.95%.
* **Latency (p95)**: `GET odds ≤ 300ms`, `POST /bets ≤ 500ms`, chat send→deliver ≤ 200ms (regional).
* **Odds freshness**: 99% of reads ≤ 10s since provider `asOf`.

## Alerting & Dashboards

* Error budget alerts; saturation (Redis/DB connections), queue lags, WS disconnect spikes. Runbooks linked.

---

_See also: [Runbooks](./150-runbooks.md), [Deployment & Operations](./130-deployment-and-operations.md)_
