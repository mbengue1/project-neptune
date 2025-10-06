# 9) Chat and Trending

## Rooms & Transport

* WS rooms per event + sport/global rooms; sticky connections by token; presence in Redis.
* Bounded per-socket queues; backpressure drops non-critical messages first (typing/reactions) and never system confirmations.

## Moderation & Safety

* Per-user/per-room rate limits; slow mode during spikes; profanity/abuse filters; mute/ban/shadowban; report workflow.
* Retention windows (e.g., 30–90 days), configurable.

## Trending Highlights

* Streaming consumer computes rolling z‑scores for `msgs/sec` and `reactions/sec` vs baseline per room; emits `chat.highlight` markers displayed inline.

---

_See also: [Architecture Overview](./10-architecture-overview.md), [Scaling & Capacity](./120-scaling-and-capacity-planning.md)_
