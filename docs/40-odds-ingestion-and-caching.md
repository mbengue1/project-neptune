# 5) Odds Ingestion and Caching

## Goals

* Keep user read paths hot and isolated from vendor latency and rate limits.
* Provide ordered, monotonic updates and reduce jitter.

## Ingestion Workflow

1. Poll/stream provider → normalize to internal event/market/outcome model.
2. Write to Redis key `markets:{market_id}` with `version`, `asOf`, `status`, `prices`.
3. Publish `odds.updated` event for WS gateway to coalesce and fan out.
4. Snapshot raw payloads to object storage for audit.

## Redis Policies

* **TTL**: 8–15s, **SWR**: 2–3s; **jitter** TTLs to avoid herd refresh.
* **Single-flight**: per-key mutex while refreshing; failed refresh keeps stale for SWR.
* **Monotonicity**: only overwrite if `incoming.version >= existing.version`.

## WS Fanout

* Gateway batches/coalesces updates per room; throttles to protect clients; backpressure drops non-critical deltas first.

---

_See also: [Datastores & Modeling](./20-datastores-and-modeling.md), [Scaling & Capacity](./120-scaling-and-capacity-planning.md), [Runbooks](./150-runbooks.md)_
