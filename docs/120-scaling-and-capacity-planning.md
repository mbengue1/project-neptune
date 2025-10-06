# 13) Scaling and Capacity Planning

## Capacity Assumptions (launch target)

* 100k DAU; ~8k concurrent users at peak. Odds updates 1–2k/s bursts. Bets peak ~37/s. Chat baseline ~40 msgs/s; spikes ~400 msgs/s; fanout in the low thousands msgs/s.

## Scaling Paths

* **API**: stateless pods; HPA on CPU/RPS.
* **Redis**: primary/replica; client timeouts + circuit breakers; partition keys by sport/market if needed.
* **Postgres**: managed (Aurora/Cloud SQL) with read replicas; connection pooling; eventual sharding by `account_id` when write contention emerges.
* **Chat**: shard WS gateway by `room_id` hash; migrate message store to DynamoDB/Cassandra if write pressure grows.
* **Events**: SQS/SNS initially; migrate to Kafka for high-throughput streams.
* **Multi-region** (later): region-local WS; read-local odds; write-through for ledger with primary region + disaster recovery.

## Resilience

* Multi-AZ; PITR for DB; backups for object store; chaos testing; backpressure and load shedding on non-critical streams first.

---

_See also: [Architecture Overview](./10-architecture-overview.md), [Deployment & Operations](./130-deployment-and-operations.md)_
