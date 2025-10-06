# Runbook: Redis Outage

## Symptom

* API latency spikes (p95 > 2s)
* High cache miss rate (near 0% hits)
* WebSocket connections dropping
* Stale odds displayed to users
* Redis connection errors in logs

## Checks

1. **Redis health**: Check cluster status
   ```
   redis-cli PING
   redis-cli INFO replication
   ```

2. **Connection errors**: Check application logs
   ```
   kubectl logs -l app=api --tail=100 | grep "Redis"
   ```

3. **Failover status**: Check if replica promotion occurred
   ```
   kubectl get pods -l app=redis
   ```

## Actions

### Immediate (< 2 min)

1. **Enable degraded mode**: Flip API to direct database reads (bypassing cache)
   ```
   kubectl set env deployment/api CACHE_MODE=degraded
   ```
   
2. **Circuit break ingestion**: Stop Redis writes from ingestion workers
   ```
   kubectl scale deployment/ingestion --replicas=0
   ```

### Short-term (< 15 min)

3. **Restart Redis**: If single-node or primary issue
   ```
   kubectl rollout restart statefulset/redis
   ```

4. **Promote replica**: If primary down and replica healthy
   ```
   redis-cli -h redis-replica REPLICAOF NO ONE
   ```

5. **Scale down non-critical consumers**: Reduce load while recovering
   ```
   kubectl scale deployment/chat-gateway --replicas=1
   ```

### Recovery (< 1 hour)

6. **Verify Redis healthy**: 
   ```
   redis-cli INFO stats
   redis-cli DBSIZE
   ```

7. **Restart ingestion**: Resume odds updates
   ```
   kubectl scale deployment/ingestion --replicas=2
   kubectl set env deployment/api CACHE_MODE=normal
   ```

8. **Monitor warmup**: Watch cache hit ratio climb back to baseline (85%+)

## Prevention

* Use Redis Sentinel or managed service with automatic failover
* Set connection pool timeouts and circuit breakers in application
* Alert on Redis memory usage > 80%
* Alert on connection errors > 10/min
* Schedule Redis upgrades during low-traffic windows
* Test failover quarterly

---

_Last updated: 2025-10-06_  
_Owner: Platform Engineering_
